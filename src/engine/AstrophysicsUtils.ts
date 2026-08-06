import * as THREE from 'three';

export type HarvardSpectralClass = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M';

/**
 * Módulo de Utilidades Astrofísicas y Fotometría Estelar
 * 
 * Implementa:
 * - Clasificación espectral de Harvard (OBAFGKM) con temperaturas de cuerpo negro.
 * - Conversión científica de temperatura efectiva (Kelvin) a coordenadas CIE / sRGB.
 * - Ley de magnitudes logarítmicas de Pogson para brillo e irradiancia estelar.
 */
export class AstrophysicsUtils {
  /**
   * Determina la clase espectral de Harvard según la temperatura efectiva (Kelvin)
   */
  public static getSpectralClass(tempKelvin: number): HarvardSpectralClass {
    if (tempKelvin >= 30000) return 'O';
    if (tempKelvin >= 10000) return 'B';
    if (tempKelvin >= 7500) return 'A';
    if (tempKelvin >= 6000) return 'F';
    if (tempKelvin >= 5200) return 'G';
    if (tempKelvin >= 3700) return 'K';
    return 'M';
  }

  /**
   * Genera una temperatura estelar en Kelvin siguiendo la distribución estadística
   * real del Universo observable (Función Inicial de Masa / Harvard OBAFGKM):
   * ~76% Enanas Rojas (M), ~12% Naranjas (K), ~8% Tipo Solar (G),
   * ~3% (F), ~0.7% Blancas (A), ~0.2% Azules (B/O).
   */
  public static sampleOBAFGKMTemperature(): number {
    const r = Math.random() * 100.0;
    if (r < 76.0) {
      // Clase M (2400 K - 3700 K)
      return 2400 + Math.random() * 1300;
    } else if (r < 88.0) {
      // Clase K (3700 K - 5200 K)
      return 3700 + Math.random() * 1500;
    } else if (r < 96.0) {
      // Clase G (5200 K - 6000 K) - Como el Sol (5778 K)
      return 5200 + Math.random() * 800;
    } else if (r < 99.0) {
      // Clase F (6000 K - 7500 K)
      return 6000 + Math.random() * 1500;
    } else if (r < 99.7) {
      // Clase A (7500 K - 10000 K)
      return 7500 + Math.random() * 2500;
    } else if (r < 99.95) {
      // Clase B (10000 K - 25000 K)
      return 10000 + Math.random() * 15000;
    } else {
      // Clase O (> 25000 K, supergigantes azules extremas)
      return 25000 + Math.random() * 10000;
    }
  }

  /**
   * Convierte la temperatura de cuerpo negro de una estrella (en Kelvin) a color THREE.Color sRGB
   * empleando la aproximación analítica del Locus Planckiano (Ballesteros / Tanner).
   *
   * @param kelvin Temperatura efectiva T_eff en Kelvin [2000, 40000]
   * @returns THREE.Color sRGB científicamente calibrado
   */
  public static kelvinToRGB(kelvin: number): THREE.Color {
    const temp = Math.max(2000, Math.min(40000, kelvin)) / 100.0;
    let red = 0;
    let green = 0;
    let blue = 0;

    // Cálculo del Rojo
    if (temp <= 66.0) {
      red = 255;
    } else {
      red = temp - 60.0;
      red = 329.698727446 * Math.pow(red, -0.1332047592);
      red = Math.max(0, Math.min(255, red));
    }

    // Cálculo del Verde
    if (temp <= 66.0) {
      green = temp;
      green = 99.4708025861 * Math.log(green) - 161.1195681661;
      green = Math.max(0, Math.min(255, green));
    } else {
      green = temp - 60.0;
      green = 288.1221695283 * Math.pow(green, -0.0755148492);
      green = Math.max(0, Math.min(255, green));
    }

    // Cálculo del Azul
    if (temp >= 66.0) {
      blue = 255;
    } else if (temp <= 19.0) {
      blue = 0;
    } else {
      blue = temp - 10.0;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
      blue = Math.max(0, Math.min(255, blue));
    }

    const color = new THREE.Color(red / 255.0, green / 255.0, blue / 255.0);
    const hsl = { h: 0, s: 0, l: 0 };
    color.getHSL(hsl);
    hsl.s = Math.min(hsl.s, 0.4);
    color.setHSL(hsl.h, hsl.s, hsl.l);
    return color;
  }

  /**
   * Aplica la Ley logarítmica de Pogson para calcular el tamaño visual / brillo de un punto estelar
   * a partir de su magnitud aparente m_v.
   *
   * Fórmula: I = I_0 * 10^(-0.4 * m_v)
   *
   * @param magV Magnitud aparente visual [-1.5 (Sirius), 6.0 (límite ojo desnudo)]
   * @returns Tamaño y factor de opacidad para el shader/material de puntos
   */
  public static pogsonMagnitudeToSize(magV: number): { size: number; opacity: number } {
    // Relación logarítmica de flujo
    const intensity = Math.pow(10, -0.4 * magV);

    // Mapear magnitud -1.5 -> tamaño ~3.8, magnitud 5.0 -> tamaño ~0.9
    const size = Math.max(0.7, Math.min(4.2, 2.2 + intensity * 1.8 - magV * 0.35));
    const opacity = Math.max(0.35, Math.min(1.0, 0.95 - magV * 0.08));

    return { size, opacity };
  }
}
