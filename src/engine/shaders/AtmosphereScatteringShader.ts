import * as THREE from 'three';

/**
 * Parámetros de configuración física del shader de dispersión atmosférica
 */
export interface AtmosphereShaderOptions {
  /** Color principal de dispersión Rayleigh diurna (Hex o RGB) */
  rayleighColor?: number;
  /** Color de dispersión en el terminador crepuscular (ej. Naranja-Rojo en Tierra, Azul en Marte) */
  terminatorColor?: number;
  /** Dirección del vector solar en coordenadas del mundo */
  sunDirection?: THREE.Vector3;
  /** Opacidad máxima en el limbo atmosférico */
  maxOpacity?: number;
  /** Coeficiente de densidad barométrica [0.5, 3.0] */
  density?: number;
  /** Fuerza del brillo solar hacia adelante (Mie scattering) [0.0, 1.0] */
  mieStrength?: number;
}

/**
 * Módulo de Shaders Físicos de Dispersión Atmosférica (Rayleigh & Mie Scattering)
 * 
 * Simula el comportamiento óptico real de la luz solar al atravesar capas atmosféricas:
 * - Dispersión Rayleigh (β_R ∝ λ^-4): Cielo azul y halo en el limbo diurno.
 * - Dispersión Mie (Henyey-Greenstein): Resplandor solar frontal (Sun glow).
 * - Absorción tangencial en el terminador: Crepúsculo naranja/rojo en la Tierra,
 *   y atardecer azulado en Marte debido al polvo en suspensión.
 */
export class AtmosphereScatteringShader {
  public static readonly VertexShader = `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      // Normal en coordenadas mundiales
      vNormal = normalize(normalMatrix * normal);
      
      // Posición en coordenadas mundiales
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      
      // Vector de visión hacia la cámara
      vViewPosition = normalize(cameraPosition - worldPos.xyz);
      
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `;

  public static readonly FragmentShader = `
    uniform vec3 uSunDirection;
    uniform vec3 uRayleighColor;
    uniform vec3 uTerminatorColor;
    uniform float uMaxOpacity;
    uniform float uDensity;
    uniform float uMieStrength;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    // Función de fase de Rayleigh: P_R(θ) = 3/(16π) * (1 + cos²θ)
    float rayleighPhase(float cosTheta) {
      return 0.75 * (1.0 + cosTheta * cosTheta);
    }

    // Función de fase de Mie (Henyey-Greenstein simplificada para g=0.75)
    float miePhase(float cosTheta, float g) {
      float g2 = g * g;
      return (1.0 - g2) / pow(1.0 + g2 - 2.0 * g * cosTheta, 1.5);
    }

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      vec3 sunDir = normalize(uSunDirection);

      // 1. Ángulo de visión respecto a la normal del planeta (Limb / Borde)
      // En el centro del disco N·V ~ 1; en el horizonte tangencial N·V ~ 0
      float NdotV = max(0.0, dot(normal, viewDir));
      float limbFactor = 1.0 - NdotV;
      float opticalDepth = pow(limbFactor, 6.0 / max(0.5, uDensity));

      // 2. Ángulo solar respecto a la normal del planeta (Día vs Noche)
      // N·L > 0 (Día), N·L = 0 (Terminador amanecer/atardecer), N·L < 0 (Noche)
      float NdotL = dot(normal, sunDir);
      float dayFactor = smoothstep(-0.25, 0.25, NdotL);
      float terminatorBand = 1.0 - abs(NdotL * 2.0);
      terminatorBand = max(0.0, terminatorBand * terminatorBand);

      // 3. Ángulo entre visión y sol para dispersión frontal Mie
      float VdotL = dot(-viewDir, sunDir);
      float mieGlow = miePhase(VdotL, 0.76) * uMieStrength * dayFactor;

      // 4. Color compuesto Rayleigh + Crepúsculo en Terminador + Mie
      vec3 dayAtmosphere = uRayleighColor * (1.0 + 0.3 * rayleighPhase(VdotL));
      vec3 terminatorAtmosphere = uTerminatorColor * 1.5;
      
      vec3 finalColor = mix(dayAtmosphere, terminatorAtmosphere, terminatorBand * 0.75);
      finalColor += vec3(1.0, 0.95, 0.8) * mieGlow * 0.4;

      // 5. Atenuación en el hemisferio nocturno (la atmósfera no brilla en sombra total)
      float nightFade = smoothstep(-0.4, 0.1, NdotL);
      float alpha = opticalDepth * uMaxOpacity * nightFade;

      // Brillo tenue del limbo para silueta astrométrica visible
      alpha = max(alpha, pow(limbFactor, 6.0) * 0.08);

      gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
    }
  `;

