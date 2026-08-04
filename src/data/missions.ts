export interface CosmicMission {
  id: string;
  title: string;
  icon: string;
  category: 'solar' | 'deep' | 'observatory' | 'simulations' | 'grrt';
  description: {
    infantil: string;
    jovenes: string;
    adultos: string;
  };
  requiredCount: number;
  xpReward: number;
  badgeName: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level: 'infantil' | 'jovenes' | 'adultos';
}

export const COSMIC_MISSIONS: CosmicMission[] = [
  {
    id: 'solar_explorer',
    title: 'Explorador del Sistema Solar',
    icon: '🪐',
    category: 'solar',
    description: {
      infantil: 'Visita y toca cada uno de los 8 planetas que giran alrededor del Sol.',
      jovenes: 'Inspecciona la telemetría y ficha técnica de los 8 planetas del Sistema Solar.',
      adultos: 'Completa el recorrido astrofísico comparando radios keplerianos y densidades de los 8 planetas.'
    },
    requiredCount: 8,
    xpReward: 500,
    badgeName: 'Navegante Planetario NASA'
  },
  {
    id: 'galaxy_hunter',
    title: 'Cazador de Galaxias y Nebulosas',
    icon: '🌌',
    category: 'deep',
    description: {
      infantil: 'Encuentra 3 objetos misteriosos en el Universo Profundo.',
      jovenes: 'Localiza y analiza 3 fuentes astrofísicas de cielo profundo (púlsar, gigante roja o nebulosa).',
      adultos: 'Inspecciona y clasifica 3 objetos de catálogo SIMBAD en coordenadas espaciales.'
    },
    requiredCount: 3,
    xpReward: 750,
    badgeName: 'Astrometrista del Espacio Profundo'
  },
  {
    id: 'constellation_detective',
    title: 'Detective de Constelaciones',
    icon: '✨',
    category: 'observatory',
    description: {
      infantil: 'Entra al Observatorio Terrestre y descubre 3 constelaciones famosas en el cielo.',
      jovenes: 'Alterna entre los modos Científico, Artístico y Mitológico en al menos 3 constelaciones de la IAU.',
      adultos: 'Analiza ascensión recta y declinación en 3 constelaciones del hemisferio norte y circumpolares.'
    },
    requiredCount: 3,
    xpReward: 600,
    badgeName: 'Cartógrafo Celestial IAU'
  },
  {
    id: 'relativistic_astronomer',
    title: 'Astrónomo Relativista GRRT',
    icon: '🕳️',
    category: 'grrt',
    description: {
      infantil: 'Abre el simulador del Agujero Negro y mira cómo la gravedad dobla la luz.',
      jovenes: 'Entra al Simulador GRRT y ajusta el espín y la tasa de acreción del agujero negro Gargantua.',
      adultos: 'Ejecuta la simulación geodésica de Schwarzschild / Kerr comprobando el efecto Doppler Beaming.'
    },
    requiredCount: 1,
    xpReward: 1000,
    badgeName: 'Físico Relativista EHT'
  },
  {
    id: 'cosmology_master',
    title: 'Cosmólogo de Simulaciones',
    icon: '🔬',
    category: 'simulations',
    description: {
      infantil: 'Juega en el Laboratorio con choques de galaxias y cañones de gravedad.',
      jovenes: 'Ejecuta y experimenta con 4 simulaciones de física del Universo en el Laboratorio.',
      adultos: 'Verifica los 4 modelos fenomenológicos del Laboratorio de Simulaciones (N-Cuerpos, Jeans, Lentes, Órbitas).'
    },
    requiredCount: 4,
    xpReward: 900,
    badgeName: 'Maestro del Cosmos ΛCDM'
  }
];

export const COSMIC_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: '¿Por qué Venus es el planeta más caliente si Mercurio está más cerca del Sol?',
    options: [
      'Porque tiene volcanes encendidos siempre',
      'Por su espesa atmósfera de CO₂ que atrapa el calor (efecto invernadero)',
      'Porque su núcleo está hecho de fuego líquido'
    ],
    correctIndex: 1,
    explanation: 'La densa atmósfera de dióxido de carbono en Venus provoca un efecto invernadero extremo que impide la salida del calor al espacio.',
    level: 'infantil'
  },
  {
    id: 'q2',
    question: '¿Qué es un Púlsar en astrofísica?',
    options: [
      'Una estrella de neutrones que gira rápidamente emitiendo haces de radiación',
      'Un planeta gaseoso a punto de encenderse como estrella',
      'Una pequeña nebulosa azul que pulsa con luz solar'
    ],
    correctIndex: 0,
    explanation: 'Los púlsares son estrellas de neutrones altamente magnetizadas cuyos haces periódicos son detectados como pulsos al girar.',
    level: 'jovenes'
  },
  {
    id: 'q3',
    question: '¿Qué propiedad física de un agujero negro describe el parámetro a/M en la métrica de Kerr?',
    options: [
      'La temperatura termodinámica del horizonte de sucesos',
      'El espín o momento angular adimensional normalizado por su masa',
      'La tasa de acreción de materia en régimen super-Eddington'
    ],
    correctIndex: 1,
    explanation: 'En Relatividad General, a/M representa el espín o momento angular adimensional del agujero negro rotatorio (0 = Schwarzschild, 1 = Kerr extremal).',
    level: 'adultos'
  },
  {
    id: 'q4',
    question: '¿Qué estrella apunta al Polo Norte celeste sirviendo como brújula en el hemisferio norte?',
    options: [
      'Sirio en el Can Mayor',
      'Polaris en la Osa Menor',
      'Betelgeuse en Orión'
    ],
    correctIndex: 1,
    explanation: 'Polaris (alfa Ursae Minoris) se encuentra alineada de forma casi perfecta con el eje de rotación de la Tierra hacia el norte.',
    level: 'infantil'
  },
  {
    id: 'q5',
    question: '¿Cuál es el principal gas componente del Sol que se fusiona en el núcleo?',
    options: [
      'Helio',
      'Hidrógeno',
      'Oxígeno'
    ],
    correctIndex: 1,
    explanation: 'El Sol está compuesto por ~73% de hidrógeno; en el núcleo, cuatro protones de hidrógeno se fusionan para formar helio-4 mediante la cadena protón-protón.',
    level: 'jovenes'
  },
  {
    id: 'q6',
    question: '¿Qué porcentaje aproximado del contenido energético del Universo corresponde a Energía Oscura y Materia Oscura combinadas según ΛCDM?',
    options: [
      'Alrededor del 50%',
      'Alrededor del 95%',
      'Alrededor del 30%'
    ],
    correctIndex: 1,
    explanation: 'El modelo cosmológico ΛCDM establece que ~68.3% es Energía Oscura y ~26.8% es Materia Oscura; la materia bariónica normal es solo un ~4.9%.',
    level: 'adultos'
  }
];
