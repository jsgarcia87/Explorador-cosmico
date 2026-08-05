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
    const ambientLight = new THREE.AmbientLight(0x221a30, 0.7);
    this.rootGroup.add(ambientLight);

    DEEP_SPACE_OBJECTS.forEach((item) => {
      this.createDeepObject(item);
    });

    // Crear red de filamentos cósmicos suaves
    this.createDarkMatterFilaments();

    this.scene.add(this.rootGroup);
    this.setVisible(false);
  }

  private createDeepObject(data: DeepSpaceObjectData): void {
    // 1. Gargantua (Agujero Negro Relativista Nativo GRRT en 3D)
    if (data.isGrrtBlackHole) {
      const geo = new THREE.SphereGeometry(4.2, 64, 64);
      this.gargantuaMaterial = RelativisticBlackHoleShader.createMaterial({
        spin: 0.9,
        accretionRate: 1.25,
        inclination: 1.15,
        innerHex: '#ffffff',
        outerHex: '#ff5500'
      });

      const mesh = new THREE.Mesh(geo, this.gargantuaMaterial);
      mesh.name = data.name;
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      mesh.userData = {
        id: data.id,
        type: 'deep_space',
        data: data
      };

      // Anillo de Einstein (Esfera fotónica por lente gravitacional)
      const photonRingGeo = new THREE.TorusGeometry(4.35, 0.09, 16, 64);
      const photonRingMat = new THREE.MeshBasicMaterial({
        color: 0xfff6e0,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });
      const photonRing = new THREE.Mesh(photonRingGeo, photonRingMat);
      photonRing.rotation.x = Math.PI / 2 - 0.35;
      mesh.add(photonRing);

      // Disco de Acreción exterior con gradiente térmico Doppler
      const diskGeo = new THREE.RingGeometry(4.5, 12.5, 96);
      // Crear textura de gradiente radial para el disco de acreción
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      if (context) {
        // El innerRadius es 4.5, outerRadius 12.5. En UV (0-1), el inner es 4.5/12.5 = 0.36
        const gradient = context.createRadialGradient(128, 128, 128 * 0.36, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)'); // Blanco
        gradient.addColorStop(0.2, 'rgba(100, 200, 255, 0.9)'); // Azul
        gradient.addColorStop(0.5, 'rgba(255, 150, 50, 0.8)'); // Naranja
        gradient.addColorStop(1, 'rgba(255, 50, 0, 0.0)'); // Rojo difuso a transparente
        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 256);
      }
      const diskTexture = new THREE.CanvasTexture(canvas);

      const diskMat = new THREE.MeshBasicMaterial({
        map: diskTexture,
        color: 0xffffff, // El gradiente ya tiene los colores
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const diskMesh = new THREE.Mesh(diskGeo, diskMat);
      diskMesh.rotation.x = Math.PI / 2 - 0.35;
      mesh.add(diskMesh);

      // Segundo disco secundario desplazado en fase para simular la asimetría del haz Doppler (relativista)
      const disk2 = new THREE.Mesh(diskGeo.clone(), diskMat.clone());
      disk2.rotation.x = Math.PI / 2 - 0.35;
      disk2.rotation.z = Math.PI * 0.4;
      disk2.material.opacity = 0.38;
      mesh.add(disk2);

      // Chorros relativistas de plasma (Jets polares con difuminado suave)
      const jetGeo = new THREE.CylinderGeometry(0.4, 2.4, 26, 32, 1, true);
      
      const jetCanvas = document.createElement('canvas');
      jetCanvas.width = 64;
      jetCanvas.height = 256;
      const jetCtx = jetCanvas.getContext('2d');
      if (jetCtx) {
        const jetGrad = jetCtx.createLinearGradient(0, 0, 0, 256);
        jetGrad.addColorStop(0, 'rgba(85, 208, 255, 0.0)'); // Punta invisible
        jetGrad.addColorStop(1, 'rgba(85, 208, 255, 1.0)'); // Base opaca
        jetCtx.fillStyle = jetGrad;
        jetCtx.fillRect(0, 0, 64, 256);
      }
      const jetTexture = new THREE.CanvasTexture(jetCanvas);

      const jetMat = new THREE.MeshBasicMaterial({
        map: jetTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const topJet = new THREE.Mesh(jetGeo, jetMat);
      topJet.position.y = 13;
      mesh.add(topJet);

      const bottomJet = topJet.clone();
      bottomJet.position.y = -13;
      bottomJet.rotation.z = Math.PI;
      mesh.add(bottomJet);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // 2. Si es Púlsar (Estrella de Neutrones de alta densidad con magnetosfera suave)
    if (data.hasPulsarBeams) {
      const geo = new THREE.SphereGeometry(2.0, 64, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xccffff).multiplyScalar(6.0)
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
        beamGrad.addColorStop(0, 'rgba(139, 233, 253, 0.0)'); // Punta invisible
        beamGrad.addColorStop(1, 'rgba(139, 233, 253, 1.0)'); // Base opaca
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

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // 3. Si es Betelgeuse (Supergigante roja pulsante con corona plasmática)
    if (data.id === 'gigante_roja') {
      const geo = new THREE.SphereGeometry(4.5, 64, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff3311).multiplyScalar(6.0)
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
        const intensity = 1.0 + Math.pow(mix, 4.0) * 12.0; // Central stars trigger HDR bloom
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
      // NEBULOSA VOLUMÉTRICA (Paleta H-alfa, OIII, Azufre-II y estrellas de guardería estelar)
      const particleCount = 1400;
      const posArr = new Float32Array(particleCount * 3);
      const colArr = new Float32Array(particleCount * 3);
      const palette = [
        [0.85, 0.22, 0.38], // H-alfa (Rosa/Rojo intenso)
        [0.18, 0.65, 0.62], // OIII (Cian astrofotográfico)
        [0.65, 0.42, 0.88], // Ionización ultravioleta (Violeta)
        [0.82, 0.58, 0.25]  // Polvo cálido (Ámbar)
      ];

      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] = (Math.random() - 0.5) * 18;
        posArr[i * 3 + 1] = (Math.random() - 0.5) * 11;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 18;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colArr[i * 3] = c[0];
        colArr[i * 3 + 1] = c[1];
        colArr[i * 3 + 2] = c[2];
      }

      const nebGeo = new THREE.BufferGeometry();
      nebGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
      nebGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
      const nebMat = new THREE.PointsMaterial({
        size: 2.2,
        map: starDot,
        vertexColors: true,
        transparent: true,
        opacity: 0.68,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const nebulaCloud = new THREE.Points(nebGeo, nebMat);
      mesh.add(nebulaCloud);

      // Guardería de estrellas recién nacidas en el interior de la nebulosa
      const starCount = 55;
      const sPosArr = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        sPosArr[i * 3] = (Math.random() - 0.5) * 15;
        sPosArr[i * 3 + 1] = (Math.random() - 0.5) * 9;
        sPosArr[i * 3 + 2] = (Math.random() - 0.5) * 15;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPosArr, 3));
      const sMat = new THREE.PointsMaterial({
        size: 0.85,
        color: new THREE.Color(0xfff8ee).multiplyScalar(5.0),
        map: starDot,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const babyStars = new THREE.Points(sGeo, sMat);
      mesh.add(babyStars);

      // Capas volumétricas suaves de gas fosforescente (Sprites multi-capa)
      const gasColors = ['#e11d48', '#06b6d4', '#8b5cf6', '#d97706'];
      for (let i = 0; i < 14; i++) {
        const hex = gasColors[i % gasColors.length];
        const gasSprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: ProceduralTextures.generateGlowSprite(hex),
            color: new THREE.Color(0xffffff).multiplyScalar(3.0),
            transparent: true,
            opacity: 0.18 + Math.random() * 0.12,
            blending: THREE.AdditiveBlending
          })
        );
        const scale = 12 + Math.random() * 14;
        gasSprite.scale.set(scale, scale, 1);
        gasSprite.position.set(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 14
        );
        mesh.add(gasSprite);
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

    // 1. Actualizar el tiempo en el shader de Gargantua (doppler espiral)
    if (this.gargantuaMaterial) {
      this.gargantuaMaterial.uniforms.time.value += delta * Math.min(timeSpeed, 10);
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
  }
}
