import React, { useState, useRef, useEffect } from 'react';
import { SceneMode } from '../engine/CosmicEngine';
import { ProfileId, USER_PROFILES } from '../data/profiles';
import { CosmicState, ScaleMode } from '../core/CosmicState';
import { Globe, Sun, Sparkles, Telescope, Volume2, VolumeX, User, FlaskConical, Bot, School, HelpCircle, Eye, EyeOff, Network, MoreHorizontal, Gamepad2, Ruler, Menu, X, Circle } from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scaleMode, setScaleMode] = useState<ScaleMode>(CosmicState.getState().scaleMode);

  useEffect(() => {
    return CosmicState.subscribe((state) => {
      setScaleMode(state.scaleMode);
    });
  }, []);

  useEffect(() => {
    if (!isToolsOpen && !isMobileMenuOpen) return;
    const close = (e: PointerEvent) => {
      if (isToolsOpen && toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setIsToolsOpen(false);
      }
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [isToolsOpen, isMobileMenuOpen]);

  const toolMenuItems = [
    { icon: User, label: `Perfil: ${profile.name}`, onClick: onOpenProfileSelector, show: true, accent: false },
    { icon: FlaskConical, label: 'Laboratorio de Física', onClick: onOpenPhysicsLab, show: true },
    { icon: Bot, label: 'Asistente Astro-IA', onClick: onOpenAssistant, show: true },
    { icon: Gamepad2, label: 'Misiones y Retos', onClick: onOpenQuiz, show: profile.uiSettings.enableGamification },
    { icon: School, label: 'Panel del Profesor', onClick: onOpenTeacherModal, show: profile.id === 'profesor', accent: true },
    { icon: Eye, label: 'Accesibilidad', onClick: onOpenAccessibility, show: true },
    { icon: isGuidesVisible ? Eye : EyeOff, label: isGuidesVisible ? 'Ocultar guías (G)' : 'Mostrar guías (G)', onClick: onToggleGuides, show: true },
  ].filter(item => item.show);

  const sceneModes: { mode: SceneMode; icon: React.ElementType; label: string; isAccent?: boolean }[] = [
    { mode: 'solar', icon: Sun, label: 'Sistema Solar' },
    { mode: 'earth', icon: Globe, label: 'La Tierra' },
    { mode: 'deep', icon: Sparkles, label: 'Espacio Profundo', isAccent: true },
    { mode: 'observatory', icon: Telescope, label: 'Observatorio' },
    { mode: 'cosmicweb', icon: Network, label: 'Red Cósmica', isAccent: true },
    { mode: 'black_hole', icon: Circle, label: 'Agujero Negro', isAccent: true },
  ];

  return (
<<<<<<< Updated upstream
    <header className="fixed top-0 left-0 right-0 z-40 bg-space-deep/80 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] font-display">
      <div className="flex items-center justify-between px-3 md:px-6 py-2">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          <div className="w-2 h-2 bg-accent animate-pulse-slow shadow-[0_0_8px_var(--accent)]" />
          <span className="text-xs md:text-base tracking-[0.2em] text-white">
            <span className="hidden md:inline text-telemetry-muted">SYS.</span>
            <span className="text-primary font-bold">EXPLORADOR</span>
            <span className="hidden sm:inline text-telemetry-muted">_CÓSMICO</span>
          </span>
=======
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-2 sm:px-4 md:px-6 py-1.5 md:py-2 bg-space-deep/80 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] font-display">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
        <div className="w-2 h-2 bg-accent animate-pulse-slow shadow-[0_0_8px_var(--accent)]" />
        <span className="text-[11px] sm:text-sm md:text-base tracking-[0.15em] md:tracking-[0.2em] text-white">
          <span className="hidden md:inline text-telemetry-muted">SYS.</span>
          <span className="text-primary font-bold">EXPLORADOR</span>
          <span className="hidden sm:inline text-telemetry-muted">_CÓSMICO</span>
        </span>
      </div>

      {/* Center: Scene modes */}
      <nav className="flex items-center space-x-0.5 md:space-x-1 bg-space-dark/60 p-0.5 md:p-1 border border-primary/10 overflow-x-auto hide-scrollbar flex-1 min-w-0 mx-2 md:mx-4" aria-label="Navegación principal del observatorio">
        {([
          { mode: 'solar' as SceneMode, icon: Sun, label: 'Solar', fullLabel: 'Sistema Solar', accent: false },
          { mode: 'earth' as SceneMode, icon: Globe, label: 'Tierra', fullLabel: 'La Tierra', accent: false },
          { mode: 'deep' as SceneMode, icon: Sparkles, label: 'Deep', fullLabel: 'Espacio Profundo', accent: true },
          { mode: 'observatory' as SceneMode, icon: Telescope, label: 'Obs.', fullLabel: 'Observatorio', accent: false },
          { mode: 'cosmicweb' as SceneMode, icon: Network, label: 'Red', fullLabel: 'Red Cósmica', accent: true },
        ] as const).map(({ mode, icon: Icon, label, fullLabel, accent }) => {
          const isActive = currentMode === mode;
          const activeColor = accent ? 'bg-accent/20 text-accent border-accent shadow-[0_0_10px_rgba(212,134,74,0.2)]' : 'bg-primary/20 text-primary border-primary shadow-[0_0_10px_rgba(122,175,200,0.2)]';
          return (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`flex items-center space-x-1.5 md:space-x-2 px-2 md:px-4 py-1.5 text-[9px] md:text-[10px] tracking-widest uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 border-b-2 ${
                isActive ? activeColor : 'text-telemetry-muted hover:text-white hover:bg-primary/5 border-transparent'
              }`}
              title={fullLabel}
            >
              <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span className="hidden sm:inline lg:hidden">{label}</span>
              <span className="hidden lg:inline">{fullLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: Primary actions + tools dropdown */}
      <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0 font-mono">
        <button
          onClick={() => CosmicState.setState({ scaleMode: scaleMode === 'educational' ? 'realistic' : 'educational' })}
          title={scaleMode === 'educational' ? "Cambiar a Escala Real" : "Cambiar a Escala Educativa"}
          className="flex items-center space-x-1.5 px-2 md:px-3 py-1.5 bg-space-dark border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all text-[9px] tracking-widest uppercase"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{scaleMode === 'educational' ? 'EDUC' : 'REAL'}</span>
        </button>

        <button
          onClick={onOpenQuickHelp}
          title="Guía Rápida de Misión y Controles"
          className="hidden sm:flex items-center space-x-1.5 px-2 md:px-3 py-1.5 bg-space-dark border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all text-[9px] tracking-widest uppercase"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden md:inline">MANUAL</span>
        </button>

        <button
          onClick={onOpenGrrt}
          title="Simulador GRRT"
          className="flex items-center space-x-1.5 px-2 md:px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 hover:border-accent/60 transition-all text-[9px] tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
          <span className="hidden md:inline">GRRT</span>
        </button>

        <button
          onClick={onToggleMute}
          title={isMuted ? 'Activar Sonido Cósmico' : 'Silenciar'}
          className="p-1 md:p-1.5 bg-space-dark border border-telemetry-dim text-telemetry-muted hover:text-white hover:border-primary/50 transition-colors flex-shrink-0"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" /> : <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4" />}
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
>>>>>>> Stashed changes
        </div>

        {/* Center: Scene modes — hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-1 bg-space-dark/60 p-1 border border-primary/10 overflow-x-auto hide-scrollbar flex-shrink-0 mx-4" aria-label="Navegación principal del observatorio">
          {sceneModes.map(({ mode, icon: Icon, label, isAccent }) => (
            <button
              key={mode}
              onClick={() => mode === 'black_hole' ? onOpenGrrt() : onModeChange(mode)}
              className={`flex items-center space-x-2 px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all duration-300 ${
                currentMode === mode
                  ? isAccent
                    ? 'bg-accent/20 text-accent border-b-2 border-accent shadow-[0_0_10px_rgba(212,134,74,0.2)]'
                    : 'bg-primary/20 text-primary border-b-2 border-primary shadow-[0_0_10px_rgba(122,175,200,0.2)]'
                  : 'text-telemetry-muted hover:text-white hover:bg-primary/5 border-b-2 border-transparent'
              }`}
              title={label}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile: current mode indicator */}
        <div className="flex md:hidden items-center space-x-1 bg-space-dark/60 p-1 border border-primary/10 mx-2 flex-shrink min-w-0">
          {(() => {
            const cur = sceneModes.find(s => s.mode === currentMode) || sceneModes[0];
            const CurIcon = cur.icon;
            return (
              <span className="flex items-center space-x-1.5 px-2 py-1 text-[11px] tracking-widest uppercase text-primary">
                <CurIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{cur.label}</span>
              </span>
            );
          })()}
        </div>

        {/* Right: Desktop actions (hidden on mobile) + mobile hamburger */}
        <div className="flex items-center space-x-2 flex-shrink-0 font-mono">
          {/* Desktop-only action buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => CosmicState.setState({ scaleMode: scaleMode === 'educational' ? 'realistic' : 'educational' })}
              title={scaleMode === 'educational' ? "Cambiar a Escala Real" : "Cambiar a Escala Educativa"}
              className="flex items-center space-x-2 px-3 py-1.5 bg-space-dark border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all text-[9px] tracking-widest uppercase min-h-[36px]"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{scaleMode === 'educational' ? 'SCL: EDUC' : 'SCL: REAL'}</span>
            </button>

            <button
              onClick={onOpenQuickHelp}
              title="Guía Rápida de Misión y Controles"
              className="flex items-center space-x-2 px-3 py-1.5 bg-space-dark border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all text-[9px] tracking-widest uppercase min-h-[36px]"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">MANUAL</span>
            </button>

            <button
              onClick={onToggleMute}
              title={isMuted ? 'Activar Sonido Cósmico' : 'Silenciar'}
              className="p-2 bg-space-dark border border-telemetry-dim text-telemetry-muted hover:text-white hover:border-primary/50 transition-colors flex-shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-accent" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Desktop tools dropdown */}
            <div ref={toolsRef} className="relative flex-shrink-0">
              <button
                onClick={() => setIsToolsOpen(prev => !prev)}
                title="Herramientas y ajustes"
                className={`p-2 border transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center ${
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

          {/* Mobile: mute + hamburger */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Activar Sonido' : 'Silenciar'}
            className="md:hidden p-2.5 bg-space-dark border border-telemetry-dim text-telemetry-muted hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-accent" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <div ref={mobileMenuRef} className="relative md:hidden flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              title="Menú"
              className={`p-2.5 border transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isMobileMenuOpen
                  ? 'bg-primary/20 text-white border-primary'
                  : 'bg-space-dark border-telemetry-dim text-telemetry-muted hover:text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 max-w-[90vw] bg-space-deep/95 backdrop-blur-md border border-primary/30 shadow-[0_10px_40px_rgba(0,0,0,0.9)] animate-slide-up overflow-y-auto max-h-[80vh]">
                {/* Scene modes section */}
                <div className="p-3 border-b border-primary/20">
                  <span className="text-[9px] tracking-widest uppercase text-telemetry-dim block mb-2 px-1">MODO DE ESCENA</span>
                  {sceneModes.map(({ mode, icon: Icon, label, isAccent }) => (
                    <button
                      key={mode}
                      onClick={() => {
                        if (mode === 'black_hole') { onOpenGrrt(); } else { onModeChange(mode); }
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-3 text-[11px] tracking-wider uppercase transition-colors min-h-[44px] ${
                        currentMode === mode
                          ? isAccent
                            ? 'text-accent bg-accent/10 border-l-2 border-accent'
                            : 'text-primary bg-primary/10 border-l-2 border-primary'
                          : 'text-telemetry-muted hover:text-white hover:bg-primary/5 border-l-2 border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="p-3 border-b border-primary/20">
                  <span className="text-[9px] tracking-widest uppercase text-telemetry-dim block mb-2 px-1">ACCIONES RÁPIDAS</span>
                  <button
                    onClick={() => { CosmicState.setState({ scaleMode: scaleMode === 'educational' ? 'realistic' : 'educational' }); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-[11px] tracking-wider uppercase text-primary hover:bg-primary/10 transition-colors min-h-[44px]"
                  >
                    <Ruler className="w-4 h-4 flex-shrink-0" />
                    <span>{scaleMode === 'educational' ? 'Escala: Educativa' : 'Escala: Real'}</span>
                  </button>
                  <button
                    onClick={() => { onOpenQuickHelp(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-[11px] tracking-wider uppercase text-telemetry-muted hover:text-white hover:bg-primary/10 transition-colors min-h-[44px]"
                  >
                    <HelpCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Manual / Guía</span>
                  </button>
                </div>

                {/* Tools section */}
                <div className="p-3">
                  <span className="text-[9px] tracking-widest uppercase text-telemetry-dim block mb-2 px-1">HERRAMIENTAS</span>
                  {toolMenuItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { item.onClick(); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center space-x-3 px-3 py-3 text-[11px] tracking-wider uppercase transition-colors min-h-[44px] ${
                        item.accent
                          ? 'text-accent hover:bg-accent/10'
                          : 'text-telemetry-muted hover:text-white hover:bg-primary/10'
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
