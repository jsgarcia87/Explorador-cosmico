import * as THREE from 'three';

/**
 * Dynamic starfield with spectral colors, magnitude-based brightness,
 * and scintillation (twinkling) — replaces static skybox for immersive projection.
 *
 * ~6000 stars distributed on a celestial sphere at large radius.
 * Each star has:
 *  - Spectral color from B-V index (O blue → K orange → M red)
 *  - Apparent magnitude → size and brightness
 *  - Unique phase offset for scintillation
 */
export class DynamicStarfield {
  private points: THREE.Points;
  private material: THREE.ShaderMaterial;
  private static readonly STAR_COUNT = 6500;
  private static readonly RADIUS = 4000;

  constructor(scene: THREE.Scene) {
    const { geometry, material } = this.build();
    this.material = material;
    this.points = new THREE.Points(geometry, material);
    this.points.frustumCulled = false;
    this.points.renderOrder = -1;
    scene.add(this.points);
  }

  private build() {
    const N = DynamicStarfield.STAR_COUNT;
    const R = DynamicStarfield.RADIUS;

    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const phases = new Float32Array(N);
    const twinkleRates = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      // Uniform distribution on sphere (Marsaglia method)
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r2 = Math.sqrt(1 - u * u);
      positions[i * 3] = r2 * Math.cos(theta) * R;
      positions[i * 3 + 1] = u * R;
      positions[i * 3 + 2] = r2 * Math.sin(theta) * R;

      // Spectral type distribution (realistic: most stars are K/M, few are O/B)
      // B-V index: -0.3 (O/B hot blue) → 0.0 (A white) → 0.6 (G yellow) → 1.0 (K orange) → 1.8 (M red)
      const roll = Math.random();
      let bv: number;
      if (roll < 0.003) bv = -0.3 + Math.random() * 0.15;       // O/B — rare hot blue
      else if (roll < 0.02) bv = -0.15 + Math.random() * 0.25;   // B/A — blue-white
      else if (roll < 0.08) bv = 0.1 + Math.random() * 0.2;      // A — white
      else if (roll < 0.2) bv = 0.3 + Math.random() * 0.3;       // F — yellow-white
      else if (roll < 0.4) bv = 0.6 + Math.random() * 0.2;       // G — yellow (Sun-like)
      else if (roll < 0.7) bv = 0.8 + Math.random() * 0.5;       // K — orange
      else bv = 1.3 + Math.random() * 0.5;                        // M — red

      const [cr, cg, cb] = bvToRgb(bv);
      colors[i * 3] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;

      // Apparent magnitude → size (brighter = bigger point)
      // Most stars dim, few bright — exponential distribution
      const magRoll = Math.random();
      let magnitude: number;
      if (magRoll < 0.002) magnitude = 0.5 + Math.random() * 1.0;   // Very bright (Sirius-class)
      else if (magRoll < 0.015) magnitude = 1.5 + Math.random() * 1.0; // Bright
      else if (magRoll < 0.08) magnitude = 2.5 + Math.random() * 1.0;  // Medium-bright
      else if (magRoll < 0.3) magnitude = 3.5 + Math.random() * 1.0;   // Medium
      else magnitude = 4.5 + Math.random() * 2.0;                       // Dim

      // Size from magnitude: brighter → larger point sprite
      sizes[i] = Math.max(1.0, 8.0 - magnitude * 1.1);

      // Scintillation phase and rate (unique per star)
      phases[i] = Math.random() * Math.PI * 2;
      twinkleRates[i] = 0.8 + Math.random() * 2.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aTwinkleRate', new THREE.BufferAttribute(twinkleRates, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixelRatio;

        attribute vec3 aColor;
        attribute float aSize;
        attribute float aPhase;
        attribute float aTwinkleRate;

        varying vec3 vColor;
        varying float vBrightness;

        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPos;

          // Scintillation: atmospheric twinkling simulation
          // Combines two sine waves at different frequencies for natural look
          float t1 = sin(uTime * aTwinkleRate + aPhase) * 0.5 + 0.5;
          float t2 = sin(uTime * aTwinkleRate * 0.7 + aPhase * 1.3 + 2.0) * 0.5 + 0.5;
          float scintillation = mix(0.6, 1.0, t1 * 0.6 + t2 * 0.4);

          // Brighter stars twinkle less (they subtend more atmosphere)
          float twinkleStrength = mix(0.5, 0.05, smoothstep(1.0, 6.0, aSize));
          vBrightness = mix(1.0, scintillation, twinkleStrength);

          vColor = aColor;

          gl_PointSize = aSize * uPixelRatio * vBrightness;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vBrightness;

        void main() {
          // Soft circular point with bright center falloff (Airy disk approximation)
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          if (dist > 0.5) discard;

          // Bright core + soft halo
          float core = exp(-dist * dist * 32.0);
          float halo = exp(-dist * dist * 8.0) * 0.4;
          float intensity = core + halo;

          // HDR output for bloom to catch bright stars
          vec3 color = vColor * intensity * vBrightness * 1.6;

          gl_FragColor = vec4(color, intensity * vBrightness);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry, material };
  }

  public update(delta: number): void {
    this.material.uniforms.uTime.value += delta;
  }

  public dispose(): void {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}

/**
 * Convert B-V color index to RGB (Ballesteros 2012 formula).
 * B-V ranges from ~-0.4 (hot blue O-stars) to ~2.0 (cool red M-stars).
 */
function bvToRgb(bv: number): [number, number, number] {
  // Clamp to valid range
  bv = Math.max(-0.4, Math.min(2.0, bv));

  let r: number, g: number, b: number;

  // Temperature from B-V (Ballesteros)
  const t = 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62));

  // Planckian locus approximation for sRGB
  if (t >= 6600) {
    r = 1.0;
    g = Math.max(0, Math.min(1, 0.39 * Math.log(t / 100 - 55) - 0.63));
    b = 1.0;
  } else if (t >= 1900) {
    r = Math.max(0, Math.min(1, 1.29 * Math.log(t / 100) - 4.0));
    g = Math.max(0, Math.min(1, 0.39 * Math.log(t / 100) - 0.19));
    if (t >= 6600) {
      b = 1.0;
    } else if (t >= 2000) {
      b = Math.max(0, Math.min(1, 0.54 * Math.log(t / 100 - 10) - 1.19));
    } else {
      b = 0;
    }
  } else {
    r = 1.0; g = 0.0; b = 0.0;
  }

  // Boost blue end for visual distinction
  if (bv < 0.0) {
    r *= 0.7 + bv * 0.3;
    b = Math.min(1.0, b * 1.3);
  }

  return [r, g, b];
}
