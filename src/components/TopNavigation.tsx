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
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-3 md:px-4 py-2 md:py-2.5 bg-[rgba(8,8,12,0.80)] backdrop-blur-xl border-b border-[rgba(237,233,228,0.07)] shadow-2xl">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#7aafc8] animate-pulse shadow-[0_0_8px_rgba(122,175,200,0.5)]" />
        <span className="font-display font-bold text-base md:text-lg tracking-wider text-[#ede9e4]">
          <span className="hidden md:inline">EXPLORADOR </span>
          <span className="text-[#c8964a]">CÓSMICO</span>
        </span>
      </div>

      {/* Center: Scene modes */}
      <nav className="flex items-center space-x-1 bg-[rgba(3,3,3,0.5)] p-1 rounded-[6px] border border-[rgba(237,233,228,0.07)] overflow-x-auto hide-scrollbar flex-shrink-0 mx-2" aria-label="Navegación principal del observatorio">
        <button
          onClick={() => onModeChange('solar')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-[4px] text-xs font-medium transition-all duration-300 ${
            currentMode === 'solar'
              ? 'bg-[rgba(200,150,74,0.2)] text-[#c8964a] border border-[rgba(200,150,74,0.3)]'
              : 'text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.05)] border border-transparent'
          }`}
          title="Sistema Solar"
        >
          <Sun className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">Sistema Solar</span>
        </button>

        <button
          onClick={() => onModeChange('earth')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-[4px] text-xs font-medium transition-all duration-300 ${
            currentMode === 'earth'
              ? 'bg-[rgba(122,175,200,0.2)] text-[#7aafc8] border border-[rgba(122,175,200,0.3)]'
              : 'text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.05)] border border-transparent'
          }`}
          title="La Tierra"
        >
          <Globe className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">La Tierra</span>
        </button>

        <button
          onClick={() => onModeChange('deep')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-[4px] text-xs font-medium transition-all duration-300 ${
            currentMode === 'deep'
              ? 'bg-[rgba(152,120,184,0.2)] text-[#9878b8] border border-[rgba(152,120,184,0.3)]'
              : 'text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.05)] border border-transparent'
          }`}
          title="Espacio Profundo"
        >
          <Sparkles className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">Espacio Profundo</span>
        </button>

        <button
          onClick={() => onModeChange('observatory')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-[4px] text-xs font-medium transition-all duration-300 ${
            currentMode === 'observatory'
              ? 'bg-[rgba(122,175,200,0.2)] text-[#8ec5dc] border border-[rgba(122,175,200,0.3)]'
              : 'text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.05)] border border-transparent'
          }`}
          title="Observatorio Sky"
        >
          <Telescope className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">Observatorio</span>
        </button>

        <button
          onClick={() => onModeChange('cosmicweb')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-[4px] text-xs font-medium transition-all duration-300 ${
            currentMode === 'cosmicweb'
              ? 'bg-[rgba(152,120,184,0.2)] text-[#9878b8] border border-[rgba(152,120,184,0.3)]'
              : 'text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.05)] border border-transparent'
          }`}
          title="Red Cósmica (Estructura a Gran Escala)"
        >
          <Network className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">Red Cósmica</span>
        </button>
      </nav>

      {/* Right: Primary actions + tools dropdown */}
      <div className="flex items-center space-x-1.5 flex-shrink-0">
        <button
          onClick={() => CosmicState.setState({ scaleMode: scaleMode === 'educational' ? 'realistic' : 'educational' })}
          title={scaleMode === 'educational' ? "Cambiar a Escala Real" : "Cambiar a Escala Educativa"}
          className="flex items-center space-x-1.5 p-2 md:px-3 md:py-1.5 rounded-[4px] bg-[rgba(152,120,184,0.1)] hover:bg-[rgba(152,120,184,0.18)] text-[#9878b8] border border-[rgba(152,120,184,0.2)] text-xs font-medium transition-all flex-shrink-0"
        >
          <Ruler className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">{scaleMode === 'educational' ? 'Escala Educ.' : 'Escala Real'}</span>
        </button>

        <button
          onClick={onOpenQuickHelp}
          title="Guía Rápida de Misión y Controles"
          className="flex items-center space-x-1.5 p-2 md:px-3 md:py-1.5 rounded-[4px] bg-[rgba(122,175,200,0.1)] hover:bg-[rgba(122,175,200,0.18)] text-[#7aafc8] border border-[rgba(122,175,200,0.2)] text-xs font-medium transition-all flex-shrink-0"
        >
          <HelpCircle className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">Guía</span>
        </button>

        <button
          onClick={onOpenGrrt}
          title="Simulador de Agujero Negro Relativista GRRT"
          className="flex items-center space-x-1.5 p-2 md:px-3 md:py-1.5 rounded-[4px] bg-[rgba(200,150,74,0.1)] hover:bg-[rgba(200,150,74,0.18)] text-[#c8964a] border border-[rgba(200,150,74,0.2)] text-xs font-medium transition-all flex-shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8964a] animate-pulse" />
          <span className="hidden lg:inline">Gargantua</span>
        </button>

        <button
          onClick={onToggleMute}
          title={isMuted ? 'Activar Sonido Cósmico' : 'Silenciar'}
          className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] border border-[rgba(237,233,228,0.07)] transition-colors flex-shrink-0"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#c8964a]" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Tools dropdown */}
        <div ref={toolsRef} className="relative flex-shrink-0">
          <button
            onClick={() => setIsToolsOpen(prev => !prev)}
            title="Herramientas y ajustes"
            className={`p-2 rounded-[4px] transition-colors ${
              isToolsOpen
                ? 'bg-[rgba(237,233,228,0.12)] text-[#ede9e4] border border-[rgba(237,233,228,0.15)]'
                : 'bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] border border-[rgba(237,233,228,0.07)]'
            }`}
            aria-label="Abrir menú de herramientas"
            aria-expanded={isToolsOpen}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {isToolsOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-[6px] bg-[rgba(8,8,12,0.95)] backdrop-blur-xl border border-[rgba(237,233,228,0.10)] shadow-2xl py-1 animate-slide-up">
              {toolMenuItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { item.onClick(); setIsToolsOpen(false); }}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 text-xs transition-colors ${
                    item.accent
                      ? 'text-[#c8964a] hover:bg-[rgba(200,150,74,0.1)]'
                      : 'text-[rgba(237,233,228,0.7)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.06)]'
                  }`}
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
