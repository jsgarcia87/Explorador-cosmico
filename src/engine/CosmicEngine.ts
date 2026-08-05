import * as THREE from 'three';
import { EffectComposer } from 'postprocessing';
import { RenderPass, BloomEffect, VignetteEffect, EffectPass, ToneMappingEffect, ToneMappingMode } from 'postprocessing';
import { SolarSystemScene } from './SolarSystemScene';
import { EarthScene } from './EarthScene';
import { DeepSpaceScene } from './DeepSpaceScene';
import { NightSkyScene } from './NightSkyScene';
import { AstrophysicsUtils } from './AstrophysicsUtils';
import { ProceduralTextures } from './textures/ProceduralTextures';

export type SceneMode = 'solar' | 'earth' | 'deep' | 'observatory';

export interface CosmicEngineOptions {
  onFpsUpdate?: (fps: number) => void;
  onObjectSelected?: (data: { id: string; type: string; data: any } | null) => void;
  onDateChange?: (date: Date) => void;
}

export class CosmicEngine {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private composer!: EffectComposer;
  private clock: THREE.Clock = new THREE.Clock();

  private currentMode: SceneMode = 'solar';
  private options: CosmicEngineOptions;

  // Sub-escenas
  private solarScene!: SolarSystemScene;
  private earthScene!: EarthScene;
  private deepScene!: DeepSpaceScene;
  private nightScene!: NightSkyScene;

  // Cámara cinemática y navegación orbital
  private targetPosition: THREE.Vector3 = new THREE.Vector3(0, 35, 75);
  private targetLookAt: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private currentLookAt: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private isOrbitingAroundTarget: boolean = true;
  private cameraAngle: number = 0;
  private activeTargetDistance: number = 75;

  // Controladores de arrastre y vuelo libre
  private isDragging: boolean = false;
  private dragButton: number = 0;
  private lastPointerX: number = 0;
  private lastPointerY: number = 0;
  private orbitTheta: number = 0.9;
  private orbitPhi: number = 1.15;
  private pinchStartDistance: number | null = null;

  // Control de tiempo astronómico
  public timeSpeed: number = 1; // 1x = tiempo real, 1000x = veloz
  public currentDate: Date = new Date();
  public isPaused: boolean = false;

  // Interactividad
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();
  private interactiveObjects: THREE.Object3D[] = [];
  private selectedObjectId: string | null = null;

