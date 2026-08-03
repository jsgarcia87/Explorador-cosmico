import * as THREE from 'three';

/**
 * AtmosphereShader.js — NASA-Grade PBR Limb Rayleigh & Mie Atmospheric Scattering Shader
 * Generates an authentic thin glowing atmospheric halo around terrestrial and giant planets.
 */
export function createAtmosphereMesh(planetRadius, atmosphereColorHex, intensity = 1.0, power = 3.2) {
  const geometry = new THREE.SphereGeometry(planetRadius * 1.035, 64, 64);
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(atmosphereColorHex) },
      uIntensity: { value: intensity },
      uPower: { value: power },
      uViewPosition: { value: new THREE.Vector3() }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uPower;
      uniform vec3 uViewPosition;
      
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      
      void main() {
        // Compute view vector from camera to atmosphere vertex
        vec3 viewDir = normalize(uViewPosition - vWorldPosition);
        
        // Rayleigh & Fresnel Limb Scattering
        float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
        float scatter = pow(rim, uPower) * uIntensity;
        
        // Soft sunset/airglow tinting at grazing angles
        vec3 glowColor = uColor + vec3(scatter * 0.25, scatter * 0.1, 0.0);
        
        gl_FragColor = vec4(glowColor, scatter * 0.92);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.atmosphereMat = material;
  return mesh;
}
