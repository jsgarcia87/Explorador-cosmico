// --- core/defines.glsl ---
// Role: Global macro definitions, uniform declarations, and scene constants used
//       across all shader stages. Loaded first in the shader concatenation order.

#define M_PI 3.141592653589793238462643383279
#define R_SQRT_2 0.7071067811865475
#define DEG_TO_RAD (M_PI/180.0)
#define SQ(x) ((x)*(x))

// Note: despite the name, this is NOT a pure Y-axis rotation. It swaps the
// XY axes and applies a rotation by angle `a` in the YZ plane. Used only for
// background and planet texture coordinate transforms.
#define ROT_Y(a) mat3(0, cos(a), sin(a), 1, 0, 0, 0, sin(a), -cos(a))


// spectrum texture lookup helper macros
const float BLACK_BODY_TEXTURE_COORD = 1.0;
const float SINGLE_WAVELENGTH_TEXTURE_COORD = 0.5;
const float TEMPERATURE_LOOKUP_RATIO_TEXTURE_COORD = 0.0;

// black-body texture metadata
const float SPECTRUM_TEX_TEMPERATURE_RANGE = 65504.0;
const float SPECTRUM_TEX_WAVELENGTH_RANGE = 2048.0;
const float SPECTRUM_TEX_RATIO_RANGE = 6.48053329012;

// multi-line macros don't seem to work in WebGL :(
#define BLACK_BODY_COLOR(t) texture2D(spectrum_texture, vec2((t) / SPECTRUM_TEX_TEMPERATURE_RANGE, BLACK_BODY_TEXTURE_COORD))
#define SINGLE_WAVELENGTH_COLOR(lambda) texture2D(spectrum_texture, vec2((lambda) / SPECTRUM_TEX_WAVELENGTH_RANGE, SINGLE_WAVELENGTH_TEXTURE_COORD))
#define TEMPERATURE_LOOKUP(ratio) (texture2D(spectrum_texture, vec2((ratio) / SPECTRUM_TEX_RATIO_RANGE, TEMPERATURE_LOOKUP_RATIO_TEXTURE_COORD)).r * SPECTRUM_TEX_TEMPERATURE_RANGE)

uniform vec2 resolution;
uniform float time;
uniform float turbulence_time_offset;
uniform float turbulence_loop_enabled;
uniform float turbulence_loop_seconds;

uniform vec3 cam_pos;
uniform vec3 cam_x;
uniform vec3 cam_y;
uniform vec3 cam_z;
uniform vec3 cam_vel;
uniform vec2 cam_pan;
uniform vec2 taa_jitter;

uniform float interior_mode; // 0.0 = exterior (capture at horizon), 1.0 = interior (trace past horizon)

// Gravitational blueshift: sqrt(1 - r_s/r) for the observer position.
// Light from infinity gains energy falling into the potential well.
// For a hovering (static) observer: f_obs/f_emit = 1/grav_blueshift_factor.
// Multiplied into the background Doppler factor so both gravitational and
// kinematic Doppler are applied consistently.
uniform float grav_blueshift_factor;

uniform float planet_distance, planet_radius;
uniform float disk_temperature;
uniform float bh_spin, bh_spin_strength, bh_rotation_enabled;
uniform float photon_spin_lensing_scale;
uniform float accretion_inner_r;
uniform float look_exposure, look_disk_gain, look_glow, look_doppler_boost;
uniform float look_aberration_strength;
uniform float look_star_gain, look_galaxy_gain;
uniform float look_tonemap_mode;
uniform float torus_r0, torus_h_ratio, torus_radial_falloff, torus_opacity, torus_outer_radius;
uniform float slim_h_ratio, slim_opacity, slim_puff_factor;
uniform float jet_half_angle, jet_lorentz, jet_brightness, jet_length;
#ifdef JET_PHYSICAL
uniform float jet_magnetization, jet_knot_spacing, jet_corona_brightness;
uniform float jet_base_width, jet_corona_extent;
#endif

#ifdef GRMHD_ENABLED
uniform float grmhd_r_high, grmhd_magnetic_beta, grmhd_mad_flux;
uniform float grmhd_density_scale, grmhd_turbulence_amp;
uniform float grmhd_electron_kappa, grmhd_magnetic_field_str;
#endif

uniform sampler2D galaxy_texture, star_texture,
    planet_texture, spectrum_texture;

// stepping and anti-aliasing parameters
const int NSTEPS = {{n_steps}};
const int SAMPLE_COUNT = {{sample_count}};
const float MAX_REVOLUTIONS = float({{max_revolutions}});

// ACCRETION_MIN_R is now a uniform (accretion_inner_r) that varies with black hole spin
// Using ISCO from Bardeen-Press-Teukolsky formula: r_ISCO = 3 r_s for Schwarzschild
const float ACCRETION_WIDTH = 12.0;
#define ACCRETION_MIN_R accretion_inner_r
const float ACCRETION_BRIGHTNESS = 0.95;

// Widened range covers L/T-type brown dwarfs (~2500 K) through O-type
// stars (~40000 K) for more diverse and physically realistic star colours.
const float STAR_MIN_TEMPERATURE = 2500.0;
const float STAR_MAX_TEMPERATURE = 40000.0;

const float STAR_BRIGHTNESS = 0.52;
const float GALAXY_BRIGHTNESS = 0.14;
const float GLOBAL_EXPOSURE = 0.60;
const float GALAXY_DOPPLER_STRENGTH = 1.0;
const float GALAXY_MAX_BOOST = 10.0;

const float PLANET_AMBIENT = 0.0;
const float PLANET_LIGHTNESS = 1.5;
const float PLANET_LIGHT_REF_DISTANCE = 14.0;

// background texture coordinate system
mat3 BG_COORDS = ROT_Y(45.0 * DEG_TO_RAD);

// planet texture coordinate system
const float PLANET_AXIAL_TILT = 30.0 * DEG_TO_RAD;
mat3 PLANET_COORDS = ROT_Y(PLANET_AXIAL_TILT);

const float FOV_ANGLE_DEG = 90.0;
float FOV_MULT = 1.0 / tan(DEG_TO_RAD * FOV_ANGLE_DEG*0.5);

// derived "constants" (from uniforms)
float PLANET_RADIUS,
    PLANET_DISTANCE,
    PLANET_ORBITAL_ANG_VEL,
    PLANET_ROTATION_ANG_VEL,
    PLANET_GAMMA;

// --- core/math.glsl ---
// Role: General-purpose mathematical utilities — coordinate projections, relativistic
//       velocity transforms, spatial operations, and procedural noise used by
//       accretion and sampling routines.

vec2 sphere_map(vec3 p) {
    return vec2(atan(p.x,p.y)/M_PI*0.5+0.5, asin(p.z)/M_PI+0.5);
}

float smooth_step(float x, float threshold) {
    const float STEEPNESS = 1.0;
    return 1.0 / (1.0 + exp(-(x-threshold)*STEEPNESS));
}

vec3 lorentz_velocity_transformation(vec3 moving_v, vec3 frame_v) {
    float v = length(frame_v);
    if (v > 0.0) {
        vec3 v_axis = -frame_v / v;
        float gamma = 1.0/sqrt(1.0 - v*v);

        float moving_par = dot(moving_v, v_axis);
        vec3 moving_perp = moving_v - v_axis*moving_par;

        float denom = 1.0 + v*moving_par;
        return (v_axis*(moving_par+v)+moving_perp/gamma)/denom;
    }
    return moving_v;
}

vec3 contract(vec3 x, vec3 d, float mult) {
    float par = dot(x,d);
    return (x-par*d) + d*par*mult;
}

vec3 safe_normalize(vec3 v) {
    float l = length(v);
    if (l > 1e-6) return v/l;
    return vec3(0.0, 0.0, 0.0);
}

vec3 rotate_about_z(vec3 p, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return vec3(
        c*p.x - s*p.y,
        s*p.x + c*p.y,
        p.z
    );
}

// --- Procedural noise ---
// Used for disk turbulence and structural detail in the accretion flow.

float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

float value_noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash12(i);
    float b = hash12(i + vec2(1.0, 0.0));
    float c = hash12(i + vec2(0.0, 1.0));
    float d = hash12(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0 - 2.0*f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
        sum += amp * value_noise(p);
        p = p*2.03 + vec2(17.13, -11.70);
        amp *= 0.5;
    }
    return sum;
}

// --- physics/geodesics.glsl ---
// Role: Kerr metric helpers and photon geodesic integration.
//       Two integration families:
//         1. Public Schwarzschild Binet photon solver (u = 1/r) — exact for a = 0,
//            with perturbative spin heuristics in the exposed modes.
//         2. Experimental Kerr geodesic helpers in Mino time — Carter (1968)
//            separated equations for the full Kerr metric. These helpers are
//            present in the codebase but not exposed in the public UI.

const float KERR_M = 0.5; // r_s = 1 => M = r_s/2

float kerr_spin_a() {
    return bh_rotation_enabled * bh_spin * KERR_M;
}

float kerr_delta(float r, float a) {
    return r*r - r + a*a; // r^2 - 2Mr + a^2, with 2M = 1
}

float kerr_sigma(float r, float theta, float a) {
    float c = cos(theta);
    return r*r + a*a*c*c;
}

float kerr_horizon_radius(float a) {
    return KERR_M + sqrt(max(KERR_M*KERR_M - a*a, 0.0));
}

// ═══════════════════════════════════════════════════════════════════
// 1. Public Schwarzschild Binet photon solver (used by all exposed modes;
//    also reused inside the horizon)
// ═══════════════════════════════════════════════════════════════════

float geodesic_accel(float u, float spin_alignment) {
    float schwarzschild_accel = -u + 1.5*u*u;
    float u_drag = min(u, 1.2);
    float frame_drag_term = photon_spin_lensing_scale *
        bh_rotation_enabled * bh_spin * bh_spin_strength *
        spin_alignment * 0.8 * u_drag*u_drag*u_drag;
    return schwarzschild_accel + frame_drag_term;
}

void integrate_geodesic_step(inout float u, inout float du, float step,
        float spin_alignment) {
    #ifdef RK4_INTEGRATION
    float k1_u = du;
    float k1_du = geodesic_accel(u, spin_alignment);

    float u2 = u + 0.5*step*k1_u;
    float du2 = du + 0.5*step*k1_du;
    float k2_u = du2;
    float k2_du = geodesic_accel(u2, spin_alignment);

    float u3 = u + 0.5*step*k2_u;
    float du3 = du + 0.5*step*k2_du;
    float k3_u = du3;
    float k3_du = geodesic_accel(u3, spin_alignment);

    float u4 = u + step*k3_u;
    float du4 = du + step*k3_du;
    float k4_u = du4;
    float k4_du = geodesic_accel(u4, spin_alignment);

    u += (step/6.0) * (k1_u + 2.0*k2_u + 2.0*k3_u + k4_u);
    du += (step/6.0) * (k1_du + 2.0*k2_du + 2.0*k3_du + k4_du);
    #endif
    #ifndef RK4_INTEGRATION
    du += 0.5 * geodesic_accel(u, spin_alignment) * step;
    u  += du * step;
    du += 0.5 * geodesic_accel(u, spin_alignment) * step;
    #endif
}

// ═══════════════════════════════════════════════════════════════════
// 2. True Kerr geodesics — Mino-time second-order equations
// ═══════════════════════════════════════════════════════════════════
//
// Carter (1968) showed the Kerr geodesic equations separate into
// decoupled ODEs in Mino time σ (where dλ = Σ dσ):
//
//   d²r/dσ²      = R'(r)/2
//   d²(cosθ)/dσ² = Θ̃'(cosθ)/2
//   dφ/dσ        = Φ_r(r) + Φ_θ(θ)
//
// R(r) = P² − Δ K,   P = r²+a²−aξ,  K = (ξ−a)²+η
// Θ̃(c) = η(1−c²) + a²c²(1−c²) − ξ²c²   [c = cosθ]
// Constants: ξ = L_z/E,  η = Q/E²  (with E normalised to 1).
//
// The radial and polar pieces are polynomial; the azimuthal piece is rational
// through Δ and sin²θ. Taken together they still encode the separated Kerr
// null-geodesic system cheaply enough for experimentation.

// Mino-time radial acceleration:
//   d²r/dσ² = R'(r)/2 = 2rP − (r − M)K,  M = 0.5
float kerr_r_accel(float r, float a, float xi, float eta) {
    float a2 = a * a;
    float P = r*r + a2 - a*xi;
    float K = (xi - a)*(xi - a) + eta;
    return 2.0*r*P - (r - 0.5)*K;
}

// Mino-time polar acceleration:
//   d²c/dσ² = Θ̃'(c)/2 = −c(η+ξ²−a²) − 2a²c³
float kerr_cth_accel(float cth, float a, float xi, float eta) {
    float a2 = a * a;
    return -cth*(eta + xi*xi - a2) - 2.0*a2*cth*cth*cth;
}

// Mino-time azimuthal velocity:
//   dφ/dσ = aP/Δ + ξ/sin²θ − a
float kerr_phi_dot(float r, float cth, float a, float xi) {
    float a2 = a * a;
    float Delta = max(r*r - r + a2, 0.001); // clamp near horizon
    float P = r*r + a2 - a*xi;
    float sth2 = max(1.0 - cth*cth, 1e-10);
    return a*P/Delta + xi/sth2 - a;
}

// Initialise Kerr constants of motion and Mino-time state from the
// camera position and ray direction.  Uses flat-space expressions for
// ξ and η (valid when the observer is far from the black hole) and
// projects the initial momenta onto the Kerr constraint surface
// (dr/dσ)² = R(r), (dcosθ/dσ)² = Θ̃(cosθ) so that H = 0 exactly.
void kerr_init(vec3 pos, vec3 dir, float a,
        out float xi, out float eta,
        out float r, out float cth, out float phi,
        out float pr, out float pcth) {

    float a2 = a * a;

    // Solve for Boyer-Lindquist r from Cartesian position:
    // x²+y²+z² = r² + a²sin²θ  →  r⁴ − (ρ²−a²)r² − a²z² = 0
    float rho2 = dot(pos, pos);
    float z2 = pos.z * pos.z;
    float w = rho2 - a2;
    r = sqrt(max((w + sqrt(max(w*w + 4.0*a2*z2, 0.0))) * 0.5, 0.001));

    cth = pos.z / r;
    phi = atan(pos.y, pos.x);

    float c2 = cth * cth;
    float sth2 = max(1.0 - c2, 1e-10);
    float sth  = sqrt(sth2);

    // Flat-space velocity components
    float rdot = dot(pos, dir) / r;             // dr/dλ
    float cdot = (dir.z - cth * rdot) / r;      // d(cosθ)/dλ

    // L_z = (pos × dir)·ẑ  (exact in flat space with E = 1)
    xi = pos.x * dir.y - pos.y * dir.x;

    // Carter constant Q = p_θ² + cos²θ (ξ²/sin²θ − a²)
    float theta_dot = -cdot / max(sth, 1e-6);   // dθ/dλ
    float p_theta   = r * r * theta_dot;         // p_θ = r²θ̇
    eta = p_theta*p_theta + xi*xi*c2/sth2 - a2*c2;

    // Project momenta onto the constraint surface at initialization
    float P = r*r + a2 - a*xi;
    float K = (xi - a)*(xi - a) + eta;
    float Delta = r*r - r + a2;
    float R_val = P*P - max(Delta, 0.0)*K;
    pr = (rdot < 0.0) ? -sqrt(max(R_val, 0.0)) : sqrt(max(R_val, 0.0));

    float Theta_tilde = eta*(1.0-c2) + a2*c2*(1.0-c2) - xi*xi*c2;
    pcth = (cdot < 0.0) ? -sqrt(max(Theta_tilde, 0.0)) : sqrt(max(Theta_tilde, 0.0));
}

