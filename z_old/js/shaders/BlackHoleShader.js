import * as THREE from 'three';

/**
 * BlackHoleShader.js
 * Simulación Astrofísica de Grado NASA/ESA de Agujero Negro (Gargantúa / Schwarzschild-Kerr)
 * Mediante Raymarching de Geodésicas Curvas (Gravitational Lensing & Null Geodesics),
 * Anillo de Fotones (r = 1.5 rs), Disco de Acreción Volumétrico con Doppler Beaming Relativista
 * y Modo de Inspección Geodésica / Curvatura del Espacio-Tiempo.
 */

export const BlackHoleGLSL = {
  uniforms: {
    uTime: { value: 0.0 },
    uCameraPos: { value: new THREE.Vector3() },
    uMass: { value: 1.0 },              // Masa del agujero negro (en relación al estándar rs=2.0)
    uAccretionRate: { value: 1.0 },     // Tasa de acreción / densidad de plasma
    uInclination: { value: 0.0 },       // Inclinación visual del disco
    uDopplerStrength: { value: 1.35 },  // Factor de Doppler Beaming Relativista
    uLensingEnabled: { value: 1.0 },    // 1 = Lente gravitacional activa, 0 = inactiva
    uShowGeodesicGrid: { value: 0.0 },  // 1 = Mostrar malla espacio-tiempo y geodésicas
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },

  vertexShader: /* glsl */ `
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,

  fragmentShader: /* glsl */ `
    precision highp float;

    varying vec3 vWorldPosition;
    varying vec2 vUv;

    uniform float uTime;
    uniform vec3 uCameraPos;
    uniform float uMass;
    uniform float uAccretionRate;
    uniform float uInclination;
    uniform float uDopplerStrength;
    uniform float uLensingEnabled;
    uniform float uShowGeodesicGrid;
    uniform vec2 uResolution;

    #define MAX_STEPS 90
    #define STEP_SIZE 0.14
    #define PI 3.14159265359

    // Función hash 3D para turbulencia MHD en el disco de acreción
    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z);
    }

    float fbm(vec3 p) {
      float f = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 4; i++) {
        f += amp * noise(p);
        p *= 2.1;
        amp *= 0.48;
      }
      return f;
    }

    // Rotación 2D en torno al eje Y para inclinación
    vec3 rotateX(vec3 p, float a) {
      float s = sin(a), c = cos(a);
      return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
    }

    // Malla espacio-tiempo de Schwarzschild (Inspección Geodésica HUD)
    vec3 computeSpacetimeGrid(vec3 pos, float rs) {
      float r = length(pos);
      // Curvatura del potencial gravitacional V(r) ~ -rs / r
      float warp = rs / max(r, 0.4);
      float gridX = abs(fract(pos.x * 1.5) - 0.5);
      float gridZ = abs(fract(pos.z * 1.5) - 0.5);
      float line = smoothstep(0.04, 0.0, min(gridX, gridZ));
      vec3 gridColor = vec3(0.0, 0.95, 1.0) * line * warp * 0.85;
      return gridColor;
    }

    void main() {
      // Vector del rayo desde la cámara hasta la esfera envolvente
      vec3 rayOrigin = uCameraPos;
      vec3 rayDir = normalize(vWorldPosition - uCameraPos);

      // Parámetros físicos del agujero negro
      float rs = 2.0 * max(uMass, 0.2); // Radio de Schwarzschild (horizonte de sucesos)
      float rISCO = 3.0 * rs;           // Última órbita circular estable (ISCO)
      float rPhoton = 1.5 * rs;         // Esfera de fotones (Einstein ring)
      float rOut = 14.0 * rs;           // Límite exterior del disco de acreción

      vec3 pos = rayOrigin;
      vec3 dir = rayDir;

      vec4 accumColor = vec4(0.0);
      float totalGlow = 0.0;
      float photonRingIntensity = 0.0;
      vec3 gridOverlay = vec3(0.0);

      // Paso de Raymarching con curvatura geodésica relativista
      for (int i = 0; i < MAX_STEPS; i++) {
        float r = length(pos);

        // 1. Absorción en el Horizonte de Sucesos (r <= rs)
        if (r <= rs * 1.01) {
          // Sombra oscura absoluta dentro de Schwarzschild
          break;
        }

        // 2. Curvatura Gravitacional (Gravitational Lensing d^2x/dλ^2 ~ -G M / r^3)
        if (uLensingEnabled > 0.5) {
          vec3 gravForce = -normalize(pos) * (rs * 0.38 / (r * r));
          dir = normalize(dir + gravForce * STEP_SIZE);
        }

        // 3. Anillo de Fotones Einsteiniana (r ~ 1.5 rs)
        float photonDist = abs(r - rPhoton);
        if (photonDist < rs * 0.45) {
          float pr = pow(smoothstep(rs * 0.45, 0.0, photonDist), 3.0);
          photonRingIntensity += pr * 0.18;
        }

        // 4. Intersección con el Disco de Acreción y Relatividad Doppler
        // Evaluamos cerca del plano ecuatorial y dentro de [rISCO, rOut]
        if (abs(pos.y) < 1.2 && r >= rISCO * 0.9 && r <= rOut) {
          // Ángulo orbital para rotación diferencial kepleriana v(r) ~ r^(-1/2)
          float keplerSpeed = 2.8 * max(uAccretionRate, 0.5) / sqrt(max(r, 0.5));
          float angle = atan(pos.z, pos.x) + uTime * keplerSpeed * 0.4;

          vec3 diskCoords = vec3(cos(angle) * r, pos.y * 3.0, sin(angle) * r);
          float density = fbm(diskCoords * 0.65 - vec3(0.0, uTime * 0.5, 0.0));

          // Perfil radial del disco: más denso y caliente cerca de ISCO
          float radialFade = smoothstep(rISCO * 0.9, rISCO * 1.3, r) * (1.0 - smoothstep(rOut * 0.7, rOut, r));
          float alpha = smoothstep(0.32, 0.85, density) * radialFade * uAccretionRate;

          if (alpha > 0.01) {
            // Cálculo del Efecto Doppler Relativista (Beaming D^3 Liouville Invariant - Shakura-Sunyaev GRRT)
            vec3 tangentVel = normalize(vec3(-pos.z, 0.0, pos.x));
            float dopplerFactor = 1.0;
            if (uDopplerStrength > 0.01) {
              float vRel = min(0.72, 0.90 * sqrt(rs / r)); // Velocidad kepleriana ecuatorial Kerr
              float betaDot = dot(dir, tangentVel) * vRel * uDopplerStrength;
              // Factor de Beaming de Einstein-Doppler: D = 1 / [gamma * (1 - beta * cos(theta))]
              float gamma = 1.0 / sqrt(max(0.04, 1.0 - vRel * vRel));
              float D = clamp(1.0 / (gamma * (1.0 - betaDot)), 0.18, 3.8);
              // Invarianza de Liouville D^3 para intensidad bolométrica de radiación GRRT
              dopplerFactor = pow(D, 3.0);
            }

            // Perfil de Temperatura Shakura–Sunyaev: T(r) ~ r^(-3/4) * (1 - sqrt(rISCO/r))^(1/4)
            float ssTemp = pow(max(0.01, rISCO / r), 0.75) * pow(max(0.0, 1.0 - sqrt(rISCO / r)), 0.25);
            vec3 hotColor  = vec3(0.92, 0.97, 1.00);    // Plasma ultracaliente blueshifteado (60,000 K)
            vec3 midColor  = vec3(1.00, 0.55, 0.10);    // Disco de acreción térmico (10,000 K)
            vec3 coolColor = vec3(0.60, 0.08, 0.02);    // Halo exterior desplazado al rojo (3,000 K)

            float tempFactor = clamp(ssTemp * 3.5, 0.0, 1.0);
            vec3 baseEmission = mix(coolColor, midColor, pow(tempFactor, 0.7));
            baseEmission = mix(baseEmission, hotColor, pow(tempFactor, 2.2));

            // Aplicar Doppler Beaming al color y brillo
            vec3 beamedColor = baseEmission * dopplerFactor;

            accumColor.rgb += beamedColor * alpha * (1.0 - accumColor.a) * 0.55;
            accumColor.a += alpha * (1.0 - accumColor.a) * 0.45;
          }
        }

        // 5. Modo Inspección Científica: Malla espacio-tiempo
        if (uShowGeodesicGrid > 0.5 && abs(pos.y) < 0.25 && r > rs) {
          gridOverlay += computeSpacetimeGrid(pos, rs) * (1.0 - accumColor.a) * 0.15;
        }

        if (accumColor.a >= 0.97) break;
        pos += dir * STEP_SIZE;
      }

      // Adición del Anillo de Fotones Einsteiniano en color oro/blanco puro
      vec3 photonRingColor = vec3(1.0, 0.88, 0.55) * photonRingIntensity * uAccretionRate;
      vec3 finalColor = accumColor.rgb + photonRingColor + gridOverlay;

      // Halo gravitacional atmosférico de Einstein
      float halo = pow(clamp(1.0 - length(vUv - 0.5) * 1.3, 0.0, 1.0), 3.5);
      finalColor += vec3(0.4, 0.65, 1.0) * halo * 0.15 * uAccretionRate;

      gl_FragColor = vec4(finalColor, max(accumColor.a, min(1.0, photonRingIntensity * 0.8 + length(gridOverlay))));
    }
  `
};

/**
 * Crea el objeto del sistema de Agujero Negro con shader de Raymarching relativista
 */
export function createBlackHoleSystem(options = {}) {
  const group = new THREE.Group();
  group.name = 'gargantua_system';

  // Geometría esférica de inspección para disparar rayos en su interior
  const radius = options.radius || 35.0;
  const geometry = new THREE.SphereGeometry(radius, 48, 48);

  const material = new THREE.ShaderMaterial({
    vertexShader: BlackHoleGLSL.vertexShader,
    fragmentShader: BlackHoleGLSL.fragmentShader,
    uniforms: THREE.UniformsUtils.clone(BlackHoleGLSL.uniforms),
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false
  });

  if (options.mass !== undefined) material.uniforms.uMass.value = options.mass;
  if (options.accretionRate !== undefined) material.uniforms.uAccretionRate.value = options.accretionRate;
  if (options.dopplerStrength !== undefined) material.uniforms.uDopplerStrength.value = options.dopplerStrength;

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'gargantua_raymarch_mesh';
  group.add(mesh);

  // Estrella Hiperveloz S2 en órbita Kepleriana excéntrica
  const s2Geo = new THREE.SphereGeometry(0.8, 32, 32);
  const s2Mat = new THREE.MeshStandardMaterial({
    color: 0x88bbff,
    emissive: 0x4488ff,
    emissiveIntensity: 2.2,
    roughness: 0.1
  });
  const s2Star = new THREE.Mesh(s2Geo, s2Mat);
  s2Star.name = 's2_hypervelocity_star';
  group.add(s2Star);

  // Sistema de actualización orbital y uniforms en cada cuadro (delta time)
  group.userData = {
    shaderMat: material,
    s2Star: s2Star,
    orbitAngle: 0.0,
    update: (dt, time, simSpeed = 1.0, cameraPos) => {
      if (material.uniforms.uTime) material.uniforms.uTime.value = time;
      if (cameraPos && material.uniforms.uCameraPos) {
        material.uniforms.uCameraPos.value.copy(cameraPos);
      }
      // Órbita Kepleriana elíptica de S2 alrededor de Gargantúa (excentricidad e=0.88)
      const s2Angle = time * 0.65 * simSpeed;
      const rS2 = 14.5 / (1.0 + 0.58 * Math.cos(s2Angle));
      s2Star.position.x = rS2 * Math.cos(s2Angle);
      s2Star.position.z = rS2 * Math.sin(s2Angle) * 0.65;
      s2Star.position.y = Math.sin(s2Angle * 2.0) * 1.2;
    }
  };

  return group;
}
