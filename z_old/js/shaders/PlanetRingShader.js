import * as THREE from 'three';

/**
 * PlanetRingShader.js — NASA-Grade PBR Planetary Ring Shader with Planet Shadow Occlusion
 * Simulates Cassini Division, ring density variations (A, B, C rings), and real-time self-shadowing
 * from the central planetary body.
 */
export function createPlanetRingMesh(innerRadius, outerRadius, colorHex, isUranus = false) {
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
  // Orient horizontally around planet's equator
  geometry.rotateX(Math.PI / 2);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(colorHex) },
      uInnerRadius: { value: innerRadius },
      uOuterRadius: { value: outerRadius },
      uPlanetRadius: { value: innerRadius * 0.55 },
      uSunDir: { value: new THREE.Vector3(1, 0, 0).normalize() },
      uIsUranus: { value: isUranus ? 1.0 : 0.0 }
    },
    vertexShader: `
      varying vec3 vWorldPos;
      varying float vRadius;
      
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vRadius = length(position.xz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uInnerRadius;
      uniform float uOuterRadius;
      uniform float uPlanetRadius;
      uniform vec3 uSunDir;
      uniform float uIsUranus;
      
      varying vec3 vWorldPos;
      varying float vRadius;
      
      void main() {
        float normR = (vRadius - uInnerRadius) / (uOuterRadius - uInnerRadius);
        
        // 1. Particle density profile & ring divisions
        float alpha = 0.85;
        vec3 ringColor = uColor;
        
        if (uIsUranus > 0.5) {
          // Uranus: narrow, dark, distinct ring bands
          float band = sin(normR * 65.0) * 0.5 + 0.5;
          alpha = pow(band, 3.0) * 0.55 + 0.1;
          ringColor *= 0.8;
        } else {
          // Saturn: C ring (inner, faint), B ring (bright), Cassini Division (gap), A ring (outer)
          if (normR < 0.22) {
            // Crepe C Ring
            alpha = 0.32 * smoothstep(0.0, 0.1, normR);
            ringColor *= 0.75;
          } else if (normR < 0.62) {
            // B Ring (brightest and densest)
            float ripple = sin(normR * 140.0) * 0.06;
            alpha = 0.95 + ripple;
            ringColor *= 1.1;
          } else if (normR < 0.69) {
            // Cassini Division (dark gap)
            alpha = 0.08;
            ringColor *= 0.3;
          } else {
            // A Ring (outer, medium brightness with Encke gap)
            float encke = 1.0 - smoothstep(0.88, 0.90, normR) * (1.0 - smoothstep(0.90, 0.92, normR)) * 0.8;
            alpha = 0.72 * encke;
          }
        }
        
        // 2. Planet Shadow Occlusion on Ring (Real-time ray/sphere shadow intersection)
        // Check if ray from vWorldPos toward Sun intersects planet sphere at origin
        vec3 P = vWorldPos;
        vec3 D = normalize(uSunDir);
        float t = -dot(P, D);
        float shadowFactor = 1.0;
        if (t > 0.0) {
          vec3 closestPoint = P + t * D;
          float distToOrigin = length(closestPoint);
          if (distToOrigin < uPlanetRadius) {
            // Smooth penumbra edge transition
            shadowFactor = smoothstep(uPlanetRadius * 0.82, uPlanetRadius, distToOrigin) * 0.18 + 0.05;
          }
        }
        
        // Edge fade at inner and outer boundaries
        float edgeFade = smoothstep(0.0, 0.04, normR) * (1.0 - smoothstep(0.96, 1.0, normR));
        alpha *= edgeFade;
        
        vec3 finalColor = ringColor * shadowFactor;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 0.4;
  mesh.rotation.y = 0.15;
  mesh.userData.ringShaderMat = material;
  return mesh;
}
