import * as THREE from 'three';

/**
 * Elementos orbitales keplerianos en época J2000.0 (NASA JPL / IAU)
 */
export interface KeplerianElements {
  /** Semieje mayor en Unidades Astronómicas (AU) */
  aAU: number;
  /** Excentricidad orbital (0 = circular, < 1 = elipse) */
  e: number;
  /** Inclinación orbital respecto al plano de la eclíptica en grados */
  iDeg: number;
  /** Longitud del nodo ascendente (Ω) en grados */
  omegaDeg: number;
  /** Argumento del perihelio (ω) en grados */
  wDeg: number;
  /** Anomalía media en época J2000.0 (M₀) en grados */
  m0Deg: number;
  /** Período sideral orbital en días terrestres (365.256 para la Tierra) */
  periodDays: number;
}

/**
 * Resultado del cálculo orbital para una fecha dada.
 */
export interface OrbitPositionResult {
  /** Vector 3D de la posición en la escena WebGL/WebGPU */
  position: THREE.Vector3;
  /** Distancia heliocéntrica verdadera en AU */
  distanceAU: number;
  /** Distancia heliocéntrica verdadera en km */
  distanceKm: number;
  /** Anomalía verdadera (ν) en radianes */
  trueAnomalyRad: number;
  /** Anomalía excéntrica (E) en radianes */
  eccentricAnomalyRad: number;
  /** Anomalía media (M) en radianes */
  meanAnomalyRad: number;
}

/**
 * Constantes astronómicas
 */
const J2000_EPOCH_MS = Date.UTC(2000, 0, 1, 12, 0, 0); // 2000-01-01T12:00:00Z
const AU_IN_KM = 149597870.7; // 1 AU en kilómetros exactos IAU
const DEG_TO_RAD = Math.PI / 180.0;

/**
 * Motor de Física Orbital Kepleriana (NASA JPL / J2000)
 * 
 * Resuelve numéricamente la Ecuación de Kepler y convierte elementos
 * orbitales keplerianos (a, e, i, Ω, ω, M₀) a coordenadas cartesianas 3D
 * en el plano de la eclíptica (J2000) de Three.js.
 */
export class KeplerianOrbitEngine {
  /**
   * Mapea una distancia en Unidades Astronómicas (AU) al sistema de coordenadas visual
   * de la escena 3D utilizando una curva de potencias astronómica calibrada para que
   * todos los planetas e órbitas sean navegables en pantalla manteniendo su orden,
   * proporciones elípticas y relaciones orbitales.
   *
   * @param rAU Distancia en UA (AU)
   * @returns Radio en unidades de escena
   */
  public static mapDistanceAUToScene(rAU: number): number {
    if (rAU <= 0) return 0;
    // Escala astronómica visual optimizada: Tierra (1 AU) -> 26 unidades
    // r_scene = 26 * (r_AU)^0.42
    return 26.0 * Math.pow(rAU, 0.42);
  }