// Single Kerr integration step (Leapfrog or RK4).
void integrate_kerr_step(inout float r, inout float cth, inout float phi,
        inout float pr, inout float pcth,
        float step, float a, float xi, float eta) {
    #ifdef RK4_INTEGRATION
    // ── RK4 for Kerr ───────────────────────────────────────────────
    float h = step;
    float k1_r = pr, k1_c = pcth;
    float k1_pr  = kerr_r_accel(r, a, xi, eta);
    float k1_pc  = kerr_cth_accel(cth, a, xi, eta);
    float k1_phi = kerr_phi_dot(r, cth, a, xi);

    float r2  = r + 0.5*h*k1_r;
    float c2_ = clamp(cth + 0.5*h*k1_c, -0.9999, 0.9999);
    float k2_r = pr + 0.5*h*k1_pr;
    float k2_c = pcth + 0.5*h*k1_pc;
    float k2_pr  = kerr_r_accel(r2, a, xi, eta);
    float k2_pc  = kerr_cth_accel(c2_, a, xi, eta);
    float k2_phi = kerr_phi_dot(r2, c2_, a, xi);

    float r3  = r + 0.5*h*k2_r;
    float c3_ = clamp(cth + 0.5*h*k2_c, -0.9999, 0.9999);
    float k3_r = pr + 0.5*h*k2_pr;
    float k3_c = pcth + 0.5*h*k2_pc;
    float k3_pr  = kerr_r_accel(r3, a, xi, eta);
    float k3_pc  = kerr_cth_accel(c3_, a, xi, eta);
    float k3_phi = kerr_phi_dot(r3, c3_, a, xi);

    float r4  = r + h*k3_r;
    float c4_ = clamp(cth + h*k3_c, -0.9999, 0.9999);
    float k4_r = pr + h*k3_pr;
    float k4_c = pcth + h*k3_pc;
    float k4_pr  = kerr_r_accel(r4, a, xi, eta);
    float k4_pc  = kerr_cth_accel(c4_, a, xi, eta);
    float k4_phi = kerr_phi_dot(r4, c4_, a, xi);

    r    += (h/6.0)*(k1_r   + 2.0*k2_r   + 2.0*k3_r   + k4_r);
    cth  += (h/6.0)*(k1_c   + 2.0*k2_c   + 2.0*k3_c   + k4_c);
    pr   += (h/6.0)*(k1_pr  + 2.0*k2_pr  + 2.0*k3_pr  + k4_pr);
    pcth += (h/6.0)*(k1_pc  + 2.0*k2_pc  + 2.0*k3_pc  + k4_pc);
    phi  += (h/6.0)*(k1_phi + 2.0*k2_phi + 2.0*k3_phi + k4_phi);
    cth   = clamp(cth, -0.9999, 0.9999);
    #endif
    #ifndef RK4_INTEGRATION
    // ── Leapfrog / Störmer-Verlet (symplectic 2nd-order) ───────────
    pr   += 0.5 * step * kerr_r_accel(r, a, xi, eta);
    pcth += 0.5 * step * kerr_cth_accel(cth, a, xi, eta);
    r   += step * pr;
    cth += step * pcth;
    cth  = clamp(cth, -0.9999, 0.9999);
    phi += step * kerr_phi_dot(r, cth, a, xi);
    pr   += 0.5 * step * kerr_r_accel(r, a, xi, eta);
    pcth += 0.5 * step * kerr_cth_accel(cth, a, xi, eta);
    #endif
}

// --- physics/accretion.glsl ---
// Role: Accretion disk emissivity and temperature models — thin Shakura-Sunyaev disk,
//       ADAF/RIAF thick torus, and super-Eddington slim disk. Also computes the
//       gravitational redshift factor and the planet irradiation temperature.

float loopable_turbulence_time(float t) {
    // Always wrap to prevent float32 precision loss in fbm/value_noise.
    // Without wrapping, large t values cause fract()/floor() to lose
    // sub-grid-cell resolution in the highest FBM octaves, flattening
    // fine turbulence detail over time (most visible after ~1 hour).
    // When the explicit loop is off, use a long prime period (10007 s
    // ≈ 2.78 h) so the wrap is imperceptible; when on, use the user
    // period for seamless video loops.
    float period = (turbulence_loop_enabled < 0.5)
        ? 10007.0
        : max(turbulence_loop_seconds, 1e-4);
    float wrapped = mod(t, period);
    if (wrapped < 0.0) wrapped += period;
    return wrapped;
}

float disk_rotation_sign() {
    // Keep the existing prograde default when spin is zero/off, but flip the
    // co-rotating flow for explicitly negative a/M.
    return (bh_rotation_enabled > 0.5 && bh_spin < 0.0) ? -1.0 : 1.0;
}

float equatorial_azimuth(vec2 xy) {
    // GLSL's two-argument atan is atan(y, x); swapping the arguments reverses
    // the phase advection direction.
    return atan(xy.y, xy.x);
}

float accretion_turbulence(float radius, float angle, float t) {
    float orbit_phase = angle - disk_rotation_sign() * 0.45*t / pow(max(radius, 1.001), 1.5);
    vec2 orbit_unit = vec2(cos(orbit_phase), sin(orbit_phase));

    // Use periodic angular coordinates to avoid seam artifacts at angle wrap.
    float large_scale = fbm(vec2(
        radius*2.5 + orbit_unit.x*4.5,
        orbit_unit.y*4.5 + t*0.08
    ));
    float small_scale = fbm(vec2(
        radius*12.0 + orbit_unit.x*15.0 + 2.5*large_scale,
        orbit_unit.y*15.0 - t*0.18
    ));
    // High-frequency chaos layer, moving faster and concentrated near the middle (ISCO)
    float micro_scale = fbm(vec2(
        radius*25.0 + orbit_unit.x*35.0 - small_scale*4.0,
        orbit_unit.y*35.0 + t*0.55
    ));
    
    // Distort the regular spiral using small_scale noise so it looks chaotic instead of uniform stripes
    float swirl_phase = 12.0*orbit_phase + 8.0*log(max(radius, 1.001)) + small_scale * 4.0;
    float swirl = sin(swirl_phase);
    
    float isco_factor = exp(-0.8 * max(radius - ACCRETION_MIN_R, 0.0));
    float filaments = 0.6 + 0.4*swirl;
    
    // Mix scales, giving micro_scale more weight near the center
    float base_plasma = mix(large_scale, small_scale, 0.5);
    float plasma = mix(base_plasma, micro_scale, 0.3 + 0.5 * isco_factor);

    return max((0.4 + 1.25*plasma) * (0.8 + 0.2*filaments), 0.02);
}

float accretion_emissivity(float radius, float angle, float t) {
    float r_norm = (radius - ACCRETION_MIN_R) / ACCRETION_WIDTH;
    float edge_fade = smoothstep(0.02, 0.18, r_norm) *
        (1.0 - smoothstep(0.78, 1.0, r_norm));
    return accretion_turbulence(radius, angle, t) * edge_fade;
}

// --- Disk Self-Irradiation (Returning Radiation) ---
// Heuristic Cunningham-inspired inner-disk brightening. This is NOT a
// ray-traced returning-radiation calculation or a tabulated Cunningham transfer
// function; it is a spin-scaled enhancement localized near the ISCO so the
// renderer can mimic the qualitative extra heating of strongly lensed inner
// disk emission.
float accretion_returning_radiation_enhancement(float radius) {
#ifdef DISK_SELF_IRRADIATION_ENABLED
    float r_norm = max(radius / ACCRETION_MIN_R, 1.0001);
    // Higher spin moves the ISCO inward, so we allow a stronger heuristic boost.
    float spin_a = bh_rotation_enabled * bh_spin;
    float peak_enhancement = 0.2 + 1.2 * abs(spin_a);
    // Rapid outward decay keeps the effect concentrated near the inner disk.
    float enhancement = peak_enhancement * pow(1.0 / r_norm, 3.5);
    return 1.0 + enhancement;
#endif
#ifndef DISK_SELF_IRRADIATION_ENABLED
    return 1.0;
#endif
}

float accretion_flux_profile(float radius) {
    float x = max(radius / ACCRETION_MIN_R, 1.0001);
    float inner_edge = max(1.0 - sqrt(1.0 / x), 0.0);
    float flux = inner_edge / (x*x*x);
    // Multiply by returning radiation enhancement to capture self-irradiation heating
    return flux * 18.0 * accretion_returning_radiation_enhancement(radius);
}

float accretion_temperature(float radius) {
    // Normalize Shakura-Sunyaev profile so disk_temperature corresponds
    // to the peak effective temperature (at x = 49/36).
    const float SS_PEAK_NORMALIZATION = 2.04910267;
    float x = max(radius / ACCRETION_MIN_R, 1.0001);
    float inner_edge = max(1.0 - sqrt(1.0 / x), 0.02);
    
    float t_base = disk_temperature * SS_PEAK_NORMALIZATION *
        pow(1.0 / x, 0.75) * pow(inner_edge, 0.25);
        
    // Stefan-Boltzmann law: Flux prop T^4. Thus, T = T_base * (F / F_base)^0.25
    return t_base * pow(accretion_returning_radiation_enhancement(radius), 0.25);
}

// Observer metric factor shared by the Schwarzschild redshift helpers.
// Uses the static Schwarzschild factor because the observer's own
// kinematic Doppler is applied separately via cam_vel aberration.
float _observer_metric_factor() {
    float r_obs = max(length(cam_pos), 0.05);
    return max(abs(1.0 - 1.0 / r_obs), 0.001);
}

float gravitational_shift_static(float emission_radius) {
    // Static Schwarzschild redshift only. Moving-source kinematic Doppler
    // (including transverse time dilation via gamma) is applied separately in
    // trace_ray(), which avoids double counting the emitter gamma factor.
    float r_emit = max(emission_radius, 1.0001);
    float emission_term = max(abs(1.0 - 1.0 / r_emit), 0.0001);
    return sqrt(emission_term / _observer_metric_factor());
}

#ifdef ACCRETION_THICK_TORUS
// ADAF/RIAF thick torus: geometrically thick, optically thin accretion flow
// Models low-luminosity AGN like M87* and Sgr A* (EHT targets)
float torus_local_emissivity(vec3 p) {
    float cyl_r = length(p.xy);
    float r0 = max(torus_r0, 1.5);
    float h = max(cyl_r * torus_h_ratio, 0.01);
    float z_norm = abs(p.z) / h;

    if (z_norm > 3.0 || cyl_r < 0.9) return 0.0;

    // Gaussian vertical profile (hydrostatic equilibrium)
    float vert = exp(-0.5 * z_norm * z_norm);

    // Radial emissivity: bremsstrahlung j ~ n^2 T^(1/2)
    // User-configurable power law index (default ~2.5, physically 2-4)
    // Using r0 as the reference radius for the peak emissivity region
    float falloff = max(torus_radial_falloff, 0.5);
    float radial;
    if (cyl_r < r0) {
        // Inside torus center: emissivity rises but not as steeply
        radial = pow(r0 / max(cyl_r, 1.0), falloff * 0.6);
    } else {
        // Outside torus center: standard power-law decay
        radial = pow(r0 / cyl_r, falloff);
    }
    // Normalize so peak is at r0 with a smooth profile
    float torus_profile = exp(-1.2 * pow((cyl_r - r0) / max(r0 * 0.6, 1.0), 2.0));
    radial = mix(radial, radial * torus_profile, 0.5);

    // Smooth cutoff at event horizon
    float inner = smoothstep(0.9, 1.5, cyl_r);

    // Outer edge falloff using configurable outer radius
    float outer_r = max(r0 * torus_outer_radius, ACCRETION_MIN_R + ACCRETION_WIDTH);
    float outer = 1.0 - smoothstep(outer_r * 0.7, outer_r, cyl_r);

    return vert * radial * inner * outer;
}

float torus_temperature(float r) {
    float r0 = max(torus_r0, 1.5);
    // ADAF electron temperature: T_e ~ r^(-0.5) for two-temperature ADAF
    // (Narayan & Yi 1995, Esin et al. 1997)
    return disk_temperature * pow(r0 / max(r, 1.0), 0.5);
}
#endif

#ifdef ACCRETION_SLIM_DISK
// Slim disk: super-Eddington accretion, extends inside ISCO
// Radiation-pressure supported, geometrically thicker than thin disk
float slim_disk_height(float cyl_r) {
    // User-configurable base H/R ratio (default ~0.15, range 0.05-0.5)
    float base_h = max(slim_h_ratio, 0.05);
    // Puffs up near and inside ISCO due to radiation pressure
    float puff = max(slim_puff_factor, 0.0);
    float isco_proximity = exp(-1.5 * max(cyl_r - ACCRETION_MIN_R, 0.0));
    return max(cyl_r * base_h * (1.0 + puff * isco_proximity), 0.01);
}

float slim_disk_local_emissivity(vec3 p) {
    float cyl_r = length(p.xy);
    float h = slim_disk_height(cyl_r);
    float z_norm = abs(p.z) / h;

    if (z_norm > 3.0 || cyl_r < 0.9) return 0.0;

    float vert = exp(-0.5 * z_norm * z_norm);

    // Extends inside ISCO with plunging-region emission
    float radial;
    if (cyl_r >= ACCRETION_MIN_R) {
        radial = accretion_flux_profile(cyl_r);
    } else {
        // Plunging region: conserved specific energy, decreasing efficiency
        float f = cyl_r / max(ACCRETION_MIN_R, 1.0);
        radial = accretion_flux_profile(ACCRETION_MIN_R) * pow(f, 2.5);
    }

    float inner = smoothstep(0.9, 1.3, cyl_r);
    float outer_r = ACCRETION_MIN_R + ACCRETION_WIDTH;
    float outer = 1.0 - smoothstep(outer_r * 0.8, outer_r, cyl_r);

    return vert * radial * inner * outer;
}

float slim_disk_temperature(float cyl_r) {
    if (cyl_r >= ACCRETION_MIN_R) {
        return accretion_temperature(cyl_r);
    } else {
        // Inside ISCO: advection-dominated, T rises as r^(-0.5)
        float t_isco = accretion_temperature(ACCRETION_MIN_R);
        return t_isco * pow(ACCRETION_MIN_R / max(cyl_r, 1.0), 0.5);
    }
}
#endif

#ifdef GRMHD_ENABLED
// ═══════════════════════════════════════════════════════════════════
// GRMHD-INSPIRED PHYSICS MODULE
// ═══════════════════════════════════════════════════════════════════
// Semi-analytic models inspired by GRMHD simulation results from:
//  - Event Horizon Telescope Collaboration et al. (2019, Paper V)
//  - Mościbrodzka, Falcke & Shiokawa (2016): two-temperature GRMHD
//  - Narayan, Sądowski et al. (2012): GRMHD accretion flows
//  - Fishbone & Moncrief (1976): equilibrium torus initial data
//  - Mahadevan, Narayan & Yi (1996): synchrotron fitting functions
//  - Howes (2010): turbulent electron heating prescription
//  - Pandya et al. (2016): synchrotron emissivities & absorptivities
//  - Tchekhovskoy, Narayan & McKinney (2011): MAD simulations

// --- Plasma beta profile ---
// β = P_gas / P_mag varies with position in GRMHD simulations:
//  Disk midplane: β >> 1 (gas-pressure dominated, MRI-turbulent)
//  Disk corona:   β ~ 1  (magnetic/gas equipartition)
//  Jet funnel:    β << 1 (magnetically dominated Poynting flux)
//  MAD state:     β lower everywhere (arrested magnetic flux)
float grmhd_plasma_beta(float cyl_r, float z, float disk_h) {
    float z_norm = abs(z) / max(disk_h, 0.01);
    // Midplane β from the user parameter
    float beta_mid = grmhd_magnetic_beta;
    // β decreases away from midplane (magnetic pressure rises)
    float beta = beta_mid * exp(-1.5 * z_norm * z_norm);
    // MAD state: β reduced by magnetic flux saturation
    beta *= mix(1.0, 0.08, grmhd_mad_flux);
    // β increases outward (field falls faster than gas at large r)
    beta *= pow(max(cyl_r / 4.0, 0.5), 0.5);
    return max(beta, 0.005);
}

