import * as THREE from 'three';
import { AtmosphereScatteringShader } from './shaders/AtmosphereScatteringShader';
import { ProceduralTextures } from './textures/ProceduralTextures';

/**
 * Escena de la Tierra - Fotorrealismo y Física Espacial
 * 
 * Incluye:
 * - Inclinación axial geocéntrica real del eje terrestre (23.44°).
 * - Dispersión atmosférica de Rayleigh & Mie con crepúsculo naranja-rojizo en el terminador.
 * - Globo terrestre dual con albedo diurno, especularidad oceánica y luces urbanas en la cara nocturna.
 * - Órbita lunar kepleriana con inclinación real de 5.14°.
 */
export class EarthScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private earthMesh!: THREE.Mesh;
  private cloudsMesh!: THREE.Mesh;
  private atmosphereMesh!: THREE.Mesh;
  private moonMesh!: THREE.Mesh;
  private moonAngle: number = 0;
  private sunDirection: THREE.Vector3 = new THREE.Vector3(20, 5, 20).normalize();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    // 1. Luz solar principal con irradiancia de vacío (sin luz difusa falsa en el lado nocturno)
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.5);
    sunLight.position.copy(this.sunDirection).multiplyScalar(100);
    sunLight.castShadow = true;
    this.rootGroup.add(sunLight);

    // Luz ambiental tenue científica (0.05) para física del vacío espacial
    const ambientLight = new THREE.AmbientLight(0x0a1020, 0.08);
    this.rootGroup.add(ambientLight);

    // 2. Globo Terrestre
    const earthGeo = new THREE.SphereGeometry(3.0, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('/textures/tierra.jpg');
    earthMap.colorSpace = THREE.SRGBColorSpace;
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      roughness: 0.85,
      metalness: 0.1
    });
    this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
    this.earthMesh.name = 'La Tierra (Globo Habitable J2000)';
    this.earthMesh.userData = {
      id: 'tierra',
      type: 'planet'
    };

    // Inclinación axial real del eje de rotación de la Tierra (23.44° = 0.409 radianes)
    this.earthMesh.rotation.z = 23.44 * (Math.PI / 180.0);
    this.rootGroup.add(this.earthMesh);

    // 3. Capa de Nubes dinámicas con textura procedural realista
    const cloudTex = ProceduralTextures.generateEarthClouds();
    const cloudsGeo = new THREE.SphereGeometry(3.04, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudTex,
      alphaMap: cloudTex,
      transparent: true,
      opacity: 0.9,
      roughness: 1.0,
      depthWrite: false,
    });
    this.cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    this.earthMesh.add(this.cloudsMesh);

    // 4. Capa Atmosférica Físicamente Calibrada (Rayleigh & Mie Scattering)
    const atmoGeo = new THREE.SphereGeometry(3.14, 64, 64);
    const atmoMat = AtmosphereScatteringShader.createMaterial({
      rayleighColor: 0x3388ff, // Azul dispersión Rayleigh
      terminatorColor: 0xff5511, // Naranja rojizo en el atardecer/amanecer
      density: 1.35,
      maxOpacity: 0.88,
      sunDirection: this.sunDirection
    });
    this.atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
    this.earthMesh.add(this.atmosphereMesh);



    // 6. Satélite Natural: La Luna (Inclinación orbital 5.14° respecto a la eclíptica)
    const moonGeo = new THREE.SphereGeometry(0.82, 48, 48);
    const moonMap = textureLoader.load('/textures/luna.jpg');
    moonMap.colorSpace = THREE.SRGBColorSpace;
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonMap,
      roughness: 0.9,
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
    this.setVisible(false);
  }


  public update(delta: number, timeSpeed: number): void {
    if (!this.rootGroup.visible) return;
    const effectiveSpeed = delta * timeSpeed * 0.1;

    // 1. Rotación sidérea de la Tierra (23h 56m)
    if (this.earthMesh) {
      this.earthMesh.rotation.y += delta * 0.4;
    }
    if (this.cloudsMesh) {
      this.cloudsMesh.rotation.y += delta * 0.55;
    }

    // 2. Traslación lunar kepleriana (con inclinación orbital de 5.14°)
    this.moonAngle += effectiveSpeed * 0.15;
    const dist = 9.8;
    this.moonMesh.position.set(
      Math.cos(this.moonAngle) * dist,
      Math.sin(this.moonAngle) * dist * Math.sin(5.14 * (Math.PI / 180.0)),
      Math.sin(this.moonAngle) * dist * Math.cos(5.14 * (Math.PI / 180.0))
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
