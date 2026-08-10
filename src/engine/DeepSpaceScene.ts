import * as THREE from 'three';
import { DEEP_SPACE_OBJECTS, DeepSpaceObjectData, SUN_GALACTIC_POS, GALAXY_RADIUS } from '../data/deepSpace';
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
  private galaxyPoints!: THREE.Points;
  private andromedaGroup!: THREE.Group;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    const ambientLight = new THREE.AmbientLight(0x221a30, 0.3);
    this.rootGroup.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x443366, 0x111122, 0.4);
    this.rootGroup.add(hemiLight);

    this.createMilkyWayGalaxy();
    this.createSunMarker();

    DEEP_SPACE_OBJECTS.forEach((item) => {
      if (item.isExternalGalaxy) {
        this.createAndromedaGalaxy(item);
      } else {
        this.createDeepObject(item);
      }
    });

    this.scene.add(this.rootGroup);
    this.setVisible(false);
  }

  private createMilkyWayGalaxy(): void {
    const starDot = ProceduralTextures.generateStarDot();
    const armCount = 4;
    const starCount = 22000;
    const posArr = new Float32Array(starCount * 3);
    const colArr = new Float32Array(starCount * 3);
    const sizeArr = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const arm = i % armCount;
      const t = Math.random();
      const r = t * GALAXY_RADIUS;

      // Logarithmic spiral: angle increases with radius
      const armPhase = arm * (Math.PI * 2 / armCount);
      const spiralAngle = Math.log(1 + r * 0.08) * 4.5 + armPhase;
      const scatter = (1 - t * 0.4) * (3 + r * 0.06);
      const angle = spiralAngle + (Math.random() - 0.5) * scatter * 0.04;

      const x = Math.cos(angle) * r + (Math.random() - 0.5) * scatter;
      const z = Math.sin(angle) * r + (Math.random() - 0.5) * scatter;

      // Disk height: thin at edges, thicker near center (bulge)
      const bulgeHeight = r < 20 ? 8 * (1 - r / 20) : 0;
      const diskHeight = 1.5 + bulgeHeight;
      const y = (Math.random() - 0.5) * diskHeight * (Math.random() < 0.1 ? 2.5 : 1.0);

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;

      // Color: warm yellow/amber center -> blue-white spiral arms
      const rDist = Math.sqrt(x * x + z * z);
      const centerFrac = Math.max(0, 1 - rDist / 30);
      const armFrac = 1 - centerFrac;

      const intensity = 0.6 + centerFrac * 2.5 + Math.random() * 0.3;
      colArr[i * 3]     = (0.95 + 0.05 * armFrac) * intensity;
      colArr[i * 3 + 1] = (0.75 - 0.15 * centerFrac + 0.25 * armFrac) * intensity;
      colArr[i * 3 + 2] = (0.45 + 0.55 * armFrac) * intensity;

      sizeArr[i] = r < 15 ? 1.0 + centerFrac * 1.5 : 0.6 + Math.random() * 0.5;
    }

    const galGeo = new THREE.BufferGeometry();
    galGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    galGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
    galGeo.setAttribute('size', new THREE.BufferAttribute(sizeArr, 1));

    const galMat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: starDot },
      },
      vertexShader: /* glsl */ `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (180.0 / -mvPos.z);
          gl_PointSize = clamp(gl_PointSize, 0.5, 8.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor * tex.rgb, tex.a * 0.85);
        }
      `,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.galaxyPoints = new THREE.Points(galGeo, galMat);
    this.rootGroup.add(this.galaxyPoints);

    // Dust lanes along spiral arms (non-additive, dark)
    const dustCount = 3000;
    const dPosArr = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const arm = i % armCount;
      const t = 0.05 + Math.random() * 0.7;
      const r = t * GALAXY_RADIUS * 0.8;
      const armPhase = arm * (Math.PI * 2 / armCount);
      const spiralAngle = Math.log(1 + r * 0.08) * 4.5 + armPhase + 0.12;
      const scatter = (1 - t * 0.3) * 2;
      const angle = spiralAngle + (Math.random() - 0.5) * scatter * 0.03;
      dPosArr[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * scatter;
      dPosArr[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      dPosArr[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * scatter;
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPosArr, 3));
    const dMat = new THREE.PointsMaterial({
      size: 2.5,
      color: 0x1a0e08,
      map: starDot,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    this.rootGroup.add(new THREE.Points(dGeo, dMat));

    // Central bulge glow sprite
    const bulgeCanvas = document.createElement('canvas');
    bulgeCanvas.width = 256;
    bulgeCanvas.height = 256;
    const bCtx = bulgeCanvas.getContext('2d')!;
    const grad = bCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255,220,150,0.6)');
    grad.addColorStop(0.3, 'rgba(255,180,100,0.25)');
    grad.addColorStop(0.6, 'rgba(200,120,60,0.08)');
    grad.addColorStop(1, 'rgba(100,60,30,0)');
    bCtx.fillStyle = grad;
    bCtx.fillRect(0, 0, 256, 256);
    const bulgeTex = new THREE.CanvasTexture(bulgeCanvas);

    const bulgeSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: bulgeTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.7,
      })
    );
    bulgeSprite.scale.set(60, 60, 1);
    bulgeSprite.position.set(0, 0, 0);
    this.rootGroup.add(bulgeSprite);
  }

  private createSunMarker(): void {
    const [sx, sy, sz] = SUN_GALACTIC_POS;

    // Sun position dot
    const sunGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(sx, sy, sz);
    this.rootGroup.add(sunMesh);

    // Glow sprite
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const gCtx = glowCanvas.getContext('2d')!;
    const gGrad = gCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gGrad.addColorStop(0, 'rgba(255,220,80,0.8)');
    gGrad.addColorStop(0.4, 'rgba(255,200,50,0.3)');
    gGrad.addColorStop(1, 'rgba(255,180,30,0)');
    gCtx.fillStyle = gGrad;
    gCtx.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glowCanvas);

    const sunGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    sunGlow.scale.set(6, 6, 1);
    sunGlow.position.set(sx, sy, sz);
    this.rootGroup.add(sunGlow);

    // "Sol" label sprite
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 128;
    labelCanvas.height = 32;
    const lCtx = labelCanvas.getContext('2d')!;
    lCtx.font = '14px sans-serif';
    lCtx.fillStyle = 'rgba(255,220,80,0.9)';
    lCtx.textAlign = 'center';
    lCtx.fillText('☀ Sol (Tú estás aquí)', 64, 20);
    const labelTex = new THREE.CanvasTexture(labelCanvas);
    const labelSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: labelTex, transparent: true, depthWrite: false })
    );
    labelSprite.scale.set(16, 4, 1);
    labelSprite.position.set(sx, sy + 4, sz);
    this.rootGroup.add(labelSprite);
  }

  private createAndromedaGalaxy(data: DeepSpaceObjectData): void {
    this.andromedaGroup = new THREE.Group();
    const [px, py, pz] = data.galacticPos;
    this.andromedaGroup.position.set(px, py, pz);

    const starDot = ProceduralTextures.generateStarDot();
    const armCount = 2;
    const starCount = 4000;
    const posArr = new Float32Array(starCount * 3);
    const colArr = new Float32Array(starCount * 3);

    const galRadius = 40;
    for (let i = 0; i < starCount; i++) {
      const arm = i % armCount;
      const t = Math.random();
      const r = t * galRadius;
      const armPhase = arm * Math.PI;
      const spiralAngle = Math.log(1 + r * 0.1) * 3.8 + armPhase;
      const scatter = (1 - t * 0.3) * (1.5 + r * 0.04);
      const angle = spiralAngle + (Math.random() - 0.5) * scatter * 0.05;

      posArr[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * scatter;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * (r < 8 ? 3 : 0.8);
      posArr[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * scatter;

      const rDist = Math.sqrt(posArr[i * 3] ** 2 + posArr[i * 3 + 2] ** 2);
      const cf = Math.max(0, 1 - rDist / 12);
      const intensity = 0.5 + cf * 1.8 + Math.random() * 0.2;
      colArr[i * 3]     = (0.8 + 0.2 * (1 - cf)) * intensity;
      colArr[i * 3 + 1] = (0.75 + 0.15 * (1 - cf)) * intensity;
      colArr[i * 3 + 2] = (0.95) * intensity;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
    const mat = new THREE.PointsMaterial({
      size: 1.2,
      map: starDot,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.andromedaGroup.add(new THREE.Points(geo, mat));

    // Tilt Andromeda 77° (its inclination as seen from Earth)
    this.andromedaGroup.rotation.x = 1.35;
    this.andromedaGroup.rotation.z = 0.3;

    // Invisible hit sphere for raycasting
    const hitGeo = new THREE.SphereGeometry(35, 16, 16);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.name = data.name;
    hitMesh.userData = { id: data.id, type: 'deep_space', data };
    this.andromedaGroup.add(hitMesh);
    this.objectMeshes.set(data.id, hitMesh);

    this.rootGroup.add(this.andromedaGroup);
  }

  private createDeepObject(data: DeepSpaceObjectData): void {
    const [px, py, pz] = data.galacticPos;

    if (data.isGrrtBlackHole) {
      const bhSphereRadius = 15.0;
      const bhRs = 2.0;
      const geo = new THREE.SphereGeometry(bhSphereRadius, 96, 96);
      this.gargantuaMaterial = RelativisticBlackHoleShader.createMaterial({
        spin: 0.9,
        accretionRate: 1.25,
        inclination: 1.15,
        innerHex: '#ffffff',
        outerHex: '#ff5500',
        schwarzschildRadius: bhRs,
        sphereRadius: bhSphereRadius,
      });

      const mesh = new THREE.Mesh(geo, this.gargantuaMaterial);
      mesh.name = data.name;
      mesh.position.set(px, py, pz);
      mesh.userData = { id: data.id, type: 'deep_space', data };

      // Relativistic plasma jets
      const jetCanvas = document.createElement('canvas');
      jetCanvas.width = 128;
      jetCanvas.height = 512;
      const jCtx = jetCanvas.getContext('2d')!;
      for (let y = 0; y < 512; y++) {
        const vt = y / 512;
        const vAlpha = Math.pow(vt, 0.8) * 0.5;
        const rowGrad = jCtx.createLinearGradient(0, y, 128, y);
        rowGrad.addColorStop(0, `rgba(85,208,255,0)`);
        rowGrad.addColorStop(0.3, `rgba(85,208,255,${vAlpha * 0.3})`);
        rowGrad.addColorStop(0.5, `rgba(140,220,255,${vAlpha})`);
        rowGrad.addColorStop(0.7, `rgba(85,208,255,${vAlpha * 0.3})`);
        rowGrad.addColorStop(1, `rgba(85,208,255,0)`);
        jCtx.fillStyle = rowGrad;
        jCtx.fillRect(0, y, 128, 1);
      }
      const jetTex = new THREE.CanvasTexture(jetCanvas);

      const makeJet = () => {
        const group = new THREE.Group();
        for (let i = 0; i < 2; i++) {
          const planeGeo = new THREE.PlaneGeometry(5, 22);
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
      topJet.position.y = 22;
      mesh.add(topJet);

      const bottomJet = makeJet();
      bottomJet.position.y = -22;
      bottomJet.rotation.z = Math.PI;
      mesh.add(bottomJet);

      const bhLight = new THREE.PointLight(0xffaa55, 3.0, 300, 1.5);
      mesh.add(bhLight);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

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
      mesh.position.set(px, py, pz);
      mesh.userData = { id: data.id, type: 'deep_space', data, pulsarCoreMat: mat };

      // Magnetosphere glow
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

      // Radiation beams
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

    if (data.id === 'gigante_roja') {
      const geo = new THREE.SphereGeometry(4.5, 64, 64);
      this.betelgeuseMaterial = SunShader.createBetelgeuseMaterial();
      const mesh = new THREE.Mesh(geo, this.betelgeuseMaterial);
      mesh.name = data.name;
      mesh.position.set(px, py, pz);
      mesh.userData = { id: data.id, type: 'deep_space', data };
      this.betelgeuseMesh = mesh;

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
      mesh.add(new THREE.Mesh(envelopeGeo, envelopeMat));

      const betelgeuseLight = new THREE.PointLight(0xff2200, 4.0, 800, 1.5);
      mesh.add(betelgeuseLight);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // Nebula (Pillars of Creation)
    const hitGeo = new THREE.SphereGeometry(7.0, 16, 16);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const mesh = new THREE.Mesh(hitGeo, hitMat);
    mesh.name = data.name;
    mesh.position.set(px, py, pz);
    mesh.userData = { id: data.id, type: 'deep_space', data };

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
      sprite.scale.set(3 + Math.random() * 5, 5 + Math.random() * 8, 1);
      sprite.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );
      sprite.material.rotation = (Math.random() - 0.5) * 0.4;
      mesh.add(sprite);
    }

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

    const starDot = ProceduralTextures.generateStarDot();
    const nebulaStarCount = 18;
    const sPosArr = new Float32Array(nebulaStarCount * 3);
    for (let i = 0; i < nebulaStarCount; i++) {
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
      depthWrite: false,
    });
    mesh.add(new THREE.Points(sGeo, sMat));

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
      sprite.scale.set(3 + Math.random() * 5, 5 + Math.random() * 8, 1);
      sprite.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 + 1
      );
      sprite.material.rotation = (Math.random() - 0.5) * 0.3;
      mesh.add(sprite);
    }

    this.rootGroup.add(mesh);
    this.objectMeshes.set(data.id, mesh);
  }

  public update(delta: number, timeSpeed: number): void {
    if (!this.rootGroup.visible) return;

    if (this.gargantuaMaterial) {
      this.gargantuaMaterial.uniforms.time.value += delta * Math.min(timeSpeed, 10);
      if (!this.gargantuaMaterial.uniforms.uEnvMap.value && this.scene.background instanceof THREE.Texture) {
        this.gargantuaMaterial.uniforms.uEnvMap.value = this.scene.background;
        this.gargantuaMaterial.uniforms.uHasEnvMap.value = 1.0;
      }
    }

    if (this.betelgeuseMaterial) {
      this.betelgeuseMaterial.uniforms.time.value += delta * 0.5;
    }
    if (this.betelgeuseMesh) {
      const scale = 1.0 + Math.sin(performance.now() * 0.003) * 0.06;
      this.betelgeuseMesh.scale.set(scale, scale, scale);
    }

    if (this.pulsarBeam1 && this.pulsarBeam1.parent) {
      this.pulsarBeam1.parent.rotation.y += delta * 6.5;
      this.pulsarBeam1.parent.rotation.x += delta * 2.0;
      const coreMat = this.pulsarBeam1.parent.userData.pulsarCoreMat as THREE.ShaderMaterial | undefined;
      if (coreMat) coreMat.uniforms.time.value += delta;
    }

    // Slow galaxy rotation for visual life
    if (this.galaxyPoints) {
      this.galaxyPoints.rotation.y += delta * 0.003;
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