// --- Two-temperature electron temperature (EHT R_high prescription) ---
// The physical prescription is usually written for R = T_i / T_e:
//   R(β) = R_high × β² / (1 + β²) + R_low / (1 + β²)
// where R_low = 1 (electrons ≈ ions at equipartition when β → 0).
// This naturally creates:
//   • Hot electrons in the jet funnel (low β → R ≈ 1 → T_e ≈ T_i)
//   • Cool electrons in the disk body (high β → R ≈ R_high → T_e ≈ T_i/R_high)
// When R_high is high, emission becomes concentrated near the jet wall
// and polar regions, producing the crescent morphology seen in EHT images.
// The helper below returns a renderer-side weight 1/(1+R), not the literal T_e/T_i ratio.
float grmhd_electron_temp_ratio(float beta) {
    float R = grmhd_r_high * beta * beta / (1.0 + beta * beta)
            + 1.0 / (1.0 + beta * beta);
    return 1.0 / (1.0 + R);
}

// --- GRMHD-inspired electron temperature ---
// For visual rendering the disk model temperature IS the nominal electron
// temperature (not the GRMHD ion/virial temperature which would be ~10^12 K).
// Applying the full R_high suppression would tank T_e to infrared (~100 K),
// making the disk invisible.  Instead, β modulates temperature mildly (±25%):
// hotter at low-β (magnetically dominated corona/funnel wall), cooler at
// high-β (gas-pressure dominated disk body).  The dominant R_high emission
// morphology is applied separately via grmhd_r_high_emissivity().
float grmhd_electron_temperature(float gas_temp, float cyl_r, float z, float disk_h, float t, float angle) {
    float beta = grmhd_plasma_beta(cyl_r, z, disk_h);
    // Low β → temp_mod ≈ 1.25 (hotter), high β → temp_mod ≈ 0.78 (cooler)
    float temp_mod = 0.75 + 0.5 / (1.0 + 0.15 * beta);
    
    // Smooth time-dependent variation to avoid sharp stripes
    float orbit_phase = angle - disk_rotation_sign() * 0.3 * t / pow(max(cyl_r, 1.0), 1.5);
    vec2 orbit_unit = vec2(cos(orbit_phase), sin(orbit_phase));
    float t_noise = fbm(vec2(
        cyl_r * 2.0 + orbit_unit.x * 2.5,
        orbit_unit.y * 2.5 + t * 0.15
    ));
    // Reduced amplitude to 10% because T^4 causes massive brightness swings
    float t_var = 1.0 + 0.1 * (t_noise - 0.5) * exp(-0.4 * max(cyl_r - ACCRETION_MIN_R, 0.0));
    
    return gas_temp * temp_mod * t_var;
}

// --- R_high emissivity morphology (EHT crescent) ---
// Electron heating efficiency depends on local plasma β via R_high.
// Low-β regions (funnel wall, corona) emit efficiently (factor → 1);
// high-β regions (disk body) are suppressed proportionally to R_high.
// This creates the crescent/ring morphology seen in EHT images.
// Uses sqrt to maintain visual sensitivity across the full R_high range.
float grmhd_r_high_emissivity(float cyl_r, float z, float disk_h) {
    float beta = grmhd_plasma_beta(cyl_r, z, disk_h);
    float Te_ratio = grmhd_electron_temp_ratio(beta);
    // Renderer weight ranges from ~0.5 (β→0) to ~1/(1+R_high) (β→∞)
    // Normalize so low-β regions get factor ≈ 1.0
    return sqrt(Te_ratio * 2.0);
}

// --- Magnetic field strength (dimensionless code units) ---
// B ∝ √(2 ρ T_norm / β) where T_norm = T/T_disk is the dimensionless
// temperature ratio.  This keeps B in the range O(0.1–3) so that
// downstream factors like (1 + c·B) stay well-behaved.
float grmhd_B_field(float density, float temperature, float beta) {
    float T_norm = max(temperature, 1.0) / max(disk_temperature, 1.0);
    return grmhd_magnetic_field_str * sqrt(2.0 * density * T_norm / max(beta, 0.01));
}

// --- Synchrotron spectral correction factor (Mahadevan et al. 1996 inspired) ---
// Synchrotron emissivity scales with B² and electron density.  Uses magnetic
// field strength and density (both O(1) in code units) rather than the
// suppressed T_e ratio, ensuring B-field and density parameters remain
// responsive across their full slider range.
// Returns a modulation factor in the range ~[0.3, 3.0].
float grmhd_synchrotron_correction(float B_norm, float density_norm) {
    float efficiency = B_norm * (0.2 + 0.8 * density_norm);
    return 0.3 + 2.7 * efficiency / (1.0 + efficiency);
}

// --- Synchrotron self-absorption (dimensionless scale factor) ---
// α_ν ∝ n_e / (T_e^(5/2) B) (Kirchhoff's law).  Normalized so that
// typical disk/torus conditions produce O(0.01–1) opacity contributions.
float grmhd_synchrotron_absorption(float density, float T_e_norm, float B_norm) {
    return grmhd_density_scale * density /
        (pow(max(T_e_norm, 0.1), 1.5) * max(B_norm, 0.1) + 0.1);
}

// --- GRMHD density profile ---
// Power-law decay with radius, modified by model-specific normalization.
// For ADAF: ρ ∝ r^(-3/2+s), s ≈ 0.3 (self-similar wind parameter).
// For thin disk: Σ ∝ r^(-3/5) (Shakura-Sunyaev).
float grmhd_density(float r, float base_density) {
    return base_density * pow(4.0 / max(r, 1.0), 1.2) * grmhd_density_scale;
}

// --- MRI turbulence structure (GRMHD-inspired) ---
// MRI generates non-axisymmetric fluctuations with predominantly
// m = 1, 2 azimuthal modes (spiral arms). In MAD state, a dominant
// m = 1 mode arises from the arrested flux tube.
// Density PDF is log-normal with σ_ln(ρ) ≈ 0.5–1.0.
float grmhd_mri_turbulence(float r, float angle, float t) {
    float base = accretion_turbulence(r, angle, t);
    float orbital_freq = 1.0 / pow(max(r, 1.5), 1.5);
    float spiral_phase = angle - disk_rotation_sign() * orbital_freq * t;

    // MAD spiral arm: dominant m = 1 mode from flux tube interaction
    float mad_spiral = 0.0;
    if (grmhd_mad_flux > 0.1) {
        float sp1 = sin(spiral_phase + 2.5 * log(max(r, 1.0)));
        float sp2 = sin(2.0 * spiral_phase + 4.0 * log(max(r, 1.0)) + 1.3);
        mad_spiral = grmhd_mad_flux * (0.3 * max(sp1, 0.0) + 0.15 * max(sp2, 0.0));
    }

    // Log-normal fluctuations calibrated to GRMHD σ_ln(ρ) ≈ 0.5–1.0
    // accretion_turbulence averages ~0.85, center log-normal there
    // so the mean output ≈ 1.0 (no systematic brightness bias)
    float sigma_ln = 0.4 + 0.6 * grmhd_turbulence_amp;
    float log_fluct = exp(sigma_ln * (base - 0.85) * 2.0);
    log_fluct = clamp(log_fluct, 0.2, 5.0);

    return log_fluct * (1.0 + mad_spiral);
}

// --- Non-thermal electron boost (κ-distribution) ---
// Magnetic reconnection in GRMHD produces non-thermal power-law
// tails on the electron energy distribution (Ball+ 2018, Werner+ 2018).
// κ → ∞ is thermal; κ ~ 3.5 has significant non-thermal synchrotron.
float grmhd_nonthermal_boost(float kappa) {
    float k = max(kappa, 2.5);
    return 1.0 + 2.0 / (k - 2.0);
}

// --- Fishbone-Moncrief equilibrium torus profile ---
// Standard initial condition for GRMHD simulations (FM76).
// The enthalpy distribution creates a peaked density at the
// pressure maximum radius r0.
float grmhd_fishbone_moncrief(float cyl_r, float z, float r0) {
    float r3d = sqrt(cyl_r * cyl_r + z * z);
    float sin_theta = cyl_r / max(r3d, 0.01);
    // Pseudo-Newtonian potential (Paczyński-Wiita approximation)
    float W = -1.0 / (2.0 * max(r3d - 1.0, 0.01))
            + 0.5 / (cyl_r * cyl_r + 0.01)
            * pow(cyl_r * sin_theta, 2.0);
    float W0 = -1.0 / (2.0 * max(r0 - 1.0, 0.01))
             + 0.5 / (r0 * r0 + 0.01) * r0 * r0;
    float dW = W - W0;
    // Only positive enthalpy region is inside the torus
    float rho = max(-dW * 3.0, 0.0);
    return pow(rho, 1.5) * grmhd_density_scale;
}

// --- Magnetic stress at ISCO (non-zero-torque boundary) ---
// GRMHD simulations show that magnetic stress at the ISCO is NOT zero
// (contradicting the Novikov-Thorne "no-torque" condition).
// This adds ~10-30% extra luminosity from the plunging region.
// (Noble et al. 2010, Penna et al. 2010)
float grmhd_isco_stress_factor(float r) {
    if (r >= ACCRETION_MIN_R) return 1.0;
    // Inside ISCO: decaying emission (not zero!)
    float f = r / max(ACCRETION_MIN_R, 1.0);
    // Magnetic stress persists into plunging region
    float stress = pow(f, 1.5) * (1.0 + 0.5 * grmhd_mad_flux);
    return stress;
}

// --- GRMHD 3D volumetric density turbulence ---
// Multi-scale FBM in co-rotating 3D coordinates, producing the filamentary,
// clumpy density structure characteristic of MRI-turbulent accretion flows.
// Calibrated to log-normal density PDFs from numerical GRMHD simulations:
//   σ_ln(ρ) ≈ 0.5–1.0 in the turbulent disk body (Hawley & Balbus 2002,
//   Beckwith et al. 2008, Hogg & Reynolds 2018).
// Spiral arm structure from dominant m=1,2 MRI modes; in MAD state,
// an additional m=1 spiral from the arrested magnetic flux tube
// (Tchekhovskoy, Narayan & McKinney 2011; Ripperda+ 2022).
float grmhd_3d_density_turbulence(vec3 p, float t) {
    float cyl_r = length(p.xy);
    float angle = equatorial_azimuth(p.xy);

    // Co-moving orbital advection (Keplerian shear)
    float orbit_phase = angle - disk_rotation_sign() * 0.45 * t / pow(max(cyl_r, 1.001), 1.5);
    vec2 orbit_unit = vec2(cos(orbit_phase), sin(orbit_phase));
    float z_sc = p.z * 1.5;

    // MRI spiral arms: dominant m=1,2 azimuthal modes
    // (Balbus & Hawley 1998, Beckwith et al. 2011)
    float sp1 = sin(orbit_phase + 3.0 * log(max(cyl_r, 1.0)));
    float sp2 = sin(2.0 * orbit_phase + 5.5 * log(max(cyl_r, 1.0)) + 1.7);
    float spirals = 0.45 * smoothstep(-0.3, 1.0, sp1)
                  + 0.35 * smoothstep(-0.3, 1.0, sp2);

    // MAD state: dominant m=1 spiral from arrested magnetic flux tube
    if (grmhd_mad_flux > 0.1) {
        float sp_mad = sin(orbit_phase + 2.5 * log(max(cyl_r, 1.0)));
        spirals += grmhd_mad_flux * 0.7 * smoothstep(-0.1, 1.0, sp_mad);
    }

    // Multi-scale FBM in co-rotating frame (2 octaves → 8 noise evals)
    // Large scale: ~ few r_g blobs and density waves
    float n1 = fbm(vec2(
        cyl_r * 2.0 + orbit_unit.x * 4.0,
        orbit_unit.y * 4.0 + z_sc * 1.5 + t * 0.05
    ));
    // Medium scale: filaments, streams, magnetic flux bundles
    float n2 = fbm(vec2(
        cyl_r * 8.0 + orbit_unit.x * 12.0 + n1 * 2.0,
        orbit_unit.y * 12.0 + z_sc * 5.0 - t * 0.15
    ));
    // Small scale (chaos): rapid turbulent shredding, especially intense near ISCO
    // and highly dynamic (fast t modulation).
    float isco_factor = exp(-0.8 * max(cyl_r - ACCRETION_MIN_R, 0.0));
    float n3 = fbm(vec2(
        cyl_r * 20.0 + orbit_unit.x * 35.0 - n2 * 4.0,
        orbit_unit.y * 35.0 + z_sc * 12.0 + t * 0.55
    ));

    // Log-normal density fluctuations: high dynamic range for the optically
    // thick slim disk where Beer-Lambert absorption renders surface features.
    // (Only the slim disk uses this function; torus uses grmhd_mri_turbulence.)
    float sigma_ln = 0.8 + 1.5 * grmhd_turbulence_amp;
    float combined = 0.35 * n1 + 0.35 * n2 + (0.15 + 0.4 * isco_factor) * n3;
    float log_density = exp(sigma_ln * (combined - 0.5) * 4.5);

    return log_density * (0.65 + 1.2 * spirals);
}

// --- GRMHD disk height modulation ---
// MRI turbulence and Parker instability cause the scale height to vary
// with azimuthal angle, creating warps, buoyant loops, and vertically
// extended features (Zhu & Stone 2018, Liska et al. 2022).
// Returns a multiplicative factor for the local disk scale height.
// Variation is ±15% at default turbulence (calibrated to Liska+ 2022
// Fig. 5: azimuthal H/R variation ~10-20% around the mean).
float grmhd_height_modulation(float cyl_r, float angle, float t) {
    float orbit_phase = angle - disk_rotation_sign() * 0.45 * t / pow(max(cyl_r, 1.001), 1.5);
    vec2 orbit_unit = vec2(cos(orbit_phase), sin(orbit_phase));

    float warp = fbm(vec2(
        cyl_r * 0.9 + orbit_unit.x * 2.0,
        orbit_unit.y * 2.0 + t * 0.05
    ));

    // Centered at 1.0: height varies by ±(15% * turbulence_amp)
    // warp ∈ [0,1], so (warp - 0.5) ∈ [-0.5, 0.5]
    float variation = 0.5 * (warp - 0.5) * grmhd_turbulence_amp;
    return 1.0 + variation;
}
#endif

float planet_irradiation_temperature() {
    #ifdef ACCRETION_THIN_DISK
    float r1 = ACCRETION_MIN_R * 1.8;
    float r2 = ACCRETION_MIN_R * 2.8;
    float r3 = ACCRETION_MIN_R * 4.2;

    float w1 = accretion_flux_profile(r1);
    float w2 = accretion_flux_profile(r2);
    float w3 = accretion_flux_profile(r3);
    float wsum = max(w1 + w2 + w3, 1e-4);

    float t1 = accretion_temperature(r1);
    float t2 = accretion_temperature(r2);
    float t3 = accretion_temperature(r3);
    // Use the static Schwarzschild factor here. The detailed, angle-dependent
    // disk orbital Doppler seen by the planet is not resolved in this helper.
    t1 *= gravitational_shift_static(r1);
    t2 *= gravitational_shift_static(r2);
    t3 *= gravitational_shift_static(r3);
    return (w1*t1 + w2*t2 + w3*t3) / wsum;
    #endif

    #ifdef ACCRETION_THICK_TORUS
    float r_t = max(torus_r0 * 1.25, ACCRETION_MIN_R + 0.5);
    return torus_temperature(r_t) * gravitational_shift_static(r_t);
    #endif

    #ifdef ACCRETION_SLIM_DISK
    float r_s = ACCRETION_MIN_R * 1.6;
    return slim_disk_temperature(r_s) * gravitational_shift_static(r_s);
    #endif

    return disk_temperature;
}

// --- physics/jet.glsl ---
// Role: Relativistic jet emission models. Two modes are provided:
//       - Simple: smooth parabolic jet with spine/limb synchrotron approximation.
//       - Physical: more detailed GRMHD-inspired model with magnetization
//         parameter, spine/sheath structure, reconfinement knots,
//         jet-corona connection, and disk occultation.

