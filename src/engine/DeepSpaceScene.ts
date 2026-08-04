import * as THREE from 'three';
import { DEEP_SPACE_OBJECTS, DeepSpaceObjectData } from '../data/deepSpace';

export class DeepSpaceScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private objectMeshes: Map<string, THREE.Mesh> = new Map();
  private pulsarBeam1!: THREE.Mesh;
  private pulsarBeam2!: THREE.Mesh;
  private gargantuaDisk!: THREE.Mesh;
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

    // Crear red de materia oscura decorativa entre objetos
    this.createDarkMatterFilaments();

    this.scene.add(this.rootGroup);
    this.setVisible(false);
  }

  private createDeepObject(data: DeepSpaceObjectData): void {
    const geo = new THREE.SphereGeometry(data.isGrrtBlackHole ? 3.5 : 2.5, 48, 48);
    const mat = new THREE.MeshBasicMaterial({
      color: data.color
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = data.name;
    mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
    mesh.userData = {
      id: data.id,
      type: 'deep_space',
      data: data
    };

    // 1. Si es Gargantua (Agujero Negro con disco de acreción relativista y chorros)
    if (data.isGrrtBlackHole) {
      // Sombra del horizonte de sucesos oscuro
      mesh.material = new THREE.MeshBasicMaterial({ color: 0x000000 });

      // Disco de acreción Doppler brillante
      const diskGeo = new THREE.RingGeometry(4.2, 9.5, 64);
      const diskMat = new THREE.MeshBasicMaterial({
        color: 0xff6b35,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      this.gargantuaDisk = new THREE.Mesh(diskGeo, diskMat);
      this.gargantuaDisk.rotation.x = Math.PI / 2 + 0.2;
      mesh.add(this.gargantuaDisk);

      // Anillo de luz curvado por gravedad (efecto Einstein)
      const ringGeo = new THREE.RingGeometry(3.6, 4.0, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffddaa,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.add(ringMesh);

      // Chorros relativistas (Jets de plasma)
      const jetGeo = new THREE.CylinderGeometry(0.3, 1.2, 18, 16);
      const jetMat = new THREE.MeshBasicMaterial({
        color: 0x55d0ff,
        transparent: true,
        opacity: 0.6
      });
      const topJet = new THREE.Mesh(jetGeo, jetMat);
      topJet.position.y = 10;
      mesh.add(topJet);

      const bottomJet = topJet.clone();
      bottomJet.position.y = -10;
      bottomJet.rotation.z = Math.PI;
      mesh.add(bottomJet);
    }

    // 2. Si es Púlsar
    if (data.hasPulsarBeams) {
      const beamGeo = new THREE.ConeGeometry(2.0, 15, 32);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x8be9fd,
        transparent: true,
        opacity: 0.65
      });
      this.pulsarBeam1 = new THREE.Mesh(beamGeo, beamMat);
      this.pulsarBeam1.position.y = 8;
      mesh.add(this.pulsarBeam1);

      this.pulsarBeam2 = new THREE.Mesh(beamGeo, beamMat);
      this.pulsarBeam2.position.y = -8;
      this.pulsarBeam2.rotation.z = Math.PI;
      mesh.add(this.pulsarBeam2);
    }

    // 3. Si es Betelgeuse (Gigante roja pulsante)
    if (data.id === 'gigante_roja') {
      this.betelgeuseMesh = mesh;
      const glowGeo = new THREE.SphereGeometry(3.8, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xff3311,
        transparent: true,
        opacity: 0.35,
        side: THREE.BackSide
      });
      mesh.add(new THREE.Mesh(glowGeo, glowMat));
    }

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
      opacity: 0.25
    });
    const web = new THREE.LineSegments(geometry, material);
    this.rootGroup.add(web);
  }

  public update(delta: number, timeSpeed: number): void {
    if (!this.rootGroup.visible) return;

    // 1. Rotar Púlsar rápidamente
    if (this.pulsarBeam1 && this.pulsarBeam1.parent) {
      this.pulsarBeam1.parent.rotation.y += delta * 6.5;
      this.pulsarBeam1.parent.rotation.x += delta * 2.0;
    }

    // 2. Rotar el disco de acreción del Agujero Negro
    if (this.gargantuaDisk) {
      this.gargantuaDisk.rotation.z -= delta * 1.5;
    }

    // 3. Pulsación del radio de Betelgeuse
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