  /**
   * Crea un material de dispersión atmosférica Rayleigh/Mie listo para usar
   * en mallas esféricas alrededor de planetas.
   *
   * @param options Parámetros físicos del planeta (colores Rayleigh, crepúsculo y sol)
   * @returns THREE.ShaderMaterial configurado
   */
  public static createMaterial(options: AtmosphereShaderOptions = {}): THREE.ShaderMaterial {
    const rayleighHex = options.rayleighColor !== undefined ? options.rayleighColor : 0x3388ff;
    // Por defecto en la Tierra: Crepúsculo naranja-rojizo 0xff5511
    const terminatorHex = options.terminatorColor !== undefined ? options.terminatorColor : 0xff5511;

    return new THREE.ShaderMaterial({
      vertexShader: this.VertexShader,
      fragmentShader: this.FragmentShader,
      uniforms: {
        uSunDirection: { value: options.sunDirection || new THREE.Vector3(1, 0, 0) },
        uRayleighColor: { value: new THREE.Color(rayleighHex) },
        uTerminatorColor: { value: new THREE.Color(terminatorHex) },
        uMaxOpacity: { value: options.maxOpacity !== undefined ? options.maxOpacity : 0.85 },
        uDensity: { value: options.density !== undefined ? options.density : 1.2 },
        uMieStrength: { value: options.mieStrength !== undefined ? options.mieStrength : 0.5 }
      },
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }

  /**
   * Devuelve los colores ópticamente calibrados para los crepúsculos planetarios del Sistema Solar.
   * - Tierra: Rayleigh azul, crepúsculo naranja-rojo
   * - Marte: Rayleigh rojizo-ocre, crepúsculo AZUL (por dispersión Mie de polvo marciano)
   * - Venus: Rayleigh amarillo sulfúrico, crepúsculo dorado oscuro
   * - Titán: Rayleigh naranja metano, crepúsculo violeta tenue
   * - Urano/Neptuno: Rayleigh cian-azul, crepúsculo azul marino
   */
  public static getPlanetAtmospherePalette(planetId: string): { rayleigh: number; terminator: number; density: number } {
    switch (planetId.toLowerCase()) {
      case 'tierra':
      case 'earth':
        return { rayleigh: 0x3388ff, terminator: 0xff5511, density: 1.3 };
      case 'marte':
      case 'mars':
        // ¡El famoso atardecer azul marciano fotografiado por Curiosity y Perseverance!
        return { rayleigh: 0xd97548, terminator: 0x4488ff, density: 0.7 };
      case 'venus':
        return { rayleigh: 0xf0d9a0, terminator: 0xc48633, density: 2.5 };
      case 'jupiter':
        return { rayleigh: 0xffcc88, terminator: 0xb86c38, density: 1.8 };
      case 'saturno':
        return { rayleigh: 0xf5e3b3, terminator: 0xc99c5f, density: 1.5 };
      case 'urano':
        return { rayleigh: 0xbdf3ee, terminator: 0x4c9da8, density: 1.1 };
      case 'neptuno':
        return { rayleigh: 0x5588ff, terminator: 0x2244aa, density: 1.4 };
      default:
        return { rayleigh: 0x5cc5ff, terminator: 0xff6622, density: 1.0 };
    }
  }
}
