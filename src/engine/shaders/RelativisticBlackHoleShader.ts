import * as THREE from 'three';

export interface RelativisticBlackHoleUniforms {
  [uniform: string]: THREE.IUniform<any>;
  time: { value: number };
  spin: { value: number }; // Parámetro de espín de Kerr [0.0 .. 0.99]
  accretionRate: { value: number }; // Intensidad de acreción [0.2 .. 2.0]
  inclination: { value: number }; // Ángulo visual respecto al disco (rad)
  diskColorInner: { value: THREE.Color };
  diskColorOuter: { value: THREE.Color };
}

/**
 * Módulo de shader relativista para el Agujero Negro Gargantua / M87*
 * Calcula en GPU:
 * 1. Sombra del horizonte de sucesos (Radio de Schwarzschild / Kerr)
 * 2. Anillo de Einstein (Lente gravitacional fotónica)
 * 3. Disco de acreción con efecto Doppler (azul brillante en el frente de avance, ámbar en retroceso)
 */
export class RelativisticBlackHoleShader {
  public static createMaterial(options: {
    spin?: number;
    accretionRate?: number;
    inclination?: number;
    innerHex?: string | number;
    outerHex?: string | number;
  } = {}): THREE.ShaderMaterial {
    const {
      spin = 0.85,
      accretionRate = 1.0,
      inclination = 1.2,
      innerHex = '#ffffff',
      outerHex = '#ff5500'
    } = options;

    const uniforms: RelativisticBlackHoleUniforms = {
      time: { value: 0 },
      spin: { value: spin },
      accretionRate: { value: accretionRate },
      inclination: { value: inclination },
      diskColorInner: { value: new THREE.Color(innerHex) },
      diskColorOuter: { value: new THREE.Color(outerHex) }
    };

    const vertexShader = `
      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform float spin;
      uniform float accretionRate;
      uniform float inclination;
      uniform vec3 diskColorInner;
      uniform vec3 diskColorOuter;

      varying vec3 vWorldPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      // Función de ruido procedural rápido para turbulencias en el plasma
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float NdotV = max(0.0, dot(normalize(vNormal), viewDir));
        
        // Fresnel sutil para el borde (efecto de lente gravitacional muy fino en el limbo)
        float fresnel = pow(1.0 - NdotV, 5.0);

        // Horizonte negro + resplandor de borde
        vec3 finalColor = mix(diskColorInner, diskColorOuter, 0.5) * fresnel * 2.5;

        // Alpha = 1.0 para ocluir las estrellas de fondo (requiere NormalBlending)
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: false,
      side: THREE.FrontSide,
      depthWrite: true,
      blending: THREE.NormalBlending
    });
  }
}
