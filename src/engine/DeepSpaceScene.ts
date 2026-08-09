import * as THREE from 'three';
import { DEEP_SPACE_OBJECTS, DeepSpaceObjectData } from '../data/deepSpace';
import { RelativisticBlackHoleShader } from './shaders/RelativisticBlackHoleShader';
import { ProceduralTextures } from './textures/ProceduralTextures';
import { SunShader } from './shaders/SunShader';

export class DeepSpaceScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private objectMeshes: Map<string, THREE.Object3D> = new Map();
  private pulsarBeam1!: THREE.Mesh;
  private pulsarBeam2!: THREE.Mesh;
  private gargantuaMaterial!: THREE.ShaderMaterial;
  private betelgeuseMesh!: THREE.Mesh;
  private betelgeuseMaterial: THREE.ShaderMaterial | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    // 1. Iluminación ambiental y galáctica base
    const ambientLight = new THREE.AmbientLight(0x221a30, 0.4); // Reducido para mejor contraste
    this.rootGroup.add(ambientLight);

    // Añadir luz de hemisferio para resaltar los detalles de gas y polvo
    const hemiLight = new THREE.HemisphereLight(0x443366, 0x111122, 0.6);
    this.rootGroup.add(hemiLight);

    // 1. Esfera de bóveda celeste profunda (Vía Láctea)
    const domeGeo = new THREE.SphereGeometry(180, 48, 48);
    const milkyWayTex = ProceduralTextures.generateMilkyWayTexture();
    const domeMat = new THREE.MeshBasicMaterial({
      map: milkyWayTex,
      color: 0x888888, // Un poco oscurecido para resaltar el deep space
      side: THREE.BackSide,
      fog: false
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.rotation.x = Math.PI / 4;
    this.rootGroup.add(dome);

    DEEP_SPACE_OBJECTS.forEach((item) => {
      this.createDeepObject(item);
    });

    // Crear red de filamentos cósmicos suaves
    this.createDarkMatterFilaments();

    this.scene.add(this.rootGroup);
    this.setVisible(false);
  }

  private createDeepObject(data: DeepSpaceObjectData): void {
    // 1. Gargantua (Agujero Negro con lensing gravitacional ray-traced en GPU)
    if (data.isGrrtBlackHole) {
      const bhSphereRadius = 20.0;
      const bhRs = 2.0;
      const geo = new THREE.SphereGeometry(bhSphereRadius, 96, 96);
      this.gargantuaMaterial = RelativisticBlackHoleShader.createMaterial({
        spin: 0.9,
        accretionRate: 1.25,
        inclination: 1.15,
        innerHex: '#ffffff',
        outerHex: '#ff5500',
        schwarzschildRadius: bhRs,
        sphereRadius: bhSphereRadius
      });

      const mesh = new THREE.Mesh(geo, this.gargantuaMaterial);
      mesh.name = data.name;
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      mesh.userData = {
        id: data.id,
        type: 'deep_space',
        data: data
      };

      // Chorros relativistas de plasma (Jets polares) — soft billboard sprites
      const jetCanvas = document.createElement('canvas');
      jetCanvas.width = 128;
      jetCanvas.height = 512;
      const jCtx = jetCanvas.getContext('2d')!;
      // Vertical gradient: bright base fading to nothing at tip
      for (let y = 0; y < 512; y++) {
        const vt = y / 512; // 0=top(tip), 1=bottom(base)
        const vAlpha = Math.pow(vt, 0.8) * 0.5;
        // Radial gradient per row for soft edges
        const rowGrad = jCtx.createLinearGradient(0, y, 128, y);
        const coreAlpha = vAlpha;
        const edgeAlpha = 0;
        rowGrad.addColorStop(0, `rgba(85,208,255,${edgeAlpha})`);
        rowGrad.addColorStop(0.3, `rgba(85,208,255,${coreAlpha * 0.3})`);
        rowGrad.addColorStop(0.5, `rgba(140,220,255,${coreAlpha})`);
        rowGrad.addColorStop(0.7, `rgba(85,208,255,${coreAlpha * 0.3})`);
        rowGrad.addColorStop(1, `rgba(85,208,255,${edgeAlpha})`);
        jCtx.fillStyle = rowGrad;
        jCtx.fillRect(0, y, 128, 1);
      }
      const jetTex = new THREE.CanvasTexture(jetCanvas);

      const makeJet = () => {
        const group = new THREE.Group();
        // Two crossing planes for volumetric look
        for (let i = 0; i < 2; i++) {
          const planeGeo = new THREE.PlaneGeometry(6, 28);
          const planeMat = new THREE.MeshBasicMaterial({
            map: jetTex,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
            opacity: 0.35,
          });
          const plane = new THREE.Mesh(planeGeo, planeMat);
          plane.rotation.y = (i * Math.PI) / 2;
          group.add(plane);
        }
        return group;
      };

      const topJet = makeJet();
      topJet.position.y = 28;
      mesh.add(topJet);

      const bottomJet = makeJet();
      bottomJet.position.y = -28;
      bottomJet.rotation.z = Math.PI;
      mesh.add(bottomJet);

      const bhLight = new THREE.PointLight(0xffaa55, 3.0, 500, 1.5);
      mesh.add(bhLight);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // 2. Si es Púlsar (Estrella de Neutrones — tiny core + narrow diffuse radiation beams)
    if (data.hasPulsarBeams) {
      const coreRadius = 1.2;
      const geo = new THREE.SphereGeometry(coreRadius, 48, 48);
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float time;
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            float mu = max(dot(vNormal, vViewDir), 0.0);
            float pulse = 0.85 + 0.15 * sin(time * 30.0);
            vec3 color = vec3(0.7, 0.92, 1.0) * (0.6 + 0.4 * mu) * pulse;
            color *= 1.8;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = data.name;
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      mesh.userData = {
        id: data.id,
        type: 'deep_space',
        data: data,
        pulsarCoreMat: mat,
      };

      // Magnetosphere glow (toroidal)
      const magnetoGeo = new THREE.SphereGeometry(coreRadius * 2.5, 32, 32);
      const magnetoMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
            float glow = pow(rim, 4.0) * 0.3;
            vec3 color = vec3(0.5, 0.8, 1.0) * glow;
            gl_FragColor = vec4(color, glow * 0.5);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      mesh.add(new THREE.Mesh(magnetoGeo, magnetoMat));

      // Narrow, diffuse radiation beams (billboard planes, not solid cones)
      const beamCanvas = document.createElement('canvas');
      beamCanvas.width = 64;
      beamCanvas.height = 512;
      const beamCtx = beamCanvas.getContext('2d');
      if (beamCtx) {
        for (let y = 0; y < 512; y++) {
          const t = y / 512;
          const alpha = Math.pow(1.0 - t, 1.5) * 0.35;
          const rowGrad = beamCtx.createLinearGradient(0, y, 64, y);
          rowGrad.addColorStop(0, `rgba(120,200,255,0)`);
          rowGrad.addColorStop(0.35, `rgba(140,215,255,${alpha * 0.3})`);
          rowGrad.addColorStop(0.5, `rgba(180,235,255,${alpha})`);
          rowGrad.addColorStop(0.65, `rgba(140,215,255,${alpha * 0.3})`);
          rowGrad.addColorStop(1, `rgba(120,200,255,0)`);
          beamCtx.fillStyle = rowGrad;
          beamCtx.fillRect(0, y, 64, 1);
        }
      }
      const beamTexture = new THREE.CanvasTexture(beamCanvas);

      const makeBeam = () => {
        const group = new THREE.Group();
        for (let i = 0; i < 2; i++) {
          const planeGeo = new THREE.PlaneGeometry(3.0, 22);
          const planeMat = new THREE.MeshBasicMaterial({
            map: beamTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
            opacity: 0.6,
          });
          const plane = new THREE.Mesh(planeGeo, planeMat);
          plane.rotation.y = (i * Math.PI) / 2;
          group.add(plane);
        }
        return group;
      };

      this.pulsarBeam1 = makeBeam() as any;
      (this.pulsarBeam1 as any).position.y = 11;
      mesh.add(this.pulsarBeam1);

      this.pulsarBeam2 = makeBeam() as any;
      (this.pulsarBeam2 as any).position.y = -11;
      (this.pulsarBeam2 as any).rotation.z = Math.PI;
      mesh.add(this.pulsarBeam2);

      const pulsarLight = new THREE.PointLight(0x88ccff, 3.0, 250, 2.0);
      mesh.add(pulsarLight);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // 3. Si es Betelgeuse (Supergigante roja pulsante — shader con limb darkening y convección)
    if (data.id === 'gigante_roja') {
      const geo = new THREE.SphereGeometry(4.5, 64, 64);
      this.betelgeuseMaterial = SunShader.createBetelgeuseMaterial();
      const mesh = new THREE.Mesh(geo, this.betelgeuseMaterial);
      mesh.name = data.name;
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      mesh.userData = {
        id: data.id,
        type: 'deep_space',
        data: data
      };
      this.betelgeuseMesh = mesh;

      // Tenuous outer atmosphere glow (red supergiant extended envelope)
      const envelopeGeo = new THREE.SphereGeometry(4.5 * 1.15, 48, 48);
      const envelopeMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
            float glow = pow(rim, 3.5) * 0.4;
            vec3 color = vec3(1.0, 0.2, 0.03) * glow;
            gl_FragColor = vec4(color, glow * 0.6);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const envelope = new THREE.Mesh(envelopeGeo, envelopeMat);
      mesh.add(envelope);

      const betelgeuseLight = new THREE.PointLight(0xff2200, 4.0, 800, 1.5);
      mesh.add(betelgeuseLight);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // 4. Nebulosas y Galaxias (Astrofotografía Volumétrica NASA/ESA: Cero Esferas Sólidas)
    // Esfera de detección invisible para permitir clic del usuario y raycasting
    const hitGeo = new THREE.SphereGeometry(7.0, 16, 16);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const mesh = new THREE.Mesh(hitGeo, hitMat);
    mesh.name = data.name;
    mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
    mesh.userData = {
      id: data.id,
      type: 'deep_space',
      data: data
    };

    const starDot = ProceduralTextures.generateStarDot();

    if (data.id === 'galaxia' || data.type === 'Galaxia') {
      // GALAXIA ESPIRAL REALISTA: Brazos logarítmicos, bulbo amarillo/ámbar, estrellas azules y carriles de polvo
      const armCount = 3;
      const starCount = 2800;
      const posArr = new Float32Array(starCount * 3);
      const colArr = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        const arm = i % armCount;
        const t = Math.random();
        const r = t * 14;
        const angle = t * 6.5 + arm * ((Math.PI * 2) / armCount) + (Math.random() - 0.5) * 0.45;
        const x = Math.cos(angle) * r + (Math.random() - 0.5) * 1.3;
        const z = Math.sin(angle) * r + (Math.random() - 0.5) * 1.3;
        const y = (Math.random() - 0.5) * 0.7 * (1 - t * 0.6);

        posArr[i * 3] = x;
        posArr[i * 3 + 1] = y;
        posArr[i * 3 + 2] = z;

        // Bulbo central cálido (naranja/ámbar) -> Brazos exteriores jóvenes (blanco azulado)
        const mix = 1 - t;
        const intensity = 1.0 + Math.pow(mix, 4.0) * 3.0;
        colArr[i * 3] = (0.58 + 0.42 * mix) * intensity;
        colArr[i * 3 + 1] = (0.62 + 0.28 * mix) * intensity;
        colArr[i * 3 + 2] = (1.0 - 0.3 * mix) * intensity;
      }

      const galGeo = new THREE.BufferGeometry();
      galGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
      galGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
      const galMat = new THREE.PointsMaterial({
        size: 1.4,
        map: starDot,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const galaxyStars = new THREE.Points(galGeo, galMat);
      mesh.add(galaxyStars);

      // Carriles oscuros de polvo galáctico (Dust Lanes no aditivos)
      const dustCount = 380;
      const dPosArr = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        const arm = i % armCount;
        const t = Math.random() * 0.75;
        const r = t * 14;
        const angle = t * 6.5 + arm * ((Math.PI * 2) / armCount) + 0.15 + (Math.random() - 0.5) * 0.25;
        dPosArr[i * 3] = Math.cos(angle) * r;
        dPosArr[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
        dPosArr[i * 3 + 2] = Math.sin(angle) * r;
      }
      const dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute('position', new THREE.BufferAttribute(dPosArr, 3));
      const dMat = new THREE.PointsMaterial({
        size: 1.8,
        color: 0x3a2215,
        map: starDot,
        transparent: true,
        opacity: 0.42,
        depthWrite: false
      });
      const dustPoints = new THREE.Points(dGeo, dMat);
      mesh.add(dustPoints);

      // Glowing is handled by HDR Bloom instead of fake sprites
    } else {
      // NEBULOSA — Pilares de la Creación: columnar structures with narrowband emission palette
      // SHO palette (Hubble): SII=red, H-alpha=green-mapped, OIII=blue
      // Visual palette: warm reds/oranges for SII+H-alpha, teal/blue for OIII, dark dust for depth

      // Columnar pillar structures (tall, narrow sprites oriented vertically)
      const pillarConfigs = [
        { color: '#c03048', seed: 0, x: -2.5, y: 0, z: 0, w: 5, h: 16, opacity: 0.18 },
        { color: '#b83838', seed: 1, x: 1.5, y: -1, z: 1, w: 4, h: 14, opacity: 0.16 },
        { color: '#a04030', seed: 2, x: 4.5, y: -2, z: -1, w: 3.5, h: 11, opacity: 0.15 },
      ];

      for (const p of pillarConfigs) {
        const tex = ProceduralTextures.generateNebulaCloud(p.color, p.seed, 512);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: p.opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        sprite.scale.set(p.w, p.h, 1);
        sprite.position.set(p.x, p.y, p.z);
        mesh.add(sprite);
      }

      // Outer diffuse H-alpha and OIII glow (large, faint shells)
      const outerLayers = [
        { color: '#9e2838', seed: 10, x: 0, y: 2, z: 0, scale: 20, opacity: 0.06 },
        { color: '#186878', seed: 11, x: -3, y: 3, z: -2, scale: 18, opacity: 0.05 },
        { color: '#9e2838', seed: 12, x: 3, y: -2, z: 2, scale: 22, opacity: 0.05 },
      ];

      for (const layer of outerLayers) {
        const tex = ProceduralTextures.generateNebulaCloud(layer.color, layer.seed, 512);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: layer.opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        sprite.scale.set(layer.scale, layer.scale, 1);
        sprite.position.set(layer.x, layer.y, layer.z);
        mesh.add(sprite);
      }

      // Mid-density gas with varied emission colors
      const midColors = ['#b83040', '#a84028', '#186858', '#884428', '#b83040', '#186858'];
      for (let i = 0; i < 12; i++) {
        const colorHex = midColors[i % midColors.length];
        const tex = ProceduralTextures.generateNebulaCloud(colorHex, 20 + i, 256);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: 0.08 + Math.random() * 0.06,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        const baseW = 3 + Math.random() * 5;
        const baseH = 5 + Math.random() * 8;
        sprite.scale.set(baseW, baseH, 1);
        sprite.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        );
        sprite.material.rotation = (Math.random() - 0.5) * 0.4;
        mesh.add(sprite);
      }

      // Ionization fronts at pillar tips (brighter, warmer)
      for (let i = 0; i < 4; i++) {
        const tex = ProceduralTextures.generateNebulaCloud('#dd8844', 50 + i, 128);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: 0.14,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        sprite.scale.set(3, 3, 1);
        sprite.position.set(
          pillarConfigs[Math.min(i, 2)].x + (Math.random() - 0.5) * 2,
          pillarConfigs[Math.min(i, 2)].y + pillarConfigs[Math.min(i, 2)].h * 0.35,
          pillarConfigs[Math.min(i, 2)].z
        );
        mesh.add(sprite);
      }

      // Newborn stars embedded in the pillars
      const starCount = 18;
      const sPosArr = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const pi = i % 3;
        const cfg = pillarConfigs[pi];
        sPosArr[i * 3] = cfg.x + (Math.random() - 0.5) * cfg.w * 0.4;
        sPosArr[i * 3 + 1] = cfg.y + (Math.random() - 0.5) * cfg.h * 0.5;
        sPosArr[i * 3 + 2] = cfg.z + (Math.random() - 0.5) * 2;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPosArr, 3));
      const sMat = new THREE.PointsMaterial({
        size: 0.5,
        color: new THREE.Color(0xfff0dd).multiplyScalar(1.4),
        map: starDot,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      mesh.add(new THREE.Points(sGeo, sMat));

      // Dark dust lanes (non-additive — absorb light for depth)
      for (let i = 0; i < 6; i++) {
        const tex = ProceduralTextures.generateNebulaCloud('#0a0404', 60 + i, 256);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: 0.18 + Math.random() * 0.08,
            depthWrite: false,
          })
        );
        const w = 3 + Math.random() * 5;
        const h = 5 + Math.random() * 8;
        sprite.scale.set(w, h, 1);
        sprite.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 + 1
        );
        sprite.material.rotation = (Math.random() - 0.5) * 0.3;
        mesh.add(sprite);
      }
    }

    this.rootGroup.add(mesh);
    this.objectMeshes.set(data.id, mesh);
  }

  private createDarkMatterFilaments(): void {
    const points: THREE.Vector3[] = [];
    const positions = DEEP_SPACE_OBJECTS.map(o => new THREE.Vector3(...o.pos));

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 40) {
          points.push(positions[i]);
          points.push(positions[j]);
        }
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x6e48ab,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });
    const web = new THREE.LineSegments(geometry, material);
    this.rootGroup.add(web);
  }

  public update(delta: number, timeSpeed: number): void {
    if (!this.rootGroup.visible) return;

    // 1. Actualizar el tiempo en el shader de Gargantua y pasar env map para lensing
    if (this.gargantuaMaterial) {
      this.gargantuaMaterial.uniforms.time.value += delta * Math.min(timeSpeed, 10);
      if (!this.gargantuaMaterial.uniforms.uEnvMap.value && this.scene.background instanceof THREE.Texture) {
        this.gargantuaMaterial.uniforms.uEnvMap.value = this.scene.background;
        this.gargantuaMaterial.uniforms.uHasEnvMap.value = 1.0;
      }
    }

    // 2. Animate Betelgeuse shader and pulsation
    if (this.betelgeuseMaterial) {
      this.betelgeuseMaterial.uniforms.time.value += delta * 0.5;
    }
    if (this.betelgeuseMesh) {
      const scale = 1.0 + Math.sin(performance.now() * 0.003) * 0.06;
      this.betelgeuseMesh.scale.set(scale, scale, scale);
    }

    // 3. Rotar Púlsar rápidamente + animate core
    if (this.pulsarBeam1 && this.pulsarBeam1.parent) {
      this.pulsarBeam1.parent.rotation.y += delta * 6.5;
      this.pulsarBeam1.parent.rotation.x += delta * 2.0;
      const coreMat = this.pulsarBeam1.parent.userData.pulsarCoreMat as THREE.ShaderMaterial | undefined;
      if (coreMat) coreMat.uniforms.time.value += delta;
    }
  }

  public getAllInteractiveObjects(): THREE.Object3D[] {
    return Array.from(this.objectMeshes.values());
  }

  public setVisible(visible: boolean): void {
    this.rootGroup.visible = visible;
    if (this.pulsarBeam1) this.pulsarBeam1.visible = visible;
    if (this.pulsarBeam2) this.pulsarBeam2.visible = visible;
  }
}
