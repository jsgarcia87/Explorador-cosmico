import * as THREE from 'three';
import { DEEP_SPACE_OBJECTS, DeepSpaceObjectData } from '../data/deepSpace';
import { RelativisticBlackHoleShader } from './shaders/RelativisticBlackHoleShader';
import { ProceduralTextures } from './textures/ProceduralTextures';

export class DeepSpaceScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private objectMeshes: Map<string, THREE.Mesh> = new Map();
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

      // Disco de Acreción exterior difuso
      const diskGeo = new THREE.RingGeometry(4.4, 11.0, 64);
      const diskMat = new THREE.MeshBasicMaterial({
        color: 0xff6622,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const diskMesh = new THREE.Mesh(diskGeo, diskMat);
      diskMesh.rotation.x = Math.PI / 2 + 0.25;
      mesh.add(diskMesh);

      // Chorros relativistas de plasma (Jets polares con difuminado suave)
      const jetGeo = new THREE.CylinderGeometry(0.4, 2.4, 26, 32, 1, true);
      const jetMat = new THREE.MeshBasicMaterial({
        color: 0x55d0ff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
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
        color: 0xccffff
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = data.name;
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      mesh.userData = {
        id: data.id,
        type: 'deep_space',
        data: data
      };

      // Halo magnético azulado
      const glowTexture = ProceduralTextures.generateGlowSprite(data.color);
      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x33b8ff,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(12, 12, 1);
      mesh.add(glowSprite);

      // Haces de radiación rotatorios suaves
      const beamGeo = new THREE.ConeGeometry(2.4, 20, 48, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x8be9fd,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
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
        color: 0xff3311
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

      // Corona plasmática envolvente
      const glowTexture = ProceduralTextures.generateGlowSprite('#ff3311');
      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xff4411,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(18, 18, 1);
      mesh.add(glowSprite);

      this.rootGroup.add(mesh);
      this.objectMeshes.set(data.id, mesh);
      return;
    }

    // 4. Nebulosas y Galaxias (Nubes volumétricas de partículas procedimentales sin polígonos bruscos)
    const geo = new THREE.SphereGeometry(3.0, 64, 64);
    const mat = new THREE.MeshBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.75
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = data.name;
    mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
    mesh.userData = {
      id: data.id,
      type: 'deep_space',
      data: data
    };

    // Halo volumétrico estelar/nebuloso
    const glowTexture = ProceduralTextures.generateGlowSprite(data.color);
    const glowMat = new THREE.SpriteMaterial({
      map: glowTexture,
      color: data.color,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const glowSprite = new THREE.Sprite(glowMat);
    glowSprite.scale.set(15, 15, 1);
    mesh.add(glowSprite);

    // Nube volumétrica de partículas alrededor de la nebulosa/galaxia
    const cloudGeo = new THREE.BufferGeometry();
    const particleCount = 450;
    const posArr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.5 + Math.random() * 6.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      posArr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArr[i * 3 + 1] = (r * 0.4) * Math.sin(phi) * Math.sin(theta);
      posArr[i * 3 + 2] = r * Math.cos(phi);
    }
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const starDot = ProceduralTextures.generateStarDot();
    const cloudMat = new THREE.PointsMaterial({
      map: starDot,
      color: data.color,
      size: 1.8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const cloudPoints = new THREE.Points(cloudGeo, cloudMat);
    mesh.add(cloudPoints);

    this.rootGroup.add(mesh);
    this.objectMeshes.set(data.id, mesh);
  }

  private createDarkMatterFilaments(): void {
    const points: THREE.Vector3[] = [];
    const positions = DEEP_SPACE_OBJECTS.map(o => new THREE.Vector3(...o.pos));

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        points.push(positions[i]);
        points.push(positions[j]);
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x6e48ab,
      transparent: true,
      opacity: 0.2,
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
