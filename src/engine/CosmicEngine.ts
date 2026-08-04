import * as THREE from 'three';
import { EffectComposer, RenderPass, BloomEffect, EffectPass, VignetteEffect } from 'postprocessing';
import { SolarSystemScene } from './SolarSystemScene';
import { EarthScene } from './EarthScene';
import { DeepSpaceScene } from './DeepSpaceScene';
import { NightSkyScene } from './NightSkyScene';

export type SceneMode = 'solar' | 'earth' | 'deep' | 'observatory';

export interface EngineOptions {
  canvas: HTMLCanvasElement;
  initialMode?: SceneMode;
  onObjectSelected?: (objData: { id: string; type: string; data: unknown } | null) => void;
  onFpsUpdate?: (fps: number) => void;
  onDateChange?: (date: Date) => void;
}

export class CosmicEngine {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private composer!: EffectComposer;
  private clock: THREE.Clock;
  private options: EngineOptions;

  // Escenas del proyecto
  public scene!: THREE.Scene;
  public currentMode: SceneMode = 'solar';

  // Sub-escenas
  private solarScene!: SolarSystemScene;
  private earthScene!: EarthScene;
  private deepScene!: DeepSpaceScene;
  private nightScene!: NightSkyScene;

  // Cámara cinemática
  private targetPosition: THREE.Vector3 = new THREE.Vector3(0, 35, 75);
  private targetLookAt: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private currentLookAt: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private isOrbitingAroundTarget: boolean = true;
  private cameraAngle: number = 0;
  private activeTargetDistance: number = 75;

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

  constructor(options: EngineOptions) {
    this.options = options;
    this.canvas = options.canvas;
    this.clock = new THREE.Clock();
    this.init();
  }

  private init(): void {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;

    // Renderer HDR
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 50000);
    this.camera.position.copy(this.targetPosition);

    // Escena principal
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020208);
    this.scene.fog = new THREE.FogExp2(0x020208, 0.00035);

    // PostProcessing Bloom & Vignette
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const bloomEffect = new BloomEffect({
      intensity: 1.4,
      luminanceThreshold: 0.35,
      luminanceSmoothing: 0.8,
      mipmapBlur: true
    });
    const vignetteEffect = new VignetteEffect({
      eskil: false,
      offset: 0.25,
      darkness: 0.55
    });
    this.composer.addPass(new EffectPass(this.camera, bloomEffect, vignetteEffect));

    // Fondo de estrellas
    this.createBackgroundStarfield();

    // Inicializar escenas modularizadas
    this.solarScene = new SolarSystemScene(this.scene);
    this.earthScene = new EarthScene(this.scene);
    this.deepScene = new DeepSpaceScene(this.scene);
    this.nightScene = new NightSkyScene(this.scene);

    // Activar modo inicial
    this.setMode(this.options.initialMode || 'solar');

    // Eventos
    window.addEventListener('resize', this.onWindowResize);
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
  }

  private createBackgroundStarfield(): void {
    const starCount = 12000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xaaccff),
      new THREE.Color(0xffddaa),
      new THREE.Color(0xff9966)
    ];

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 400 + Math.random() * 1600;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 1.0 + Math.random() * 2.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });

    const starfield = new THREE.Points(geometry, material);
    starfield.name = 'BACKGROUND_STARS';
    this.scene.add(starfield);
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
      this.setCameraTarget(new THREE.Vector3(42, 10, 15), new THREE.Vector3(42, 6, -18), 35);
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

  private onWindowResize = (): void => {
    if (!this.canvas || !this.renderer) return;
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  };

  private onPointerDown = (event: MouseEvent): void => {
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
        if (this.options.onObjectSelected) {
          this.options.onObjectSelected({
            id: obj.userData.id,
            type: obj.userData.type || 'unknown',
            data: obj.userData.data
          });
        }
      }
    } else {
      if (this.options.onObjectSelected) {
        this.options.onObjectSelected(null);
      }
    }
  };

  private onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    const zoomDelta = event.deltaY * 0.05;
    this.activeTargetDistance = Math.max(3.0, Math.min(250, this.activeTargetDistance + zoomDelta));
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

    // 2. Rotación orbital cinemática suave
    if (this.isOrbitingAroundTarget && this.currentMode !== 'observatory') {
      this.cameraAngle += delta * 0.12;
      this.targetPosition.set(
        this.targetLookAt.x + Math.cos(this.cameraAngle) * this.activeTargetDistance,
        this.targetLookAt.y + this.activeTargetDistance * 0.35,
        this.targetLookAt.z + Math.sin(this.cameraAngle) * this.activeTargetDistance
      );
    }

    // 3. Amortiguación cinemática (Lerp / Slerp)
    this.camera.position.lerp(this.targetPosition, 0.08);
    this.currentLookAt.lerp(this.targetLookAt, 0.08);
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
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.renderer.dispose();
  }
}
