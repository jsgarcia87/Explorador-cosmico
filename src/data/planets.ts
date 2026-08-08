import { KeplerianElements } from '../engine/KeplerianOrbitEngine';

export interface PlanetData {
  id: string;
  name: string;
  icon: string;
  type: string;
  color: number;
  radius: number; // Radio relativo visual para simulación 3D
  realRadiusKm: number;
  distance: number; // Distancia visual en escena
  realDistanceAU: number;
  orbitalSpeed: number; // Velocidad de traslación visual
  realOrbitalSpeedKmS: number;
  rotationPeriodHours: number;
  tilt: number; // Inclinación axial en radianes
  massKg: string;
  gravityMs2: number;
  tempCelsius: number;
  atmosphere: string[];
  moonsCount: number;
  orbitalElements?: KeplerianElements; // Elementos orbitales J2000 NASA JPL
  hasRing?: boolean;
  hasClouds?: boolean;
  hasAtmosphere?: boolean;
  atmosphereColor?: number;
  atmoOpacity?: number;
  bands?: boolean;
  bandSoft?: boolean;
  craters?: boolean;
  poles?: boolean;
  poleSize?: number;
  spot?: { color: number; x: number; y: number; rx: number; ry: number };
  edu: {
    infantil: {
      summary: string;
      facts: string[];
      funFact: string;
    };
    jovenes: {
      summary: string;
      facts: string[];
      experiment: string;
    };
    adultos: {
      summary: string;
      facts: string[];
      physicsLaw: string;
    };
  };
}

