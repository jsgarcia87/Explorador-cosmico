import * as THREE from 'three';
import { PLANETS, PlanetData } from '../data/planets';
import { KeplerianOrbitEngine } from './KeplerianOrbitEngine';
import { AtmosphereScatteringShader } from './shaders/AtmosphereScatteringShader';
import { ProceduralTextures, PlanetTextureOptions } from './textures/ProceduralTextures';

export class SolarSystemScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private celestialMeshes: Map<string, THREE.Mesh> = new Map();
  private orbitLines: THREE.LineLoop[] = [];
  private sunLight!: THREE.PointLight;
  private ambientLight!: THREE.AmbientLight;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    // 1. Iluminación
    this.ambientLight = new THREE.AmbientLight(0x222238, 0.45);
    this.rootGroup.add(this.ambientLight);

    // Sol ilumina todo el sistema solar según 1/r^2
    this.sunLight = new THREE.PointLight(0xfff5e6, 4.5, 4000, 1.25);
    this.sunLight.position.set(0, 0, 0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.bias = -0.0002;
    this.rootGroup.add(this.sunLight);

    // 2. Construir Sol y Planetas
    PLANETS.forEach((body: any) => {
      this.createCelestialBody(body);
      if (body.id !== 'sol') {
        this.createOrbitLine(body);
      }
    });

    this.scene.add(this.rootGroup);
    this.setVisible(false);
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

    let mat: THREE.Material;
    if (isSun) {
      mat = new THREE.MeshBasicMaterial({
        color: data.color
      });
    } else {
      const textureOptions = this.getTextureOptionsForBody(data.id);
      const map = ProceduralTextures.generatePlanetTexture(data.color, textureOptions);
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

    // Corona Solar para el Sol (efecto halo difuso NASA)
    if (isSun) {
      const coronaTexture = ProceduralTextures.generateSunCorona();
      const coronaMat = new THREE.SpriteMaterial({
        map: coronaTexture,
        color: 0xffe2a0,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const coronaSprite = new THREE.Sprite(coronaMat);
      const coronaScale = data.radius * 3.8;
      coronaSprite.scale.set(coronaScale, coronaScale, 1);
      mesh.add(coronaSprite);
    } else {
      // Sprite de resplandor atmosférico exterior para planetas
      const glowTexture = ProceduralTextures.generateGlowSprite(data.color);
      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: data.color,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const glowSprite = new THREE.Sprite(glowMat);
      const glowScale = data.radius * 2.8;
      glowSprite.scale.set(glowScale, glowScale, 1);
      mesh.add(glowSprite);
    }

    // Si tiene anillos (Saturno)
    if (data.hasRing) {
      const ringGeo = new THREE.RingGeometry(data.radius * 1.35, data.radius * 2.3, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xd8c69b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        roughness: 0.5
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
    this.celestialMeshes.set(data.id, mesh);
  }

  private createOrbitLine(data: PlanetData): void {
    if (!data.orbitalElements) {
      // Circunferencia simple para cuerpos sin elementos orbitales
      const points: THREE.Vector3[] = [];
      const segments = 128;
      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * data.distance, 0, Math.sin(theta) * data.distance));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: (data as any).orbitColor || 0x444466,
        transparent: true,
        opacity: 0.28
      });
      const line = new THREE.LineLoop(geo, mat);
      line.rotation.x = Math.PI / 2;
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
      opacity: 0.32
    });
    const line = new THREE.LineLoop(geo, mat);
    this.rootGroup.add(line);
    this.orbitLines.push(line);
  }

  public update(delta: number, timeSpeed: number, currentDate: Date): void {
    if (!this.rootGroup.visible) return;

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
    });
  }

  public getAllInteractiveObjects(): THREE.Object3D[] {
    return Array.from(this.celestialMeshes.values());
  }

  public setVisible(visible: boolean): void {
    this.rootGroup.visible = visible;
  }
}
