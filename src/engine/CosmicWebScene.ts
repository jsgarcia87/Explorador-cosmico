import * as THREE from 'three';

/**
 * CosmicWebScene
 * ============================================================
 * Carga la realización procedural de la red cósmica (campo gaussiano
 * LCDM + desplazamiento de Zel'dovich, generada por
 * public/data/cosmic-web/generate_cosmic_web.py) y la renderiza como
 * una nube de puntos GPU coloreada por densidad local.
 *
 * No es la simulación real de Uchuu (2.1 billones de partículas,
 * imposible en un navegador) sino una estructura estadísticamente
 * equivalente calculada con las mismas ecuaciones para el mismo
 * modelo cosmológico (Planck 2020) — ver la conversación de origen
 * para la justificación técnica completa.
 *
 * Formato binario .cweb (little-endian):
 *   int32   magic          = 0x43574542  ("CWEB")
 *   int32   n_particles
 *   float32 box_size_mpc
 *   float32 data[n_particles * 4]   -> x, y, z, overdensity (0-1)
 * ============================================================
 */

const CWEB_MAGIC = 0x43574542;
const CWEB_URL = `${import.meta.env.BASE_URL}data/cosmic-web/cosmic_web.cweb`;

// Offset y escala para situar la red cósmica como una región propia,
// separada de los objetos de espacio profundo (Gargantua, la nebulosa, etc.)
// pero alcanzable volando en modo libre.
const FIELD_OFFSET = new THREE.Vector3(0, 0, -650);
const FIELD_SCALE = 0.7;

const vertexShader = /* glsl */ `
  attribute float aDensity;
  varying float vDensity;
  uniform float uPointScale;

  void main() {
    vDensity = aDensity;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // Non-linear size: filaments thin, nodes large and prominent
    float baseSize = mix(0.6, 4.0, pow(smoothstep(0.1, 0.95, aDensity), 2.0));
    gl_PointSize = uPointScale * baseSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vDensity;
  uniform vec3 uColorVoid;
  uniform vec3 uColorFilament;
  uniform vec3 uColorNode;
  uniform float uOpacity;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float falloff = smoothstep(0.5, 0.0, d);

    // Three-zone color mapping with sharper transitions
    vec3 color;
    if (vDensity < 0.3) {
      // Void to filament: very faint
      color = mix(uColorVoid, uColorFilament, smoothstep(0.05, 0.3, vDensity));
    } else if (vDensity < 0.65) {
      // Filament body: blue-purple
      color = mix(uColorFilament, uColorNode, smoothstep(0.3, 0.65, vDensity) * 0.4);
    } else {
      // Galaxy cluster nodes: warm bright
      color = mix(uColorFilament * 0.6 + uColorNode * 0.4, uColorNode, smoothstep(0.65, 1.0, vDensity));
      // Subtle HDR push for bloom on only the densest nodes
      color *= 1.0 + smoothstep(0.9, 1.0, vDensity) * 0.25;
    }

    // Non-linear alpha: suppress voids, show filaments, blaze nodes
    float densityAlpha = pow(smoothstep(0.05, 0.7, vDensity), 1.5);
    float alpha = falloff * uOpacity * mix(0.08, 1.0, densityAlpha);
    gl_FragColor = vec4(color, alpha);
  }
`;

export class CosmicWebScene {
  private scene: THREE.Scene;
  private group: THREE.Group;
  private points: THREE.Points | null = null;
  private boxSizeMpc: number = 0;
  private nParticles: number = 0;
  private loaded: boolean = false;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'COSMIC_WEB_LARGE_SCALE_STRUCTURE';
    this.group.visible = false;
    this.scene.add(this.group);
    this.load();
  }

  private async load(): Promise<void> {
    try {
      const response = await fetch(CWEB_URL);
      if (!response.ok) {
        console.warn(`[CosmicWebScene] No se pudo cargar ${CWEB_URL} (HTTP ${response.status})`);
        return;
      }
      const buffer = await response.arrayBuffer();
      this.buildFromBuffer(buffer);
    } catch (err) {
      console.warn('[CosmicWebScene] Error cargando la red cósmica:', err);
    }
  }

  private buildFromBuffer(buffer: ArrayBuffer): void {
    const view = new DataView(buffer);
    const magic = view.getInt32(0, true);
    if (magic !== CWEB_MAGIC) {
      console.warn('[CosmicWebScene] Cabecera .cweb inválida, se ignora el archivo.');
      return;
    }
    const nParticles = view.getInt32(4, true);
    const boxSizeMpc = view.getFloat32(8, true);
    const floatData = new Float32Array(buffer, 12, nParticles * 4);

    const positions = new Float32Array(nParticles * 3);
    const densities = new Float32Array(nParticles);

    for (let i = 0; i < nParticles; i++) {
      positions[i * 3 + 0] = floatData[i * 4 + 0] * FIELD_SCALE + FIELD_OFFSET.x;
      positions[i * 3 + 1] = floatData[i * 4 + 1] * FIELD_SCALE + FIELD_OFFSET.y;
      positions[i * 3 + 2] = floatData[i * 4 + 2] * FIELD_SCALE + FIELD_OFFSET.z;
      densities[i] = floatData[i * 4 + 3];
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aDensity', new THREE.BufferAttribute(densities, 1));
    geometry.computeBoundingSphere();

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uPointScale: { value: 0.7 },
        uOpacity: { value: 0.18 },
        uColorVoid: { value: new THREE.Color(0x080418) },
        uColorFilament: { value: new THREE.Color(0x3355aa) },
        uColorNode: { value: new THREE.Color(0xbbaa66) }
      }
    });

    this.points = new THREE.Points(geometry, material);
    this.points.name = 'Red Cósmica (Estructura a Gran Escala, tipo Uchuu)';
    this.points.userData = {
      id: 'red-cosmica',
      type: 'large_scale_structure',
      data: {
        name: 'Red Cósmica (Estructura a Gran Escala)',
        type: 'Filamentos, nodos y vacíos cósmicos',
        description:
          'Realización procedural del campo de densidad LCDM (Planck 2020) mediante ' +
          'aproximación de Zel\'dovich, estadísticamente equivalente a la topología ' +
          'observada por simulaciones N-body como Uchuu (CESGA/IAA-CSIC).',
        stats: {
          'Partículas': nParticles.toLocaleString('es'),
          'Caja original': `${boxSizeMpc.toFixed(0)} Mpc de lado`,
          'Modelo': 'LCDM · Planck 2020',
          'Método': "Campo gaussiano + Zel'dovich (1er orden)"
        }
      }
    };

    this.group.add(this.points);
    this.boxSizeMpc = boxSizeMpc;
    this.nParticles = nParticles;
    this.loaded = true;
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

  public getFieldCenter(): THREE.Vector3 {
    return FIELD_OFFSET.clone();
  }

  public getFieldRadius(): number {
    return (this.boxSizeMpc * FIELD_SCALE) / 2 || 100;
  }

  public update(delta: number): void {
    if (!this.points) return;
    // deriva angular muy lenta, solo para dar sensación de escala/profundidad
    this.group.rotation.y += delta * 0.004;
  }

  public getAllInteractiveObjects(): THREE.Object3D[] {
    return this.points ? [this.points] : [];
  }
}
