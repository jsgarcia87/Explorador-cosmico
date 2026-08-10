import * as THREE from 'three';
import vertexShader from './shaders/grrt_vertex.glsl?raw';
import fragmentShader from './shaders/grrt_fragment.glsl?raw';

export class GrrtScene {
  private scene: THREE.Scene;
  public rootGroup: THREE.Group = new THREE.Group();
  private mesh!: THREE.Mesh; // Black hole full-screen shader quad
  private material!: THREE.ShaderMaterial;
  private clock: THREE.Clock = new THREE.Clock();
  
  // Exoplanetas y Oclusión
  private accretionLight!: THREE.PointLight;
  private depthMask!: THREE.Mesh;
  private interactiveObjects: THREE.Object3D[] = [];
  
  // Datos simples para las órbitas
  private planetsData = [
    { name: 'Planeta Miller (Acuático)', distance: 3.5, speed: 0.8, phase: 0, color: 0x0077ff, radius: 0.15 },
    { name: 'Planeta Mann (Helado)', distance: 6.0, speed: 0.4, phase: Math.PI, color: 0xdddddf, radius: 0.12 }
  ];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Declare uniforms matching the legacy shader expectations
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0.0 },
        cam_pos: { value: new THREE.Vector3(0, 0, 11) },
        cam_vel: { value: new THREE.Vector3(0, 0, 0) },
        cam_x: { value: new THREE.Vector3(1, 0, 0) },
        cam_y: { value: new THREE.Vector3(0, 1, 0) },
        cam_z: { value: new THREE.Vector3(0, 0, -1) },
        FOV_MULT: { value: 1.0 },
        turbulence_time_offset: { value: 0.0 },
        interior_mode: { value: 0.0 },
        look_aberration_strength: { value: 1.0 },
        look_doppler_boost: { value: 1.0 },
        taa_jitter: { value: new THREE.Vector2(0, 0) },
        cam_pan: { value: new THREE.Vector2(0, 0) }
      },
      depthWrite: false,
      depthTest: false
    });

    this.material.defines = {
      ACCRETION_DISK: '',
      ACCRETION_THIN_DISK: '',
      BLACK_HOLE_SPIN_ENABLED: '',
      SAMPLE_COUNT: '1'
    };

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -100;
    
    this.rootGroup.add(this.mesh);
    
    // --- FASE 3: ILUMINACIÓN Y PLANETAS ---
    
    // 1. Luz del Disco de Acreción
    this.accretionLight = new THREE.PointLight(0xffa64d, 50.0, 0, 1.5);
    this.accretionLight.position.set(0, 0, 0);
    this.accretionLight.castShadow = true;
    this.accretionLight.shadow.mapSize.width = 1024;
    this.accretionLight.shadow.mapSize.height = 1024;
    this.accretionLight.shadow.bias = -0.001;
    this.rootGroup.add(this.accretionLight);

    // 2. Máscara de Profundidad (Horizonte de Sucesos)
    // El radio del horizonte en la simulación ronda 1.0 (aprox)
    const maskGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const maskMat = new THREE.MeshBasicMaterial({
      colorWrite: false, // No dibuja color
      depthWrite: true   // Pero sí escribe en el z-buffer
    });
    this.depthMask = new THREE.Mesh(maskGeo, maskMat);
    this.rootGroup.add(this.depthMask);

    // 3. Exoplanetas (Sistema Gargantúa)
    const textureLoader = new THREE.TextureLoader();
    const neptuneTex = textureLoader.load('/textures/neptuno.jpg');
    neptuneTex.colorSpace = THREE.SRGBColorSpace;
    const moonTex = textureLoader.load('/textures/luna.jpg');
    moonTex.colorSpace = THREE.SRGBColorSpace;

    this.planetsData.forEach((pd, index) => {
      const pGeo = new THREE.SphereGeometry(pd.radius, 64, 64);
      const pMat = new THREE.MeshStandardMaterial({
        map: index === 0 ? neptuneTex : moonTex,
        color: pd.color,
        roughness: 0.6,
        metalness: 0.1
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.castShadow = true;
      pMesh.receiveShadow = true;
      
      // Datos para interactividad
      pMesh.name = pd.name;
      pMesh.userData = {
        id: `exo_${index}`,
        type: 'planet',
        data: {
          name: pd.name,
          type: 'Exoplaneta',
          distance: pd.distance,
          massKg: 'Desconocida',
          tempCelsius: index === 0 ? 50 : -150,
          gravityMs2: 12.0,
          edu: {
            jovenes: {
              summary: `Mundo extremo orbitando un Agujero Negro supermasivo.`,
              facts: ['Sufre de extrema dilatación temporal.', 'Mareas gigantescas debido a la gravedad de Gargantúa.']
            }
          }
        }
      };
      
      this.rootGroup.add(pMesh);
      this.interactiveObjects.push(pMesh);
    });

    this.scene.add(this.rootGroup);
    this.setVisible(false);
  }

  public setVisible(visible: boolean): void {
    this.rootGroup.visible = visible;
    if (visible) {
      this.clock.start();
    } else {
      this.clock.stop();
    }
  }

  public update(): void {
    if (!this.rootGroup.visible) return;
    
    const time = this.clock.getElapsedTime();
    this.material.uniforms.time.value = time;
    this.material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);

    // Órbitas de los exoplanetas
    this.interactiveObjects.forEach((pMesh, index) => {
      const pd = this.planetsData[index];
      const angle = pd.phase + time * pd.speed;
      
      // Órbita ligeramente inclinada
      const x = Math.cos(angle) * pd.distance;
      const z = Math.sin(angle) * pd.distance;
      const y = Math.sin(angle * 2.0) * (pd.distance * 0.1); 
      
      pMesh.position.set(x, y, z);
      
      // Rotación del planeta
      pMesh.rotation.y += 0.01;
    });
  }

  public getAllInteractiveObjects(): THREE.Object3D[] {
    return this.interactiveObjects;
  }
}
