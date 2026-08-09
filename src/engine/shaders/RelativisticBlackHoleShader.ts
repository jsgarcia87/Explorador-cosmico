import * as THREE from 'three';

export interface RelativisticBlackHoleUniforms {
  [uniform: string]: THREE.IUniform<any>;
  time: { value: number };
  spin: { value: number };
  accretionRate: { value: number };
  inclination: { value: number };
  diskColorInner: { value: THREE.Color };
  diskColorOuter: { value: THREE.Color };
  uRs: { value: number };
  uSphereRadius: { value: number };
  uEnvMap: { value: THREE.Texture | null };
  uHasEnvMap: { value: number };
}

export class RelativisticBlackHoleShader {
  public static createMaterial(options: {
    spin?: number;
    accretionRate?: number;
    inclination?: number;
    innerHex?: string | number;
    outerHex?: string | number;
    schwarzschildRadius?: number;
    sphereRadius?: number;
  } = {}): THREE.ShaderMaterial {
    const {
      spin = 0.85,
      accretionRate = 1.0,
      inclination = 1.2,
      innerHex = '#ffffff',
      outerHex = '#ff5500',
      schwarzschildRadius = 1.5,
      sphereRadius = 14.0
    } = options;

    const uniforms: RelativisticBlackHoleUniforms = {
      time: { value: 0 },
      spin: { value: spin },
      accretionRate: { value: accretionRate },
      inclination: { value: inclination },
      diskColorInner: { value: new THREE.Color(innerHex) },
      diskColorOuter: { value: new THREE.Color(outerHex) },
      uRs: { value: schwarzschildRadius },
      uSphereRadius: { value: sphereRadius },
      uEnvMap: { value: null },
      uHasEnvMap: { value: 0.0 }
    };

    const vertexShader = /* glsl */ `
      varying vec3 vLocalPos;
      varying vec3 vLocalCamPos;
      varying vec3 vWorldDir;

      void main() {
        vLocalPos = position;
        vec3 meshWorldPos = modelMatrix[3].xyz;
        vLocalCamPos = cameraPosition - meshWorldPos;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldDir = normalize(worldPos.xyz - cameraPosition);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      #define PI 3.14159265359

      uniform float time;
      uniform float spin;
      uniform float accretionRate;
      uniform vec3 diskColorInner;
      uniform vec3 diskColorOuter;
      uniform float uRs;
      uniform float uSphereRadius;
      uniform sampler2D uEnvMap;
      uniform float uHasEnvMap;

      varying vec3 vLocalPos;
      varying vec3 vLocalCamPos;
      varying vec3 vWorldDir;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b2 = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b2, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = rot * p * 2.0;
          a *= 0.5;
        }
        return v;
      }

      vec3 sampleEnv(vec3 dir) {
        float u = atan(dir.z, dir.x) / (2.0 * PI) + 0.5;
        float v = asin(clamp(dir.y, -1.0, 1.0)) / PI + 0.5;
        return texture2D(uEnvMap, vec2(u, v)).rgb;
      }

      vec3 computeDiskColor(float r, float phi, float Rs) {
        float innerR = Rs * 3.0;
        float outerR = min(Rs * 7.0, uSphereRadius * 0.45);

        if (r < innerR || r > outerR) return vec3(0.0);

        float t = (r - innerR) / (outerR - innerR);

        // Temperature gradient: inner hot (white-blue) -> outer cool (orange-red)
        vec3 col = mix(diskColorInner, diskColorOuter, pow(t, 0.55));

        // Doppler beaming: approaching side brighter
        float orbVel = spin * 0.35 / sqrt(max(r / Rs, 1.0));
        float doppler = 1.0 + orbVel * sin(phi + time * 0.6);
        col *= pow(max(doppler, 0.1), 3.0);

        // Turbulent plasma structure
        float turb = fbm(vec2(phi * 2.5 + time * 0.15, log(max(r, 0.1)) * 5.0));
        col *= 0.65 + turb * 0.7;

        // Radial brightness falloff — inner region blazing hot
        float brightness = accretionRate * (1.0 - pow(t, 1.5)) * 3.0;
        col *= brightness;

        return col;
      }

      void main() {
        vec3 ro = vLocalCamPos;
        vec3 rd = normalize(vLocalPos - vLocalCamPos);

        float Rs = uRs;
        float bCrit = Rs * 2.598;

        // Impact parameter: closest approach distance to origin
        float tCA = max(-dot(ro, rd), 0.0);
        vec3 pCA = ro + rd * tCA;
        float b = length(pCA);

        // Fade at sphere boundary — disk ends before fade starts, geometry edge fully invisible
        float edgeFade = 1.0 - smoothstep(uSphereRadius * 0.5, uSphereRadius * 0.8, b);

        // === EVENT HORIZON SHADOW ===
        if (b < bCrit) {
          // Pure black shadow — no artificial photon ring
          // The visible "ring" in real BH images comes from the lensed accretion disk,
          // which the disk intersection code already handles
          gl_FragColor = vec4(0.0, 0.0, 0.0, edgeFade);
          return;
        }

        // === OUTSIDE SHADOW: DISK + LENSING ===
        vec4 result = vec4(0.0);

        // Gravitational deflection angle — clamped to avoid extreme wrap near shadow
        float x = b / bCrit;
        float deflAngle = (2.0 * Rs / b) * (1.0 + 1.2 / pow(x - 1.0 + 0.2, 0.7));
        deflAngle = min(deflAngle, PI * 0.6);

        // --- Direct disk intersection (y = 0 plane) ---
        if (abs(rd.y) > 0.0001) {
          float tDisk = -ro.y / rd.y;
          if (tDisk > 0.0) {
            vec3 hitPos = ro + rd * tDisk;
            float r = length(hitPos.xz);
            float phi = atan(hitPos.z, hitPos.x);

            vec3 dCol = computeDiskColor(r, phi, Rs);
            if (length(dCol) > 0.001) {
              float a = clamp(length(dCol) * 0.7, 0.0, 0.95);
              result = vec4(dCol, a);
            }
          }
        }

        // --- Lensed disk (gravitationally bent ray hitting far side of disk) ---
        if (deflAngle > 0.05) {
          vec3 deflAxis = normalize(cross(rd, normalize(pCA + vec3(0.0001))));
          float sd = sin(deflAngle);
          float cd = cos(deflAngle);
          vec3 bentRd = rd * cd + cross(deflAxis, rd) * sd
                       + deflAxis * dot(deflAxis, rd) * (1.0 - cd);
          bentRd = normalize(bentRd);

          if (abs(bentRd.y) > 0.0001) {
            float tBent = -pCA.y / bentRd.y;
            if (tBent > 0.0) {
              vec3 bentHit = pCA + bentRd * tBent;
              float rBent = length(bentHit.xz);
              float phiBent = atan(bentHit.z, bentHit.x);

              vec3 lCol = computeDiskColor(rBent, phiBent, Rs);
              if (length(lCol) > 0.001) {
                float lensedFade = 0.6 * smoothstep(bCrit, bCrit * 2.5, b);
                lCol *= lensedFade;

                if (result.a < 0.1) {
                  result = vec4(lCol, clamp(length(lCol) * 0.6, 0.0, 0.85));
                } else {
                  result.rgb += lCol * 0.4;
                  result.a = min(result.a + 0.15, 0.95);
                }
              }
            }
          }
        }

        // --- Background gravitational lensing (Einstein ring) ---
        if (uHasEnvMap > 0.5 && result.a < 0.6) {
          float lensStr = smoothstep(bCrit * 5.0, bCrit * 1.05, b);
          if (lensStr > 0.01) {
            vec3 deflAxis2 = normalize(cross(vWorldDir, normalize(pCA + vec3(0.0001))));
            float envDefl = deflAngle * 0.3;
            float sd2 = sin(envDefl);
            float cd2 = cos(envDefl);
            vec3 lensedDir = vWorldDir * cd2 + cross(deflAxis2, vWorldDir) * sd2
                           + deflAxis2 * dot(deflAxis2, vWorldDir) * (1.0 - cd2);

            vec3 lensedBg = sampleEnv(normalize(lensedDir));

            result.rgb = mix(result.rgb, lensedBg * 1.1, lensStr * (1.0 - result.a));
            result.a = max(result.a, lensStr * 0.4);
          }
        }

        result.a *= edgeFade;
        gl_FragColor = result;
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }
}
