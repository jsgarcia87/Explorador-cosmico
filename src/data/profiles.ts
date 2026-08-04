export type ProfileId = 'infantil' | 'jovenes' | 'adultos' | 'profesor' | 'kiosko';

export interface UserProfile {
  id: ProfileId;
  name: string;
  badge: string;
  subtitle: string;
  description: string;
  accentColor: string;
  uiSettings: {
    showComplexTelemetry: boolean;
    showPhysicsFormulas: boolean;
    enableSpeechNarration: boolean;
    simplifyControls: boolean;
    enableGamification: boolean;
    enableTeacherClassroom: boolean;
    isKioskTouchMode: boolean;
    autoPlayTimeoutMs: number;
    defaultEduLevel: 'infantil' | 'jovenes' | 'adultos';
  };
}

export const USER_PROFILES: Record<ProfileId, UserProfile> = {
  infantil: {
    id: 'infantil',
    name: 'Infantil (6-10 años)',
    badge: '🎒 CADETE ESPACIAL',
    subtitle: 'Viaje Fácil · Voz Guía · Minijuegos',
    description: 'Lenguaje muy sencillo con explicaciones de voz, colores vibrantes y controles fáciles con mascota astronauta.',
    accentColor: '#5ce1d6',
    uiSettings: {
      showComplexTelemetry: false,
      showPhysicsFormulas: false,
      enableSpeechNarration: true,
      simplifyControls: true,
      enableGamification: true,
      enableTeacherClassroom: false,
      isKioskTouchMode: false,
      autoPlayTimeoutMs: 0,
      defaultEduLevel: 'infantil'
    }
  },
  jovenes: {
    id: 'jovenes',
    name: 'Jóvenes (11-17 años)',
    badge: '🚀 EXPLORADOR JÓVEN',
    subtitle: 'Misiones · Logros · Experimentos',
    description: 'Información astronómica completa, retos de física orbital, sistema de insignias y simulaciones interactivas.',
    accentColor: '#8b7bff',
    uiSettings: {
      showComplexTelemetry: true,
      showPhysicsFormulas: false,
      enableSpeechNarration: false,
      simplifyControls: false,
      enableGamification: true,
      enableTeacherClassroom: false,
      isKioskTouchMode: false,
      autoPlayTimeoutMs: 0,
      defaultEduLevel: 'jovenes'
    }
  },
  adultos: {
    id: 'adultos',
    name: 'Adultos / Astrofísica',
    badge: '🔭 ASTROFÍSICO NASA',
    subtitle: 'Riguroso · Telemetría · Leyes Físicas',
    description: 'Datos científicos empíricos de misiones espaciales oficiales, fórmulas físicas, catálogo astrométrico y GRRT.',
    accentColor: '#00f0ff',
    uiSettings: {
      showComplexTelemetry: true,
      showPhysicsFormulas: true,
      enableSpeechNarration: false,
      simplifyControls: false,
      enableGamification: true,
      enableTeacherClassroom: false,
      isKioskTouchMode: false,
      autoPlayTimeoutMs: 0,
      defaultEduLevel: 'adultos'
    }
  },
  profesor: {
    id: 'profesor',
    name: 'Centros Educativos (Profesor)',
    badge: '🏫 MODO AULA INTERACTIVA',
    subtitle: 'Clases · Evaluaciones · Seguimiento',
    description: 'Herramientas pedagógicas para proyectar en aula, crear cuestionarios y evaluar el progreso astronómico de la clase.',
    accentColor: '#e0b054',
    uiSettings: {
      showComplexTelemetry: true,
      showPhysicsFormulas: true,
      enableSpeechNarration: false,
      simplifyControls: false,
      enableGamification: true,
      enableTeacherClassroom: true,
      isKioskTouchMode: false,
      autoPlayTimeoutMs: 0,
      defaultEduLevel: 'jovenes'
    }
  },
  kiosko: {
    id: 'kiosko',
    name: 'Museos (Modo Kiosko Táctil)',
    badge: '🏛️ PLANETARIO TÁCTIL',
    subtitle: 'Pantalla Completa · Autoplay · Táctil',
    description: 'Diseñado para planetarios y museos: botones grandes para pantalla táctil, sin teclado y recorridos guiados automáticos.',
    accentColor: '#ff79c6',
    uiSettings: {
      showComplexTelemetry: true,
      showPhysicsFormulas: false,
      enableSpeechNarration: true,
      simplifyControls: true,
      enableGamification: false,
      enableTeacherClassroom: false,
      isKioskTouchMode: true,
      autoPlayTimeoutMs: 60000, // 60s sin tocar -> Autoplay recorrido
      defaultEduLevel: 'infantil'
    }
  }
};
