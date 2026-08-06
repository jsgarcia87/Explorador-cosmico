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
  private selectedObjectRadius: number = 2.5;
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
    this.renderer.toneMapping = THREE.NoToneMapping;
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

    // 1. Cielo Estrellado Fotorrealista (NASA Tycho 8K/4K adaptativo)
    const isMobile = window.innerWidth <= 1024 || /iPad|iPhone|iPod|Android/i.test(navigator.userAgent);
    const maxTexSize = this.renderer.capabilities.maxTextureSize;
    const use8K = !isMobile && maxTexSize >= 8192;
    const starmapUrl = use8K ? '/textures/starmap_8k.jpg' : '/textures/starmap_4k.jpg';

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(starmapUrl, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      this.scene.background = texture;
      this.scene.environment = texture;
    });

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

  public setMode(mode: SceneMode): void {
    this.currentMode = mode;
    this.clearInteractive();

    if (this.options.onObjectSelected) {
      this.options.onObjectSelected(null);
    }
    this.selectedObjectId = null;
    this.selectedObjectRadius = 0;

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

  public setGuidesVisible(visible: boolean): void {
    if (this.currentMode === 'solar' && 'setGuidesVisible' in this.solarScene) {
      (this.solarScene as any).setGuidesVisible(visible);
    }
  }

  public start(): void {
    this.clock.start();
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

  public setCameraTarget(pos: THREE.Vector3, lookAt: THREE.Vector3, distance?: number): void {
    this.targetLookAt.copy(lookAt);
    this.targetPosition.copy(pos);
    
    const offset = new THREE.Vector3().subVectors(this.targetPosition, this.targetLookAt);
    this.activeTargetDistance = distance !== undefined ? distance : offset.length();
    
    if (offset.lengthSq() > 0.0001) {
      this.orbitPhi = Math.acos(Math.max(-1, Math.min(1, offset.y / offset.length())));
      this.orbitTheta = Math.atan2(offset.z, offset.x);
    }
    this.isOrbitingAroundTarget = true;
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
        this.selectedObjectRadius = radius;
        
        // Calcular offset basado en la dirección del Sol (origen) para enfocar el lado iluminado
        const sunDir = objPos.clone().normalize();
        const camOffset = sunDir.multiplyScalar(-radius * 3.5).add(new THREE.Vector3(0, radius * 1.5, 0));
        
        this.setCameraTarget(objPos.clone().add(camOffset), objPos, radius * 4.5);

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
        this.selectedObjectRadius = 2.5;
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
    const minDist = this.selectedObjectRadius ? this.selectedObjectRadius * 1.8 : 2.5;
    this.activeTargetDistance = Math.max(minDist, Math.min(1200, this.activeTargetDistance + zoomDelta));

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
      const minDist = this.selectedObjectRadius ? this.selectedObjectRadius * 1.8 : 2.5;
      this.activeTargetDistance = Math.max(minDist, Math.min(1200, this.activeTargetDistance + delta));
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
      const msDelta = delta * 1000 * this.timeSpeed;
      this.currentDate = new Date(this.currentDate.getTime() + msDelta);
      if (this.options.onDateChange) {
        this.options.onDateChange(this.currentDate);
      }
    }

    // Trackear continuamente al objeto seleccionado si se está moviendo
    if (this.selectedObjectId) {
      const obj = this.interactiveObjects.find(o => o.userData.id === this.selectedObjectId);
      if (obj) {
        const objPos = new THREE.Vector3();
        obj.getWorldPosition(objPos);
        this.targetLookAt.copy(objPos);
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
