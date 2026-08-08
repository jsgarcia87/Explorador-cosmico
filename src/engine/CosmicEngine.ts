import * as THREE from 'three';
import { EffectComposer } from 'postprocessing';
import { RenderPass, BloomEffect, VignetteEffect, EffectPass, ToneMappingEffect, ToneMappingMode } from 'postprocessing';
import { SolarSystemScene } from './SolarSystemScene';
import { EarthScene } from './EarthScene';
import { DeepSpaceScene } from './DeepSpaceScene';
import { NightSkyScene } from './NightSkyScene';
import { CosmicWebScene } from './CosmicWebScene';
import { AstrophysicsUtils } from './AstrophysicsUtils';
import { ProceduralTextures } from './textures/ProceduralTextures';

export type SceneMode = 'solar' | 'earth' | 'deep' | 'observatory' | 'cosmicweb';

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
  private cosmicWebScene!: CosmicWebScene;

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

  // Navegación libre estilo nave (alternativa al modo órbita clásico)
  private navigationMode: 'orbit' | 'free' = 'orbit';
  private freeYaw: number = 0;
  private freePitch: number = 0;
  private freeVelocity: THREE.Vector3 = new THREE.Vector3();
  private freeMoveInput: THREE.Vector3 = new THREE.Vector3(0, 0, 0); // x=lateral, y=vertical, z=adelante
  private freeBoostButton: boolean = false;
  private freeBaseSpeed: number = 26;
  private freeDamping: number = 4.5;
  private freeLookSensitivity: number = 0.0028;
  private freeKeys: Record<string, boolean> = {};
  private freeAutopilot: {
    startPos: THREE.Vector3;
    startQuat: THREE.Quaternion;
    endPos: THREE.Vector3;
    endQuat: THREE.Quaternion;
    t0: number;
    duration: number;
  } | null = null;

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
      intensity: 0.8,
      mipmapBlur: true,
      luminanceThreshold: 1.2,
      luminanceSmoothing: 0.3
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
    this.cosmicWebScene = new CosmicWebScene(this.scene);

    // Umbral de raycasting para THREE.Points (por defecto es casi imposible
    // impactar una nube de puntos con un rayo); necesario para poder
    // seleccionar la Red Cósmica con clic/tap.
    this.raycaster.params.Points = { threshold: 3.5 };

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
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

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
    this.cosmicWebScene.setVisible(mode === 'cosmicweb');

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
    } else if (mode === 'cosmicweb') {
      const center = this.cosmicWebScene.getFieldCenter();
      const radius = this.cosmicWebScene.getFieldRadius();
      this.setCameraTarget(
        center.clone().add(new THREE.Vector3(0, radius * 0.3, radius * 1.1)),
        center,
        radius * 1.2
      );
      this.interactiveObjects = this.cosmicWebScene.getAllInteractiveObjects();
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
    if (this.navigationMode === 'free') {
      this.freeAutopilot = null;
    }

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
        
        if (this.navigationMode === 'free') {
          this.flyToObjectFree(objPos, radius);
        } else {
          this.setCameraTarget(objPos.clone().add(camOffset), objPos, radius * 4.5);
        }

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

    if (this.navigationMode === 'free') {
      this.freeAutopilot = null;
      this.freeYaw -= dx * this.freeLookSensitivity;
      this.freePitch = Math.max(-1.5, Math.min(1.5, this.freePitch - dy * this.freeLookSensitivity));
      return;
    }

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
    if (this.navigationMode === 'free') {
      this.freeAutopilot = null;
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
      this.camera.position.addScaledVector(forward, -event.deltaY * 0.03);
      return;
    }
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
      if (this.navigationMode === 'free') {
        this.freeAutopilot = null;
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
        this.camera.position.addScaledVector(forward, -delta * 0.12);
      } else {
        const minDist = this.selectedObjectRadius ? this.selectedObjectRadius * 1.8 : 2.5;
        this.activeTargetDistance = Math.max(minDist, Math.min(1200, this.activeTargetDistance + delta));
      }
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

    if (this.navigationMode === 'free') {
      // 2b. Navegación libre estilo nave (posición + orientación por cuaternión)
      this.updateFreeFlight(delta);
    } else {
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
    }

    // 4. Actualizar escena activa
    if (this.currentMode === 'solar') {
      this.solarScene.update(delta, this.timeSpeed, this.currentDate);
    } else if (this.currentMode === 'earth') {
      this.earthScene.update(delta, this.timeSpeed);
    } else if (this.currentMode === 'deep') {
      this.deepScene.update(delta, this.timeSpeed);
    } else if (this.currentMode === 'observatory') {
      this.nightScene.update(delta, this.timeSpeed);
    } else if (this.currentMode === 'cosmicweb') {
      this.cosmicWebScene.update(delta);
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

  // ============================================================
  // NAVEGACIÓN LIBRE ESTILO NAVE (alternativa al modo órbita)
  // ============================================================

  private onKeyDown = (event: KeyboardEvent): void => {
    this.freeKeys[event.code] = true;
    if (this.navigationMode === 'free' && ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE'].includes(event.code)) {
      this.freeAutopilot = null;
    }
  };

  private onKeyUp = (event: KeyboardEvent): void => {
    this.freeKeys[event.code] = false;
  };

  /**
   * Activa el piloto automático de vuelo libre: interpola posición (lerp)
   * y orientación (slerp de cuaterniones) hasta una posición de aproximación
   * relativa a la dirección real Sol -> objeto, para llegar siempre por el
   * lado iluminado. Cualquier entrada manual (teclado, joystick, arrastre)
   * cancela el piloto automático de inmediato.
   */
  private flyToObjectFree(objPos: THREE.Vector3, radius: number): void {
    const sunDir = objPos.clone();
    if (sunDir.lengthSq() > 0.0001) {
      sunDir.normalize();
    } else {
      sunDir.set(0, 0, 1);
    }
    const dist = Math.max(radius * 4.2, 6);
    const endPos = objPos
      .clone()
      .add(sunDir.clone().multiplyScalar(-dist * 0.75))
      .add(new THREE.Vector3(0, dist * 0.35, 0));
    const lookMat = new THREE.Matrix4().lookAt(endPos, objPos, new THREE.Vector3(0, 1, 0));
    const endQuat = new THREE.Quaternion().setFromRotationMatrix(lookMat);

    this.freeAutopilot = {
      startPos: this.camera.position.clone(),
      startQuat: this.camera.quaternion.clone(),
      endPos,
      endQuat,
      t0: performance.now(),
      duration: 1300
    };
  }

  private updateFreeFlight(delta: number): void {
    if (this.freeAutopilot) {
      const ap = this.freeAutopilot;
      const t = Math.min(1, (performance.now() - ap.t0) / ap.duration);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      this.camera.position.lerpVectors(ap.startPos, ap.endPos, ease);
      this.camera.quaternion.slerpQuaternions(ap.startQuat, ap.endQuat, ease);
      if (t >= 1) {
        this.freeAutopilot = null;
        const e = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
        this.freeYaw = e.y;
        this.freePitch = e.x;
      }
      return;
    }

    // Entrada de teclado (WASD + Q/E), con prioridad sobre joystick/botones táctiles
    let kx = 0, ky = 0, kz = 0;
    if (this.freeKeys['KeyW']) kz += 1;
    if (this.freeKeys['KeyS']) kz -= 1;
    if (this.freeKeys['KeyD']) kx += 1;
    if (this.freeKeys['KeyA']) kx -= 1;
    if (this.freeKeys['KeyE']) ky += 1;
    if (this.freeKeys['KeyQ']) ky -= 1;

    const inputX = kx !== 0 ? kx : this.freeMoveInput.x;
    const inputY = ky !== 0 ? ky : this.freeMoveInput.y;
    const inputZ = kz !== 0 ? kz : this.freeMoveInput.z;

    const euler = new THREE.Euler(this.freePitch, this.freeYaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(euler);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0);

    const boostActive = this.freeBoostButton || !!this.freeKeys['ShiftLeft'] || !!this.freeKeys['ShiftRight'];
    const speed = this.freeBaseSpeed * (boostActive ? 3.4 : 1);

    const accel = new THREE.Vector3();
    accel.addScaledVector(forward, inputZ);
    accel.addScaledVector(right, inputX);
    accel.addScaledVector(up, inputY);
    if (accel.lengthSq() > 0) accel.normalize().multiplyScalar(speed);

    this.freeVelocity.lerp(accel, Math.min(1, delta * this.freeDamping));
    this.camera.position.addScaledVector(this.freeVelocity, delta);
  }

  /**
   * Cambia entre el modo órbita clásico (cámara amarrada a un objetivo) y
   * la navegación libre estilo nave (posición y orientación totalmente libres).
   */
  public setNavigationMode(mode: 'orbit' | 'free'): void {
    this.navigationMode = mode;
    if (mode === 'free') {
      const e = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
      this.freeYaw = e.y;
      this.freePitch = e.x;
      this.freeVelocity.set(0, 0, 0);
      this.freeAutopilot = null;
    }
  }

  public getNavigationMode(): 'orbit' | 'free' {
    return this.navigationMode;
  }

  /** Alimenta el movimiento desde un joystick táctil externo (componente React). */
  public setFreeMoveInput(x: number, y: number, z: number): void {
    this.freeMoveInput.set(x, y, z);
  }

  /** Activa/desactiva el impulso desde un botón táctil externo. */
  public setFreeBoost(active: boolean): void {
    this.freeBoostButton = active;
  }

  /**
   * Leyenda de objetos celestes: posición proyectada en pantalla (o el
   * borde más cercano si están fuera de vista) y distancia en vivo,
   * para que un componente HUD dibuje marcadores tipo videojuego.
   */
  public getLegendData(): Array<{
    id: string;
    name: string;
    type: string;
    distance: number;
    screenX: number;
    screenY: number;
    onScreen: boolean;
    behind: boolean;
    selected: boolean;
  }> {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const worldPos = new THREE.Vector3();
    const result: ReturnType<CosmicEngine['getLegendData']> = [];

    for (const obj of this.interactiveObjects) {
      obj.getWorldPosition(worldPos);
      const distance = this.camera.position.distanceTo(worldPos);
      const proj = worldPos.clone().project(this.camera);
      const behind = proj.z > 1;
      const onScreen = !behind && proj.x > -0.98 && proj.x < 0.98 && proj.y > -0.98 && proj.y < 0.98;
      const screenX = (proj.x * 0.5 + 0.5) * width;
      const screenY = (1 - (proj.y * 0.5 + 0.5)) * height;
      const data = obj.userData?.data;
      const name: string = (data && data.name) || obj.name || obj.userData?.id || 'Objeto';

      result.push({
        id: obj.userData?.id || obj.uuid,
        name,
        type: obj.userData?.type || 'unknown',
        distance,
        screenX,
        screenY,
        onScreen,
        behind,
        selected: obj.userData?.id === this.selectedObjectId
      });
    }
    return result;
  }

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
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.renderer.dispose();
  }
}