  /**
   * Resuelve numéricamente la Ecuación de Kepler: M = E - e * sin(E)
   * mediante el método iterativo de Newton-Raphson.
   * 
   * @param M Anomalía media en radianes
   * @param e Excentricidad orbital [0, 1)
   * @param maxIterations Máximo de iteraciones de Newton (típico 5)
   * @param tolerance Tolerancia de convergencia en radianes (1e-8)
   * @returns Anomalía excéntrica E en radianes
   */
  public static solveKeplerEquation(
    M: number,
    e: number,
    maxIterations: number = 8,
    tolerance: number = 1e-8
  ): number {
    // Normalizar M a [0, 2π)
    const M_norm = ((M % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    // Estimación inicial
    let E = e > 0.8 ? Math.PI : M_norm;

    for (let i = 0; i < maxIterations; i++) {
      const f = E - e * Math.sin(E) - M_norm;
      const fPrime = 1.0 - e * Math.cos(E);
      const delta = f / fPrime;
      E -= delta;
      if (Math.abs(delta) < tolerance) {
        break;
      }
    }

    return E;
  }

  /**
   * Calcula la posición 3D real heliocéntrica y datos astrométricos de un cuerpo
   * para una fecha astronómica dada.
   *
   * @param date Fecha UTC de simulación
   * @param elements Elementos orbitales J2000
   * @returns Objeto OrbitPositionResult con posición cartesianas 3D y telemetría
   */
  public static getPositionAtDate(date: Date, elements: KeplerianElements): OrbitPositionResult {
    // 1. Días solares transcurridos desde la época J2000.0
    const daysSinceJ2000 = (date.getTime() - J2000_EPOCH_MS) / (1000.0 * 60.0 * 60.0 * 24.0);

    // 2. Anomalía Media (M) en radianes
    const meanMotionRadPerDay = (2.0 * Math.PI) / elements.periodDays;
    const M0_rad = elements.m0Deg * DEG_TO_RAD;
    const M_rad = M0_rad + meanMotionRadPerDay * daysSinceJ2000;

    // 3. Anomalía Excéntrica (E) en radianes via Newton-Raphson
    const E_rad = this.solveKeplerEquation(M_rad, elements.e);

    // 4. Coordenadas en el plano orbital de la elipse (2D)
    // x_orb apunta hacia el periapsis
    const x_orb = elements.aAU * (Math.cos(E_rad) - elements.e);
    const y_orb = elements.aAU * Math.sqrt(1.0 - elements.e * elements.e) * Math.sin(E_rad);

    // Distancia verdadera heliocéntrica en AU y km
    const rAU = Math.sqrt(x_orb * x_orb + y_orb * y_orb);
    const rKm = rAU * AU_IN_KM;

    // Anomalía verdadera ν (nu)
    const nuRad = Math.atan2(y_orb, x_orb);

    // 5. Rotación de Euler al sistema de referencia eclíptico 3D J2000
    // Ángulos en radianes
    const i_rad = elements.iDeg * DEG_TO_RAD;
    const omega_rad = elements.omegaDeg * DEG_TO_RAD; // Ω (Nodo ascendente)
    const w_rad = elements.wDeg * DEG_TO_RAD;         // ω (Argumento de periapsis)

    // Coordenadas eclípticas heliocéntricas J2000 (AU)
    // X = r * (cos(Ω)cos(ω+ν) - sin(Ω)sin(ω+ν)cos(i))
    // Y = r * (sin(Ω)cos(ω+ν) + cos(Ω)sin(ω+ν)cos(i))
    // Z = r * (sin(ω+ν)sin(i))
    const u = w_rad + nuRad; // Argumento de la latitud (ω + ν)
    const cosU = Math.cos(u);
    const sinU = Math.sin(u);
    const cosOmega = Math.cos(omega_rad);
    const sinOmega = Math.sin(omega_rad);
    const cosI = Math.cos(i_rad);
    const sinI = Math.sin(i_rad);

    const x_ecl_AU = rAU * (cosOmega * cosU - sinOmega * sinU * cosI);
    const y_ecl_AU = rAU * (sinOmega * cosU + cosOmega * sinU * cosI);
    const z_ecl_AU = rAU * (sinU * sinI);

    // 6. Conversión de Eclíptica Astronómica (Z norte eclíptico) a coordenadas Three.js
    // En Three.js: X es derecha, Y es arriba (Norte), Z es profundidad
    // Mapeo: Three.X = x_ecl, Three.Y = z_ecl (Norte eclíptico), Three.Z = -y_ecl
    const r_scene = this.mapDistanceAUToScene(rAU);
    const scaleFactor = rAU > 0 ? r_scene / rAU : 0;

    const position = new THREE.Vector3(
      x_ecl_AU * scaleFactor,
      z_ecl_AU * scaleFactor,
      -y_ecl_AU * scaleFactor
    );

    return {
      position,
      distanceAU: rAU,
      distanceKm: rKm,
      trueAnomalyRad: nuRad,
      eccentricAnomalyRad: E_rad,
      meanAnomalyRad: M_rad
    };
  }

  /**
   * Genera los puntos 3D para renderizar la órbita kepleriana elíptica e inclinada
   * en la escena WebGL/WebGPU.
   *
   * @param elements Elementos orbitales del cuerpo
   * @param numPoints Número de segmentos para la curva de la elipse (ej. 256)
   * @returns Array de vectores 3D (THREE.Vector3) que forman la órbita completa
   */
  public static generateOrbitCurve3D(
    elements: KeplerianElements,
    numPoints: number = 256
  ): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    const i_rad = elements.iDeg * DEG_TO_RAD;
    const omega_rad = elements.omegaDeg * DEG_TO_RAD;
    const w_rad = elements.wDeg * DEG_TO_RAD;

    const cosOmega = Math.cos(omega_rad);
    const sinOmega = Math.sin(omega_rad);
    const cosI = Math.cos(i_rad);
    const sinI = Math.sin(i_rad);

    for (let idx = 0; idx <= numPoints; idx++) {
      // Muestrear anomalía excéntrica E uniformemente entre 0 y 2π
      const E_rad = (idx / numPoints) * (2.0 * Math.PI);

      // Coordenadas en el plano de la elipse
      const x_orb = elements.aAU * (Math.cos(E_rad) - elements.e);
      const y_orb = elements.aAU * Math.sqrt(1.0 - elements.e * elements.e) * Math.sin(E_rad);

      const rAU = Math.sqrt(x_orb * x_orb + y_orb * y_orb);
      const nuRad = Math.atan2(y_orb, x_orb);

      const u = w_rad + nuRad;
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      const x_ecl_AU = rAU * (cosOmega * cosU - sinOmega * sinU * cosI);
      const y_ecl_AU = rAU * (sinOmega * cosU + cosOmega * sinU * cosI);
      const z_ecl_AU = rAU * (sinU * sinI);

      const r_scene = this.mapDistanceAUToScene(rAU);
      const scaleFactor = rAU > 0 ? r_scene / rAU : 0;

      points.push(
        new THREE.Vector3(
          x_ecl_AU * scaleFactor,
          z_ecl_AU * scaleFactor,
          -y_ecl_AU * scaleFactor
        )
      );
    }

    return points;
  }
}