#ifdef JET_ENABLED
#ifdef JET_SIMPLE
// ═══════════════════════════════════════════════════════════════════
// SIMPLE JET: Parabolic collimation, smooth synchrotron emission
// ═══════════════════════════════════════════════════════════════════
float jet_emissivity(vec3 p, float sign_z) {
    float z = p.z * sign_z;
    if (z < 1.2) return 0.0;

    float cyl_r = length(p.xy);

    float theta_jet = jet_half_angle * DEG_TO_RAD;
    float k_collimate = 0.58;
    float r_at_length = jet_length * tan(theta_jet);
    float r0 = r_at_length / pow(jet_length, k_collimate);
    float jet_r = r0 * pow(z, k_collimate);

    if (cyl_r > jet_r * 1.2) return 0.0;

    float r_norm = cyl_r / max(jet_r, 0.001);
    float spine = exp(-4.0 * r_norm * r_norm);
    float limb = 0.35 * exp(-12.0 * (r_norm - 0.8) * (r_norm - 0.8));
    float transverse = spine + limb;

    float z_onset = smoothstep(1.2, 3.0, z);
    float z_decay = pow(z, -1.2);
    float z_cutoff = 1.0 - smoothstep(jet_length * 0.75, jet_length, z);

    return transverse * z_onset * z_decay * z_cutoff;
}

vec3 jet_velocity(vec3 p, float sign_z) {
    float beta_max = sqrt(1.0 - 1.0 / (jet_lorentz * jet_lorentz));
    float z = abs(p.z);
    float accel = smoothstep(1.2, 5.0, z);
    float beta = beta_max * accel;
    float cyl_r = length(p.xy);
    float phi_twist = 0.03 * beta;
    vec3 v_z = vec3(0.0, 0.0, sign_z) * beta;
    vec3 v_phi = vec3(-p.y, p.x, 0.0) / max(cyl_r, 0.01) * phi_twist;
    return v_z + v_phi;
}
#endif

#ifdef JET_PHYSICAL
// ═══════════════════════════════════════════════════════════════════
// PHYSICAL JET: GRMHD-inspired analytic model
// ═══════════════════════════════════════════════════════════════════
// Based on:
//  - Moscibrodzka et al. 2016: GRMHD+radiative transfer of M87
//  - Davelaar et al. 2019: RAPTOR ray-tracing of jet models
//  - Blandford & Znajek 1977: jet power extraction
//  - Asada & Nakamura 2012: parabolic collimation profile
//  - Tchekhovskoy et al. 2011: MAD jet simulations
//  - Fromm et al. 2022: jet+disk modeling for EHT
//
// Key features over simple mode:
//  1. Magnetic-pressure-dominated funnel with σ (magnetization) parameter
//  2. Separate spine/sheath structure with different velocities
//  3. Reconfinement shock knots (standing shocks from pressure balance)
//  4. Jet-corona connection: bright base from hot corona above disk
//  5. Counter-jet disk occultation
//  6. GRMHD-inspired emissivity: j ∝ ρ² B² (synchrotron-motivated)
//  7. Effective-temperature RGB proxy layered over synchrotron-motivated
//     emissivity (not a frequency-resolved synchrotron spectrum)

// --- Jet geometry: magnetic funnel wall ---
// In GRMHD simulations the jet boundary follows field lines that thread
// the ergosphere. The boundary shape is well-fit by a parabola:
//   Ψ(r,θ) = const → r sin²θ = const (split-monopole)
// transitioning to r^k collimation at large distances (k ≈ 0.58).

float jet_boundary_radius(float z) {
    float theta_jet = jet_half_angle * DEG_TO_RAD;
    float k_col = 0.58; // Asada & Nakamura parabolic index
    // Smooth transition from funnel base to collimated jet
    // jet_base_width controls how wide the base is (lower = more collimated early)
    // Default base k ~ 0.72, transitioning to k_col = 0.58 at large z
    float k_base = mix(0.62, 0.85, clamp(jet_base_width, 0.0, 1.0));
    float k_eff = mix(k_base, k_col, smoothstep(3.0, 8.0, z));
    float r_at_length = jet_length * tan(theta_jet);
    float r0_param = r_at_length / pow(jet_length, k_col);
    return r0_param * pow(max(z, 0.01), k_eff);
}

// --- Transverse structure: spine + sheath ---
// GRMHD jets show a fast, magnetically-dominated spine surrounded by
// a slower, denser sheath (wind from the disk surface). The sheath
// produces most of the observed radio emission at parsec scales.
float jet_transverse_profile(float cyl_r, float jet_r, float sigma) {
    float r_norm = cyl_r / max(jet_r, 0.001);

    // Spine: Gaussian core, width depends on magnetization
    // Higher σ → narrower spine (more magnetically confined)
    float spine_width = mix(3.0, 6.0, clamp(sigma / 30.0, 0.0, 1.0));
    float spine = exp(-spine_width * r_norm * r_norm);

    // Sheath: peaked at r_norm ≈ 0.7-0.9 (jet boundary layer)
    // This is the contact discontinuity between jet and ambient medium
    float sheath_peak = 0.82;
    float sheath_width = 15.0;
    float sheath = 0.6 * exp(-sheath_width * (r_norm - sheath_peak) * (r_norm - sheath_peak));

    // Sharp outer boundary (ambient medium is dark)
    float boundary = 1.0 - smoothstep(0.95, 1.05, r_norm);

    return (spine + sheath) * boundary;
}

// --- Reconfinement shocks (knots) ---
// When the jet pressure drops below ambient, the jet re-collimates,
// creating standing oblique shocks. Observed as bright knots in
// M87 (HST-1), 3C 273, etc. Spacing ~ few × jet_radius.
float reconfinement_knots(float z, float jet_r) {
    float spacing = max(jet_knot_spacing, 2.0);
    // Standing wave pattern: sin² gives periodic bright spots
    float phase = M_PI * z / spacing;
    float knot = sin(phase) * sin(phase);
    // Knots are stronger at intermediate distances (not at base or tip)
    float knot_envelope = smoothstep(4.0, 8.0, z) * (1.0 - smoothstep(jet_length * 0.6, jet_length * 0.85, z));
    // Amplitude: 20-40% brightness enhancement
    return 1.0 + 0.35 * knot * knot_envelope;
}

// --- Jet-corona connection ---
// At the jet base, the magnetically-dominated funnel meets the hot
// corona above the accretion disk. This creates a bright, broad
// emission region (the "jet launching zone" seen in EHT images).
float corona_base_emission(vec3 p, float z, float cyl_r) {
    float r3d = length(p);
    // Corona extends from ~1.5 to ~4 r_s, concentrated near axis
    float base_z = smoothstep(1.0, 1.8, z) * (1.0 - smoothstep(2.5, 5.0, z));
    // Tighter radial profile controlled by jet_corona_extent
    // Default: fairly tight, avoids the overly-wide blob
    float corona_width = mix(2.0, 0.8, clamp(jet_corona_extent, 0.0, 1.0));
    float base_r = exp(-corona_width * cyl_r * cyl_r);
    // Emissivity scales with magnetic energy density ~ r^(-3)
    // (reduced from r^(-4) to avoid extreme concentration at center)
    float mag_energy = 1.0 / (r3d * r3d * r3d + 0.1);
    return jet_corona_brightness * base_z * base_r * mag_energy * 3.0;
}

// --- Magnetization parameter σ(z) ---
// σ = B²/(4πρc²) = ratio of magnetic to kinetic energy density
// In GRMHD jets: σ >> 1 at base (Poynting flux dominated),
// decreasing to σ ~ 1 at dissipation radius, σ < 1 far out.
float magnetization(float z) {
    float sigma_base = jet_magnetization; // σ at jet base
    // σ drops approximately as z^(-1) due to flux freezing + expansion
    // with a floor from residual field
    return sigma_base / (1.0 + 0.15 * z) + 0.5;
}

// --- GRMHD-inspired emissivity ---
// Synchrotron emissivity: j_ν ∝ n_e B² sin²α × ν^(-α)
// In magnetically arrested disk (MAD) simulations, the jet funnel
// has j ∝ ρ² B² ∝ r^(-p) with p ≈ 2-3 depending on height.
float jet_emissivity(vec3 p, float sign_z) {
    float z = p.z * sign_z;
    if (z < 0.8) return 0.0; // below stagnation surface

    float cyl_r = length(p.xy);
    float r3d = length(p);

    // Jet boundary (parabolic with transition)
    float jet_r = jet_boundary_radius(z);
    if (cyl_r > jet_r * 1.15) {
        // Check if we're in the corona base region
        if (z < 5.0 && r3d < 5.0) {
            return corona_base_emission(p, z, cyl_r);
        }
        return 0.0;
    }

    // Local magnetization
    float sigma = magnetization(z);

    // Transverse spine/sheath structure
    float profile = jet_transverse_profile(cyl_r, jet_r, sigma);

    // Longitudinal emissivity:
    // - onset: plasma acceleration zone (z ~ 1.5 to 3)
    // - GRMHD power-law: j ∝ z^(-2.2) (steeper than simple mode)
    //   (Moscibrodzka+2016 find emission concentrated within ~10 r_g)
    float z_onset = smoothstep(0.8, 2.5, z);
    float z_decay = pow(max(z, 1.0), -2.2);

    // Length cutoff
    float z_cutoff = 1.0 - smoothstep(jet_length * 0.7, jet_length, z);

    // Reconfinement knots
    float knots = reconfinement_knots(z, jet_r);

    // Combined: synchrotron emissivity j ∝ n²B² × geometry
    float j = profile * z_onset * z_decay * z_cutoff * knots;

    // Add corona base contribution inside the funnel
    j += corona_base_emission(p, z, cyl_r);

    return j;
}

// --- Jet velocity: spine/sheath with GRMHD acceleration ---
// In GRMHD: jet accelerates as magnetic energy converts to kinetic.
// The spine moves at the bulk Γ; the sheath at a lower ~0.3-0.5c.
vec3 jet_velocity(vec3 p, float sign_z) {
    float z = abs(p.z);
    float cyl_r = length(p.xy);
    float jet_r = jet_boundary_radius(z);
    float r_norm = cyl_r / max(jet_r, 0.001);

    // Maximum velocity from Lorentz factor
    float beta_max = sqrt(1.0 - 1.0 / (jet_lorentz * jet_lorentz));

    // GRMHD acceleration profile:
    // Slow acceleration in Poynting-dominated zone (z < ~5),
    // rapid conversion at σ ≈ 1 (z ~ 5-10),
    // then saturates at terminal Γ.
    float sigma = magnetization(z);
    // β ≈ β_max × (1 - 1/σ) approximately, smooth version:
    float accel = 1.0 - 1.0 / (1.0 + 0.5 * z * z / (4.0 + z));
    float beta_spine = beta_max * accel;

    // Sheath velocity: slower than spine (disk wind, ~0.3-0.5c)
    float beta_sheath = 0.4 * accel;

    // Interpolate spine/sheath based on radial position
    float spine_frac = exp(-3.0 * r_norm * r_norm);
    float beta = mix(beta_sheath, beta_spine, spine_frac);

    // Helical component: stronger in the sheath (wound-up field)
    // Toroidal fraction increases with distance (field winding)
    float phi_fraction = mix(0.15, 0.03, spine_frac) * min(z / 5.0, 1.0);
    float v_z_comp = beta * sqrt(1.0 - phi_fraction * phi_fraction);
    float v_phi_comp = beta * phi_fraction;

    vec3 v_z = vec3(0.0, 0.0, sign_z) * v_z_comp;
    vec3 v_phi = vec3(-p.y, p.x, 0.0) / max(cyl_r, 0.01) * v_phi_comp;
    return v_z + v_phi;
}

// --- Synchrotron-inspired color proxy ---
// Real jet spectra are non-thermal. For interactive RGB rendering we map the
// analytic emissivity model through an effective-temperature colour proxy so
// the jet can be shaded with the same blackbody lookup texture used elsewhere.
float jet_effective_temperature(float z, float r3d, float sigma) {
    // Base is hotter (corona: ~10^9 K effective → maps to UV/X-ray)
    // Far jet is cooler (synchrotron aging: electrons lose energy)
    float T_base = 35000.0; // hot corona
    float T_far = 12000.0;  // aged synchrotron
    float T_mix = mix(T_base, T_far, smoothstep(2.0, 15.0, z));
    // Magnetization boost: σ > 1 regions are hotter (reconnection heating)
    T_mix *= 1.0 + 0.3 * clamp(sigma - 1.0, 0.0, 5.0) / 5.0;
    return T_mix;
}

#ifdef GRMHD_ENABLED
// ═══════════════════════════════════════════════════════════════════
// GRMHD JET ENHANCEMENTS
// ═══════════════════════════════════════════════════════════════════
// Additional physics for the GRMHD-inspired jet mode:
//  - Blandford-Znajek power scaling: P_BZ ∝ Φ² Ω_H² f(Ω_H)
//  - MAD magnetic flux saturation: Φ_BH ~ 50 √(Ṁ r_g² c)
//  - Current-driven kink instability (CDI) modulation
//  - Synchrotron cooling spectral break
//  - Enhanced spine/sheath contrast from force-free σ(r,θ) profile

// --- Blandford-Znajek jet power factor ---
// P_BZ = (κ/4πc) Φ_BH² Ω_H² f(Ω_H) where Ω_H = a/(2r_+)
// In MAD state, Φ_BH saturates → P_BZ ∝ a² Ṁ (Tchekhovskoy+2011)
float grmhd_bz_power_factor() {
    float a = clamp(bh_spin * bh_rotation_enabled, -0.99, 0.99);
    float r_plus = 0.5 + 0.5 * sqrt(max(1.0 - a * a, 0.0));
    float omega_H = a / (2.0 * r_plus);
    // P_BZ ∝ Φ² Ω_H² ≈ a² for MAD; for SANE, Φ scales weaker
    float phi_factor = mix(0.3, 1.0, grmhd_mad_flux); // MAD has higher Φ
    return phi_factor * omega_H * omega_H * 40.0 + 0.1;
}

// --- Current-driven kink instability (CDI) ---
// The helical magnetic field in the jet is subject to CDI for
// wavelengths > jet radius. Creates m = 1 helical distortions.
// (Bromberg & Tchekhovskoy 2016)
float grmhd_kink_instability(float z, float cyl_r, float jet_r) {
    float growth_length = max(jet_r * 4.0, 5.0);
    float kink_amp = smoothstep(growth_length, growth_length * 2.0, z);
    // Helical m = 1 distortion
    float phase = z * 0.8 / max(jet_r, 0.5);
    float kink = 1.0 + 0.25 * kink_amp * sin(phase) * grmhd_mad_flux;
    return kink;
}

// --- Synchrotron cooling break ---
// Electrons lose energy as t_cool ∝ 1/(B² γ_e) → spectral steepening
// at high frequencies. Creates a characteristic "cooling break" in the
// spectrum. Visual effect: jet becomes progressively redder with distance.
float grmhd_cooling_break_temp_modifier(float z, float sigma) {
    // Cooling is faster in high-B (low-σ) regions near the base
    float cool_rate = 1.0 + 0.5 / max(sigma, 0.1);
    // Temperature decreases with distance due to radiative losses
    float cooling = exp(-0.05 * cool_rate * max(z - 3.0, 0.0));
    return max(cooling, 0.3);
}

