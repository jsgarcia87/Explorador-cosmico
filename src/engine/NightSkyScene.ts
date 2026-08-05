import * as THREE from 'three';
import { CONSTELLATIONS_IAU, ConstellationData } from '../data/constellations';
import { AstrophysicsUtils } from './AstrophysicsUtils';
import { ProceduralTextures } from './textures/ProceduralTextures';

export type TelescopeSpectrum = 'visible' | 'infrared' | 'ultraviolet' | 'xray' | 'radio';

export class NightSkyScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private starMeshes: THREE.Mesh[] = [];
  private lineGroups: THREE.Group[] = [];
  private backgroundStars!: THREE.Points;
  private issMesh!: THREE.Mesh;
  private issAngle: number = 0;
  private currentSpectrum: TelescopeSpectrum = 'visible';

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    this.rootGroup.add(ambient);

    // 1. Esfera de bóveda celeste profunda (Vía Láctea)
    const domeGeo = new THREE.SphereGeometry(180, 48, 48);
    const milkyWayTex = ProceduralTextures.generateMilkyWayTexture();
    const domeMat = new THREE.MeshBasicMaterial({
      map: milkyWayTex,
      color: 0xffffff,
      side: THREE.BackSide,
      fog: false
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    // Orientar la Vía Láctea
    dome.rotation.x = Math.PI / 4; 
    this.rootGroup.add(dome);

    // 1b. Generar campo estelar denso de fondo (~5000 estrellas)
    this.generateBackgroundStars();

    // 2. Construir constelaciones por RA / Dec en la bóveda
    CONSTELLATIONS_IAU.forEach((constellation) => {
      this.buildConstellation(constellation);
    });

    // 3. ISS en órbita rápida de horizonte
    const issGeo = new THREE.BoxGeometry(0.8, 0.2, 2.0);
    const issMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.issMesh = new THREE.Mesh(issGeo, issMat);
    this.issMesh.name = 'Estación Espacial Internacional (ISS)';
    this.issMesh.userData = {
      id: 'iss',
      type: 'station'
    };
    this.rootGroup.add(this.issMesh);

    this.scene.add(this.rootGroup);
    this.setVisible(false);
  }

  private generateBackgroundStars(): void {
    const starCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    const colorPalette = [
      new THREE.Color(0xffffff), // Blanco
      new THREE.Color(0xaabbff), // Azulado
      new THREE.Color(0xffddaa), // Amarillento
      new THREE.Color(0xff8866), // Rojizo
    ];

    for (let i = 0; i < starCount; i++) {
      // Distribución en la esfera (radio ~170)
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 170 + Math.random() * 5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      // Atenuar las estrellas de fondo
      const intensity = 0.3 + Math.random() * 0.5;
      colors[i * 3] = color.r * intensity;
      colors[i * 3 + 1] = color.g * intensity;
      colors[i * 3 + 2] = color.b * intensity;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starDot = ProceduralTextures.generateStarDot();
    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: starDot,
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending
    });

    this.backgroundStars = new THREE.Points(geometry, material);
    this.rootGroup.add(this.backgroundStars);
  }

  private buildConstellation(constellation: ConstellationData): void {
    const constGroup = new THREE.Group();
    constGroup.name = constellation.name;
    constGroup.userData = { id: constellation.id, type: 'constellation' };

    const radius = 120;
    const positions: THREE.Vector3[] = [];

    // Estrellas de la constelación
    constellation.stars.forEach((star) => {
      // Convertir RA (0-24h) y Dec (-90 - +90°) a coordenadas cartesianas
      const phi = THREE.MathUtils.degToRad(90 - star.dec);
      const theta = THREE.MathUtils.degToRad((star.ra / 24) * 360);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const pos = new THREE.Vector3(x, y, z);
      positions.push(pos);

      const { size } = AstrophysicsUtils.pogsonMagnitudeToSize(star.mag);
      const starGeo = new THREE.SphereGeometry(size * 0.9, 16, 16);
      const starMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(star.color).multiplyScalar(4.0), fog: false });
      const starMesh = new THREE.Mesh(starGeo, starMat);
      starMesh.position.copy(pos);
      starMesh.name = star.name;
      starMesh.userData = {
        id: constellation.id,
        starId: star.id,
        type: 'constellation_star',
        constellationData: constellation,
        originalColor: star.color
      };

      constGroup.add(starMesh);
      this.starMeshes.push(starMesh);
    });

    // Líneas conectoras
    constellation.lines.forEach((pair) => {
      if (positions[pair[0]] && positions[pair[1]]) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          positions[pair[0]],
          positions[pair[1]]
        ]);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x4da6ff,
          transparent: true,
          opacity: 0.65,
          fog: false
        });
        const line = new THREE.Line(lineGeo, lineMat);
        constGroup.add(line);
      }
    });

    // Por defecto, las líneas de constelaciones están ocultas para mantener fotorrealismo
    constGroup.visible = false;
    this.rootGroup.add(constGroup);
    this.lineGroups.push(constGroup);
  }

  public toggleConstellationLines(id: string, visible: boolean): void {
    const group = this.lineGroups.find(g => g.userData.id === id);
    if (group) {
      group.visible = visible;
    }
  }

  public hideAllConstellationLines(): void {
    this.lineGroups.forEach(g => g.visible = false);
  }

  public setSpectrum(spectrum: TelescopeSpectrum): void {
    this.currentSpectrum = spectrum;
    let baseColor = 0xffffff;
    if (spectrum === 'infrared') baseColor = 0xff5533;
    if (spectrum === 'ultraviolet') baseColor = 0x9955ff;
    if (spectrum === 'xray') baseColor = 0x55eeff;
    if (spectrum === 'radio') baseColor = 0x55ff77;

    this.starMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (spectrum === 'visible') {
        const origHex = mesh.userData.originalColor !== undefined ? mesh.userData.originalColor : 0xffffff;
        mat.color.setHex(origHex).multiplyScalar(4.0);
      } else {
        mat.color.setHex(baseColor);
      }
    });
  }

  public update(delta: number, timeSpeed: number): void {
    if (!this.rootGroup.visible) return;
    const effectiveSpeed = delta * timeSpeed * 0.1;

    // 1. Rotación lenta de la bóveda celeste (movimiento diurno)
    this.rootGroup.rotation.y += delta * 0.05;

    // 2. ISS cruzando el cielo
    this.issAngle += effectiveSpeed * 0.35;
    this.issMesh.position.set(
      Math.cos(this.issAngle) * 90,
      35 + Math.sin(this.issAngle * 2) * 15,
      Math.sin(this.issAngle) * 90
    );
  }

  public getAllInteractiveObjects(): THREE.Object3D[] {
    return [...this.starMeshes, this.issMesh];
  }

  public setVisible(visible: boolean): void {
    this.rootGroup.visible = visible;
  }
}