export const PLANETS: PlanetData[] = [
  {
    id: 'sol',
    name: 'El Sol',
    icon: '☀️',
    type: 'Estrella Enana Amarilla (G2V)',
    color: 0xffd166,
    radius: 7.0,
    realRadiusKm: 696340,
    distance: 0,
    realDistanceAU: 0,
    orbitalSpeed: 0,
    realOrbitalSpeedKmS: 0,
    rotationPeriodHours: 609.12,
    tilt: 0.126,
    massKg: '1.989 × 10³⁰ kg',
    gravityMs2: 274.0,
    tempCelsius: 5500,
    atmosphere: ['Hidrógeno (73%)', 'Helio (25%)', 'Elementos pesados (2%)'],
    moonsCount: 0,
    hasAtmosphere: true,
    atmosphereColor: 0xffaa33,
    atmoOpacity: 0.85,
    edu: {
      infantil: {
        summary: 'El Sol es una bola gigante de fuego en el centro de nuestro sistema.',
        facts: [
          'Es tan grande que dentro caben más de un millón de Tierras.',
          'Nos da toda la luz y el calor que necesitamos para vivir.',
          '¡Nunca lo mires directamente con los ojos!'
        ],
        funFact: 'La luz del Sol tarda solo 8 minutos en llegar volando hasta tu ventana.'
      },
      jovenes: {
        summary: 'Estrella de tipo espectral G2V en la secuencia principal, impulsada por fusión nuclear de hidrógeno en helio.',
        facts: [
          'El núcleo solar alcanza temperaturas de 15 millones de grados Celsius.',
          'Su campo magnético genera tormentas solares y auroras polares en la Tierra.',
          'Representa el 99.86% de toda la masa del Sistema Solar.'
        ],
        experiment: 'Reto de Cálculo: Calcula cuántos fotones por segundo emite una sección de 1 m² de fotosfera.'
      },
      adultos: {
        summary: 'Generador de plasma gobernado por equilibrio hidrostático entre la presión de radiación por cadena protón-protón y la compresión gravitatoria.',
        facts: [
          'Luminosidad bolométrica: 3.828 × 10²⁶ W.',
          'Tiempo de confinamiento radiativo del núcleo a fotosfera: ~100,000 años.',
          'Edad estimada: 4.6 mil millones de años; vida útil restante en secuencia principal: ~5 mil millones de años.'
        ],
        physicsLaw: 'Ley de Stefan-Boltzmann: L = 4πR²σT⁴ (Potencia total radiada según temperatura fotosférica).'
      }
    }
  },
  {
    id: 'mercurio',
    name: 'Mercurio',
    icon: '🪨',
    type: 'Planeta Rocoso Terrestre',
    color: 0x9c9b96,
    radius: 0.65,
    realRadiusKm: 2439.7,
    distance: 14,
    realDistanceAU: 0.387,
    orbitalSpeed: 1.1,
    realOrbitalSpeedKmS: 47.36,
    rotationPeriodHours: 1407.6,
    tilt: 0.0005,
    massKg: '3.301 × 10²³ kg',
    gravityMs2: 3.7,
    tempCelsius: 167,
    atmosphere: ['Oxígeno', 'Sodio', 'Hidrógeno', 'Helio', 'Potasio (exosfera tenue)'],
    moonsCount: 0,
    orbitalElements: {
      aAU: 0.387098,
      e: 0.205630,
      iDeg: 7.005,
      omegaDeg: 48.331,
      wDeg: 29.124,
      m0Deg: 174.796,
      periodDays: 87.969
    },
    craters: true,
    edu: {
      infantil: {
        summary: 'Es el planeta más pequeñito y el que viaja más cerca del Sol.',
        facts: [
          'De día es calientísimo, pero de noche se vuelve súper helado.',
          'Está lleno de cráteres de impactos de asteroides como la Luna.',
          'No tiene aire ni nubes para protegerse.'
        ],
        funFact: '¡En Mercurio tu cumpleaños llegaría cada 88 días!'
      },
      jovenes: {
        summary: 'Planeta sin atmósfera densa, con un enorme núcleo de hierro que ocupa el 85% de su radio.',
        facts: [
          'Tiene la oscilación térmica más extrema del Sistema Solar (-180°C de noche a +430°C de día).',
          'Su órbita presenta una resonancia espín-órbita 3:2 única (gira 3 veces cada 2 órbitas).',
          'La misión MESSENGER reveló hielo de agua en cráteres polares en sombra perpetua.'
        ],
        experiment: 'Reto de Precesión: Investiga cómo la precesión del perihelio de Mercurio ayudó a demostrar la Relatividad General.'
      },
      adultos: {
        summary: 'Cuerpo de alta densidad media (5.43 g/cm³) con contracción térmica global evidenciada por escarpes de falla en su litosfera.',
        facts: [
          'Anomalía de precesión del perihelio explicada por Einstein (43 segundos de arco por siglo).',
          'Campo magnético global de origen dinamo equivalente al 1.1% del terrestre.',
          'Exosfera transitoria generada por viento solar e impactos de micrometeoritos.'
        ],
        physicsLaw: 'Precesión Relativista: Δφ = 6πGM / (c² a (1 - e²)).'
      }
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    icon: '🌕',
    type: 'Planeta Rocoso (Efecto Invernadero Extremo)',
    color: 0xe8c98a,
    radius: 1.0,
    realRadiusKm: 6051.8,
    distance: 20,
    realDistanceAU: 0.723,
    orbitalSpeed: 0.85,
    realOrbitalSpeedKmS: 35.02,
    rotationPeriodHours: 5832.5,
    tilt: 3.096,
    massKg: '4.867 × 10²⁴ kg',
    gravityMs2: 8.87,
    tempCelsius: 464,
    atmosphere: ['Dióxido de carbono (96.5%)', 'Nitrógeno (3.5%)', 'Nubes de ácido sulfúrico'],
    moonsCount: 0,
    orbitalElements: {
      aAU: 0.723332,
      e: 0.006772,
      iDeg: 3.394,
      omegaDeg: 76.680,
      wDeg: 54.884,
      m0Deg: 50.115,
      periodDays: 224.701
    },
    bands: true,
    bandSoft: true,
    hasAtmosphere: true,
    atmosphereColor: 0xf0d9a0,
    atmoOpacity: 0.65,
    edu: {
      infantil: {
        summary: 'Venus es el planeta más brillante y caliente de todos, cubierto por nubes amarillas.',
        facts: [
          'Es más caliente que Mercurio porque sus nubes atrapan el calor como una cobija gigante.',
          'Gira al revés que la Tierra: el Sol sale por el oeste.',
          'En el cielo de la Tierra se ve como el lucero del alba o del atardecer.'
        ],
        funFact: '¡Un solo día en Venus dura más que un año entero venusiano!'
      },
      jovenes: {
        summary: 'Considerado el gemelo terrestre en tamaño y masa, pero víctima de un efecto invernadero descontrolado.',
        facts: [
          'Su presión atmosférica en superficie es de 92 atmósferas (equivalente a estar 900 metros bajo el mar).',
          'Llueve ácido sulfúrico, pero se evapora antes de tocar el suelo rocoso.',
          'Presenta súper-rotación atmosférica: los vientos dan la vuelta al planeta en solo 4 días terrestres.'
        ],
        experiment: 'Reto Termodinámico: Compara el balance radiativo de una atmósfera de CO₂ al 96% frente al aire terrestre.'
      },
      adultos: {
        summary: 'Laboratorio natural sobre el colapso climático por retroalimentación positiva del vapor de agua y dióxido de carbono.',
        facts: [
          'Temperatura superficial isotérmica día/noche (737 K) con vulcanismo basáltico generalizado.',
          'Ausencia de tectónica de placas; la disipación del calor ocurre mediante episodios de re-superficiación global cada ~500 millones de años.',
          'Sonda soviética Venera 13 sobrevivió 127 minutos transmitiendo imágenes a 457°C y 89 bar.'
        ],
        physicsLaw: 'Ley de los Gases Reales y Absorción IR: Transmitancia τ_ν = exp(-k_ν u) en las bandas vibracionales de CO₂.'
      }
    }
  },
  {
    id: 'tierra',
    name: 'La Tierra',
    icon: '🌍',
    type: 'Planeta Rocoso Habitable',
    color: 0x1c5fc9,
    radius: 1.05,
    realRadiusKm: 6371.0,
    distance: 26,
    realDistanceAU: 1.0,
    orbitalSpeed: 0.7,
    realOrbitalSpeedKmS: 29.78,
    rotationPeriodHours: 23.934,
    tilt: 0.409,
    massKg: '5.972 × 10²⁴ kg',
    gravityMs2: 9.807,
    tempCelsius: 15,
    atmosphere: ['Nitrógeno (78.08%)', 'Oxígeno (20.95%)', 'Argón (0.93%)', 'Vapor de agua (variable)'],
    moonsCount: 1,
    orbitalElements: {
      aAU: 1.000001,
      e: 0.016708,
      iDeg: 0.000,
      omegaDeg: -11.260,
      wDeg: 114.207,
      m0Deg: 358.617,
      periodDays: 365.256
    },
    hasClouds: true,
    hasAtmosphere: true,
    atmosphereColor: 0x5cc5ff,
    atmoOpacity: 0.5,
    poles: true,
    poleSize: 0.14,
    edu: {
      infantil: {
        summary: '¡Nuestro hermoso hogar! El único planeta azul con mares, árboles, animales y personas.',
        facts: [
          'El 70% de su superficie está cubierta por agua líquida fresca y salada.',
          'Tiene una capa protectora de aire que nos permite respirar y nos defiende de los meteoritos.',
          'Tiene una luna compañera que ilumina nuestras noches y mueve las olas del mar.'
        ],
        funFact: 'La Tierra viaja por el espacio a una velocidad de 107,000 km/h, ¡más rápido que un cohete!'
      },
      jovenes: {
        summary: 'Planeta dinámico con tectónica de placas activa, hidrosfera estable y biosfera autosostenida por fotosíntesis.',
        facts: [
          'Su magnetosfera protege la atmósfera del viento solar, creando auroras boreales en los polos.',
          'La Luna estabiliza la inclinación axial (23.4°), permitiendo estaciones climáticas suaves y estables.',
          'Es el estándar astronómico para la Unidad Astronómica (1 AU = 149.6 millones de km).'
        ],
        experiment: 'Reto Orbital: Simula la fuerza de marea lunar y calcula la diferencia del nivel del mar entre pleamar y bajamar.'
      },
      adultos: {
        summary: 'Sistema termodinámico abierto en la zona de habitabilidad de una estrella G2V, dominado por ciclos biogeoquímicos.',
        facts: [
          'Núcleo externo líquido en convección generando el campo geomagnético de ~30 a 60 µT.',
          'Estratificación atmosférica: Troposfera, Estratosfera (capa de ozono O₃), Mesosfera, Termosfera y Exosfera.',
          'Edad radiométrica: 4.54 ± 0.05 mil millones de años basada en isótopos de plomo en circones.'
        ],
        physicsLaw: 'Ley de Gravitación Universal de Newton: F = G (M_1 M_2) / r² aplicable al sistema Tierra-Luna-Sol.'
      }
    }
  },
  {
    id: 'marte',
    name: 'Marte',
    icon: '🔴',
    type: 'Planeta Rocoso Terrestre',
    color: 0xb1440e,
    radius: 0.72,
    realRadiusKm: 3389.5,
    distance: 33,
    realDistanceAU: 1.524,
    orbitalSpeed: 0.55,
    realOrbitalSpeedKmS: 24.07,
    rotationPeriodHours: 24.623, // 1 Sol martiano
    tilt: 0.44,
    massKg: '6.417 × 10²³ kg',
    gravityMs2: 3.72,
    tempCelsius: -63,
    atmosphere: ['Dióxido de carbono (95.3%)', 'Nitrógeno (2.7%)', 'Argón (1.6%)'],
    moonsCount: 2, // Fobos y Deimos
    orbitalElements: {
      aAU: 1.523679,
      e: 0.093400,
      iDeg: 1.850,
      omegaDeg: 49.558,
      wDeg: 286.502,
      m0Deg: 19.373,
      periodDays: 686.980
    },
    craters: true,
    poles: true,
    poleSize: 0.16,
    hasAtmosphere: true,
    atmosphereColor: 0xd97548,
    atmoOpacity: 0.35,
    edu: {
      infantil: {
        summary: 'El famoso planeta rojo. Parece un desierto oxidado lleno de misterios y volcanes gigantes.',
        facts: [
          'Tiene el volcán más alto de todo el Sistema Solar: ¡el Monte Olimpo, 3 veces más alto que el Everest!',
          'En el pasado tuvo ríos y lagos de agua corriente.',
          'Varios robots exploradores como Curiosity y Perseverance conducen por sus rocas.'
        ],
        funFact: 'Un día en Marte se llama "Sol" y dura casi lo mismo que un día en la Tierra (24 horas y 37 minutos).'
      },
      jovenes: {
        summary: 'Objetivo primordial de astrobiología y exploración espacial futura, con casquetes de agua e hielo seco.',
        facts: [
          'Valles Marineris es un cañón de 4,000 km de largo y hasta 7 km de profundidad que cruza el planeta.',
          'Posee dos pequeñas lunas irregulares capturadas del cinturón de asteroides: Fobos y Deimos.',
          'Las tormentas de polvo globales pueden llegar a cubrir todo el planeta por semanas.'
        ],
        experiment: 'Reto de Terraformación: ¿Qué presión atmosférica y gases necesitaríamos inyectar para lograr agua líquida en la superficie?'
      },
      adultos: {
        summary: 'Cuerpo rocoso con pérdida atmosférica histórica inducida por el decaimiento de su dinamo magnética primordial.',
        facts: [
          'Presión atmosférica superficial media: ~610 Pa (0.6% de la terrestre), en el límite del punto triple del agua.',
          'Detecciones por espectrómetros de metano estacional en el cráter Gale que sugieren actividad geoquímica (serpentinización) o biológica.',
          'Exploración sísmica InSight confirmó núcleo fundido de ~1,830 km de radio rico en azufre.'
        ],
        physicsLaw: 'Velocidad de Escape y Pérdida de Jeans: v_esc = √(2GM/R) = 5.03 km/s frente a velocidad térmica atómica.'
      }
    }
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    icon: '🟠',
    type: 'Gigante Gaseoso (Joviano)',
    color: 0xcf9f6e,
    radius: 4.5,
    realRadiusKm: 69911,
    distance: 46,
    realDistanceAU: 5.204,
    orbitalSpeed: 0.35,
    realOrbitalSpeedKmS: 13.07,
    rotationPeriodHours: 9.925,
    tilt: 0.054,
    massKg: '1.898 × 10²⁷ kg',
    gravityMs2: 24.79,
    tempCelsius: -110,
    atmosphere: ['Hidrógeno (89.8%)', 'Helio (10.2%)', 'Metano', 'Amoníaco'],
    moonsCount: 95,
    orbitalElements: {
      aAU: 5.204486,
      e: 0.048498,
      iDeg: 1.303,
      omegaDeg: 100.464,
      wDeg: 273.867,
      m0Deg: 20.020,
      periodDays: 4332.589
    },
    bands: true,
    spot: { color: 0xb5451f, x: 0.64, y: 0.58, rx: 28, ry: 16 },
    hasAtmosphere: true,
    atmosphereColor: 0xffcc88,
    atmoOpacity: 0.4,
    edu: {
      infantil: {
        summary: 'El rey de los planetas. Es tan gigantesco que todos los demás planetas cabrían juntos en su interior.',
        facts: [
          'No tiene un suelo sólido donde pararte; es una bola colosal de gas y tormentas.',
          'Tiene una tormenta roja gigante llamada "Gran Mancha Roja" donde cabrían 2 Tierras.',
          'Tiene docenas y docenas de lunas girando a su alrededor.'
        ],
        funFact: '¡Júpiter gira tan rápido que su día dura menos de 10 horas!'
      },
      jovenes: {
        summary: 'Dominador gravitacional del Sistema Solar y escudo contra asteroides para los planetas interiores.',
        facts: [
          'Sus cuatro lunas galileanas (Ío, Europa, Ganímedes, Calisto) muestran volcanes activos y océanos bajo el hielo.',
          'Posee el campo magnético más potente de cualquier planeta, 20,000 veces más fuerte que el terrestre.',
          'Emite más energía térmica al espacio de la que recibe del Sol debido a compresión gravitacional de Kelvin-Helmholtz.'
        ],
        experiment: 'Reto de Mareas: Analiza el calentamiento de marea que funde el interior de la luna Ío debido a la gravedad de Júpiter.'
      },
      adultos: {
        summary: 'Planeta gaseoso en transición hidrostática hacia hidrógeno metálico degenerado en su manto profundo.',
        facts: [
          'La Gran Mancha Roja es un anticiclón persistente observado desde el siglo XVII con vientos de >400 km/h.',
          'Misión Juno reveló corrientes en chorro que penetran hasta 3,000 km de profundidad en la atmósfera.',
          'Sistema de anillos tenues compuesto por polvo desprendido de pequeñas lunas por impactos.'
        ],
        physicsLaw: 'Radio de Roche: d = 2.44 R_M (ρ_M / ρ_m)^(1/3) (Límite de ruptura gravitacional de satélites naturales).'
      }
    }
  },
  {
    id: 'saturno',
    name: 'Saturno',
    icon: '🪐',
    type: 'Gigante Gaseoso con Anillos',
    color: 0xe3cf9c,
    radius: 3.8,
    realRadiusKm: 58232,
    distance: 60,
    realDistanceAU: 9.582,
    orbitalSpeed: 0.26,
    realOrbitalSpeedKmS: 9.69,
    rotationPeriodHours: 10.656,
    tilt: 0.466,
    massKg: '5.683 × 10²⁶ kg',
    gravityMs2: 10.44,
    tempCelsius: -140,
    atmosphere: ['Hidrógeno (96.3%)', 'Helio (3.25%)', 'Metano', 'Amoníaco'],
    moonsCount: 146,
    orbitalElements: {
      aAU: 9.582627,
      e: 0.055546,
      iDeg: 2.485,
      omegaDeg: 113.665,
      wDeg: 339.392,
      m0Deg: 317.020,
      periodDays: 10759.22
    },
    bands: true,
    bandSoft: true,
    hasRing: true,
    hasAtmosphere: true,
    atmosphereColor: 0xf5e3b3,
    atmoOpacity: 0.35,
    edu: {
      infantil: {
        summary: 'La joya del universo, famoso por su espectacular corona de anillos brillantes de hielo.',
        facts: [
          'Sus anillos tienen el ancho de miles de kilómetros, pero son súper delgados como papel cósmico.',
          'Es el planeta más ligero: ¡si hubiera una tina gigante de agua, Saturno flotaría como un patito!',
          'Su luna Titán tiene nubes y ríos, pero de gas líquido frío.'
        ],
        funFact: 'Los anillos no son sólidos; están hechos de billones de pedacitos de hielo y roca bailando juntos.'
      },
      jovenes: {
        summary: 'Sistema planetario complejo con anillos dinámicos esculpidos por lunas pastoras y resonancias gravitacionales.',
        facts: [
          'La misión Cassini-Huygens descubrió géiseres de agua salada eyectados por la luna Encélado.',
          'En su polo norte gira un misterioso vórtice hexagonal perfecto permanente.',
          'El espesor medio de sus anillos principales es de apenas 10 a 20 metros.'
        ],
        experiment: 'Reto de Cassini: Investiga por qué se forma la División de Cassini en los anillos por resonancia con Mimas.'
      },
      adultos: {
        summary: 'Laboratorio de dinámica de discos circunplanetarios y astrobiología en mundos oceánicos helados.',
        facts: [
          'Densidad media del planeta: 0.687 g/cm³, inferior a la del agua líquida.',
          'Anillos formados probablemente por la destrucción de una luna helada primitiva dentro del límite de Roche hace <100 millones de años.',
          'Titán posee ciclo metanológico completo con lagos de hidrocarburos e interior con océano de agua y amoníaco.'
        ],
        physicsLaw: 'Resonancia de Lindblad y Momento Angular en discos colisionables de partículas de hielo.'
      }
    }
  },
  {
    id: 'urano',
    name: 'Urano',
    icon: '🔵',
    type: 'Gigante Helado',
    color: 0x9fe8e0,
    radius: 2.2,
    realRadiusKm: 25362,
    distance: 75,
    realDistanceAU: 19.201,
    orbitalSpeed: 0.18,
    realOrbitalSpeedKmS: 6.81,
    rotationPeriodHours: 17.24,
    tilt: 1.706, // 97.77° inclinado casi en su plano orbital
    massKg: '8.681 × 10²⁵ kg',
    gravityMs2: 8.87,
    tempCelsius: -195,
    atmosphere: ['Hidrógeno (82.5%)', 'Helio (15.2%)', 'Metano (2.3%)'],
    moonsCount: 28,
    orbitalElements: {
      aAU: 19.20120,
      e: 0.046381,
      iDeg: 0.773,
      omegaDeg: 74.006,
      wDeg: 96.998,
      m0Deg: 142.238,
      periodDays: 30685.4
    },
    bands: true,
    bandSoft: true,
    hasAtmosphere: true,
    atmosphereColor: 0xbdf3ee,
    atmoOpacity: 0.35,
    edu: {
      infantil: {
        summary: 'El gigante de hielo color turquesa que viaja rodando de lado por el espacio.',
        facts: [
          'A diferencia de los demás planetas, Urano gira acostado de lado como una pelota.',
          'Es un mundo de hielo muy frío con vientos helados rápidos.',
          'Su color verde azulado hermoso se debe a un gas llamado metano en sus nubes.'
        ],
        funFact: '¡Como está acostado, cada polo tiene 42 años seguidos de día y luego 42 años de noche oscura!'
      },
      jovenes: {
        summary: 'Planeta helado cuyo eje de rotación extrema fue probablemente inclinado por un impacto colosal prehistórico.',
        facts: [
          'Alberga un manto fluido de hielos de agua, amoníaco y metano bajo alta presión.',
          'Cuenta con 13 anillos oscuros y estrechos descubiertos por ocultación estelar.',
          'Su luna Miranda muestra acantilados helados de más de 20 km de caída vertical (el mayor precipicio del Sistema Solar).'
        ],
        experiment: 'Reto de Inclinación: Simula cómo afecta una inclinación axial de 97.8° al clima de un planeta en su órbita.'
      },
      adultos: {
        summary: 'Planeta de baja emisión de calor interno con un campo magnético cuadrupolar altamente excéntrico e inclinado 59°.',
        facts: [
          'Temperatura mínima registrada en la tropopausa: 49 K (-224°C), convirtiéndolo en el planeta más frío del Sistema Solar.',
          'El metano atmosférico absorbe el espectro rojo de la luz solar y refleja el azul verdoso característico.',
          'Presencia teórica de lluvia de diamantes en el manto de hidrocarburos sometido a alta presión.'
        ],
        physicsLaw: 'Dinamo Multipolar No Centrado: B_r en el núcleo conductor iónico de amoníaco fundido.'
      }
    }
  },
  {
    id: 'neptuno',
    name: 'Neptuno',
    icon: '🔷',
    type: 'Gigante Helado Azulado',
    color: 0x3a5fcd,
    radius: 2.15,
    realRadiusKm: 24622,
    distance: 88,
    realDistanceAU: 30.07,
    orbitalSpeed: 0.14,
    realOrbitalSpeedKmS: 5.43,
    rotationPeriodHours: 16.11,
    tilt: 0.494,
    massKg: '1.024 × 10²⁶ kg',
    gravityMs2: 11.15,
    tempCelsius: -200,
    atmosphere: ['Hidrógeno (80%)', 'Helio (19%)', 'Metano (1.5%)'],
    moonsCount: 16,
    orbitalElements: {
      aAU: 30.04762,
      e: 0.009456,
      iDeg: 1.770,
      omegaDeg: 131.784,
      wDeg: 273.187,
      m0Deg: 256.228,
      periodDays: 60189.0
    },
    bands: true,
    hasAtmosphere: true,
    atmosphereColor: 0x6d8fff,
    atmoOpacity: 0.45,
    edu: {
      infantil: {
        summary: 'El planeta más lejano y azul del Sistema Solar, con los vientos más huracanados del universo.',
        facts: [
          'Está tan lejos del Sol que tarda 165 años en dar una sola vuelta.',
          'Sus tormentas viajan a 2,000 km/h, mucho más rápido que los aviones de combate.',
          'Fue el primer planeta descubierto con matemáticas antes de verlo por el telescopio.'
        ],
        funFact: '¡Desde que fue descubierto en 1846, Neptuno solo ha completado una vuelta alrededor del Sol en 2011!'
      },
      jovenes: {
        summary: 'Mundo azul intenso donde el viento supera la velocidad del sonido en su atmósfera helada.',
        facts: [
          'Su luna gigante Tritón es un cuerpo capturado del cinturón de Kuiper con órbita retrógrada y criovulcanismo de nitrógeno.',
          'Alberga tormentas oscuras itinerantes similares a la Gran Mancha Roja que nacen y se disipan en años.',
          'Urbain Le Verrier predijo matemáticamente su posición exacta analizando perturbaciones en la órbita de Urano.'
        ],
        experiment: 'Reto Astrométrico: Demuestra matemáticamente cómo la gravedad de un planeta invisible perturba la órbita de otro conocido.'
      },
      adultos: {
        summary: 'Triunfo de la mecánica celeste gravitacional con radiación térmica interna activa.',
        facts: [
          'Emite 2.61 veces la energía solar que absorbe, alimentando turbulencia atmosférica de altísima velocidad (vientos de 2,100 km/h).',
          'Tritón será destrozado gravitacionalmente dentro de ~3,600 millones de años debido a su frenado de marea.',
          'Su atmósfera alta contiene hidrocarburos y nubes de cristales de hielo de metano observadas por James Webb.'
        ],
        physicsLaw: 'Problema Inverso en Mecánica Celeste y Ley de Conservación del Momento Angular Orbital.'
      }
    }
  }
];

export const DWARF_PLANETS: PlanetData[] = [
  {
    id: 'pluto',
    name: 'Plutón',
    icon: '❄️',
    type: 'Planeta Enano del Cinturón de Kuiper',
    color: 0xd8caa8,
    radius: 0.45,
    realRadiusKm: 1188.3,
    distance: 104,
    realDistanceAU: 39.482,
    orbitalSpeed: 0.1,
    realOrbitalSpeedKmS: 4.74,
    rotationPeriodHours: 153.29,
    tilt: 2.138,
    massKg: '1.303 × 10²² kg',
    gravityMs2: 0.62,
    tempCelsius: -229,
    atmosphere: ['Nitrógeno tenue', 'Metano', 'Monóxido de carbono'],
    moonsCount: 5,
    orbitalElements: {
      aAU: 39.48211,
      e: 0.248827,
      iDeg: 17.140,
      omegaDeg: 110.303,
      wDeg: 113.763,
      m0Deg: 14.882,
      periodDays: 90560.0
    },
    craters: true,
    edu: {
      infantil: {
        summary: 'El rey de los planetas enanos helados. Tiene un famoso corazón gigante de hielo en su superficie.',
        facts: [
          'Tiene una luna grande llamada Caronte que baila con él como compañero.',
          'Aunque era considerado el noveno planeta, ahora es el rey del Cinturón de Kuiper.',
          'La nave New Horizons nos mandó fotos increíbles de sus montañas de hielo en 2015.'
        ],
        funFact: '¡En Plutón el hielo es tan duro como las rocas de las montañas de la Tierra!'
      },
      jovenes: {
        summary: 'Mundo transneptuniano de gran actividad geológica, dominado por glaciares de nitrógeno.',
        facts: [
          'La Planicie Sputnik es un glaciar de nitrógeno líquido y hielo en convección de 1,000 km de ancho.',
          'El sistema Plutón-Caronte es un sistema binario donde el centro de masa se encuentra en el espacio exterior entre ambos.',
          'Posee una atmósfera tenue que se congela y cae como nieve cuando se aleja del Sol.'
        ],
        experiment: 'Reto de Planetas Enanos: Explica las 3 reglas de la Unión Astronómica Internacional (IAU) para definir qué es un planeta.'
      },
      adultos: {
        summary: 'Prototipo de la clase de objetos Plutinos en resonancia orbital 2:3 con Neptuno.',
        facts: [
          'Presión superficial de la atmósfera tenue de N₂: ~1 Pa; bruma fotoquímica multicapa observada hasta 200 km de altitud.',
          'Composición interna: 70% roca y 30% hielo de agua en masa, con posible océano subsuperficial relictual.',
          'Geología glacial de convección tectónica impulsada por el tenue calor radiactivo interno.'
        ],
        physicsLaw: 'Resonancia Orbital de Mareas y Centro de Masas Baricéntrico en Sistemas Binarios.'
      }
    }
  }
];
