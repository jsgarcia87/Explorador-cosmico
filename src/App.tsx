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
import { ConstellationLegend } from './components/ConstellationLegend';
import { DeepSpaceLegendHUD } from './components/DeepSpaceLegendHUD';
import { PhysicsLabModal } from './components/PhysicsLabModal';
import { AstroAssistantModal } from './components/AstroAssistantModal';
import { CompareModal } from './components/CompareModal';
import { TeacherClassroomModal } from './components/TeacherClassroomModal';
import { QuizModal } from './components/QuizModal';
import { GrrtModal } from './components/GrrtModal';
import { QuickHelpModal } from './components/QuickHelpModal';
import { AccessibilityController, AccessibilitySettings } from './components/AccessibilityController';
import { SimulationHUD } from './components/SimulationHUD';

import './styles/index.css';
import './styles/animations.css';

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<CosmicEngine | null>(null);
  const a11yRef = useRef<AccessibilitySettings | null>(null);

  const [engineReady, setEngineReady] = useState(false);
  const [webglError, setWebglError] = useState(false);

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
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [compareInitialId, setCompareInitialId] = useState<string | undefined>(undefined);
  const [isLabOpen, setIsLabOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isGrrtOpen, setIsGrrtOpen] = useState<boolean>(false);
  const [isA11yOpen, setIsA11yOpen] = useState<boolean>(false);
  const [isQuickHelpOpen, setIsQuickHelpOpen] = useState<boolean>(false);
  const [isUiHidden, setIsUiHidden] = useState<boolean>(false);
  const [isGuidesVisible, setIsGuidesVisible] = useState<boolean>(true);

  // Auto-hide chrome (header + time controller) after inactivity
  const [isChromeVisible, setIsChromeVisible] = useState(true);
  const chromeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chromeHoveredRef = useRef(false);

  const anyModalOpen = isProfileOpen || isLabOpen || isAssistantOpen || isTeacherOpen || isQuizOpen || isGrrtOpen || isA11yOpen || isQuickHelpOpen || isCompareOpen;

  const resetChromeTimer = useCallback(() => {
    setIsChromeVisible(true);
    if (chromeTimerRef.current) clearTimeout(chromeTimerRef.current);
    chromeTimerRef.current = setTimeout(() => {
      if (!chromeHoveredRef.current) setIsChromeVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (anyModalOpen) {
      setIsChromeVisible(true);
      if (chromeTimerRef.current) clearTimeout(chromeTimerRef.current);
      return;
    }
    resetChromeTimer();
    const onActivity = () => resetChromeTimer();
    window.addEventListener('pointermove', onActivity);
    window.addEventListener('pointerdown', onActivity);
    window.addEventListener('keydown', onActivity);
    return () => {
      window.removeEventListener('pointermove', onActivity);
      window.removeEventListener('pointerdown', onActivity);
      window.removeEventListener('keydown', onActivity);
      if (chromeTimerRef.current) clearTimeout(chromeTimerRef.current);
    };
  }, [anyModalOpen, resetChromeTimer]);

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

  // Keep a11y ref in sync for use inside engine callback
  useEffect(() => { a11yRef.current = a11ySettings; }, [a11ySettings]);

  // Inicializar Motor 3D de Precisión NASA en el canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      setWebglError(true);
      return;
    }

    const engine = new CosmicEngine(canvas, {
      onObjectSelected: (objData: any) => {
        if (!objData) {
          setSelectedObject(null);
          return;
        }

        const speak = (name: string) => {
          if (a11yRef.current?.autoSpeech) cosmicAudio.speakNarration(name);
        };

        if (objData.type === 'planet' && objData.data) {
          const planetData = objData.data as any;
          setSelectedObject({ kind: 'planet', data: planetData });
          speak(planetData.name);
        } else if (objData.type === 'deep_space' && objData.data) {
          const deepData = objData.data as any;
          setSelectedObject({ kind: 'deep_space', data: deepData });
          speak(deepData.name);
        } else if (objData.type === 'constellation' && objData.data) {
          const constData = objData.data as any;
          setSelectedObject({ kind: 'constellation', data: constData });
          speak(constData.name);
        }
      },
      onFpsUpdate: (fpsVal: number) => {
        setFps(Math.round(fpsVal));
      }
    });

    engine.start();
    engineRef.current = engine;
    setEngineReady(true);

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
      engineRef.current.setGuidesVisible(isGuidesVisible);
    }
  }, [isGuidesVisible]);

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

  const handleToggleGuides = useCallback(() => {
    setIsGuidesVisible((prev) => {
      const next = !prev;
      if (engineRef.current) {
        engineRef.current.setGuidesVisible(next);
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

  const handleToggleConstellation = useCallback((id: string, visible: boolean) => {
    if (engineRef.current && currentMode === 'observatory') {
      const nightScene = engineRef.current.getNightSkyScene();
      if (nightScene) {
        nightScene.toggleConstellationLines(id, visible);
      }
    }
  }, [currentMode]);

  const handleHideAllConstellations = useCallback(() => {
    if (engineRef.current && currentMode === 'observatory') {
      const nightScene = engineRef.current.getNightSkyScene();
      if (nightScene) {
        nightScene.hideAllConstellationLines();
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
      } else if (e.key === 'g' || e.key === 'G') {
        handleToggleGuides();
      } else if (e.key === '1') {
        handleModeChange('solar');
      } else if (e.key === '2') {
        handleModeChange('earth');
      } else if (e.key === '3') {
        handleModeChange('deep');
      } else if (e.key === '4') {
        handleModeChange('observatory');
      } else if (e.key === 'h' || e.key === 'H') {
        setIsUiHidden(prev => !prev);
      } else if (e.key === '?') {
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
  }, [handleToggleMute, handleTogglePause, handleToggleGuides, handleModeChange]);

  // Iniciar lección pedagógica desde modo Profesor
  const handleStartLesson = (mode: SceneMode, targetId?: string) => {
    if (targetId === 'gargantua' || targetId === 'sgr_a_star') {
      handleModeChange('black_hole');
      setTimeout(() => {
        setIsGrrtOpen(true);
      }, 500);
    } else {
      handleModeChange(mode);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* WebGL error fallback */}
      {webglError && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[rgba(3,3,5,1)] text-[#ede9e4] px-8 text-center">
          <div className="text-4xl mb-4">🚫</div>
          <h2 className="text-xl font-bold mb-2">WebGL no disponible</h2>
          <p className="text-[rgba(237,233,228,0.5)] max-w-md">Tu navegador o dispositivo no soporta WebGL, necesario para renderizar el universo 3D. Intenta actualizar tu navegador o activar la aceleración por hardware en la configuración.</p>
        </div>
      )}

      {/* Loading spinner */}
      {!engineReady && !webglError && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[rgba(3,3,5,1)] text-[#ede9e4]">
          <div className="w-10 h-10 border-2 border-[#7aafc8] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm text-[rgba(237,233,228,0.5)] font-mono">Inicializando motor 3D...</p>
        </div>
      )}

      {/* Lienzo 3D Three.js / WebGL */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="Vista 3D interactiva del universo"
      />

      {/* Contenedor Global de UI (Modo Ocultar Interfaz) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isUiHidden ? 'opacity-0' : 'opacity-100'}`}
        {...({ inert: isUiHidden ? "" : undefined } as any)}
      >
        {/* HUD corners — datos técnicos en esquinas (estilo COSMOS.EDU) */}
        <SimulationHUD
          currentMode={currentMode}
          currentDate={currentDate}
          fps={fps}
          timeSpeed={timeSpeed}
          isPaused={isPaused}
          onModeChange={handleModeChange}
        />

        {/* Navegación HUD Superior */}
      <div
        className="transition-all duration-500 ease-in-out"
        style={{
          opacity: isChromeVisible ? 1 : 0,
          transform: isChromeVisible ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: isChromeVisible ? 'auto' : 'none',
        }}
        onPointerEnter={() => { chromeHoveredRef.current = true; setIsChromeVisible(true); }}
        onPointerLeave={() => { chromeHoveredRef.current = false; resetChromeTimer(); }}
      >
        <TopNavigation
          currentMode={currentMode}
          onModeChange={handleModeChange}
          activeProfile={activeProfile}
          onOpenProfileSelector={() => setIsProfileOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isGuidesVisible={isGuidesVisible}
          onToggleGuides={handleToggleGuides}
          onOpenPhysicsLab={() => setIsLabOpen(true)}
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onOpenTeacherModal={() => setIsTeacherOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenAccessibility={() => setIsA11yOpen(true)}
          onOpenGrrt={() => window.open('./simulador-grrt/index.html', '_blank')}
          onOpenQuickHelp={() => setIsQuickHelpOpen(true)}
          fps={fps}
        />
      </div>

      {/* Controles Astronómicos Inferiores (Reloj Orbital y Velocidad) */}
      <div
        className="transition-all duration-500 ease-in-out"
        style={{
          opacity: isChromeVisible ? 1 : 0,
          transform: isChromeVisible ? 'translateY(0)' : 'translateY(8px)',
          pointerEvents: isChromeVisible ? 'auto' : 'none',
        }}
        onPointerEnter={() => { chromeHoveredRef.current = true; setIsChromeVisible(true); }}
        onPointerLeave={() => { chromeHoveredRef.current = false; resetChromeTimer(); }}
      >
        <TimeController
          currentDate={currentDate}
          timeSpeed={timeSpeed}
          isPaused={isPaused}
          onSpeedChange={handleSpeedChange}
          onTogglePause={handleTogglePause}
          onResetTime={handleResetTime}
        />
      </div>

      {/* Panel Multiespectrum en Modo Observatorio */}
      {currentMode === 'deep' && (
        <DeepSpaceLegendHUD engine={engineRef.current} />
      )}

      {currentMode === 'observatory' && (
        <>
          <ObservatoryHUD
            currentSpectrum={currentSpectrum}
            onSpectrumChange={handleSpectrumChange}
          />
          <ConstellationLegend
            onToggleConstellation={handleToggleConstellation}
            onHideAll={handleHideAllConstellations}
          />
        </>
      )}

      {/* Drawer de Inspección Pedagógica y Telemetría */}
      <ObjectInspectorPanel
        selected={selectedObject}
        onClose={() => setSelectedObject(null)}
        activeProfile={activeProfile}
        onOpenGrrt={() => window.open('./simulador-grrt/index.html', '_blank')}
        onOpenCompare={(id) => { setCompareInitialId(id); setIsCompareOpen(true); }}
      />

      {/* Modales y Laboratorios Interactivos */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialPlanetId={compareInitialId}
      />
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
        onClose={() => { setIsGrrtOpen(false); handleModeChange('solar'); }}
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
      </div>

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
