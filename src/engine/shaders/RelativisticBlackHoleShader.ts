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
        // Vector de visión desde la cámara al fragmento
        vec3 viewDir = normalize(vWorldPosition - cameraPosition);
        float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

        // Coordenadas radiales relativas al centro del objeto
        vec2 centeredUv = (vUv - 0.5) * 2.0;
        float dist = length(centeredUv);

        // 1. Horizonte de sucesos oscuro (Sombra del agujero negro)
        float horizonRadius = 0.38 - spin * 0.08;
        if (dist < horizonRadius) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          return;
        }

        // 2. Anillo de Einstein (Esfera fotónica de alta curvatura)
        float photonRadius = horizonRadius + 0.12;
        float einsteinRing = smoothstep(photonRadius - 0.08, photonRadius, dist) -
                             smoothstep(photonRadius, photonRadius + 0.15, dist);

        // 3. Disco de Acreción con flujo espiral y efecto Doppler Relativista
        float angle = atan(centeredUv.y, centeredUv.x);
        float spiral = sin(dist * 22.0 - angle * 2.0 - time * 3.5) * 0.5 + 0.5;
        float plasmaTurbulence = noise(vec2(dist * 12.0 - time * 1.5, angle * 4.0));

        // Asimetría Doppler: El lado que se mueve hacia el observador es mucho más brillante y azulado
        float dopplerFactor = 1.0 + 0.65 * sin(angle - time * 0.5) * sin(inclination);
        
        // Gradiente de temperatura y color (Blanco/azul interno -> Naranja/rojo externo)
        float diskMix = smoothstep(horizonRadius, 1.0, dist);
        vec3 baseColor = mix(diskColorInner, diskColorOuter, pow(diskMix, 0.8));
        
        // Aumentar brillo azulado donde actúa el Doppler boosting
        vec3 finalColor = baseColor * (0.8 + 0.4 * spiral + 0.5 * plasmaTurbulence) * dopplerFactor * accretionRate;

        // Añadir resplandor del Anillo de Einstein
        finalColor += vec3(1.0, 0.92, 0.75) * einsteinRing * 2.2 * accretionRate;
        finalColor += vec3(0.3, 0.7, 1.0) * fresnel * 0.6;

        float alpha = smoothstep(horizonRadius - 0.02, horizonRadius + 0.05, dist) *
                      (1.0 - smoothstep(0.85, 1.0, dist));

        gl_FragColor = vec4(finalColor, clamp(alpha * 1.15, 0.0, 1.0));
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }
}
