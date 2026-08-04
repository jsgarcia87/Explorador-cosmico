import * as THREE from 'three';
import { PLANETS, DWARF_PLANETS, PlanetData } from '../data/planets';
import { KeplerianOrbitEngine, KeplerianElements } from './KeplerianOrbitEngine';
import { AtmosphereScatteringShader } from './shaders/AtmosphereScatteringShader';

export class SolarSystemScene {
  private scene: THREE.Scene;
  private planetMeshes: Map<string, THREE.Mesh> = new Map();
  private orbitLines: THREE.Line[] = [];
  private asteroidBelt!: THREE.InstancedMesh;
  private sunLight!: THREE.PointLight;
  private sunMesh!: THREE.Mesh;

  // Grupo raíz de la escena del Sistema Solar
  public rootGroup: THREE.Group = new THREE.Group();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    // 1. Luz Solar Central HDR
    this.sunLight = new THREE.PointLight(0xfff8ee, 3.5, 800, 1.2);
    this.sunLight.position.set(0, 0, 0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.bias = -0.0001;
    this.rootGroup.add(this.sunLight);

    // Luz ambiental tenue para no dejar en negro absoluto el lado oscuro
    const ambientLight = new THREE.AmbientLight(0x111622, 0.4);
    this.rootGroup.add(ambientLight);

    // 2. Crear los planetas y el Sol
    const allBodies = [...PLANETS, ...DWARF_PLANETS];
    allBodies.forEach((data) => {
      this.createCelestialBody(data);
    });

    // 3. Crear cinturón de asteroides con InstancedMesh (1500 asteroides)
    this.createAsteroidBelt();

    this.scene.add(this.rootGroup);
  }

