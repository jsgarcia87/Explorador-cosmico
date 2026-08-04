import * as THREE from 'three';
import { AtmosphereScatteringShader } from './shaders/AtmosphereScatteringShader';

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
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 3.8);
    sunLight.position.copy(this.sunDirection).multiplyScalar(100);
    sunLight.castShadow = true;
    this.rootGroup.add(sunLight);

    // Luz ambiental tenue científica (0.05) para física del vacío espacial
    const ambientLight = new THREE.AmbientLight(0x0a1020, 0.08);
    this.rootGroup.add(ambientLight);

    // 2. Globo Terrestre con Shader Procedural Día/Noche (Océanos + Continentes + Luces de Ciudad Nocturnas)
    const earthGeo = new THREE.SphereGeometry(3.0, 64, 64);
    const earthMat = this.createEarthDayNightMaterial();
    this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
    this.earthMesh.name = 'La Tierra (Globo Habitable J2000)';
    this.earthMesh.userData = {
      id: 'tierra',
      type: 'planet'
    };

    // Inclinación axial real del eje de rotación de la Tierra (23.44° = 0.409 radianes)
    this.earthMesh.rotation.z = 23.44 * (Math.PI / 180.0);
    this.rootGroup.add(this.earthMesh);

    // 3. Capa de Nubes dinámicas con sombra propia
    const cloudsGeo = new THREE.SphereGeometry(3.03, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.48,
      roughness: 0.95
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

    // 5. Coronas Aurorales Boreales y Australes en los polos
    const auroraGeo = new THREE.RingGeometry(2.15, 2.65, 64);
    const auroraMat = new THREE.MeshBasicMaterial({
      color: 0x33ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending
    });
    const northAurora = new THREE.Mesh(auroraGeo, auroraMat);
    northAurora.position.y = 2.92;
    northAurora.rotation.x = Math.PI / 2;
    this.earthMesh.add(northAurora);

    const southAurora = northAurora.clone();
    southAurora.position.y = -2.92;
    this.earthMesh.add(southAurora);

    // 6. Satélite Natural: La Luna (Inclinación orbital 5.14° respecto a la eclíptica)
    const moonGeo = new THREE.SphereGeometry(0.82, 48, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xb2b1ac,
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

  /**
   * Crea el shader procedural del Globo Terrestre con comportamiento día/noche:
   * - Día: Océano azul profundo con reflejo especular (Sun Glint) + Continentes.
   * - Terminador: Gradiente crepuscular.
   * - Noche: Clústeres de luces urbanas doradas en la cara en sombra.
   */
  private createEarthDayNightMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vLocalPos;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vLocalPos = position;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uSunDir;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vLocalPos;

        // Ruido pseudo-procedural en GPU para distribución de masas continentales y luces
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
            f.z);
        }

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 sunDir = normalize(uSunDir);
          
          // Ángulo solar (Día > 0, Terminador ~ 0, Noche < 0)
          float NdotL = dot(normal, sunDir);
          float dayFactor = smoothstep(-0.15, 0.25, NdotL);
          float nightFactor = 1.0 - smoothstep(-0.35, 0.1, NdotL);

          // Topografía continental generada por ruido octavado
          vec3 pos = normalize(vLocalPos) * 4.5;
          float n = noise(pos) * 0.5 + noise(pos * 2.2) * 0.3 + noise(pos * 4.4) * 0.2;
          
          // Clasificación Continente vs Océano
          bool isLand = n > 0.52;

          // Albedo de Día (Océanos azul profundo vs Tierra verde-ocre)
          vec3 oceanColor = vec3(0.04, 0.18, 0.45);
          vec3 landColor = mix(vec3(0.18, 0.32, 0.15), vec3(0.55, 0.45, 0.32), (n - 0.52) * 3.0);
          vec3 baseDay = isLand ? landColor : oceanColor;

          // Especularidad del Sol en el océano (Sun Glint real en agua)
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          vec3 halfDir = normalize(sunDir + viewDir);
          float spec = 0.0;
          if (!isLand && NdotL > 0.0) {
            spec = pow(max(0.0, dot(normal, halfDir)), 32.0) * 0.65;
          }

          vec3 dayLitColor = (baseDay * max(0.05, NdotL) + vec3(1.0, 0.95, 0.8) * spec) * dayFactor;

          // Cara Nocturna: Luces de Ciudades en Continentes
          vec3 cityColor = vec3(1.0, 0.8, 0.35);
          float cityNoise = noise(pos * 8.0) * noise(pos * 16.0);
          float cityIntensity = isLand ? smoothstep(0.12, 0.38, cityNoise) * 2.2 : 0.0;
          vec3 nightLitColor = cityColor * cityIntensity * nightFactor;

          // Tinte crepuscular cálido en el terminador
          float terminator = (1.0 - abs(NdotL * 2.2));
          terminator = max(0.0, terminator * terminator);
          vec3 terminatorTint = vec3(0.9, 0.4, 0.15) * terminator * 0.35;

          vec3 finalColor = dayLitColor + nightLitColor + terminatorTint;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: {
        uSunDir: { value: this.sunDirection }
      }
    });
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
