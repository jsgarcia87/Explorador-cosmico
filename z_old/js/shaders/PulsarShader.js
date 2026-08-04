import * as THREE from 'three';

/**
 * PulsarShader.js
 * Simulación de Estrella de Neutrones (PSR J0534+2200 - Nebulosa del Cangrejo / Vela)
 * Superficie ultradensa de corteza magnética, conos de radiación sincrotrón polarizados
 * y líneas de campo magnético toroidal colimadas.
 */

export const PulsarSurfaceGLSL = {
  uniforms: {
    uTime: { value: 0.0 },
    uColorBase: { value: new THREE.Color(0x0a1c3e) },
    uColorBeam: { value: new THREE.Color(0x00f0ff) },
    uColorHotspot: { value: new THREE.Color(0xfff5ea) }
  },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColorBase;
    uniform vec3 uColorBeam;
    uniform vec3 uColorHotspot;

    void main() {
      // Hotspots polares magnéticos del púlsar en polos y
      float polarDist = abs(vPosition.y);
      float polarGlow = pow(smoothstep(0.5, 1.0, polarDist), 4.0);
      
      // Pulso electromagnético sincrotrón rotacional
      float pulse = abs(sin(vPosition.x * 6.0 + uTime * 12.0) * cos(vPosition.z * 6.0 - uTime * 8.0));
      
      vec3 color = mix(uColorBase, uColorBeam, pulse * 0.45);
      color = mix(color, uColorHotspot, polarGlow);

      // Efecto Fresnel cuántico en atmósfera hiperdensa
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
      color += uColorBeam * fresnel * 1.4;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

/**
 * Cono de radiación sincrotrón
 */
export const SynchrotronConeGLSL = {
  uniforms: {
    uTime: { value: 0.0 },
    uColor: { value: new THREE.Color(0x00f0ff) }
  },
  vertexShader: /* glsl */ `
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;

    void main() {
      float radialFade = pow(1.0 - vUv.y, 2.0);
      float centerBeam = pow(sin(vUv.x * 3.14159265), 1.5);
      float plasmaFlicker = 0.85 + 0.15 * sin(uTime * 25.0 - vUv.y * 12.0);
      
      float alpha = radialFade * centerBeam * plasmaFlicker * 0.75;
      vec3 glow = uColor + vec3(0.4, 0.7, 1.0) * pow(centerBeam, 4.0);

      gl_FragColor = vec4(glow, alpha);
    }
  `
};

/**
 * Crea el sistema 3D de Púlsar con estrella hiperdensa y haces sincrotrón bipolares
 */
export function createPulsarSystem(options = {}) {
  const group = new THREE.Group();
  group.name = 'pulsar_system';

  // Estrella de Neutrones (Radio físico compacto)
  const sphereGeo = new THREE.SphereGeometry(1.8, 64, 64);
  const surfaceMat = new THREE.ShaderMaterial({
    vertexShader: PulsarSurfaceGLSL.vertexShader,
    fragmentShader: PulsarSurfaceGLSL.fragmentShader,
    uniforms: THREE.UniformsUtils.clone(PulsarSurfaceGLSL.uniforms)
  });
  const neutronStar = new THREE.Mesh(sphereGeo, surfaceMat);
  neutronStar.name = 'neutron_star_core';
  group.add(neutronStar);

  // Cono Norte
  const coneGeo = new THREE.ConeGeometry(2.4, 18.0, 32, 1, true);
  coneGeo.translate(0, 9.0, 0);
  const coneMat = new THREE.ShaderMaterial({
    vertexShader: SynchrotronConeGLSL.vertexShader,
    fragmentShader: SynchrotronConeGLSL.fragmentShader,
    uniforms: THREE.UniformsUtils.clone(SynchrotronConeGLSL.uniforms),
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const northBeam = new THREE.Mesh(coneGeo, coneMat);
  northBeam.name = 'north_synchrotron_beam';
  group.add(northBeam);

  // Cono Sur
  const southConeGeo = coneGeo.clone();
  southConeGeo.rotateX(Math.PI);
  const southBeam = new THREE.Mesh(southConeGeo, coneMat);
  southBeam.name = 'south_synchrotron_beam';
  group.add(southBeam);

  // Inclinación del eje magnético respecto al eje de rotación (~24 grados)
  const magneticGroup = new THREE.Group();
  magneticGroup.add(northBeam);
  magneticGroup.add(southBeam);
  magneticGroup.rotation.z = 0.42;
  group.add(magneticGroup);

  group.userData = {
    surfaceMat,
    coneMat,
    magneticGroup,
    update: (dt, time, simSpeed = 1.0) => {
      surfaceMat.uniforms.uTime.value = time;
      coneMat.uniforms.uTime.value = time;
      // Giro ultrarrápido del púlsar
      neutronStar.rotation.y += dt * 6.0 * simSpeed;
      magneticGroup.rotation.y += dt * 6.0 * simSpeed;
    }
  };

  return group;
}