  private createCelestialBody(data: PlanetData): void {
    const isSun = data.id === 'sol';

    // Geometría esférica de alta resolución
    const geo = new THREE.SphereGeometry(data.radius, 64, 64);

    let mat: THREE.Material;
    if (isSun) {
      mat = new THREE.MeshBasicMaterial({
        color: data.color,
      });
    } else {
      mat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.75,
        metalness: 0.1,
        wireframe: false
      });
    }

    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = data.name;
    mesh.userData = {
      id: data.id,
      type: isSun ? 'star' : 'planet',
      data: data
    };
    mesh.castShadow = !isSun;
    mesh.receiveShadow = !isSun;

    // Posición orbital kepleriana inicial e inclinación axial
    if (data.orbitalElements) {
      const initRes = KeplerianOrbitEngine.getPositionAtDate(new Date(), data.orbitalElements);
      mesh.position.copy(initRes.position);
      mesh.userData.astrometry = initRes;
    } else {
      mesh.position.set(data.distance, 0, 0);
    }

    // Aplicar inclinación axial real del eje de rotación (rad)
    mesh.rotation.z = data.tilt;

    // Si tiene anillos (Saturno)
    if (data.hasRing) {
      const ringGeo = new THREE.RingGeometry(data.radius * 1.35, data.radius * 2.3, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xd8c69b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
        roughness: 0.5
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + 0.35;
      mesh.add(ringMesh);
    }

    // Si tiene atmósfera de resplandor (Tierra, Venus, Marte, Gigantes), usar dispersión Rayleigh/Mie
    if (data.hasAtmosphere && !isSun) {
      const palette = AtmosphereScatteringShader.getPlanetAtmospherePalette(data.id);
      const atmoGeo = new THREE.SphereGeometry(data.radius * 1.07, 48, 48);
      const atmoMat = AtmosphereScatteringShader.createMaterial({
        rayleighColor: palette.rayleigh,
        terminatorColor: palette.terminator,
        density: palette.density,
        maxOpacity: data.atmoOpacity || 0.75,
        sunDirection: new THREE.Vector3(1, 0, 0)
      });
      const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
      mesh.add(atmoMesh);
    }

    // Si tiene nubes (Tierra)
    if (data.hasClouds) {
      const cloudGeo = new THREE.SphereGeometry(data.radius * 1.02, 32, 32);
      const cloudMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
        roughness: 0.9
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      mesh.add(cloudMesh);
    }

    this.rootGroup.add(mesh);
    this.planetMeshes.set(data.id, mesh);

    if (isSun) {
      this.sunMesh = mesh;
    } else {
      // Línea orbital kepleriana 3D
      if (data.orbitalElements) {
        this.createKeplerianOrbitLine(data.orbitalElements, data.color);
      } else {
        this.createOrbitLine(data.distance);
      }
    }
  }

  private createKeplerianOrbitLine(elements: KeplerianElements, color: number): void {
    const points = KeplerianOrbitEngine.generateOrbitCurve3D(elements, 256);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const planetColor = new THREE.Color(color);
    const orbitColor = new THREE.Color(0x1c2d3e).lerp(planetColor, 0.5);

    const material = new THREE.LineBasicMaterial({
      color: orbitColor,
      transparent: true,
      opacity: 0.6
    });
    const orbitLine = new THREE.Line(geometry, material);
    this.rootGroup.add(orbitLine);
    this.orbitLines.push(orbitLine);
  }

  private createOrbitLine(radius: number): void {
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x223344,
      transparent: true,
      opacity: 0.4
    });
    const orbitLine = new THREE.Line(geometry, material);
    this.rootGroup.add(orbitLine);
    this.orbitLines.push(orbitLine);
  }

  private createAsteroidBelt(): void {
    const count = 1500;
    const geometry = new THREE.DodecahedronGeometry(0.25, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x7a7975,
      roughness: 0.9,
      metalness: 0.1
    });

    this.asteroidBelt = new THREE.InstancedMesh(geometry, material, count);
    this.asteroidBelt.name = 'ASTEROID_BELT';
    this.asteroidBelt.castShadow = true;
    this.asteroidBelt.receiveShadow = true;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const scale = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const radius = 28 + Math.random() * 4.5; // Entre Marte (26) y Júpiter (46)
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.5;

      position.set(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
      rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const s = 0.4 + Math.random() * 0.8;
      scale.set(s, s, s);

      matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), scale);
      this.asteroidBelt.setMatrixAt(i, matrix);
    }

    this.rootGroup.add(this.asteroidBelt);
  }

  public update(delta: number, timeSpeed: number, currentDate?: Date): void {
    const effectiveSpeed = delta * timeSpeed * 0.1;

    // 1. Actualizar traslación kepleriana real y rotación axial de los planetas
    this.planetMeshes.forEach((mesh, id) => {
      const data = mesh.userData.data as PlanetData;
      if (!data) return;

      // Rotación axial sidérea (sentido normal o retrógrado como Venus/Urano)
      const rotationDir = data.rotationPeriodHours < 0 ? -1 : 1;
      mesh.rotation.y += delta * 0.5 * rotationDir;

      // Traslación orbital kepleriana (J2000)
      if (id !== 'sol') {
        if (data.orbitalElements && currentDate) {
          const res = KeplerianOrbitEngine.getPositionAtDate(currentDate, data.orbitalElements);
          mesh.position.copy(res.position);
          mesh.userData.astrometry = res;
        } else if (data.orbitalSpeed > 0) {
          const currentAngle = Math.atan2(mesh.position.z, mesh.position.x);
          const nextAngle = currentAngle + data.orbitalSpeed * effectiveSpeed * 0.05;
          mesh.position.set(
            Math.cos(nextAngle) * data.distance,
            0,
            Math.sin(nextAngle) * data.distance
          );
        }
      }
    });

    // 2. Rotar el cinturón de asteroides muy lentamente
    if (this.asteroidBelt) {
      this.asteroidBelt.rotation.y += effectiveSpeed * 0.002;
    }
  }

  public getPlanetMesh(id: string): THREE.Mesh | undefined {
    return this.planetMeshes.get(id);
  }

  public getAllInteractiveObjects(): THREE.Object3D[] {
    return Array.from(this.planetMeshes.values());
  }

  public setVisible(visible: boolean): void {
    this.rootGroup.visible = visible;
  }
}
