import * as THREE from 'three';
import { DEEP_SPACE_OBJECTS, DeepSpaceObjectData } from '../data/deepSpace';
import { RelativisticBlackHoleShader } from './shaders/RelativisticBlackHoleShader';
import { ProceduralTextures } from './textures/ProceduralTextures';

export class DeepSpaceScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private objectMeshes: Map<string, THREE.Object3D> = new Map();
  private pulsarBeam1!: THREE.Mesh;
  private pulsarBeam2!: THREE.Mesh;
  private gargantuaMaterial!: THREE.ShaderMaterial;
  private betelgeuseMesh!: THREE.Mesh;

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
      const bhSphereRadius = 14.0;
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
        const vAlpha = Math.pow(vt, 0.6) * 0.7;
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
            opacity: 0.5,
          });
          const plane = new THREE.Mesh(planeGeo, planeMat);
          plane.rotation.y = (i * Math.PI) / 2;
          group.add(plane);
        }
        return group;
      };

      const topJet = makeJet();
      topJet.position.y = bhSphereRadius + 14;
      mesh.add(topJet);

      const bottomJet = makeJet();
      bottomJet.position.y = -(bhSphereRadius + 14);
      bottomJet.rotation.z = Math.PI;
      mesh.add(bottomJet);

      const bhLight = new THREE.PointLight(0xffaa55, 3.0, 500, 1.5);
      mesh.add(bhLight);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // 2. Si es Púlsar (Estrella de Neutrones de alta densidad con magnetosfera suave)
    if (data.hasPulsarBeams) {
      const geo = new THREE.SphereGeometry(2.0, 64, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xccffff).multiplyScalar(2.0)
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = data.name;
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      mesh.userData = {
        id: data.id,
        type: 'deep_space',
        data: data
      };

      // Glowing is handled by HDR Bloom instead of fake sprites

      // Haces de radiación rotatorios suaves
      const beamGeo = new THREE.ConeGeometry(2.4, 20, 48, 1, true);
      
      const beamCanvas = document.createElement('canvas');
      beamCanvas.width = 64;
      beamCanvas.height = 256;
      const beamCtx = beamCanvas.getContext('2d');
      if (beamCtx) {
        const beamGrad = beamCtx.createLinearGradient(0, 0, 0, 256);
        beamGrad.addColorStop(0, 'rgba(139, 233, 253, 0.0)');
        beamGrad.addColorStop(1, 'rgba(139, 233, 253, 0.55)');
        beamCtx.fillStyle = beamGrad;
        beamCtx.fillRect(0, 0, 64, 256);
      }
      const beamTexture = new THREE.CanvasTexture(beamCanvas);

      const beamMat = new THREE.MeshBasicMaterial({
        map: beamTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      this.pulsarBeam1 = new THREE.Mesh(beamGeo, beamMat);
      this.pulsarBeam1.position.y = 10;
      mesh.add(this.pulsarBeam1);

      this.pulsarBeam2 = new THREE.Mesh(beamGeo, beamMat);
      this.pulsarBeam2.position.y = -10;
      this.pulsarBeam2.rotation.z = Math.PI;
      mesh.add(this.pulsarBeam2);

      // Luz puntual pulsante azul-cyan para el pulsar
      const pulsarLight = new THREE.PointLight(0x88ddff, 4.0, 300, 2.0);
      mesh.add(pulsarLight);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // 3. Si es Betelgeuse (Supergigante roja pulsante con corona plasmática)
    if (data.id === 'gigante_roja') {
      const geo = new THREE.SphereGeometry(4.5, 64, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff3311).multiplyScalar(2.0)
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = data.name;
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      mesh.userData = {
        id: data.id,
        type: 'deep_space',
        data: data
      };
      this.betelgeuseMesh = mesh;

      // Glowing is handled by HDR Bloom instead of fake sprites

      // Luz masiva roja emitida por la estrella supergigante
      const betelgeuseLight = new THREE.PointLight(0xff3311, 5.0, 1000, 1.2);
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
      // NEBULOSA VOLUMÉTRICA — billboards con texturas procedurales de ruido
      // Emission-line palette: H-alfa, OIII, SII, polvo cálido
      const nebulaColors = [
        '#d93065', // H-alfa (rosa/rojo)
        '#18a89e', // OIII (cian)
        '#8855cc', // SII / UV ionizado (violeta)
        '#cc8833', // Polvo cálido (ámbar)
      ];

      // Capas volumétricas grandes (outer diffuse shell)
      const outerLayers = [
        { color: '#d93065', seed: 0, x: 0, y: 0, z: 0, scale: 22, opacity: 0.12 },
        { color: '#8855cc', seed: 1, x: 2, y: -1, z: 3, scale: 20, opacity: 0.10 },
        { color: '#18a89e', seed: 2, x: -3, y: 1, z: -2, scale: 18, opacity: 0.10 },
        { color: '#d93065', seed: 3, x: -1, y: 2, z: 1, scale: 24, opacity: 0.08 },
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

      // Capas medias (mid-density gas clouds with more structure)
      for (let i = 0; i < 24; i++) {
        const colorHex = nebulaColors[i % nebulaColors.length];
        const tex = ProceduralTextures.generateNebulaCloud(colorHex, 10 + i, 256);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: 0.12 + Math.random() * 0.10,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        const baseScale = 6 + Math.random() * 10;
        const aspectRatio = 0.6 + Math.random() * 0.8;
        sprite.scale.set(baseScale * aspectRatio, baseScale, 1);
        const r = Math.random() * 7;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.7;
        sprite.position.set(
          Math.cos(theta) * Math.cos(phi) * r,
          Math.sin(phi) * r * 0.6,
          Math.sin(theta) * Math.cos(phi) * r
        );
        sprite.material.rotation = Math.random() * Math.PI * 2;
        mesh.add(sprite);
      }

      // Dense inner core clouds (bright, smaller, more opaque)
      for (let i = 0; i < 8; i++) {
        const colorHex = i < 4 ? '#d93065' : '#18a89e';
        const tex = ProceduralTextures.generateNebulaCloud(colorHex, 40 + i, 256);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: 0.20 + Math.random() * 0.08,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        const scale = 4 + Math.random() * 5;
        sprite.scale.set(scale, scale, 1);
        sprite.position.set(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 5
        );
        sprite.material.rotation = Math.random() * Math.PI * 2;
        mesh.add(sprite);
      }

      // Guardería de estrellas recién nacidas (fewer, brighter, within the gas)
      const starCount = 25;
      const sPosArr = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const r = Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.5;
        sPosArr[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
        sPosArr[i * 3 + 1] = Math.sin(phi) * r * 0.5;
        sPosArr[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPosArr, 3));
      const sMat = new THREE.PointsMaterial({
        size: 0.6,
        color: new THREE.Color(0xfff8ee).multiplyScalar(1.6),
        map: starDot,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const babyStars = new THREE.Points(sGeo, sMat);
      mesh.add(babyStars);

      // Dark dust lanes (non-additive, absorb light — gives depth)
      for (let i = 0; i < 5; i++) {
        const tex = ProceduralTextures.generateNebulaCloud('#110808', 60 + i, 256);
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: tex,
            transparent: true,
            opacity: 0.15 + Math.random() * 0.1,
            depthWrite: false,
          })
        );
        const scale = 5 + Math.random() * 8;
        sprite.scale.set(scale, scale, 1);
        sprite.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 8
        );
        sprite.material.rotation = Math.random() * Math.PI * 2;
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

    // 2. Rotar Púlsar rápidamente
    if (this.pulsarBeam1 && this.pulsarBeam1.parent) {
      this.pulsarBeam1.parent.rotation.y += delta * 6.5;
      this.pulsarBeam1.parent.rotation.x += delta * 2.0;
    }

    // 3. Pulsación y turbulencia de Betelgeuse
    if (this.betelgeuseMesh) {
      const scale = 1.0 + Math.sin(performance.now() * 0.003) * 0.12;
      this.betelgeuseMesh.scale.set(scale, scale, scale);
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