  // FPS tracking
  private frameCount: number = 0;
  private lastFpsTime: number = 0;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement, options: CosmicEngineOptions = {}) {
    this.canvas = canvas;
    this.options = options;
    this.init();
  }

  private init(): void {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.updateAdaptivePixelRatio(width);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 80000);
    this.camera.position.copy(this.targetPosition);

    // Escena principal
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x010206);
    this.scene.fog = new THREE.FogExp2(0x010206, 0.00015);

    // PostProcessing Bloom & Vignette (Requires HDR for proper ToneMapping)
    this.composer = new EffectComposer(this.renderer, {
      frameBufferType: THREE.HalfFloatType
    });
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const bloomEffect = new BloomEffect({
      intensity: 1.5,
      mipmapBlur: true,
      luminanceThreshold: 1.0,
      luminanceSmoothing: 0.1
    });
    const vignetteEffect = new VignetteEffect({
      darkness: 0.55,
      offset: 0.25
    });
    const toneMappingEffect = new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC });

    const effectPass = new EffectPass(this.camera, bloomEffect, vignetteEffect, toneMappingEffect);
    this.composer.addPass(effectPass);

    // 1. Cielo Estrellado Harvard OBAFGKM & Vía Láctea Fotorrealista (Sin niebla)
    this.createBackgroundStarfield();
    this.createMilkyWayBand();

    // 2. Sub-escenas
    this.solarScene = new SolarSystemScene(this.scene);
    this.earthScene = new EarthScene(this.scene);
    this.deepScene = new DeepSpaceScene(this.scene);
    this.nightScene = new NightSkyScene(this.scene);

    // 3. Eventos de navegación libre (arrastre, clic, zoom, táctil)
    window.addEventListener('resize', this.onWindowResize);
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    this.canvas.addEventListener('touchstart', this.onTouchStart, { passive: true });
    this.canvas.addEventListener('touchmove', this.onTouchMove, { passive: true });
    this.canvas.addEventListener('touchend', this.onTouchEnd);
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    this.setMode('solar');
  }

  /**
   * Genera 14,000 estrellas cósmicas brillantes en el cielo nocturno
   * sin niebla (fog: false) y con sprites circulares luminosos.
   */
  /**
   * Genera 14,000 estrellas cósmicas brillantes en el cielo nocturno
   * sin niebla (fog: false) con capa dual de profundidad para visibilidad constante.
   */
  private createBackgroundStarfield(): void {
    const starCount = 14000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1200 + Math.random() * 8000;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Clasificación Harvard OBAFGKM -> Color CIE sRGB
      const tempKelvin = AstrophysicsUtils.sampleOBAFGKMTemperature();
      const color = AstrophysicsUtils.kelvinToRGB(tempKelvin);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starTexture = ProceduralTextures.generateStarDot();
    
    // Capa principal con atenuación de tamaño (estrellas grandes y brillantes)
    const material = new THREE.PointsMaterial({
      map: starTexture,
      size: 32.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.98,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      fog: false,
      depthWrite: false
    });

    const starfield = new THREE.Points(geometry, material);
    starfield.name = 'BACKGROUND_STARS_OBAFGKM';
    this.scene.add(starfield);

    // Segunda capa sin atenuación para garantizar un cielo estrellado nítido a cualquier distancia o zoom
    const fixedMaterial = new THREE.PointsMaterial({
      map: starTexture,
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      sizeAttenuation: false,
      blending: THREE.AdditiveBlending,
      fog: false,
      depthWrite: false
    });
    const starfieldFixed = new THREE.Points(geometry, fixedMaterial);
    starfieldFixed.name = 'BACKGROUND_STARS_FIXED';
    this.scene.add(starfieldFixed);
  }

  /**
   * Genera la banda galáctica volumétrica de la Vía Láctea
   * inclinada respecto a la eclíptica con polvo interestelar y nebulosidad cian/violeta/ámbar.
   */
  private createMilkyWayBand(): void {
    const particleCount = 18000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#8b7bff'), // Violeta nebulosa
      new THREE.Color('#5ce1d6'), // Cian ionizado
      new THREE.Color('#fbbf24'), // Ámbar estelar
      new THREE.Color('#f472b6'), // Rosa hidrógeno
      new THREE.Color('#ffffff')  // Núcleo blanco
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1000 + Math.pow(Math.random(), 0.7) * 4500;
      const spreadY = (Math.random() - 0.5) * (radius * 0.18);

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = spreadY;

      // Inclinar el disco galáctico 60 grados respecto al plano del Sistema Solar
      const tilt = (60 * Math.PI) / 180;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y * Math.cos(tilt) - z * Math.sin(tilt);
      positions[i * 3 + 2] = y * Math.sin(tilt) + z * Math.cos(tilt);

      const color = palette[Math.floor(Math.random() * palette.length)].clone();
      const intensity = 0.65 + Math.random() * 0.35;
      colors[i * 3] = color.r * intensity;
      colors[i * 3 + 1] = color.g * intensity;
      colors[i * 3 + 2] = color.b * intensity;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starTexture = ProceduralTextures.generateStarDot();
    const material = new THREE.PointsMaterial({
      map: starTexture,
      size: 34.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      fog: false,
      depthWrite: false
    });

    const milkyWay = new THREE.Points(geometry, material);
    milkyWay.name = 'MILKY_WAY_GALACTIC_BAND';
    this.scene.add(milkyWay);
  }

  public setMode(mode: SceneMode): void {
    this.currentMode = mode;
    this.clearInteractive();

    this.solarScene.setVisible(mode === 'solar');
    this.earthScene.setVisible(mode === 'earth');
    this.deepScene.setVisible(mode === 'deep');
    this.nightScene.setVisible(mode === 'observatory');

    if (mode === 'solar') {
      this.setCameraTarget(new THREE.Vector3(0, 35, 75), new THREE.Vector3(0, 0, 0), 80);
      this.interactiveObjects = this.solarScene.getAllInteractiveObjects();
    } else if (mode === 'earth') {
      this.setCameraTarget(new THREE.Vector3(0, 2, 7), new THREE.Vector3(0, 0, 0), 7);
      this.interactiveObjects = this.earthScene.getAllInteractiveObjects();
    } else if (mode === 'deep') {
      this.setCameraTarget(new THREE.Vector3(42, 12, 25), new THREE.Vector3(42, 6, -18), 40);
      this.interactiveObjects = this.deepScene.getAllInteractiveObjects();
    } else if (mode === 'observatory') {
      this.setCameraTarget(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 20, 0), 1);
      this.interactiveObjects = this.nightScene.getAllInteractiveObjects();
    }
  }

  public start(): void {
    this.lastFpsTime = performance.now();
    this.animate();
  }

  public getCurrentDate(): Date {
    return this.currentDate;
  }

  public setTimeSpeed(speed: number): void {
    this.timeSpeed = speed;
  }

  public setTimePaused(paused: boolean): void {
    this.isPaused = paused;
  }

  public resetTime(): void {
    this.currentDate = new Date();
  }

  public getNightSkyScene(): NightSkyScene | undefined {
    return this.nightScene;
  }

  public clearInteractive(): void {
    this.interactiveObjects = [];
  }

  public setCameraTarget(pos: THREE.Vector3, lookAt: THREE.Vector3, distance: number = 25): void {
    this.targetLookAt.copy(lookAt);
    this.activeTargetDistance = distance;
    this.targetPosition.set(
      lookAt.x + Math.cos(this.cameraAngle) * distance,
      lookAt.y + distance * 0.45,
      lookAt.z + Math.sin(this.cameraAngle) * distance
    );
  }

  private updateAdaptivePixelRatio(width: number): void {
    if (!this.renderer) return;
    const isMobile = width <= 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const maxRatio = isMobile ? 1.5 : 2.0;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxRatio));
  }

  private onWindowResize = (): void => {
    if (!this.canvas || !this.renderer) return;
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.updateAdaptivePixelRatio(width);
  };

  private onPointerDown = (event: MouseEvent): void => {
    this.isDragging = true;
    this.dragButton = event.button;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    this.isOrbitingAroundTarget = false;

    // Selección de objetos con clic primario breve
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    if (intersects.length > 0) {
      let obj: THREE.Object3D | null = intersects[0].object;
      while (obj && !obj.userData?.id && obj.parent) {
        obj = obj.parent;
      }
      if (obj && obj.userData?.id) {
        this.selectedObjectId = obj.userData.id;
        // Transicionar suavemente la cámara al objeto seleccionado
        const objPos = new THREE.Vector3();
        obj.getWorldPosition(objPos);
        const radius = (obj as any).geometry?.parameters?.radius || 4.0;
        this.setCameraTarget(objPos.clone().add(new THREE.Vector3(0, radius * 1.5, radius * 3.5)), objPos, radius * 4.5);

        if (this.options.onObjectSelected) {
          this.options.onObjectSelected({
            id: obj.userData.id,
            type: obj.userData.type || 'unknown',
            data: obj.userData.data
          });
        }
        return;
      }
    } else if (event.button === 0) {
      if (this.options.onObjectSelected) {
        this.options.onObjectSelected(null);
      }
    }
  };

  private onPointerMove = (event: MouseEvent): void => {
    if (!this.isDragging) return;

    const dx = event.clientX - this.lastPointerX;
    const dy = event.clientY - this.lastPointerY;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;

    if (this.dragButton === 0 && !event.shiftKey) {
      // Arrastre primario: Órbita libre alrededor del targetLookAt
      this.orbitTheta -= dx * 0.0055;
      this.orbitPhi = Math.max(0.12, Math.min(Math.PI - 0.12, this.orbitPhi - dy * 0.0055));

      const sinPhi = Math.sin(this.orbitPhi);
      this.targetPosition.set(
        this.targetLookAt.x + this.activeTargetDistance * sinPhi * Math.cos(this.orbitTheta),
        this.targetLookAt.y + this.activeTargetDistance * Math.cos(this.orbitPhi),
        this.targetLookAt.z + this.activeTargetDistance * sinPhi * Math.sin(this.orbitTheta)
      );
    } else {
      // Arrastre secundario o Shift+Arrastre: Navegación libre / Vuelo (Pan en espacio 3D)
      const panSpeed = this.activeTargetDistance * 0.0018;
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);

      const offset = right.multiplyScalar(-dx * panSpeed).add(up.multiplyScalar(dy * panSpeed));
      this.targetLookAt.add(offset);
      this.targetPosition.add(offset);
    }
  };

  private onPointerUp = (): void => {
    this.isDragging = false;
  };

  private onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    const zoomDelta = event.deltaY * 0.045;
    this.activeTargetDistance = Math.max(2.5, Math.min(1200, this.activeTargetDistance + zoomDelta));

    const sinPhi = Math.sin(this.orbitPhi);
    this.targetPosition.set(
      this.targetLookAt.x + this.activeTargetDistance * sinPhi * Math.cos(this.orbitTheta),
      this.targetLookAt.y + this.activeTargetDistance * Math.cos(this.orbitPhi),
      this.targetLookAt.z + this.activeTargetDistance * sinPhi * Math.sin(this.orbitTheta)
    );
  };

  private onTouchStart = (event: TouchEvent): void => {
    if (event.touches.length === 2) {
      this.pinchStartDistance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
    }
  };

  private onTouchMove = (event: TouchEvent): void => {
    if (event.touches.length === 2 && this.pinchStartDistance !== null) {
      const d = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
      const delta = (this.pinchStartDistance - d) * 0.35;
      this.activeTargetDistance = Math.max(2.5, Math.min(1200, this.activeTargetDistance + delta));
      this.pinchStartDistance = d;
    }
  };

  private onTouchEnd = (): void => {
    this.pinchStartDistance = null;
    this.isDragging = false;
  };

  public animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const delta = Math.min(0.05, this.clock.getDelta());

    // 1. Reloj astronómico kepleriano
    if (!this.isPaused && this.timeSpeed !== 0) {
      const msDelta = delta * 1000 * this.timeSpeed * 3600;
      this.currentDate = new Date(this.currentDate.getTime() + msDelta);
      if (this.options.onDateChange) {
        this.options.onDateChange(this.currentDate);
      }
    }

    // 2. Órbita automática suave si no está interactuando el usuario
    if (this.isOrbitingAroundTarget && !this.isDragging && this.currentMode !== 'observatory') {
      this.orbitTheta += delta * 0.08;
      const sinPhi = Math.sin(this.orbitPhi);
      this.targetPosition.set(
        this.targetLookAt.x + this.activeTargetDistance * sinPhi * Math.cos(this.orbitTheta),
        this.targetLookAt.y + this.activeTargetDistance * Math.cos(this.orbitPhi),
        this.targetLookAt.z + this.activeTargetDistance * sinPhi * Math.sin(this.orbitTheta)
      );
    }

    // 3. Amortiguación cinemática (Lerp / Slerp)
    this.camera.position.lerp(this.targetPosition, 0.1);
    this.currentLookAt.lerp(this.targetLookAt, 0.1);
    this.camera.lookAt(this.currentLookAt);

    // 4. Actualizar escena activa
    if (this.currentMode === 'solar') {
      this.solarScene.update(delta, this.timeSpeed, this.currentDate);
    } else if (this.currentMode === 'earth') {
      this.earthScene.update(delta, this.timeSpeed);
    } else if (this.currentMode === 'deep') {
      this.deepScene.update(delta, this.timeSpeed);
    } else if (this.currentMode === 'observatory') {
      this.nightScene.update(delta, this.timeSpeed);
    }

    // 5. Render HDR & Bloom
    this.composer.render();

    // 6. Cálculo de FPS
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsTime >= 500) {
      const fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
      this.frameCount = 0;
      this.lastFpsTime = now;
      if (this.options.onFpsUpdate) {
        this.options.onFpsUpdate(fps);
      }
    }
  };

  public dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.canvas.removeEventListener('touchstart', this.onTouchStart);
    this.canvas.removeEventListener('touchmove', this.onTouchMove);
    this.canvas.removeEventListener('touchend', this.onTouchEnd);
    this.renderer.dispose();
  }
}
