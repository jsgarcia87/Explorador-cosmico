import * as THREE from 'three';
import { DEEPSPACE } from '../datos-cosmicos.js';
import { createBlackHoleSystem } from '../shaders/BlackHoleShader.js';
import { createPulsarSystem } from '../shaders/PulsarShader.js';
import { createNebulaSystem } from '../shaders/NebulaShader.js';

/**
 * DeepSpaceObjects.js
 * Ensamblaje y registro de los cuerpos celestes del Universo Profundo
 * integrando los motores de Raymarching Relativista y Física PBR de grado NASA/ESA.
 */

export function buildDeepSpaceScene(scene, focusables) {
  const deepGroup = new THREE.Group();
  deepGroup.name = 'deep_space_group';
  scene.add(deepGroup);

  // 1. Agujero Negro Relativista ("Gargantua") - Raymarching & Geodésicas
  {
    const d = DEEPSPACE.find(x => x.id === 'agujero');
    if (d) {
      const bhSystem = createBlackHoleSystem(d.relativityParams || {});
      bhSystem.position.set(...d.pos);
      deepGroup.add(bhSystem);

      focusables[d.id] = {
        mesh: bhSystem,
        data: d,
        shaderMat: bhSystem.userData.shaderMat,
        s2Star: bhSystem.userData.s2Star,
        mat: bhSystem.userData.shaderMat,
        isRelativisticBlackHole: true
      };
    }
  }

  // 2. Púlsar de Neutrones Magnetizado
  {
    const d = DEEPSPACE.find(x => x.id === 'pulsar');
    if (d) {
      const pulsarSystem = createPulsarSystem();
      pulsarSystem.position.set(...d.pos);
      deepGroup.add(pulsarSystem);

      focusables[d.id] = {
        mesh: pulsarSystem,
        data: d,
        surfaceMat: pulsarSystem.userData.surfaceMat,
        coneMat: pulsarSystem.userData.coneMat,
        mat: pulsarSystem.userData.surfaceMat
      };
    }
  }

  // 3. Nebulosa de Emisión Hubble SHO 3D
  {
    const d = DEEPSPACE.find(x => x.id === 'nebulosa');
    if (d) {
      const nebulaSystem = createNebulaSystem();
      nebulaSystem.position.set(...d.pos);
      deepGroup.add(nebulaSystem);

      focusables[d.id] = {
        mesh: nebulaSystem,
        data: d,
        mat: nebulaSystem.userData.material
      };
    }
  }

  // 4. Gigante Roja Supermasiva (Betelgeuse style)
  {
    const d = DEEPSPACE.find(x => x.id === 'gigante');
    if (d) {
      const redGeo = new THREE.SphereGeometry(14.0, 64, 64);
      const redMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorDark: { value: new THREE.Color(0x8b0000) },
          uColorBright: { value: new THREE.Color(0xff4500) }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColorDark;
          uniform vec3 uColorBright;
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            float conv = sin(vPos.x * 0.4 + uTime) * cos(vPos.y * 0.4 + uTime * 0.8) * sin(vPos.z * 0.4) * 0.5 + 0.5;
            float limb = pow(1.0 - abs(vNormal.z), 1.8);
            vec3 col = mix(uColorDark, uColorBright, conv);
            col += vec3(1.0, 0.3, 0.0) * limb * 0.8;
            gl_FragColor = vec4(col * 1.6, 1.0);
          }
        `
      });
      const redGiant = new THREE.Mesh(redGeo, redMat);
      redGiant.position.set(...d.pos);
      deepGroup.add(redGiant);

      focusables[d.id] = { mesh: redGiant, data: d, mat: redMat };
    }
  }

  // 5. Supernova Remanente (Onda de choque volumétrica)
  {
    const d = DEEPSPACE.find(x => x.id === 'supernova');
    if (d) {
      const snGroup = new THREE.Group();
      snGroup.position.set(...d.pos);

      const coreGeo = new THREE.SphereGeometry(2.5, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const snCore = new THREE.Mesh(coreGeo, coreMat);
      snGroup.add(snCore);

      const shellGeo = new THREE.SphereGeometry(16.0, 64, 64);
      const shellMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color(0x00ffff) },
          uColor2: { value: new THREE.Color(0xff0055) }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            float shock = sin(length(vPos) * 2.0 - uTime * 6.0) * 0.5 + 0.5;
            float rim = 1.0 - abs(vNormal.z);
            vec3 col = mix(uColor1, uColor2, shock);
            gl_FragColor = vec4(col * 2.0, pow(rim, 1.5) * 0.85);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const snShell = new THREE.Mesh(shellGeo, shellMat);
      snGroup.add(snShell);

      deepGroup.add(snGroup);
      focusables[d.id] = { mesh: snGroup, data: d, mat: shellMat, snCore, snShell };
    }
  }

  // 6. Enana Blanca Degenerada con Anillo
  {
    const d = DEEPSPACE.find(x => x.id === 'enana');
    if (d) {
      const wdGroup = new THREE.Group();
      wdGroup.position.set(...d.pos);

      const wdGeo = new THREE.SphereGeometry(1.4, 48, 48);
      const wdMat = new THREE.MeshStandardMaterial({
        color: 0xeef8ff,
        emissive: 0x99ccff,
        emissiveIntensity: 2.5,
        roughness: 0.05
      });
      const wdMesh = new THREE.Mesh(wdGeo, wdMat);
      wdGroup.add(wdMesh);

      const ringGeo = new THREE.RingGeometry(3.0, 8.5, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xaabbcc,
        emissive: 0x223344,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 - 0.2;
      wdGroup.add(ringMesh);

      deepGroup.add(wdGroup);
      focusables[d.id] = { mesh: wdGroup, data: d, wdMesh, ringMesh };
    }
  }

  // 7. Disco Protoplanetario Herbig-Haro (HH-24)
  {
    const d = DEEPSPACE.find(x => x.id === 'protoplanetario');
    if (d) {
      const protoGroup = new THREE.Group();
      protoGroup.position.set(...d.pos);

      const starGeo = new THREE.SphereGeometry(3.2, 32, 32);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0xffaa44,
        emissive: 0xff6600,
        emissiveIntensity: 1.8
      });
      const tTauriStar = new THREE.Mesh(starGeo, starMat);
      protoGroup.add(tTauriStar);

      const diskGeo = new THREE.RingGeometry(4.5, 18.0, 128);
      const diskMat = new THREE.MeshStandardMaterial({
        color: 0xcc8855,
        emissive: 0x442211,
        side: THREE.DoubleSide,
        roughness: 0.9,
        transparent: true,
        opacity: 0.88
      });
      const protoDisk = new THREE.Mesh(diskGeo, diskMat);
      protoDisk.rotation.x = Math.PI / 2 - 0.3;
      protoGroup.add(protoDisk);

      deepGroup.add(protoGroup);
      focusables[d.id] = { mesh: protoGroup, data: d, star: tTauriStar, disk: protoDisk };
    }
  }

  // 8. Sistema Binario de Contacto (Roche Lobe & L1 Stream)
  {
    const d = DEEPSPACE.find(x => x.id === 'binario');
    if (d) {
      const binGroup = new THREE.Group();
      binGroup.position.set(...d.pos);

      const s1Geo = new THREE.SphereGeometry(4.0, 48, 48);
      const s1Mat = new THREE.MeshStandardMaterial({
        color: 0x66bbff,
        emissive: 0x1166ff,
        emissiveIntensity: 2.0
      });
      const star1 = new THREE.Mesh(s1Geo, s1Mat);
      star1.position.x = -4.2;
      binGroup.add(star1);

      const s2Geo = new THREE.SphereGeometry(2.8, 48, 48);
      const s2Mat = new THREE.MeshStandardMaterial({
        color: 0xffbb44,
        emissive: 0xff5500,
        emissiveIntensity: 1.6
      });
      const star2 = new THREE.Mesh(s2Geo, s2Mat);
      star2.position.x = 3.8;
      binGroup.add(star2);

      const bridgeGeo = new THREE.CylinderGeometry(0.8, 0.4, 4.0, 16);
      const bridgeMat = new THREE.MeshStandardMaterial({
        color: 0xffeedd,
        emissive: 0xffaa44,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.85
      });
      const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
      bridge.rotation.z = Math.PI / 2;
      binGroup.add(bridge);

      deepGroup.add(binGroup);
      focusables[d.id] = { mesh: binGroup, data: d, star1, star2, bridge };
    }
  }

  // 9. Galaxia Espiral Barrada (SBbc)
  {
    const d = DEEPSPACE.find(x => x.id === 'galaxia');
    if (d) {
      const galGroup = new THREE.Group();
      galGroup.position.set(...d.pos);

      const coreGeo = new THREE.SphereGeometry(4.0, 32, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xffeedd,
        emissive: 0xffcc88,
        emissiveIntensity: 2.2
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      galGroup.add(core);

      const starCount = 8000;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const arm = i % 2;
        const r = 3.0 + Math.pow(Math.random(), 1.5) * 22.0;
        const theta = r * 0.45 + (arm * Math.PI) + (Math.random() - 0.5) * 0.4;
        positions[i * 3]     = Math.cos(theta) * r;
        positions[i * 3 + 1] = (Math.random() - 0.5) * (1.5 - r * 0.04);
        positions[i * 3 + 2] = Math.sin(theta) * r;

        const isInner = r < 10.0;
        const col = isInner ? new THREE.Color(0xffddaa) : new THREE.Color(0x88ccff);
        colors[i * 3]     = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }
      const pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const pointsMat = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const galaxyStars = new THREE.Points(pointsGeo, pointsMat);
      galGroup.add(galaxyStars);

      deepGroup.add(galGroup);
      focusables[d.id] = { mesh: galGroup, data: d, galaxyStars, core };
    }
  }

  return deepGroup;
}