// --- Enhanced GRMHD jet emissivity ---
// Replaces the standard jet_emissivity when GRMHD mode is active.
// Adds BZ power scaling, kink instability, and density fluctuations.
float grmhd_jet_emissivity(vec3 p, float sign_z) {
    float z = p.z * sign_z;
    if (z < 0.8) return 0.0;

    float cyl_r = length(p.xy);
    float r3d = length(p);
    float jet_r = jet_boundary_radius(z);

    // BZ power factor modulates overall jet luminosity
    float bz = grmhd_bz_power_factor();

    if (cyl_r > jet_r * 1.15) {
        if (z < 5.0 && r3d < 5.0) {
            return corona_base_emission(p, z, cyl_r) * bz;
        }
        return 0.0;
    }

    float sigma = magnetization(z);
    float profile = jet_transverse_profile(cyl_r, jet_r, sigma);
    float z_onset = smoothstep(0.8, 2.5, z);
    float z_decay = pow(max(z, 1.0), -2.2);
    float z_cutoff = 1.0 - smoothstep(jet_length * 0.7, jet_length, z);
    float knots = reconfinement_knots(z, jet_r);

    // GRMHD enhancements
    float kink = grmhd_kink_instability(z, cyl_r, jet_r);
    float nonthermal = grmhd_nonthermal_boost(grmhd_electron_kappa);

    // GRMHD turbulent density structure in the jet
    float angle_j = equatorial_azimuth(p.xy);
    float jet_turb = grmhd_mri_turbulence(r3d, angle_j, loopable_turbulence_time(time));

    float j = profile * z_onset * z_decay * z_cutoff * knots
            * kink * nonthermal * jet_turb * bz;

    j += corona_base_emission(p, z, cyl_r) * bz;
    return j;
}

// --- GRMHD jet effective temperature ---
// Incorporates synchrotron cooling break and non-thermal broadening.
float grmhd_jet_temperature(float z, float r3d, float sigma) {
    float T_base = jet_effective_temperature(z, r3d, sigma);
    float cooling = grmhd_cooling_break_temp_modifier(z, sigma);
    return T_base * cooling;
}
#endif
#endif
#endif

// --- output/tonemapping.glsl ---
// Role: Tone-mapping operators and final color output. Provides ACES Filmic,
//       AGX (with punchy look), Logarithmic Scientific (false-color via Inferno),
//       plus screen-space dithering and the finalize_color() compositor.

// --- ACES Filmic tonemapper ---
vec3 aces_filmic(vec3 x) {
    return clamp((x*(2.51*x + 0.03)) / (x*(2.43*x + 0.59) + 0.14), 0.0, 1.0);
}

// --- AGX tonemapper (Troy Sobotka) ---
// Better handling of high-saturation, high-luminance colors;
// avoids the hue shifts and excessive desaturation of ACES in
// extreme HDR scenes like accretion disks.
vec3 agx_default_contrast_approx(vec3 x) {
    vec3 x2 = x * x;
    vec3 x4 = x2 * x2;
    return + 15.5     * x4 * x2
           - 40.14    * x4 * x
           + 31.96    * x4
           - 6.868    * x2 * x
           + 0.4298   * x2
           + 0.1191   * x
           - 0.00232;
}

vec3 agx_tonemap(vec3 val) {
    // AGX input transform (column-major)
    const mat3 agx_mat = mat3(
        0.842479062253094,  0.0784335999999992, 0.0792237451477643,
        0.0423282422610123, 0.878468636469772,  0.0791661274605434,
        0.0423756549057051, 0.0784336,          0.879142973793104
    );

    // Standard AGX EV range (16.5 stops).
    const float min_ev = -12.47393;
    const float max_ev = 4.026069;

    val = agx_mat * max(val, vec3(1e-10));
    val = clamp(log2(val), min_ev, max_ev);
    val = (val - min_ev) / (max_ev - min_ev);
    val = agx_default_contrast_approx(val);
    return val;
}

vec3 agx_eotf(vec3 val) {
    // AGX inverse output transform (column-major)
    const mat3 agx_mat_inv = mat3(
        1.19687900512017,   -0.0980208811401368, -0.0990297440797205,
        -0.0528968517574562, 1.15190312990417,   -0.0989611768448433,
        -0.0529716355144438,-0.0980434501171241,  1.15107367264116
    );
    val = agx_mat_inv * val;
    return pow(max(val, vec3(0.0)), vec3(2.2));
}

vec3 agx_look_punchy(vec3 val) {
    // Photographic contrast around middle-gray pivot (0.18).
    // Raises highlights and deepens shadows while keeping mid-gray
    // anchored — this amplifies the bright/dim beaming ratio without
    // blowing out the highlights or inverting anything.
    const float contrast = 1.25;
    const float pivot    = 0.18;
    val = pow(max(val / pivot, 1e-6), vec3(contrast)) * pivot;
    val = clamp(val, 0.0, 1.0);

    // Saturation boost to make Doppler hue shifts more visible
    float luma = dot(val, vec3(0.2126, 0.7152, 0.0722));
    val = clamp(mix(vec3(luma), val, 1.35), 0.0, 1.0);
    return val;
}

