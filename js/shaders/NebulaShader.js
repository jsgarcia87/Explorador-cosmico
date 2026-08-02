import * as THREE from 'three';

/**
 * NebulaShader.js
 * Simulación Volumétrica 3D de Nebulosa de Emisión (Paleta Hubble SHO)
 * H-alpha (rojo/oro), [OIII] (cian), [SII] (carmesí) y Carriles de Polvo Molecular Oscuro (Barnard).
 */

export const NebulaGLSL = {
  uniforms: {
    uTime: { value: 0.0 },
    uCameraPos: { value: new THREE.Vector3() },
    uColorHAlpha: { value: new THREE.Color(0xff3322) },
    uColorOIII:   { value: new THREE.Color(0x00e5ff) },
    uColorSII:    { value: new THREE.Color(0xaa1100) },
    uDensityScale: { value: 1.0 }
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
    uniform vec3 uColorHAlpha;
    uniform vec3 uColorOIII;
    uniform vec3 uColorSII;
    uniform float uDensityScale;

    #define MAX_STEPS 60
    #define STEP_SIZE 0.45

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
        p *= 2.03;
        amp *= 0.49;
      }
      return f;
    }

    void main() {
      vec3 rayOrigin = uCameraPos;
      vec3 rayDir = normalize(vWorldPosition - uCameraPos);
      vec3 pos = rayOrigin;
      vec3 dir = rayDir;

      vec4 accum = vec4(0.0);

      for (int i = 0; i < MAX_STEPS; i++) {
        float r = length(pos);
        if (r > 20.0) {
          pos += dir * STEP_SIZE;
          continue;
        }

        // Densidad turbulenta 3D
        vec3 samplePos = pos * 0.18 + vec3(0.0, uTime * 0.03, uTime * 0.02);
        float n = fbm(samplePos);
        
        // Carriles de polvo molecular oscuro de Barnard (absorción)
        float darkLane = smoothstep(0.45, 0.62, fbm(samplePos * 1.8 + vec3(1.5, -uTime * 0.01, 0.0)));

        float d = smoothstep(0.3, 0.8, n) * (1.0 - darkLane * 0.85) * uDensityScale;
        
        if (d > 0.01) {
          // Asignación espectral Hubble SHO según gradiente y densidad
          float o3Weight = smoothstep(0.3, 0.55, n);
          float haWeight = smoothstep(0.5, 0.75, n);
          float siiWeight = 1.0 - haWeight;

          vec3 shoColor = uColorOIII * o3Weight + uColorHAlpha * haWeight + uColorSII * siiWeight * 0.6;
          
          accum.rgb += shoColor * d * (1.0 - accum.a) * 0.75;
          accum.a += d * (1.0 - accum.a) * 0.5;
        }

        if (accum.a >= 0.96) break;
        pos += dir * STEP_SIZE;
      }

      // Suavizado del borde esférico del volumen
      float edgeFade = smoothstep(22.0, 16.0, length(vWorldPosition));
      gl_FragColor = vec4(accum.rgb, accum.a * edgeFade);
    }
  `
};

/**
 * Crea el volumen de la Nebulosa SHO 3D
 */
export function createNebulaSystem(options = {}) {
  const group = new THREE.Group();
  group.name = 'nebula_system';

  const radius = options.radius || 22.0;
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.ShaderMaterial({
    vertexShader: NebulaGLSL.vertexShader,
    fragmentShader: NebulaGLSL.fragmentShader,
    uniforms: THREE.UniformsUtils.clone(NebulaGLSL.uniforms),
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'nebula_raymarch_mesh';
  group.add(mesh);

  group.userData = {
    material,
    update: (dt, time, simSpeed = 1.0, cameraPos) => {
      material.uniforms.uTime.value = time;
      if (cameraPos && material.uniforms.uCameraPos) {
        material.uniforms.uCameraPos.value.copy(cameraPos);
      }
      group.rotation.y += dt * 0.02 * simSpeed;
    }
  };

  return group;
}
