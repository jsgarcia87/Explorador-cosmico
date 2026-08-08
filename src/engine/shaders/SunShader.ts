import * as THREE from 'three';

export class SunShader {
  public static createSurfaceMaterial(sunMap: THREE.Texture): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uSunMap: { value: sunMap },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float time;
        uniform sampler2D uSunMap;

        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p = rot * p * 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          float NdotV = dot(vNormal, vViewDir);

          // Limb darkening (Neckel & Labs solar model, simplified)
          float mu = max(NdotV, 0.0);
          float limbDarkening = 0.3 + 0.7 * mu;
          limbDarkening *= 0.85 + 0.15 * mu * mu;

          // Base texture color
          vec3 texColor = texture2D(uSunMap, vUv).rgb;

          // Procedural granulation (solar convection cells)
          vec2 granuleUV = vUv * 18.0 + time * 0.02;
          float granule = fbm(granuleUV);
          float granule2 = fbm(granuleUV * 1.5 + vec2(3.7, 1.2));
          float cellPattern = smoothstep(0.35, 0.65, granule) * 0.15;

          // Sunspot-like darker regions (slow-moving, large scale)
          vec2 spotUV = vUv * 3.0 + time * 0.003;
          float spots = fbm(spotUV + vec2(5.0, 8.0));
          float spotMask = smoothstep(0.62, 0.72, spots) * 0.3;

          // Surface turbulence color variation
          vec3 hotColor = vec3(1.0, 0.95, 0.8);
          vec3 coolColor = vec3(1.0, 0.65, 0.3);
          vec3 surfaceColor = mix(texColor, hotColor, cellPattern);
          surfaceColor = mix(surfaceColor, coolColor * 0.6, spotMask);

          // Limb color shift (edges are redder/cooler)
          vec3 limbColor = vec3(1.0, 0.45, 0.15);
          float limbMix = pow(1.0 - mu, 2.5);
          surfaceColor = mix(surfaceColor, limbColor, limbMix * 0.5);

          // Apply limb darkening
          vec3 finalColor = surfaceColor * limbDarkening;

          // HDR: push above 1.0 for bloom to catch the bright center
          finalColor *= 1.8;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }

  public static createCoronaMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vWorldPos;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float time;

        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vWorldPos;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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

        void main() {
          float NdotV = dot(vNormal, vViewDir);
          float rim = 1.0 - max(NdotV, 0.0);

          // Corona radial falloff — soft exponential decay from the limb
          float corona = pow(rim, 1.5) * exp(-pow(1.0 - rim, 2.0) * 3.0);

          // Streamer noise (radial plasma streamers)
          float angle = atan(vWorldPos.y, vWorldPos.x);
          float streamer = fbm(vec2(angle * 4.0, rim * 2.0 + time * 0.12));
          streamer = smoothstep(0.3, 0.7, streamer);

          // Coronal color: white-yellow inner to soft orange outer
          vec3 innerCorona = vec3(1.0, 0.93, 0.75);
          vec3 outerCorona = vec3(1.0, 0.55, 0.2);
          vec3 coronaColor = mix(innerCorona, outerCorona, pow(rim, 0.7));

          float alpha = corona * (0.3 + streamer * 0.25);
          alpha *= smoothstep(0.0, 0.25, rim);

          // HDR brightness for bloom
          coronaColor *= 1.5;

          gl_FragColor = vec4(coronaColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }
}
