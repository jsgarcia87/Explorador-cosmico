import React, { useState, useRef, useEffect } from 'react';
import { SceneMode } from '../engine/CosmicEngine';
import { ProfileId, USER_PROFILES } from '../data/profiles';
import { CosmicState, ScaleMode } from '../core/CosmicState';
import { Globe, Sun, Sparkles, Telescope, Volume2, VolumeX, User, FlaskConical, Bot, School, HelpCircle, Eye, EyeOff, Network, MoreHorizontal, Gamepad2, Ruler } from 'lucide-react';

interface TopNavigationProps {
  currentMode: SceneMode;
  onModeChange: (mode: SceneMode) => void;
  activeProfile: ProfileId;
  onOpenProfileSelector: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isGuidesVisible: boolean;
  onToggleGuides: () => void;
  onOpenPhysicsLab: () => void;
  onOpenAssistant: () => void;
  onOpenTeacherModal: () => void;
  onOpenQuiz: () => void;
  onOpenAccessibility: () => void;
  onOpenGrrt: () => void;
  onOpenQuickHelp: () => void;
  fps: number;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  currentMode,
  onModeChange,
  activeProfile,
  onOpenProfileSelector,
  isMuted,
  onToggleMute,
  isGuidesVisible,
  onToggleGuides,
  onOpenPhysicsLab,
  onOpenAssistant,
  onOpenTeacherModal,
  onOpenQuiz,
  onOpenAccessibility,
  onOpenGrrt,
  onOpenQuickHelp,
  fps
}) => {
  const profile = USER_PROFILES[activeProfile];
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const [scaleMode, setScaleMode] = useState<ScaleMode>(CosmicState.getState().scaleMode);

  useEffect(() => {
    return CosmicState.subscribe((state) => {
      setScaleMode(state.scaleMode);
    });
  }, []);

  useEffect(() => {
    if (!isToolsOpen) return;
    const close = (e: PointerEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [isToolsOpen]);

  const toolMenuItems = [
    { icon: User, label: `Perfil: ${profile.name}`, onClick: onOpenProfileSelector, show: true, accent: false },
    { icon: FlaskConical, label: 'Laboratorio de Física', onClick: onOpenPhysicsLab, show: true },
    { icon: Bot, label: 'Asistente Astro-IA', onClick: onOpenAssistant, show: true },
    { icon: Gamepad2, label: 'Misiones y Retos', onClick: onOpenQuiz, show: profile.uiSettings.enableGamification },
    { icon: School, label: 'Panel del Profesor', onClick: onOpenTeacherModal, show: profile.id === 'profesor', accent: true },
    { icon: Eye, label: 'Accesibilidad', onClick: onOpenAccessibility, show: true },
    { icon: isGuidesVisible ? Eye : EyeOff, label: isGuidesVisible ? 'Ocultar guías (G)' : 'Mostrar guías (G)', onClick: onToggleGuides, show: true },
  ].filter(item => item.show);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-2 bg-space-deep/80 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] font-display">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4 flex-shrink-0">
        <div className="w-2 h-2 bg-accent animate-pulse-slow shadow-[0_0_8px_var(--accent)]" />
        <span className="text-sm md:text-base tracking-[0.2em] text-white">
          <span className="hidden md:inline text-telemetry-muted">SYS.</span>
          <span className="text-primary font-bold">EXPLORADOR</span>
          <span className="text-telemetry-muted">_CÓSMICO</span>
        </span>
      </div>

      {/* Center: Scene modes */}
      <nav className="flex items-center space-x-1 bg-space-dark/60 p-1 border border-primary/10 overflow-x-auto hide-scrollbar flex-shrink-0 mx-4" aria-label="Navegación principal del observatorio">
        <button
          onClick={() => onModeChange('solar')}
          className={`flex items-center space-x-2 px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
            currentMode === 'solar'
              ? 'bg-primary/20 text-primary border-b-2 border-primary shadow-[0_0_10px_rgba(122,175,200,0.2)]'
              : 'text-telemetry-muted hover:text-white hover:bg-primary/5 border-b-2 border-transparent'
          }`}
          title="Sistema Solar"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Sistema Solar</span>
        </button>

        <button
          onClick={() => onModeChange('earth')}
          className={`flex items-center space-x-2 px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
            currentMode === 'earth'
              ? 'bg-primary/20 text-primary border-b-2 border-primary shadow-[0_0_10px_rgba(122,175,200,0.2)]'
              : 'text-telemetry-muted hover:text-white hover:bg-primary/5 border-b-2 border-transparent'
          }`}
          title="La Tierra"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">La Tierra</span>
        </button>

        <button
          onClick={() => onModeChange('deep')}
          className={`flex items-center space-x-2 px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
            currentMode === 'deep'
              ? 'bg-accent/20 text-accent border-b-2 border-accent shadow-[0_0_10px_rgba(212,134,74,0.2)]'
              : 'text-telemetry-muted hover:text-white hover:bg-primary/5 border-b-2 border-transparent'
          }`}
          title="Espacio Profundo"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Espacio Profundo</span>
        </button>

        <button
          onClick={() => onModeChange('observatory')}
          className={`flex items-center space-x-2 px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
            currentMode === 'observatory'
              ? 'bg-primary/20 text-primary border-b-2 border-primary shadow-[0_0_10px_rgba(122,175,200,0.2)]'
              : 'text-telemetry-muted hover:text-white hover:bg-primary/5 border-b-2 border-transparent'
          }`}
          title="Observatorio Sky"
        >
          <Telescope className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Observatorio</span>
        </button>

        <button
          onClick={() => onModeChange('cosmicweb')}
          className={`flex items-center space-x-2 px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
            currentMode === 'cosmicweb'
              ? 'bg-accent/20 text-accent border-b-2 border-accent shadow-[0_0_10px_rgba(212,134,74,0.2)]'
              : 'text-telemetry-muted hover:text-white hover:bg-primary/5 border-b-2 border-transparent'
          }`}
          title="Red Cósmica (Estructura a Gran Escala)"
        >
          <Network className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Red Cósmica</span>
        </button>
      </nav>

      {/* Right: Primary actions + tools dropdown */}
      <div className="flex items-center space-x-2 flex-shrink-0 font-mono">
        <button
          onClick={() => CosmicState.setState({ scaleMode: scaleMode === 'educational' ? 'realistic' : 'educational' })}
          title={scaleMode === 'educational' ? "Cambiar a Escala Real" : "Cambiar a Escala Educativa"}
          className="flex items-center space-x-2 px-3 py-1.5 bg-space-dark border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all text-[9px] tracking-widest uppercase"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">{scaleMode === 'educational' ? 'SCL: EDUC' : 'SCL: REAL'}</span>
        </button>

        <button
          onClick={onOpenQuickHelp}
          title="Guía Rápida de Misión y Controles"
          className="flex items-center space-x-2 px-3 py-1.5 bg-space-dark border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all text-[9px] tracking-widest uppercase"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">MANUAL</span>
        </button>

        <button
          onClick={onOpenGrrt}
          title="Simulador de Agujero Negro Relativista GRRT"
          className="flex items-center space-x-2 px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 hover:border-accent/60 transition-all text-[9px] tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
          <span className="hidden lg:inline">GRRT_SIM</span>
        </button>

        <button
          onClick={onToggleMute}
          title={isMuted ? 'Activar Sonido Cósmico' : 'Silenciar'}
          className="p-1.5 bg-space-dark border border-telemetry-dim text-telemetry-muted hover:text-white hover:border-primary/50 transition-colors flex-shrink-0"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-accent" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Tools dropdown */}
        <div ref={toolsRef} className="relative flex-shrink-0">
          <button
            onClick={() => setIsToolsOpen(prev => !prev)}
            title="Herramientas y ajustes"
            className={`p-1.5 border transition-colors ${
              isToolsOpen
                ? 'bg-primary/20 text-white border-primary'
                : 'bg-space-dark border-telemetry-dim text-telemetry-muted hover:text-white hover:border-primary/50'
            }`}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {isToolsOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-space-deep/95 backdrop-blur-md border border-primary/30 shadow-[0_10px_40px_rgba(0,0,0,0.9)] py-2 animate-slide-up">
              {toolMenuItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { item.onClick(); setIsToolsOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 text-[10px] tracking-wider uppercase transition-colors ${
                    item.accent
                      ? 'text-accent hover:bg-accent/10 hover:border-l-2 hover:border-accent'
                      : 'text-telemetry-muted hover:text-white hover:bg-primary/10 hover:border-l-2 hover:border-primary'
                  } border-l-2 border-transparent`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
