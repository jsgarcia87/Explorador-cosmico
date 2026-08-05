import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CosmicEngine, SceneMode } from './engine/CosmicEngine';
import { cosmicAudio } from './engine/CosmicAudio';
import { ProfileId, USER_PROFILES } from './data/profiles';
import { TelescopeSpectrum } from './engine/NightSkyScene';

import { TopNavigation } from './components/TopNavigation';
import { ProfileSelector } from './components/ProfileSelector';
import { TimeController } from './components/TimeController';
import { ObjectInspectorPanel, SelectedObjectData } from './components/ObjectInspectorPanel';
import { ObservatoryHUD } from './components/ObservatoryHUD';
import { PhysicsLabModal } from './components/PhysicsLabModal';
import { AstroAssistantModal } from './components/AstroAssistantModal';
import { TeacherClassroomModal } from './components/TeacherClassroomModal';
import { QuizModal } from './components/QuizModal';
import { GrrtModal } from './components/GrrtModal';
import { QuickHelpModal } from './components/QuickHelpModal';
import { AccessibilityController, AccessibilitySettings } from './components/AccessibilityController';

import './styles/index.css';
import './styles/animations.css';

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<CosmicEngine | null>(null);

  // Estados del observatorio cósmico
  const [currentMode, setCurrentMode] = useState<SceneMode>('solar');
  const [activeProfile, setActiveProfile] = useState<ProfileId>('jovenes');
  const [selectedObject, setSelectedObject] = useState<SelectedObjectData>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [timeSpeed, setTimeSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentSpectrum, setCurrentSpectrum] = useState<TelescopeSpectrum>('visible');

  // Estados de Modales y Cajones
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isLabOpen, setIsLabOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isGrrtOpen, setIsGrrtOpen] = useState<boolean>(false);
  const [isA11yOpen, setIsA11yOpen] = useState<boolean>(false);
  const [isQuickHelpOpen, setIsQuickHelpOpen] = useState<boolean>(false);

  // Mostrar Guía de Misión NASA al primer usuario
  useEffect(() => {
    const hasSeenHelp = localStorage.getItem('nasa_onboarding_shown');
    if (!hasSeenHelp) {
      setIsQuickHelpOpen(true);
      localStorage.setItem('nasa_onboarding_shown', 'true');
    }
  }, []);

  // Configuración de Accesibilidad (WCAG 2.1 AA)
  const [a11ySettings, setA11ySettings] = useState<AccessibilitySettings>({
    highContrast: false,
    colorBlindMode: 'none',
    fontSize: 'normal',
    reduceMotion: false,
    autoSpeech: false
  });

  // Sincronizar clases de accesibilidad en body
  useEffect(() => {
    const body = document.body;
    body.classList.toggle('a11y-high-contrast', a11ySettings.highContrast);
    body.classList.toggle('a11y-reduce-motion', a11ySettings.reduceMotion);
    body.classList.remove('a11y-protanopia', 'a11y-deuteranopia', 'a11y-tritanopia');
    if (a11ySettings.colorBlindMode !== 'none') {
      body.classList.add(`a11y-${a11ySettings.colorBlindMode}`);
    }
    body.classList.remove('a11y-font-large', 'a11y-font-xlarge');
    if (a11ySettings.fontSize !== 'normal') {
      body.classList.add(`a11y-font-${a11ySettings.fontSize}`);
    }
  }, [a11ySettings]);

  // Inicializar Motor 3D de Precisión NASA en el canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const engine = new CosmicEngine(canvas, {
      onObjectSelected: (objData: any) => {
        if (!objData) {
          setSelectedObject(null);
          return;
        }

        if (objData.type === 'planet' && objData.data) {
          const planetData = objData.data as any;
          setSelectedObject({ kind: 'planet', data: planetData });
          if (a11ySettings.autoSpeech) {
            cosmicAudio.speakNarration(planetData.name);
          }
        } else if (objData.type === 'deep_space' && objData.data) {
          const deepData = objData.data as any;
          setSelectedObject({ kind: 'deep_space', data: deepData });
          if (a11ySettings.autoSpeech) {
            cosmicAudio.speakNarration(deepData.name);
          }
        } else if (objData.type === 'constellation' && objData.data) {
          const constData = objData.data as any;
          setSelectedObject({ kind: 'constellation', data: constData });
          if (a11ySettings.autoSpeech) {
            cosmicAudio.speakNarration(constData.name);
          }
        }
      },
      onFpsUpdate: (fpsVal: number) => {
        setFps(Math.round(fpsVal));
      }
    });

    engine.start();
    engineRef.current = engine;

    // Sincronizar fecha astronómica cada 500ms
    const timer = setInterval(() => {
      if (engineRef.current) {
        setCurrentDate(engineRef.current.getCurrentDate());
      }
    }, 500);

    return () => {
      clearInterval(timer);
      engine.dispose();
    };
  }, []);

  // Controladores del tiempo orbital
  const handleModeChange = useCallback((mode: SceneMode) => {
    setCurrentMode(mode);
    setSelectedObject(null);
    if (engineRef.current) {
      engineRef.current.setMode(mode);
    }
  }, []);

  const handleSpeedChange = useCallback((speed: number) => {
    setTimeSpeed(speed);
    if (engineRef.current) {
      engineRef.current.setTimeSpeed(speed);
    }
  }, []);

  const handleTogglePause = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      if (engineRef.current) {
        engineRef.current.setTimePaused(next);
      }
      return next;
    });
  }, []);

  const handleResetTime = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.resetTime();
      setCurrentDate(new Date());
    }
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      cosmicAudio.toggleMute();
      return next;
    });
  }, []);

  const handleSpectrumChange = useCallback((spectrum: TelescopeSpectrum) => {
    setCurrentSpectrum(spectrum);
    if (engineRef.current && currentMode === 'observatory') {
      const nightScene = engineRef.current.getNightSkyScene();
      if (nightScene) {
        nightScene.setSpectrum(spectrum);
      }
    }
  }, [currentMode]);

  // Modo Kiosko para Museos: auto-reinicio por inactividad
  useEffect(() => {
    if (activeProfile !== 'kiosko') return;

    let timeoutId: any;
    const resetKiosk = () => {
      clearTimeout(timeoutId);
      const timeoutMs = USER_PROFILES.kiosko.uiSettings.autoPlayTimeoutMs || 60000;
      timeoutId = setTimeout(() => {
        handleModeChange('solar');
        setSelectedObject(null);
        handleResetTime();
      }, timeoutMs);
    };

    window.addEventListener('pointermove', resetKiosk);
    window.addEventListener('keydown', resetKiosk);
    resetKiosk();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('pointermove', resetKiosk);
      window.removeEventListener('keydown', resetKiosk);
    };
  }, [activeProfile, handleModeChange, handleResetTime]);

  // Atajos de teclado para accesibilidad y navegación de expertos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      } else if (e.key === ' ') {
        e.preventDefault();
        handleTogglePause();
      } else if (e.key === '1') {
        handleModeChange('solar');
      } else if (e.key === '2') {
        handleModeChange('earth');
      } else if (e.key === '3') {
        handleModeChange('deep');
      } else if (e.key === '4') {
        handleModeChange('observatory');
      } else if (e.key === '?' || e.key === 'h' || e.key === 'H') {
        setIsQuickHelpOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setSelectedObject(null);
        setIsLabOpen(false);
        setIsAssistantOpen(false);
        setIsTeacherOpen(false);
        setIsQuizOpen(false);
        setIsGrrtOpen(false);
        setIsA11yOpen(false);
        setIsQuickHelpOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleMute, handleTogglePause, handleModeChange]);

  // Iniciar lección pedagógica desde modo Profesor
  const handleStartLesson = (mode: SceneMode, targetId?: string) => {
    handleModeChange(mode);
    if (targetId === 'gargantua') {
      setTimeout(() => {
        setIsGrrtOpen(true);
      }, 500);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* Lienzo 3D Three.js / WebGL / WebGPU */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Navegación HUD Superior */}
      <TopNavigation
        currentMode={currentMode}
        onModeChange={handleModeChange}
        activeProfile={activeProfile}
        onOpenProfileSelector={() => setIsProfileOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenPhysicsLab={() => setIsLabOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenTeacherModal={() => setIsTeacherOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAccessibility={() => setIsA11yOpen(true)}
        onOpenGrrt={() => setIsGrrtOpen(true)}
        onOpenQuickHelp={() => setIsQuickHelpOpen(true)}
        fps={fps}
      />

      {/* Controles Astronómicos Inferiores (Reloj Orbital y Velocidad) */}
      <TimeController
        currentDate={currentDate}
        timeSpeed={timeSpeed}
        isPaused={isPaused}
        onSpeedChange={handleSpeedChange}
        onTogglePause={handleTogglePause}
        onResetTime={handleResetTime}
      />

      {/* Panel Multiespectrum en Modo Observatorio */}
      {currentMode === 'observatory' && (
        <ObservatoryHUD
          currentSpectrum={currentSpectrum}
          onSpectrumChange={handleSpectrumChange}
        />
      )}

      {/* Drawer de Inspección Pedagógica y Telemetría */}
      <ObjectInspectorPanel
        selected={selectedObject}
        onClose={() => setSelectedObject(null)}
        activeProfile={activeProfile}
        onOpenGrrt={() => setIsGrrtOpen(true)}
      />

      {/* Modales y Laboratorios Interactivos */}
      <ProfileSelector
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        activeProfile={activeProfile}
        onSelectProfile={(p) => {
          setActiveProfile(p);
          cosmicAudio.playMissionComplete();
        }}
      />

      <PhysicsLabModal
        isOpen={isLabOpen}
        onClose={() => setIsLabOpen(false)}
      />

      <AstroAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        activeProfile={activeProfile}
      />

      <TeacherClassroomModal
        isOpen={isTeacherOpen}
        onClose={() => setIsTeacherOpen(false)}
        onStartLesson={handleStartLesson}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        activeProfile={activeProfile}
      />

      <GrrtModal
        isOpen={isGrrtOpen}
        onClose={() => setIsGrrtOpen(false)}
      />

      <QuickHelpModal
        isOpen={isQuickHelpOpen}
        onClose={() => setIsQuickHelpOpen(false)}
      />

      <AccessibilityController
        isOpen={isA11yOpen}
        onClose={() => setIsA11yOpen(false)}
        settings={a11ySettings}
        onUpdateSettings={setA11ySettings}
      />

      {/* Overlay SVG para filtros de daltonismo FeColorMatrix */}
      <svg className="hidden">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0
                      0.558, 0.442, 0, 0, 0
                      0, 0.242, 0.758, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0
                      0.7, 0.3, 0, 0, 0
                      0, 0.3, 0.7, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0
                      0, 0.433, 0.567, 0, 0
                      0, 0.475, 0.525, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
