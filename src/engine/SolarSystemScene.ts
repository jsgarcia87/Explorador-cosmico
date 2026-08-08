import * as THREE from 'three';
import { PLANETS, PlanetData } from '../data/planets';
import { KeplerianOrbitEngine } from './KeplerianOrbitEngine';
import { AtmosphereScatteringShader } from './shaders/AtmosphereScatteringShader';
import { SunShader } from './shaders/SunShader';
import { ProceduralTextures, PlanetTextureOptions } from './textures/ProceduralTextures';

export class SolarSystemScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private celestialMeshes: Map<string, THREE.Mesh> = new Map();
  private orbitLines: THREE.Line[] = [];
  private sunLight!: THREE.PointLight;
  private ambientLight!: THREE.AmbientLight;
  private sunSurfaceMat: THREE.ShaderMaterial | null = null;
  private sunCoronaMat: THREE.ShaderMaterial | null = null;
  private earthCloudMesh: THREE.Mesh | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    // 1. Iluminación (Fotorrealista: bajo ambiente para alto contraste día/noche)
    // Aumentamos ligeramente la luz ambiental base
    this.ambientLight = new THREE.AmbientLight(0x222238, 0.08); 
    this.rootGroup.add(this.ambientLight);

    // Añadimos una HemisphereLight para simular la luz estelar dispersa (starlight/galactic glow)
    // Esto proporciona un sutil tono azulado desde arriba y cálido desde abajo, evitando el negro absoluto
    const hemiLight = new THREE.HemisphereLight(0x334455, 0x111122, 0.15);
    this.rootGroup.add(hemiLight);

    // Sol ilumina todo el sistema solar sin decaimiento para una iluminación uniforme
    // Usamos una intensidad media (35.0) para que no queme los planetas cercanos ni deje negros a los lejanos.
    this.sunLight = new THREE.PointLight(0xfff5e6, 8.0, 0, 0);
    this.sunLight.position.set(0, 0, 0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.bias = -0.0002;
    this.rootGroup.add(this.sunLight);

    const ambientLight = new THREE.AmbientLight(0x0a1020, 0.6);
    this.rootGroup.add(ambientLight);

    // 2. Construir Sol y Planetas
    PLANETS.forEach((body: any) => {
      this.createCelestialBody(body);
      if (body.id !== 'sol') {
        this.createOrbitLine(body);
      }
    });

    // 3. Cinturones de Asteroides
    this.createAsteroidBelts();

    this.scene.add(this.rootGroup);
    this.setVisible(false);
  }

  private createAsteroidBelts(): void {
    // Cinturón de asteroides principal (entre Marte y Júpiter: ~2.1 a 3.3 AU)
    this.createBelt(2.15, 3.25, 12000, 0x888888, 0.04);

    // Cinturón de Kuiper (más allá de Neptuno: ~30 a 50 AU)
    this.createBelt(30.0, 50.0, 15000, 0x667799, 0.06);
  }

  private createBelt(minAU: number, maxAU: number, count: number, color: number, sizeScale: number): void {
    const geo = new THREE.DodecahedronGeometry(sizeScale, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true
    });
    
    const instancedMesh = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      // Distribución probabilística para simular anillos (huecos de Kirkwood)
      let t = Math.random();
      if (t > 0.3 && t < 0.35) t += 0.05; // Simular hueco resonante
      if (t > 0.6 && t < 0.63) t -= 0.03;
      
      const rAU = minAU + (maxAU - minAU) * t;
      const rScene = KeplerianOrbitEngine.mapDistanceAUToScene(rAU);
      
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * rScene;
      const z = Math.sin(angle) * rScene;
      
      // Inclinación orbital aleatoria ligera y grosor vertical
      const y = (Math.random() - 0.5) * rScene * 0.05;
      
      dummy.position.set(x, y, z);
      
      // Rotación y escala aleatoria
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = 0.3 + Math.random() * 1.5;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    
    instancedMesh.instanceMatrix.needsUpdate = true;
    
    // Velocidad de órbita global (Ley de Kepler simplificada v ~ 1/sqrt(r))
    instancedMesh.userData = { isBelt: true, orbitSpeed: 0.05 / Math.sqrt(minAU) };
    
    this.rootGroup.add(instancedMesh);
  }

  private getTextureOptionsForBody(id: string): PlanetTextureOptions {
    switch (id) {
      case 'jupiter':
        return {
          bands: true,
          bandSoft: false,
          blotches: true,
          spot: { colorHex: '#d83a22', x: 0.65, y: 0.58, rx: 55, ry: 25 }
        };
      case 'saturno':
        return { bands: true, bandSoft: true, blotches: true };
      case 'urano':
        return { bands: true, bandSoft: true, blotches: true };
      case 'neptuno':
        return {
          bands: true,
          bandSoft: true,
          blotches: true,
          spot: { colorHex: '#183868', x: 0.45, y: 0.48, rx: 35, ry: 18 }
        };
      case 'marte':
        return { craters: true, blotches: true, poles: true, poleSize: 0.14 };
      case 'mercurio':
      case 'luna':
        return { craters: true, blotches: true };
      case 'venus':
        return { bands: true, bandSoft: true, blotches: true };
      case 'tierra':
        return { blotches: true, poles: true, poleSize: 0.15 };
      default:
        return { blotches: true };
    }
  }

  private createCelestialBody(data: PlanetData): void {
    const isSun = data.id === 'sol';
    const geo = new THREE.SphereGeometry(data.radius, 64, 64);

    const textureLoader = new THREE.TextureLoader();
    let mat: THREE.Material;
    if (isSun) {
      const sunMap = textureLoader.load('/textures/sol.jpg');
      sunMap.colorSpace = THREE.SRGBColorSpace;
      this.sunSurfaceMat = SunShader.createSurfaceMaterial(sunMap);
      mat = this.sunSurfaceMat;
    } else if (data.id === 'tierra') {
      const earthMap = textureLoader.load('/textures/tierra.jpg');
      earthMap.colorSpace = THREE.SRGBColorSpace;
      const { bumpMap, roughnessMap } = ProceduralTextures.generateEarthTexture(); // Keep procedural bump
      mat = new THREE.MeshStandardMaterial({
        map: earthMap,
        bumpMap: bumpMap,
        bumpScale: 0.05,
        roughnessMap: roughnessMap,
        metalness: 0.15,
        wireframe: false
      });
    } else {
      const map = textureLoader.load(`/textures/${data.id}.jpg`);
      map.colorSpace = THREE.SRGBColorSpace;
      mat = new THREE.MeshStandardMaterial({
        map: map,
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

    if (isSun) {
      const coronaGeo = new THREE.SphereGeometry(data.radius * 1.55, 64, 64);
      this.sunCoronaMat = SunShader.createCoronaMaterial();
      const coronaMesh = new THREE.Mesh(coronaGeo, this.sunCoronaMat);
      mesh.add(coronaMesh);
    }

    // Si tiene anillos (Saturno)
    if (data.hasRing) {
      const ringMap = new THREE.TextureLoader().load('/textures/saturno_anillo.png');
      ringMap.colorSpace = THREE.SRGBColorSpace;
      const ringGeo = new THREE.RingGeometry(data.radius * 1.35, data.radius * 2.3, 96);
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringMap,
        color: 0xd8c69b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
        roughness: 0.4
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + 0.35;
      ringMesh.receiveShadow = true;
      ringMesh.castShadow = true;
      mesh.add(ringMesh);
    }

    // Si tiene atmósfera de dispersión (Rayleigh/Mie)
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
      mesh.userData.atmoMat = atmoMat;
      mesh.add(atmoMesh);
    }

    // Si tiene nubes (Tierra) — capa con textura procedural realista
    if (data.hasClouds) {
      const cloudTex = ProceduralTextures.generateEarthClouds();
      const cloudGeo = new THREE.SphereGeometry(data.radius * 1.015, 48, 48);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTex,
        transparent: true,
        roughness: 1.0,
        depthWrite: false,
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      mesh.add(cloudMesh);
      this.earthCloudMesh = cloudMesh;
    }

    this.rootGroup.add(mesh);
    this.celestialMeshes.set(data.id, mesh);
  }

  private createOrbitLine(data: PlanetData): void {
    if (!data.orbitalElements) {
      // Circunferencia simple para cuerpos sin elementos orbitales
      const points: THREE.Vector3[] = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * data.distance, 0, Math.sin(theta) * data.distance));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: (data as any).orbitColor || 0x444466,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        depthTest: true
      });
      const line = new THREE.Line(geo, mat);
      this.rootGroup.add(line);
      this.orbitLines.push(line);
      return;
    }

    // Órbita kepleriana elíptica real basada en astrometría
    const orbitPoints = KeplerianOrbitEngine.generateOrbitCurve3D(data.orbitalElements, 180);
    const geo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const mat = new THREE.LineBasicMaterial({
      color: (data as any).orbitColor || 0x444466,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      depthTest: true
    });
    const line = new THREE.Line(geo, mat);
    this.rootGroup.add(line);
    this.orbitLines.push(line);
  }

  public update(delta: number, timeSpeed: number, currentDate: Date): void {
    if (!this.rootGroup.visible) return;

    if (this.sunSurfaceMat) {
      this.sunSurfaceMat.uniforms.time.value += delta * 0.5;
    }
    if (this.sunCoronaMat) {
      this.sunCoronaMat.uniforms.time.value += delta * 0.3;
    }

    this.celestialMeshes.forEach((mesh, id) => {
      const data = mesh.userData.data as PlanetData;

      // Rotación propia alrededor del eje
      const rotSpeed = 0.4 / ((data as any).rotationPeriodHours || (data as any).rotationPeriod || 1);
      mesh.rotation.y += delta * rotSpeed * Math.min(timeSpeed, 50);

      // Posicionamiento Orbital Kepleriano
      if (id !== 'sol' && data.orbitalElements) {
        const astrometry = KeplerianOrbitEngine.getPositionAtDate(currentDate, data.orbitalElements);
        mesh.position.copy(astrometry.position);
        mesh.userData.astrometry = astrometry;
      }

      // Actualizar la dirección del sol en el shader atmosférico
      if (id !== 'sol' && mesh.userData.atmoMat) {
        const sunDir = new THREE.Vector3().copy(mesh.position).multiplyScalar(-1).normalize();
        mesh.userData.atmoMat.uniforms.uSunDirection.value.copy(sunDir);
      }
    });

    // Rotación independiente de nubes terrestres (jet streams)
    if (this.earthCloudMesh) {
      this.earthCloudMesh.rotation.y += delta * 0.012 * Math.min(timeSpeed, 50);
    }

    // Rotar cinturones de asteroides
    this.rootGroup.children.forEach(child => {
      if (child.userData.isBelt) {
        child.rotation.y += delta * child.userData.orbitSpeed * Math.min(timeSpeed, 50) * 0.01;
      }
    });
  }

  public getAllInteractiveObjects(): THREE.Object3D[] {
    return Array.from(this.celestialMeshes.values());
  }

  public setVisible(visible: boolean): void {
    this.rootGroup.visible = visible;
  }

  public setGuidesVisible(visible: boolean): void {
    this.orbitLines.forEach(line => {
      line.visible = visible;
    });
  }
}