// --- Inferno colormap (matplotlib) polynomial approximation ---
// Used for scientific false-color rendering
vec3 inferno(float t) {
    t = clamp(t, 0.0, 1.0);
    const vec3 c0 = vec3(0.0002189403691192265, 0.001651004631001012, -0.01948089843709184);
    const vec3 c1 = vec3(0.1065134194856116, 0.5639564367884091, 3.932712388889277);
    const vec3 c2 = vec3(11.60249308247187, -3.972853965665698, -15.9423941062914);
    const vec3 c3 = vec3(-41.70399613139459, 17.43639888205313, 44.35414519872813);
    const vec3 c4 = vec3(77.16275788913913, -33.40235894210092, -81.80730925738993);
    const vec3 c5 = vec3(-71.31942824499214, 32.62606426397723, 73.20951985803202);
    const vec3 c6 = vec3(25.13112622477341, -12.24266895238567, -23.07032500287172);
    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

// --- Logarithmic scientific tonemapper ---
// Mimics how scientific papers (EHT, Luminet, GRMHD simulations)
// display accretion disk data: log-scale intensity mapped through
// the inferno false-color palette.
//
// High sensitivity: typical post-exposure disk luminances (~0.01–0.5)
// are spread across the full purple → red → orange → yellow → white
// range.  The exposure slider shifts the saturation point.
vec3 tonemap_log_scientific(vec3 color, float exposure) {
    float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
    // Very high log_k so even faint disk emission is visible.
    // With exposure=1:  log_k=80, denom anchor = 0.15 * 80 = 12.
    //   lum ≈ 0.005 → t ≈ 0.13  (near-black)
    //   lum ≈ 0.02  → t ≈ 0.35  (dark red)
    //   lum ≈ 0.05  → t ≈ 0.55  (orange)
    //   lum ≈ 0.10  → t ≈ 0.73  (yellow)
    //   lum ≈ 0.15  → t ≈ 0.85  (bright yellow)
    //   lum ≈ 0.25+ → t → 1.0   (white)
    float log_k = max(exposure * 80.0, 0.01);
    float mapped = log2(1.0 + lum * log_k) / log2(1.0 + log_k * 0.15);
    mapped = clamp(mapped, 0.0, 1.0);
    return inferno(mapped);
}

float screen_dither() {
    return (hash12(gl_FragCoord.xy) - 0.5) / 255.0;
}

vec4 finalize_color(vec4 color) {
    #ifdef CINEMATIC_TONEMAP
    vec3 exposed = max(color.rgb * (GLOBAL_EXPOSURE * look_exposure), vec3(0.0));
    vec3 mapped;

    if (look_tonemap_mode < 0.5) {
        // Mode 0 — ACES Filmic
        mapped = aces_filmic(exposed);
        float lum = dot(mapped, vec3(0.2126, 0.7152, 0.0722));
        mapped += mapped * smoothstep(0.82, 1.0, lum) * 0.06;
        mapped = pow(mapped, vec3(1.0/2.2));
    } else if (look_tonemap_mode < 1.5) {
        // Mode 1 — AGX
        // 1.15× nudge: AGX maps middle-gray slightly darker than ACES
        mapped = agx_tonemap(exposed * 1.15);
        mapped = agx_look_punchy(mapped);
        mapped = agx_eotf(mapped);
        mapped = pow(mapped, vec3(1.0/2.2));
    } else {
        // Mode 2 — Logarithmic Scientific (false-color)
        mapped = tonemap_log_scientific(exposed, look_exposure);
    }

    mapped += vec3(screen_dither());
    mapped = clamp(mapped, 0.0, 1.0);
    return vec4(mapped, 1.0);
    #endif
    #ifndef CINEMATIC_TONEMAP
    vec3 mapped = color.rgb + vec3(screen_dither());
    return vec4(clamp(mapped, 0.0, 1.0), color.a);
    #endif
}

// --- physics/planet.glsl ---
// Role: Ray-sphere intersection and shading for the orbiting reference planet.
//       Handles Lorentz contraction, light-travel-time retardation, Doppler
//       temperature shift, and relativistic beaming of the disk illumination.

vec4 planet_intersection(vec3 old_pos, vec3 ray, float t, float dt,
        vec3 planet_pos0, float ray_doppler_factor) {

    vec4 ret = vec4(0,0,0,0);
    ray = ray/dt;

    vec3 planet_dir = vec3(planet_pos0.y, -planet_pos0.x, 0.0) / PLANET_DISTANCE;

    #ifdef LIGHT_TRAVEL_TIME
    float planet_ang1 = (t-dt) * PLANET_ORBITAL_ANG_VEL;
    vec3 planet_pos1 = vec3(cos(planet_ang1), sin(planet_ang1), 0)*PLANET_DISTANCE;
    vec3 planet_vel = (planet_pos1-planet_pos0)/dt;

    // transform to moving planet coordinate system
    ray = ray - planet_vel;
    #endif
    #ifndef LIGHT_TRAVEL_TIME
    vec3 planet_vel = planet_dir * PLANET_ORBITAL_ANG_VEL * PLANET_DISTANCE;
    #endif

    // ray-sphere intersection
    vec3 d = old_pos - planet_pos0;

    #ifdef LORENTZ_CONTRACTION
    ray = contract(ray, planet_dir, PLANET_GAMMA);
    d = contract(d, planet_dir, PLANET_GAMMA);
    #endif

    float dotp = dot(d,ray);
    float c_coeff = dot(d,d) - SQ(PLANET_RADIUS);
    float ray2 = dot(ray, ray);
    float discr = dotp*dotp - ray2*c_coeff;

    if (discr < 0.0) return ret;
    float isec_t = (-dotp - sqrt(discr)) / ray2;

    float MIN_ISEC_DT = 0.0;
    #ifdef LORENTZ_CONTRACTION
    MIN_ISEC_DT = -dt;
    #endif

    if (isec_t < MIN_ISEC_DT || isec_t > dt) return ret;

    vec3 surface_point = (d + isec_t*ray) / PLANET_RADIUS;
    isec_t = isec_t/dt;

    vec3 light_dir = planet_pos0;
    float rot_phase = t;

    #ifdef LIGHT_TRAVEL_TIME
    light_dir += planet_vel*isec_t*dt;
    rot_phase -= isec_t*dt;
    #endif

    rot_phase = rot_phase * PLANET_ROTATION_ANG_VEL*0.5/M_PI;
    light_dir = light_dir / PLANET_DISTANCE;

    #ifdef LIGHT_TRAVEL_TIME
    light_dir = light_dir - planet_vel;
    #endif

    vec3 surface_normal = surface_point;
    #ifdef LORENTZ_CONTRACTION
    light_dir = contract(light_dir, planet_dir, PLANET_GAMMA);
    #endif
    light_dir = normalize(light_dir);

    vec2 tex_coord = sphere_map(surface_point * PLANET_COORDS);
    tex_coord.x = mod(tex_coord.x + rot_phase, 1.0);

    float diffuse = max(0.0, dot(surface_normal, -light_dir));
    float distance_attenuation = SQ(
        PLANET_LIGHT_REF_DISTANCE / max(PLANET_DISTANCE, PLANET_RADIUS + 1.0)
    );
    distance_attenuation = clamp(distance_attenuation, 0.05, 4.0);

    float lightness = ((1.0-PLANET_AMBIENT)*diffuse + PLANET_AMBIENT) *
        PLANET_LIGHTNESS * distance_attenuation;

    float light_temperature = planet_irradiation_temperature();
    float transfer_factor = max(ray_doppler_factor, 0.05);
    #ifdef DOPPLER_SHIFT
    float doppler_factor = SQ(PLANET_GAMMA) *
        (1.0 + dot(planet_vel, light_dir)) *
        (1.0 - dot(planet_vel, normalize(ray)));
    transfer_factor = max(doppler_factor * ray_doppler_factor, 0.05);
    light_temperature /= transfer_factor;
    #endif
    #ifdef BEAMING
    #ifdef PHYSICAL_BEAMING
    lightness /= pow(clamp(transfer_factor, 0.05, 20.0), 3.0);
    #endif
    #ifndef PHYSICAL_BEAMING
    float clamped_planet_doppler = clamp(transfer_factor, 0.62, 1.48);
    lightness /= pow(clamped_planet_doppler, 1.05 + 1.10*clamp(look_doppler_boost, 0.0, 2.5));
    #endif
    #endif

    vec3 blackbody_rgb = BLACK_BODY_COLOR(light_temperature).rgb;
    float bb_max = max(max(blackbody_rgb.r, blackbody_rgb.g), blackbody_rgb.b);
    vec3 physical_tint = vec3(1.0, 1.0, 1.0);
    if (bb_max > 1e-5) {
        physical_tint = blackbody_rgb / bb_max;
    }

    // Use physical blackbody tint for planet illumination
    vec3 light_tint = physical_tint;

    ret = texture2D(planet_texture, tex_coord) * lightness;
    ret.rgb *= light_tint;
    if (isec_t < 0.0) isec_t = 0.5;
    ret.w = isec_t;

    return ret;
}

// --- physics/background.glsl ---
// Role: Background sky rendering — Milky Way galaxy texture with relativistic
//       Doppler / blueshift color remap (temperature lookup + blackbody remap)
//       and H-alpha emission handling.

vec4 galaxy_color(vec2 tex_coord, float doppler_factor) {

    vec4 base_color = texture2D(galaxy_texture, tex_coord);
    vec4 color = base_color;
    if (abs(doppler_factor - 1.0) < 1e-4) return color;

    vec4 ret = vec4(0.0,0.0,0.0,0.0);
    float red = max(0.0, color.r - color.g);

    const float H_ALPHA_RATIO = 0.1;
    const float TEMPERATURE_BIAS = 0.95;

    color.r -= red*H_ALPHA_RATIO;

    float i1 = max(color.r, max(color.g, color.b));
    float ratio = (color.g+color.b) / color.r;

    if (i1 > 0.0 && color.r > 0.0) {

        float temperature = TEMPERATURE_LOOKUP(ratio) * TEMPERATURE_BIAS;
        color = BLACK_BODY_COLOR(temperature);

        float i0 = max(color.r, max(color.g, color.b));
        if (i0 > 0.0) {
            temperature /= max(doppler_factor, 0.75);
            float remap_gain = clamp(i1 / max(i0, 0.18), 0.0, GALAXY_MAX_BOOST);
            ret = BLACK_BODY_COLOR(temperature) * remap_gain;
        }
    }

    ret += SINGLE_WAVELENGTH_COLOR(656.28 * doppler_factor) * red / 0.214 * H_ALPHA_RATIO;

    ret = mix(base_color, ret, GALAXY_DOPPLER_STRENGTH);
    ret.rgb = min(ret.rgb, base_color.rgb * GALAXY_MAX_BOOST + vec3(0.03));
    return ret;
}

// --- output/trace_ray.glsl ---
// Role: Core ray-marching function. Integrates a photon path through the curved
//       spacetime, compositing accretion disk, jet, planet, and background
//       contributions along the geodesic with Beer-Lambert transmittance.
//       Takes an initial ray direction and returns the accumulated HDR colour.

vec4 trace_ray(vec3 ray) {
    vec3 pos = cam_pos;

    #ifdef ABERRATION
    vec3 aberration_vel = cam_vel * max(look_aberration_strength, 0.0);
    float aberration_speed = length(aberration_vel);
    if (aberration_speed > 0.999) {
        aberration_vel *= 0.999 / aberration_speed;
    }
    ray = lorentz_velocity_transformation(ray, aberration_vel);
    #endif

    float ray_intensity = 1.0;
    float ray_doppler_factor = 1.0;
    float doppler_boost = clamp(look_doppler_boost, 0.0, 2.5);

    float gamma = 1.0/sqrt(max(1.0-dot(cam_vel,cam_vel), 0.0001));
    ray_doppler_factor = gamma*(1.0 + dot(ray,-cam_vel));
    #ifdef BEAMING
    #ifdef PHYSICAL_BEAMING
    // Observer beaming is already accounted for via transfer_factor
    // in each emission source. The temperature shift of blackbody sources
    // captures the full Doppler effect. No additional ray_intensity scaling.
    #endif
    #ifndef PHYSICAL_BEAMING
    float beaming_factor = clamp(ray_doppler_factor, 0.84, 1.16);
    ray_intensity /= pow(beaming_factor, 0.65 + 0.75*doppler_boost);
    #endif
    #endif
    #ifndef DOPPLER_SHIFT
    ray_doppler_factor = 1.0;
    #endif

    float step = 0.01;
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    float vol_transmittance = 1.0; // volumetric ray transmittance (Beer-Lambert)

    // initial conditions
    float u = 1.0 / length(pos), old_u;
    float u0 = u;
    float observer_speed = length(cam_vel);
    float observer_static_lapse = 1.0;
    if (interior_mode < 0.5 && observer_speed < 1e-4) {
        // Static camera rays live in the local orthonormal frame. In
        // Schwarzschild coordinates the radial basis is compressed by
        // sqrt(1 - r_s/r), so the radial component must carry that factor when
        // converted to the Binet initial condition. Without it the near-horizon
        // hover escape cone stays far too wide.
        observer_static_lapse = sqrt(max(1.0 - u, 1e-4));
    }

    vec3 normal_vec = normalize(pos);
    // Tangential component of ray (perpendicular to radial direction).
    // For near-radial rays the cross product is tiny → degenerate tangent_vec.
    // Guard with a fallback perpendicular direction.
    vec3 ray_perp = cross(cross(normal_vec, ray), normal_vec);
    float ray_perp_len = length(ray_perp);
    vec3 tangent_vec;
    if (ray_perp_len > 1e-6) {
        tangent_vec = ray_perp / ray_perp_len;
    } else {
        // Purely radial ray — pick an arbitrary perpendicular direction
        tangent_vec = abs(normal_vec.y) < 0.9
            ? normalize(cross(normal_vec, vec3(0.0, 1.0, 0.0)))
            : normalize(cross(normal_vec, vec3(1.0, 0.0, 0.0)));
        ray_perp_len = 1e-6;
    }
    vec3 spin_axis = vec3(0.0, 0.0, 1.0);
    float spin_alignment = clamp(dot(safe_normalize(cross(pos, ray)), spin_axis), -1.0, 1.0);
    float frame_drag_phase = 0.0;

    // du/dφ: rate of inverse-radius change per orbit angle.
    // For near-radial rays (small tangential component), du is large but finite.
    float radial_component = dot(ray, normal_vec) * observer_static_lapse;
    float dot_tang = dot(ray, tangent_vec);
    float du = (abs(dot_tang) > 1e-6)
        ? -radial_component / dot_tang * u
        : -sign(dot(ray, normal_vec)) * u * 200.0; // nearly radial — large du
    // Clamp: ±200 keeps near-radial rays integrable while covering all
    // physically relevant escape trajectories from inside the horizon.
    // (Critical du for escape ≈ sqrt(2|u²-u³|) which is ~124 at u=20.)
    du = clamp(du, -200.0, 200.0);
    float du0 = du;

    float phi = 0.0;

    float t = time;
    float turb_t = loopable_turbulence_time(time + turbulence_time_offset);
    float dt = 1.0;
    bool shadow_capture = false;

    #ifndef LIGHT_TRAVEL_TIME
    float planet_ang0 = t * PLANET_ORBITAL_ANG_VEL;
    vec3 planet_pos0 = vec3(cos(planet_ang0), sin(planet_ang0), 0)*PLANET_DISTANCE;
    #endif

    vec3 old_pos = pos;

    // ── Kerr state variables ──
    // Experimental true Kerr geodesics exist in the codebase but are not
    // exposed publicly. User-facing spin modes still trace photons with the
    // Schwarzschild Binet solver plus perturbative frame dragging.
    float kerr_a_phys = kerr_spin_a();
    #ifdef KERR_FULL_GEODESIC
    bool use_kerr = (abs(kerr_a_phys) > 0.001 && interior_mode < 0.5);
    #endif
    #ifndef KERR_FULL_GEODESIC
    bool use_kerr = false;
    #endif
    float kerr_r = 0.0, kerr_cth = 0.0, kerr_phi = 0.0;
    float kerr_pr = 0.0, kerr_pcth = 0.0;
    float kerr_xi = 0.0, kerr_eta = 0.0;
    float kerr_r_horizon = 1.0;

    if (use_kerr) {
        kerr_init(pos, ray, kerr_a_phys,
            kerr_xi, kerr_eta,
            kerr_r, kerr_cth, kerr_phi,
            kerr_pr, kerr_pcth);
        kerr_r_horizon = kerr_horizon_radius(kerr_a_phys);
    }

    // ── Interior mode: analytical escape classification ─────────────────
    // The Binet conserved energy E = (du/dφ)² + u² − u³ determines escape.
    // Potential barrier maximum at u = 2/3 (photon sphere): E_crit = 4/27.
    //   • du ≥ 0  (inward ray)           → always captured (singularity)
    //   • du < 0  and  E ≤ 4/27          → reflected by barrier → captured
    //   • du < 0  and  E > 4/27          → escapes through horizon
    // Pre-classifying captured rays avoids wasting integration steps on
    // rays that can never escape, completely eliminating the numerical
    // artefacts that produced the blue-blob rendering.
    if (interior_mode > 0.5) {
        if (du >= 0.0) {
            shadow_capture = true;  // inward → singularity
        } else {
            float E_binet = du*du + u*u*(1.0 - u);
            if (E_binet <= 4.0/27.0) {
                shadow_capture = true;  // not enough energy to escape
            }
        }
    } else if (observer_speed < 1e-4 && u > 2.0/3.0) {
        // Exact Schwarzschild escape test for a static observer inside the
        // photon sphere. This removes the numerical leakage that made the
        // visible sky stop shrinking during hover.
        if (du >= 0.0) {
            shadow_capture = true;
        } else {
            float E_binet = du*du + u*u*(1.0 - u);
            if (E_binet <= 4.0/27.0) {
                shadow_capture = true;
            }
        }
    }

    float E_binet0 = du0*du0 + u0*u0*(1.0 - u0);
    bool allow_extended_trace = !use_kerr &&
        interior_mode < 0.5 &&
        observer_speed < 1e-4 &&
        u0 > 2.0/3.0 &&
        du0 < 0.0 &&
        E_binet0 > 4.0/27.0;
    bool trace_finished = false;

    for (int pass = 0; pass < 3; pass++) {
        if (trace_finished) break;
        if (pass > 0 && !allow_extended_trace) break;

        for (int j=0; j < NSTEPS; j++) {
        if (shadow_capture) break;  // pre-classified capture → skip loop

        if (use_kerr) {
        // ── True Kerr geodesic integration ─────────────────────────────
        step = MAX_REVOLUTIONS * 2.0*M_PI / float(NSTEPS);

        // Convert angular budget to Mino-time step: dσ ≈ dφ / |dφ/dσ|.
        // At large r the azimuthal rate dφ/dσ scales with r, so without
        // this each Mino step would cover huge angles.  Near the horizon
        // dφ/dσ → ∞ (BL coordinate singularity) but the actual radial
        // traversal in Mino time is finite, so cap the scaling to prevent
        // the step from collapsing to zero before the photon can capture.
        float dphi_dsigma = abs(kerr_phi_dot(kerr_r, kerr_cth, kerr_a_phys, kerr_xi));
        float mino_scale = clamp(dphi_dsigma, 1.0, 40.0);
        step /= mino_scale;

        // Adaptive refinement near photon sphere for shadow accuracy
        float ps_dist = kerr_r - 1.5;
        step *= 1.0 - 0.5 * exp(-12.0*ps_dist*ps_dist);

        // Limit radial change per step to 30% of current r
        float dr_per_step = abs(kerr_pr) * step;
        if (dr_per_step > kerr_r * 0.3 && abs(kerr_pr) > 0.001) {
            step = kerr_r * 0.3 / abs(kerr_pr);
        }
        step = max(step, 1e-6);

        old_u = u;
        old_pos = pos;

        integrate_kerr_step(kerr_r, kerr_cth, kerr_phi,
            kerr_pr, kerr_pcth,
            step, kerr_a_phys, kerr_xi, kerr_eta);

        // Capture: photon reached the event horizon
        if (kerr_r <= kerr_r_horizon + 0.02 || kerr_r < 0.01) {
            shadow_capture = true;
            break;
        }

        // Reconstruct 3D Cartesian position from Boyer-Lindquist (r, θ, φ)
        // MUST happen before escape check so `pos` is valid for background ray
        float sth_k = sqrt(max(1.0 - kerr_cth*kerr_cth, 0.0));
        float rho_perp = sqrt(kerr_r*kerr_r + kerr_a_phys*kerr_a_phys) * sth_k;
        pos = vec3(rho_perp * cos(kerr_phi),
                   rho_perp * sin(kerr_phi),
                   kerr_r * kerr_cth);
        u = 1.0 / max(kerr_r, 0.001);

        // Escape: photon past observer and heading outward
        if (kerr_r > length(cam_pos) * 1.1 && kerr_pr > 0.0) {
            break;
        }

        } else {
        // ── Public Schwarzschild Binet integration (all exposed modes;
        //    also reused inside the horizon) ────────────────────────────
        step = MAX_REVOLUTIONS * 2.0*M_PI / float(NSTEPS);

        // adaptive step size based on rate of change
        float max_rel_u_change = max(1.0-log(max(u, 0.0001)), 0.05)*10.0 / float(NSTEPS);
        if (interior_mode > 0.5) {
            max_rel_u_change *= 3.0 + 2.0 * max(u - 1.0, 0.0);
            if (abs(du) > abs(max_rel_u_change*u) / step) {
                step = max_rel_u_change*u/abs(du);
            }
        } else {
            if ((du > 0.0 || (du0 < 0.0 && u0/u < 5.0)) && abs(du) > abs(max_rel_u_change*u) / step) {
                step = max_rel_u_change*u/abs(du);
            }
        }

        float u_photon_sphere = 0.667;
        float photon_sphere_proximity = exp(-12.0 * (u - u_photon_sphere) * (u - u_photon_sphere));
        step *= 1.0 - 0.7 * photon_sphere_proximity;

        if (interior_mode > 0.5) {
            float horizon_proximity = exp(-8.0 * (u - 1.0) * (u - 1.0));
            step *= 1.0 - 0.6 * horizon_proximity;
            step = max(step, 0.5 * M_PI / float(NSTEPS));
        }

        old_u = u;

        #ifdef LIGHT_TRAVEL_TIME
        #ifdef GRAVITATIONAL_TIME_DILATION
        dt = sqrt(max(du*du + u*u*(1.0-u), 0.0001))/max(abs(u*u*(1.0-u)), 0.0001)*step;
        #endif
        #endif

        integrate_geodesic_step(u, du, step, spin_alignment);

        if (u < 0.0) {
            if (interior_mode > 0.5) shadow_capture = true;
            break;
        }
        if (interior_mode < 0.5) {
            if (u >= 1.0) {
                shadow_capture = true;
                break;
            }
        } else {
            if (u >= 20.0) {
                shadow_capture = true;
                break;
            }
        }

        phi += step;

        old_pos = pos;
        vec3 planar_pos = (cos(phi)*normal_vec + sin(phi)*tangent_vec)/u;

        float drag_u = clamp(u, 0.0, 1.15);
        float frame_drag_step = photon_spin_lensing_scale *
            bh_rotation_enabled * bh_spin * bh_spin_strength *
            spin_alignment * step * 0.85 * drag_u*drag_u*drag_u;
        frame_drag_phase += frame_drag_step;

        pos = rotate_about_z(planar_pos, frame_drag_phase);
        } // end if (use_kerr) / else

        ray = pos-old_pos;
        float solid_isec_t = 2.0;
        float ray_l = length(ray);

        #ifdef LIGHT_TRAVEL_TIME
        #ifdef GRAVITATIONAL_TIME_DILATION
        float mix = smooth_step(1.0/u, 8.0);
        dt = mix*ray_l + (1.0-mix)*dt;
        #endif
        #ifndef GRAVITATIONAL_TIME_DILATION
        dt = ray_l;
        #endif
        #endif

        #ifdef PLANETENABLED
        if (
            (
                old_pos.z * pos.z < 0.0 ||
                min(abs(old_pos.z), abs(pos.z)) < PLANET_RADIUS
            ) &&
            max(u, old_u) > 1.0/(PLANET_DISTANCE+PLANET_RADIUS) &&
            min(u, old_u) < 1.0/(PLANET_DISTANCE-PLANET_RADIUS)
        ) {

            #ifdef LIGHT_TRAVEL_TIME
            float planet_ang0 = t * PLANET_ORBITAL_ANG_VEL;
            vec3 planet_pos0 = vec3(cos(planet_ang0), sin(planet_ang0), 0)*PLANET_DISTANCE;
            #endif

            vec4 planet_isec = planet_intersection(old_pos, ray, t, dt,
                    planet_pos0, ray_doppler_factor);
            if (planet_isec.w > 0.0) {
                solid_isec_t = planet_isec.w;
                planet_isec.w = 1.0;
                color += planet_isec;
            }
        }
        #endif

        #ifdef ACCRETION_THIN_DISK
        // Disk crossing detection with sub-step refinement.
        // Near the photon sphere (r ≈ 1.5 r_s) photon paths wind tightly
        // and a single step can skip over the z=0 plane.  When the step
        // subtends a large angle and we are close to the photon sphere,
        // subdivide the segment and test each sub-segment for a crossing
        // to reliably capture secondary and tertiary Einstein rings.
        int disk_sub_steps = 1;
        if (abs(u - 0.667) < 0.15 && step > 0.12) {
            disk_sub_steps = 4;  // 4 sub-checks near photon sphere
        }
        {
            vec3 sub_old = old_pos;
            vec3 sub_step_vec = (pos - old_pos) / float(disk_sub_steps);
            for (int ds = 0; ds < 4; ds++) {
                if (ds >= disk_sub_steps) break;
                vec3 sub_new = old_pos + sub_step_vec * float(ds + 1);
                if (sub_old.z * sub_new.z < 0.0) {
            vec3 sub_ray = sub_new - sub_old;
            float sub_ray_z = sub_ray.z;
            if (abs(sub_ray_z) < 1e-6) {
                sub_old = sub_new;
                continue;
            }
            float acc_isec_t = -sub_old.z / sub_ray_z;
            if (acc_isec_t < solid_isec_t) {
                vec3 isec = sub_old + sub_ray*acc_isec_t;

                float r = length(isec);
                #ifdef GRMHD_ENABLED
                // GRMHD: magnetic stress allows emission inside ISCO
                // (Noble+ 2010, Penna+ 2010: plunging region contributes ~10-30%)
                float r_inner_grmhd = max(ACCRETION_MIN_R * 0.7, 1.05);
                if (r > r_inner_grmhd && r < ACCRETION_MIN_R + ACCRETION_WIDTH) {
                #endif
                #ifndef GRMHD_ENABLED
                if (r > ACCRETION_MIN_R && r < ACCRETION_MIN_R + ACCRETION_WIDTH) {
                #endif
                    float angle = equatorial_azimuth(isec.xy);

                    #ifdef GRMHD_ENABLED
                    // GRMHD thin disk: Shakura-Sunyaev base + subtle GRMHD corrections.
                    // Thin disks are radiatively efficient → very mild R_high temp correction
                    // (3%) to preserve the well-established Shakura-Sunyaev color profile.
                    // Synchrotron/non-thermal add subtle modulation, not brightness boosts.
                    float gas_temp_g = accretion_temperature(r);
                    float disk_h_g = r * 0.05;
                    float beta_g = grmhd_plasma_beta(r, 0.0, disk_h_g);
                    // Add t and angle parameters needed by the updated function signature
                    float Te_corr = 0.97 + grmhd_electron_temp_ratio(beta_g) * 0.03;  // 3% R_high correction (thin disk is efficient)
                    // Apply only the static Schwarzschild factor here; the
                    // separate transfer_factor below already carries the
                    // emitter gamma and line-of-sight Doppler contribution.
                    float temperature = grmhd_electron_temperature(gas_temp_g, r, 0.0, disk_h_g, turb_t, angle) * Te_corr * gravitational_shift_static(r);
                    
                    // GRMHD turbulence: MRI density fluctuations with log-normal
                    // PDF + spiral arms (Sorathia+ 2012, Hawley+ 2013)
                    float r_norm_g = (r - ACCRETION_MIN_R) / ACCRETION_WIDTH;
                    float edge_fade_g = smoothstep(0.02, 0.18, r_norm_g) *
                        (1.0 - smoothstep(0.78, 1.0, r_norm_g));
                    float turbulence = grmhd_mri_turbulence(r, angle, turb_t) * edge_fade_g;

                    // Synchrotron and non-thermal corrections
                    float rho_g = grmhd_density(r, 1.0);
                    float B_g = grmhd_B_field(rho_g, gas_temp_g, beta_g);
                    float nonthermal_g = grmhd_nonthermal_boost(grmhd_electron_kappa);
                    float sync_corr_g = grmhd_synchrotron_correction(B_g, rho_g);
                    // ISCO magnetic stress: emission extends inside ISCO
                    float isco_stress_g = grmhd_isco_stress_factor(r);

                    // Attenuated GRMHD corrections: parameters are responsive but
                    // preserve the base Shakura-Sunyaev brightness profile.
                    // At defaults (κ=5, B=1): ~8% deviation from non-GRMHD.
                    float nt_mod_g = 1.0 + 0.1 * (nonthermal_g - 1.0);
                    float sync_mod_g = 1.0 + 0.1 * (sync_corr_g - 1.0);

                    float inner_glow = exp(-8.0 * (r - ACCRETION_MIN_R));
                    float accretion_intensity = ACCRETION_BRIGHTNESS * accretion_flux_profile(r) *
                        turbulence * nt_mod_g * sync_mod_g * isco_stress_g
                        * (1.0 + 0.7*inner_glow);
                    #endif
                    #ifndef GRMHD_ENABLED
                    float temperature = accretion_temperature(r) * gravitational_shift_static(r);
                    float turbulence = accretion_emissivity(r, angle, turb_t);
                    float inner_glow = exp(-8.0 * (r - ACCRETION_MIN_R));
                    float accretion_intensity = ACCRETION_BRIGHTNESS * accretion_flux_profile(r) *
                        turbulence * (1.0 + 0.7*inner_glow);
                    #endif

                    // Limb darkening: Eddington approximation for an optically
                    // thick disk.  I(μ) = I(1)·(2/5 + 3/5·μ) where μ = cos(θ)
                    // is the angle between the photon and the disk normal (z-axis).
                    float cos_emission_angle = abs(ray.z) / max(ray_l, 1e-6);
                    accretion_intensity *= 0.4 + 0.6 * cos_emission_angle;

                    vec3 accretion_v;
                    #ifdef KERR_FAST_MODE
                    accretion_v = disk_rotation_sign() *
                        vec3(-isec.y, isec.x, 0.0) / (r * sqrt(2.0*(r-1.0)));
                    #endif
                    #ifdef KERR_INSPIRED_VELOCITY
                    float rg_r = max(2.0*r, 1.0002); // convert r_s units to M units
                    float a_M = abs(bh_rotation_enabled * bh_spin);
                    float omega_M = disk_rotation_sign() / (pow(rg_r, 1.5) + a_M);
                    float v_phi = clamp(rg_r * omega_M, -0.995, 0.995);
                    vec2 xy = vec2(isec.x, isec.y);
                    float cyl_r = max(length(xy), 1e-4);
                    vec3 e_phi = vec3(-xy.y/cyl_r, xy.x/cyl_r, 0.0);
                    accretion_v = e_phi * v_phi;
                    #endif

                    gamma = 1.0/sqrt(max(1.0-dot(accretion_v,accretion_v), 0.0001));
                    float doppler_factor = gamma*(1.0+dot(ray/ray_l,accretion_v));
                    float transfer_factor = max(ray_doppler_factor*doppler_factor, 0.05);
                    #ifdef BEAMING
                    #ifdef PHYSICAL_BEAMING
                    // Liouville invariant: I_obs = D³ · I_emit.
                    // The spectrum texture stores chromaticity (normalized color),
                    // so the temperature shift only handles hue — D³ intensity
                    // boost must always be applied explicitly.
                    accretion_intensity /= pow(clamp(transfer_factor, 0.05, 20.0), 3.0);
                    #endif
                    #ifndef PHYSICAL_BEAMING
                    // Cinematic beaming: softened for artistic rendering
                    float clamped_doppler = clamp(transfer_factor, 0.62, 1.48);
                    accretion_intensity /= pow(clamped_doppler, 1.05 + 1.10*doppler_boost);
                    #endif
                    #endif
                    #ifdef DOPPLER_SHIFT
                    temperature /= transfer_factor;
                    #endif

                    vec4 thermal_color = BLACK_BODY_COLOR(temperature);
                    accretion_intensity *= look_disk_gain;
                    accretion_intensity *= 1.0 + look_glow * (0.22 + 0.78*inner_glow);
                    color += vec4(thermal_color.rgb * accretion_intensity, 1.0);
                }
            }
                }
                sub_old = sub_new;
            }
        }
        #endif

        #ifdef ACCRETION_THICK_TORUS
        {
            // ADAF/RIAF volumetric emission: optically thin radiative transfer
            // dI/ds = j - alpha*I  (emission minus absorption)
            #ifdef GRMHD_ENABLED
            // GRMHD: evaluate torus with stronger height modulation (2×) for
            // visible azimuthal warps and buoyant features from MRI + Parker
            // instability.  The torus is geometrically thick, so larger warps
            // are physically expected (Liska+ 2022: H/R variation ~15-30%).
            float _cr_t = max(length(pos.xy), 1e-4);
            float _a_t = equatorial_azimuth(pos.xy);
            float _hmod_raw_t = grmhd_height_modulation(_cr_t, _a_t, turb_t);
            // Amplify: base function gives ±15%, double it for ±30% warps
            float _hmod_t = 1.0 + 2.0 * (_hmod_raw_t - 1.0);
            vec3 _warp_t = vec3(pos.xy, pos.z / max(_hmod_t, 0.2));
            float torus_j = torus_local_emissivity(_warp_t);
            #endif
            #ifndef GRMHD_ENABLED
            float torus_j = torus_local_emissivity(pos);
            #endif
            if (torus_j > 0.001 && vol_transmittance > 0.005) {
                float path_len = length(pos - old_pos);
                float r3d = max(length(pos), 1.001);
                float cyl_r_t = max(length(pos.xy), 1e-4);
                float angle_t = equatorial_azimuth(pos.xy);

                #ifdef GRMHD_ENABLED
                // GRMHD two-temperature torus model (EHT-calibrated)
                // Temperature: β-dependent variation for color shifts.
                float h_torus_g = max(cyl_r_t * torus_h_ratio, 0.01);
                float gas_temp_torus = torus_temperature(r3d);
                float temperature_t = grmhd_electron_temperature(gas_temp_torus, cyl_r_t, pos.z, h_torus_g, turb_t, angle_t)
                                    * gravitational_shift_static(r3d);

                // 3D volumetric turbulence with sqrt() to moderate extremes.
                // The raw 3D FBM has high dynamic range (~100×) which produces
                // dramatic filaments in the slim disk (where Beer-Lambert
                // absorption renders surface features).  For the optically thin
                // ADAF torus, sqrt compresses this to ~10×, keeping visible 3D
                // structure without the tornado/nebula artefact.
                float raw_turb_t = grmhd_3d_density_turbulence(pos, turb_t);
                float turbulence_t = sqrt(max(raw_turb_t, 0.01));

                // Magnetic field, synchrotron, and non-thermal corrections
                float beta_torus = grmhd_plasma_beta(cyl_r_t, pos.z, h_torus_g);
                float rho_torus = grmhd_density(cyl_r_t, 1.0);
                float B_torus = grmhd_B_field(rho_torus, gas_temp_torus, beta_torus);
                float nonthermal_t = grmhd_nonthermal_boost(grmhd_electron_kappa);
                float sync_corr_t = grmhd_synchrotron_correction(B_torus, rho_torus);

                // Attenuated GRMHD corrections: parameters responsive but
                // torus brightness stays close to the non-GRMHD appearance.
                float nt_mod_t = 1.0 + 0.15 * (nonthermal_t - 1.0);
                float sync_mod_t = 1.0 + 0.15 * (sync_corr_t - 1.0);

                // Emissivity: base torus × 3D turbulence × subtle corrections
                float j_eff = ACCRETION_BRIGHTNESS * 0.05 * torus_j * turbulence_t
                            * nt_mod_t * sync_mod_t;

                // Absorption: turbulence-modulated (denser clumps are more opaque)
                float alpha_abs = torus_opacity * torus_j * pow(turbulence_t, 0.5)
                                * (0.5 + 0.5 * grmhd_density_scale);
                #endif
                #ifndef GRMHD_ENABLED
                float temperature_t = torus_temperature(r3d) * gravitational_shift_static(r3d);
                float turbulence_t = accretion_turbulence(cyl_r_t, angle_t, turb_t);

                // Emission coefficient: optically thin ADAF has low emissivity
                float j_eff = ACCRETION_BRIGHTNESS * 0.05 * torus_j * turbulence_t;
                // Absorption: user-configurable opacity (default low for optically thin)
                float alpha_abs = torus_opacity * torus_j;
                #endif
                float tau_step = alpha_abs * path_len;
                float step_T = exp(-tau_step);

                // Sub-Keplerian gas velocity (ADAF: ~50% of Keplerian)
                vec3 accretion_v_t;
                #ifdef KERR_FAST_MODE
                float v_kep_t = 1.0 / sqrt(2.0 * max(cyl_r_t - 1.0, 0.01));
                float v_sub_t = clamp(0.5 * v_kep_t, 0.0, 0.95);
                accretion_v_t = disk_rotation_sign() *
                    vec3(-pos.y, pos.x, 0.0) / cyl_r_t * v_sub_t;
                #endif
                #ifdef KERR_INSPIRED_VELOCITY
                float rg_cyl_t = max(2.0 * cyl_r_t, 1.0002);
                float a_M_t = abs(bh_rotation_enabled * bh_spin);
                float omega_sub_t = 0.5 * disk_rotation_sign() / (pow(rg_cyl_t, 1.5) + a_M_t);
                float v_phi_t = clamp(rg_cyl_t * omega_sub_t, -0.95, 0.95);
                vec3 e_phi_t = vec3(-pos.y, pos.x, 0.0) / cyl_r_t;
                accretion_v_t = e_phi_t * v_phi_t;
                #endif

                gamma = 1.0/sqrt(max(1.0-dot(accretion_v_t,accretion_v_t), 0.0001));
                float doppler_factor_t = gamma*(1.0+dot(ray/ray_l,accretion_v_t));
                float transfer_factor_t = max(ray_doppler_factor*doppler_factor_t, 0.05);

                float torus_intensity = j_eff * path_len;
                #ifdef BEAMING
                #ifdef PHYSICAL_BEAMING
                // Liouville D³: chromaticity texture doesn't encode brightness,
                // so intensity boost must always be applied explicitly.
                torus_intensity /= pow(clamp(transfer_factor_t, 0.05, 20.0), 3.0);
                #endif
                #ifndef PHYSICAL_BEAMING
                float cd_t = clamp(transfer_factor_t, 0.62, 1.48);
                torus_intensity /= pow(cd_t, 1.05 + 1.10*doppler_boost);
                #endif
                #endif
                #ifdef DOPPLER_SHIFT
                temperature_t /= transfer_factor_t;
                #endif

                vec4 thermal_color_t = BLACK_BODY_COLOR(temperature_t);
                torus_intensity *= look_disk_gain;

                // Front-to-back compositing with Beer-Lambert absorption
                color.rgb += vol_transmittance * thermal_color_t.rgb * torus_intensity;
                vol_transmittance *= step_T;
            }
        }
        #endif

        #ifdef ACCRETION_SLIM_DISK
        {
            // Slim disk volumetric emission: optically thick radiative transfer
            // Super-Eddington flow: high absorption → surface-like rendering
            #ifdef GRMHD_ENABLED
            // GRMHD: height modulation from MRI + radiation-driven warps
            float _cr_s = max(length(pos.xy), 1e-4);
            float _a_s = equatorial_azimuth(pos.xy);
            float _hmod_s = grmhd_height_modulation(_cr_s, _a_s, turb_t);
            vec3 _warp_s = vec3(pos.xy, pos.z / max(_hmod_s, 0.2));
            float slim_j = slim_disk_local_emissivity(_warp_s);
            #endif
            #ifndef GRMHD_ENABLED
            float slim_j = slim_disk_local_emissivity(pos);
            #endif
            if (slim_j > 0.001 && vol_transmittance > 0.005) {
                float path_len_s = length(pos - old_pos);
                float cyl_r_s = max(length(pos.xy), 1e-4);
                float r3d_s = max(length(pos), 1.001);
                float angle_s = equatorial_azimuth(pos.xy);

                #ifdef GRMHD_ENABLED
                    // GRMHD-inspired slim disk: preserve the base super-Eddington
                    // morphology while adding responsive semi-analytic corrections.
                // GRMHD adds: mild two-temperature correction (30% R_high) + ISCO magnetic
                // stress + synchrotron/non-thermal corrections responsive to all parameters.
                float gas_temp_slim = slim_disk_temperature(cyl_r_s);
                float h_slim_g = slim_disk_height(cyl_r_s);
                float beta_slim = grmhd_plasma_beta(cyl_r_s, pos.z, h_slim_g);
                float Te_ratio_slim = grmhd_electron_temp_ratio(beta_slim);
                // Manual lerp: avoid 'mix' variable shadow from line 264
                float Te_corr_slim = 1.0 * 0.7 + Te_ratio_slim * 0.3;  // 30% correction (partially thermalized)
                float temperature_s = grmhd_electron_temperature(gas_temp_slim, cyl_r_s, pos.z, h_slim_g, turb_t, angle_s) * Te_corr_slim * gravitational_shift_static(r3d_s);

                // 3D volumetric FBM turbulence: filamentary density structure
                float turbulence_s = grmhd_3d_density_turbulence(pos, turb_t);
                
                // ISCO stress: adds ~10-30% extra luminosity from plunging region
                float isco_stress_s = grmhd_isco_stress_factor(cyl_r_s);

                // Synchrotron and non-thermal corrections (radiation-dominated
                // → gentler response than ADAF, normalized so defaults ≈ 1.0)
                float rho_slim_g = grmhd_density(cyl_r_s, 1.0);
                float B_slim_g = grmhd_B_field(rho_slim_g, gas_temp_slim, beta_slim);
                float nonthermal_slm = grmhd_nonthermal_boost(grmhd_electron_kappa);
                float sync_slm = grmhd_synchrotron_correction(B_slim_g, rho_slim_g);
                // sqrt + /2.5 normalization keeps defaults ~1.0, avoids breaking
                // the existing slim disk appearance while making all params responsive
                float grmhd_param_slim = sqrt(nonthermal_slm * sync_slm / 2.5);

                float j_eff_s = ACCRETION_BRIGHTNESS * 0.9 * slim_j * turbulence_s * isco_stress_s * grmhd_param_slim;
                // Absorption: density-modulated (clumps are more opaque)
                float alpha_abs_s = slim_opacity * slim_j * pow(turbulence_s, 0.5);
                #endif
                #ifndef GRMHD_ENABLED
                float temperature_s = slim_disk_temperature(cyl_r_s) * gravitational_shift_static(r3d_s);
                float turbulence_s = accretion_turbulence(cyl_r_s, angle_s, turb_t);

                // Emission coefficient: slim disk is bright (super-Eddington luminosity)
                float j_eff_s = ACCRETION_BRIGHTNESS * 0.9 * slim_j * turbulence_s;
                // User-configurable absorption: higher = more opaque surface-like
                float alpha_abs_s = slim_opacity * slim_j;
                #endif
                float tau_step_s = alpha_abs_s * path_len_s;
                float step_T_s = exp(-tau_step_s);
                // Source function: emission that survives self-absorption in this step
                // S = j/alpha; contribution = (1 - exp(-tau)) * S = (1-step_T) * j/alpha
                float source_contrib = (tau_step_s > 0.001)
                    ? (1.0 - step_T_s) * (j_eff_s / alpha_abs_s)
                    : j_eff_s * path_len_s;

                // Keplerian velocity outside ISCO, capped inside
                vec3 accretion_v_s;
                #ifdef KERR_FAST_MODE
                float v_kep_s = 1.0 / sqrt(2.0 * max(cyl_r_s - 1.0, 0.01));
                accretion_v_s = disk_rotation_sign() *
                    vec3(-pos.y, pos.x, 0.0) / cyl_r_s * clamp(v_kep_s, 0.0, 0.95);
                #endif
                #ifdef KERR_INSPIRED_VELOCITY
                float rg_cyl_s = max(2.0 * cyl_r_s, 1.0002);
                float a_M_s = abs(bh_rotation_enabled * bh_spin);
                float omega_s = disk_rotation_sign() / (pow(rg_cyl_s, 1.5) + a_M_s);
                float v_phi_s = clamp(rg_cyl_s * omega_s, -0.95, 0.95);
                vec3 e_phi_s = vec3(-pos.y, pos.x, 0.0) / cyl_r_s;
                accretion_v_s = e_phi_s * v_phi_s;
                #endif

                gamma = 1.0/sqrt(max(1.0-dot(accretion_v_s,accretion_v_s), 0.0001));
                float doppler_factor_s = gamma*(1.0+dot(ray/ray_l,accretion_v_s));
                float transfer_factor_s = max(ray_doppler_factor*doppler_factor_s, 0.05);

                float slim_intensity = source_contrib;
                #ifdef BEAMING
                #ifdef PHYSICAL_BEAMING
                // Liouville D³: chromaticity texture doesn't encode brightness,
                // so intensity boost must always be applied explicitly.
                slim_intensity /= pow(clamp(transfer_factor_s, 0.05, 20.0), 3.0);
                #endif
                #ifndef PHYSICAL_BEAMING
                float cd_s = clamp(transfer_factor_s, 0.62, 1.48);
                slim_intensity /= pow(cd_s, 1.05 + 1.10*doppler_boost);
                #endif
                #endif
                #ifdef DOPPLER_SHIFT
                temperature_s /= transfer_factor_s;
                #endif

                vec4 thermal_color_s = BLACK_BODY_COLOR(temperature_s);
                slim_intensity *= look_disk_gain;

                // Front-to-back compositing with Beer-Lambert absorption
                color.rgb += vol_transmittance * thermal_color_s.rgb * slim_intensity;
                vol_transmittance *= step_T_s;
            }
        }
        #endif

        #ifdef JET_ENABLED
        {
            float path_len_j = length(pos - old_pos);
            for (int jet_side = 0; jet_side < 2; jet_side++) {
                float sign_z = (jet_side == 0) ? 1.0 : -1.0;

                #ifdef JET_PHYSICAL
                // --- Counter-jet disk occultation ---
                // The accretion disk (optically thick near equator) blocks
                // the receding counter-jet when viewed near edge-on.
                // Model as extra absorption for the counter-jet passing
                // through the disk plane.
                float occultation = 1.0;
                if (sign_z < 0.0) {
                    // Counter-jet: check if line of sight passes through
                    // a dense region near the equatorial plane
                    float abs_z_pos = abs(pos.z);
                    float cyl_r_occ = length(pos.xy);
                    // Disk is optically thick for r > ISCO, |z| < H(r)
                    // H/R ~ 0.1-0.3 for thin/slim disks
                    float disk_H = 0.2 * cyl_r_occ;
                    if (abs_z_pos < disk_H && cyl_r_occ > 1.5 && cyl_r_occ < 15.0) {
                        // Strong absorption in disk midplane
                        float tau_disk = 8.0 * (1.0 - abs_z_pos / disk_H);
                        occultation = exp(-tau_disk);
                    }
                }
                #endif

                #ifdef GRMHD_ENABLED
                #ifdef JET_PHYSICAL
                float j_jet = grmhd_jet_emissivity(pos, sign_z);
                #endif
                #ifdef JET_SIMPLE
                float j_jet = jet_emissivity(pos, sign_z);
                #endif
                #endif
                #ifndef GRMHD_ENABLED
                float j_jet = jet_emissivity(pos, sign_z);
                #endif
                if (j_jet > 0.001 && vol_transmittance > 0.005) {
                    // Jet bulk velocity
                    vec3 v_jet = jet_velocity(pos, sign_z);
                    float v2_jet = dot(v_jet, v_jet);
                    float gamma_jet = 1.0 / sqrt(max(1.0 - v2_jet, 0.0001));

                    // Doppler factor: δ = 1 / (Γ(1 - β·n̂))
                    vec3 ray_dir = ray / max(ray_l, 1e-6);
                    float doppler_jet = gamma_jet * (1.0 + dot(ray_dir, v_jet));

                    // Synchrotron beaming: I_obs = δ^(2+α) * I_em
                    // α ≈ 0.7 for typical synchrotron spectral index
                    float beam_factor = 1.0 / pow(max(doppler_jet, 0.02), 2.7);

                    #ifdef JET_SIMPLE
                    // Simple mode: single-temperature blackbody approximation
                    float r_jet = max(length(pos), 1.001);
                    float g_shift_j = gravitational_shift_static(r_jet);
                    float jet_T = 18000.0 * g_shift_j;
                    #ifdef DOPPLER_SHIFT
                    jet_T /= max(doppler_jet, 0.05);
                    #endif
                    vec4 jet_color = BLACK_BODY_COLOR(jet_T);

                    float alpha_jet = 0.005 * j_jet;
                    float tau_jet = alpha_jet * path_len_j;
                    float step_T_jet = exp(-tau_jet);

                    float jet_emit = jet_brightness * 0.35 * j_jet * beam_factor * path_len_j;
                    jet_emit *= look_disk_gain;

                    color.rgb += vol_transmittance * jet_color.rgb * jet_emit;
                    vol_transmittance *= step_T_jet;
                    #endif

                    #ifdef JET_PHYSICAL
                    // Detailed mode: more elaborate GRMHD-inspired emissivity,
                    // still coloured via an effective-temperature proxy.
                    float r_jet_p = max(length(pos), 1.001);
                    float z_abs = abs(pos.z * sign_z);
                    float g_shift_j = gravitational_shift_static(r_jet_p);
                    float sigma = magnetization(z_abs);

                    #ifdef GRMHD_ENABLED
                    // Full GRMHD jet: BZ power + kink instability + cooling break
                    float jet_T = grmhd_jet_temperature(z_abs, r_jet_p, sigma) * g_shift_j;
                    #endif
                    #ifndef GRMHD_ENABLED
                    // Effective temperature with synchrotron aging
                    float jet_T = jet_effective_temperature(z_abs, r_jet_p, sigma) * g_shift_j;
                    #endif

                    // Doppler temperature shift for approaching/receding jet
                    jet_T /= max(doppler_jet, 0.05);

                    vec4 jet_color = BLACK_BODY_COLOR(jet_T);

                    // Absorption: higher in sheath (denser), lower in spine
                    float sigma_abs_factor = 1.0 / (1.0 + 0.5 * sigma);
                    float alpha_jet = 0.012 * j_jet * sigma_abs_factor;
                    float tau_jet = alpha_jet * path_len_j;
                    float step_T_jet = exp(-tau_jet);

                    // Emissivity: GRMHD calibration with σ-dependent efficiency
                    float sigma_emit = 1.0 / (1.0 + 0.3 * sigma);
                    float jet_emit = jet_brightness * 0.5 * j_jet * beam_factor
                                   * path_len_j * sigma_emit;
                    jet_emit *= look_disk_gain;

                    // Apply counter-jet disk occultation
                    jet_emit *= occultation;

                    color.rgb += vol_transmittance * jet_color.rgb * jet_emit;
                    vol_transmittance *= step_T_jet;
                    #endif
                }
            }
        }
        #endif

        #ifdef LIGHT_TRAVEL_TIME
        t -= dt;
        #endif

        if (solid_isec_t <= 1.0) u = 100.0; // break (exceeds both exterior and interior thresholds)

        if (!use_kerr) {
        #ifdef KERR_FAST_MODE
        if (interior_mode < 0.5) {
            float capture_u = 1.0 + photon_spin_lensing_scale *
                bh_rotation_enabled * bh_spin * bh_spin_strength *
                spin_alignment * 0.12;
            capture_u = clamp(capture_u, 0.82, 1.18);
            if (u > capture_u) {
                shadow_capture = true;
                break;
            }
        } else if (u >= 20.0) {
            shadow_capture = true;
            break;
        }
        #endif
        #ifdef KERR_INSPIRED_MODE
        // Kerr-inspired mode: same Binet photon solver, same interior capture
        if (interior_mode > 0.5 && u >= 20.0) {
            shadow_capture = true;
            break;
        }
        #endif
        #ifdef KERR_FULL_GEODESIC
        // Full Kerr geodesic fallback (Binet): interior capture
        if (interior_mode > 0.5 && u >= 20.0) {
            shadow_capture = true;
            break;
        }
        #endif
        } // end if (!use_kerr)
    }

        trace_finished = shadow_capture || u < 1.0 || use_kerr || !allow_extended_trace || u > 20.0;
    }

    // Background sky: show for rays that escaped to far field.
    // Interior escaped rays use analytical exit direction (Binet tangent)
    // which avoids the numerical drift of pos − old_pos over many steps.
    if (!shadow_capture && u < 1.0) {

        if (interior_mode > 0.5) {
            // Analytical exit direction from the Binet parametrisation:
            //   d(pos)/dφ  =  φ̂/u  −  r̂·(du/u²)
            // where r̂ and φ̂ are the radial and tangential unit vectors
            // rotated to the current orbit angle φ.
            vec3 r_hat  = cos(phi)*normal_vec + sin(phi)*tangent_vec;
            vec3 phi_hat = -sin(phi)*normal_vec + cos(phi)*tangent_vec;
            vec3 exit_dir = phi_hat / max(u, 0.001)
                          - r_hat  * du / max(u*u, 0.001);
            exit_dir = rotate_about_z(exit_dir, frame_drag_phase);
            ray = normalize(exit_dir);
        } else {
            ray = normalize(pos - old_pos);
        }

        vec2 tex_coord = sphere_map(ray * BG_COORDS);
        float t_coord;

        // Interior blueshift: escaped photons gain energy climbing out
        // of the gravitational potential well.  Boost ~ 1/√|1 − 1/r|.
        float interior_boost = 1.0;
        if (interior_mode > 0.5) {
            float r_obs = max(length(cam_pos), 0.08);
            interior_boost = 1.0 + 0.5 * sqrt(abs(1.0/r_obs - 1.0));
            interior_boost = min(interior_boost, 4.0);
        }

        // Gravitational blueshift for background sky: light from infinity
        // gains energy falling into the gravitational potential well.
        // For a static (hovering) observer at r:
        //   f_obs/f_emit = 1/sqrt(1 - r_s/r) = 1/grav_blueshift_factor
        // Combined with kinematic Doppler from observer orbital/dive motion.
        float bg_doppler = ray_doppler_factor * grav_blueshift_factor;

        // Liouville invariant (I_nu / nu^3 = const along a ray):
        // D = f_obs/f_emit = 1/bg_doppler is the TOTAL frequency ratio
        // from infinity to the observer, combining gravitational blueshift
        // with kinematic Doppler.  Intensity scales as D^3.
        // The spectrum texture stores chromaticity (normalized colour), not
        // absolute Planck radiance, so the temperature shift alone only
        // changes the hue.  The D^3 brightness factor must be applied
        // explicitly.  Clamping prevents blow-ups for extreme D values
        // (near-horizon freefall where T shifts far into UV anyway).
        float safe_bg_doppler = max(abs(bg_doppler), 0.01);
        float bg_D = 1.0 / safe_bg_doppler;
        float bg_boost = min(bg_D * bg_D * bg_D, 10000.0);

        vec4 star_color = texture2D(star_texture, tex_coord);
        if (star_color.r > 0.0) {
            t_coord = (STAR_MIN_TEMPERATURE +
                (STAR_MAX_TEMPERATURE-STAR_MIN_TEMPERATURE) * star_color.g)
                 / safe_bg_doppler;

            color += BLACK_BODY_COLOR(t_coord) * star_color.r * STAR_BRIGHTNESS * look_star_gain * vol_transmittance * interior_boost * bg_boost;
        }

        color += galaxy_color(tex_coord, bg_doppler) * GALAXY_BRIGHTNESS * look_galaxy_gain * vol_transmittance * interior_boost * bg_boost;
    }

    return color*ray_intensity;
}

// --- output/main.glsl ---
// Role: GLSL entry point. Drives the multi-sample anti-aliasing loop — for
//       each sample it computes a jittered ray, calls trace_ray(), accumulates
//       the result, then passes the averaged colour to finalize_color().
//       Also initialises the mutable planet orbital constants from uniforms
//       (PLANET_RADIUS, PLANET_DISTANCE, etc.) before any ray is traced.

// Halton-like low-discrepancy jitter pattern for MSAA sub-pixel sampling.
// Returns a sub-pixel offset in [−0.5, 0.5]² for sample index i.
vec2 sample_offset(int i, vec2 pixel) {
    if (SAMPLE_COUNT <= 1) return vec2(0.0, 0.0);
    float fi = float(i);
    float sample_count_f = float(SAMPLE_COUNT);
    float radius = 0.5 * sqrt((fi + 0.5) / sample_count_f);
    float base_angle = 2.0*M_PI*fract(fi*0.61803398875 + hash12(pixel*0.5));
    return radius * vec2(cos(base_angle), sin(base_angle));
}

void main() {

    #ifdef PLANETENABLED
    // "constants" derived from uniforms
    PLANET_RADIUS = planet_radius;
    PLANET_DISTANCE = max(planet_distance,planet_radius+1.5);
    float planet_orbital_v = 1.0 / sqrt(2.0*(PLANET_DISTANCE-1.0));
    PLANET_ORBITAL_ANG_VEL = -planet_orbital_v *
        sqrt(max(1.0 - 1.0/PLANET_DISTANCE, 0.0)) / PLANET_DISTANCE;
    float MAX_PLANET_ROT = max((1.0 + PLANET_ORBITAL_ANG_VEL*PLANET_DISTANCE) / PLANET_RADIUS,0.0);
    PLANET_ROTATION_ANG_VEL = -PLANET_ORBITAL_ANG_VEL + MAX_PLANET_ROT * 0.5;
    PLANET_GAMMA = 1.0/sqrt(1.0-SQ(PLANET_ORBITAL_ANG_VEL*PLANET_DISTANCE));
    #endif

    vec4 accumulated = vec4(0.0, 0.0, 0.0, 0.0);

    for (int sample_index = 0; sample_index < SAMPLE_COUNT; sample_index++) {
        vec2 jitter = sample_offset(sample_index, gl_FragCoord.xy);
        vec2 p = -1.0 + 2.0 * (gl_FragCoord.xy + jitter + taa_jitter) / resolution.xy;
        p.y *= resolution.y / resolution.x;
        vec2 p_cam = p + cam_pan;

        vec3 ray = normalize(p_cam.x*cam_x + p_cam.y*cam_y + FOV_MULT*cam_z);
        accumulated += trace_ray(ray);
    }

    vec4 color = accumulated / float(SAMPLE_COUNT);
    gl_FragColor = finalize_color(color);
}
