import * as THREE from 'three';

export class EarthScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private earthMesh!: THREE.Mesh;
  private cloudsMesh!: THREE.Mesh;
  private atmosphereMesh!: THREE.Mesh;
  private moonMesh!: THREE.Mesh;
  private moonAngle: number = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    // Luz direccional solar
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 3.2);
    sunLight.position.set(20, 5, 20);
    sunLight.castShadow = true;
    this.rootGroup.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x0a1020, 0.4);
    this.rootGroup.add(ambientLight);

    // 1. Tierra con shader procedural / alta resolución
    const earthGeo = new THREE.SphereGeometry(3.0, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x1d5fc4,
      roughness: 0.6,
      metalness: 0.1
    });
    this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
    this.earthMesh.name = 'Tierra (Detalle Habitable)';
    this.earthMesh.userData = {
      id: 'tierra',
      type: 'planet'
    };
    this.rootGroup.add(this.earthMesh);

    // 2. Capa de Nubes que rotará a distinta velocidad
    const cloudsGeo = new THREE.SphereGeometry(3.05, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
      roughness: 0.95
    });
    this.cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    this.earthMesh.add(this.cloudsMesh);

    // 3. Atmósfera de dispersión azulada (Mie / Rayleigh glow)
    const atmoGeo = new THREE.SphereGeometry(3.18, 64, 64);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x4da6ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide
    });
    this.atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
    this.earthMesh.add(this.atmosphereMesh);

    // 4. Corona Aurora Polar en el polo norte y sur
    const auroraGeo = new THREE.RingGeometry(2.1, 2.7, 64);
    const auroraMat = new THREE.MeshBasicMaterial({
      color: 0x33ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const northAurora = new THREE.Mesh(auroraGeo, auroraMat);
    northAurora.position.y = 2.9;
    northAurora.rotation.x = Math.PI / 2;
    this.earthMesh.add(northAurora);

    const southAurora = northAurora.clone();
    southAurora.position.y = -2.9;
    this.earthMesh.add(southAurora);

    // 5. La Luna en órbita kepleriana
    const moonGeo = new THREE.SphereGeometry(0.81, 48, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xb5b4af,
      roughness: 0.85,
      metalness: 0.05
    });
    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.moonMesh.name = 'La Luna (Satélite Natural)';
    this.moonMesh.userData = {
      id: 'luna',
      type: 'moon'
    };
    this.rootGroup.add(this.moonMesh);

    this.scene.add(this.rootGroup);
    this.setVisible(false); // Oculto por defecto
  }

  public update(delta: number, timeSpeed: number): void {
    if (!this.rootGroup.visible) return;
    const effectiveSpeed = delta * timeSpeed * 0.1;

    // Rotación terrestre
    if (this.earthMesh) {
      this.earthMesh.rotation.y += delta * 0.4;
    }
    if (this.cloudsMesh) {
      this.cloudsMesh.rotation.y += delta * 0.55;
    }

    // Órbita lunar
    this.moonAngle += effectiveSpeed * 0.15;
    const dist = 9.5;
    this.moonMesh.position.set(
      Math.cos(this.moonAngle) * dist,
      Math.sin(this.moonAngle * 0.2) * 1.5,
      Math.sin(this.moonAngle) * dist
    );
    this.moonMesh.rotation.y += delta * 0.2;
  }

  public getAllInteractiveObjects(): THREE.Object3D[] {
    return [this.earthMesh, this.moonMesh];
  }

  public setVisible(visible: boolean): void {
    this.rootGroup.visible = visible;
  }
}
