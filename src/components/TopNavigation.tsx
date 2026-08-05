import React from 'react';
import { SceneMode } from '../engine/CosmicEngine';
import { ProfileId, USER_PROFILES } from '../data/profiles';
import { Globe, Sun, Sparkles, Telescope, Volume2, VolumeX, User, FlaskConical, Bot, School, HelpCircle, Eye } from 'lucide-react';

interface TopNavigationProps {
  currentMode: SceneMode;
  onModeChange: (mode: SceneMode) => void;
  activeProfile: ProfileId;
  onOpenProfileSelector: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
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

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-3 md:px-6 py-2 md:py-3 bg-slate-950/70 backdrop-blur-2xl border-b border-white/15 shadow-2xl">
      {/* Izquierda: Logotipo y Telemetría DSN */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#22d3ee]" />
          <span className="font-outfit font-bold text-base md:text-lg tracking-wider text-white">
            <span className="hidden md:inline">EXPLORADOR </span>
            <span className="text-cyan-400">CÓSMICO</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            NASA / ESA GRADE
          </span>
        </div>

        {profile.uiSettings.showComplexTelemetry && (
          <div className="hidden md:flex items-center space-x-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <span>DSN: <strong className="text-emerald-400">ENLACE ACTIVO</strong></span>
            <span className="text-slate-500">|</span>
            <span>FPS: <strong className={fps > 55 ? 'text-emerald-400' : 'text-amber-400'}>{fps}</strong></span>
          </div>
        )}
      </div>

      {/* Centro: Selector de Observatorios / Modos */}
      <nav className="flex items-center space-x-1 bg-black/40 p-1 rounded-full border border-white/10 overflow-x-auto hide-scrollbar flex-shrink-0 mx-2" aria-label="Navegación principal del observatorio">
        <button
          onClick={() => onModeChange('solar')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            currentMode === 'solar'
              ? 'bg-gradient-to-r from-amber-500/80 to-amber-600 text-white shadow-lg shadow-amber-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title="Sistema Solar"
        >
          <Sun className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">Sistema Solar</span>
        </button>

        <button
          onClick={() => onModeChange('earth')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            currentMode === 'earth'
              ? 'bg-gradient-to-r from-blue-500/80 to-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title="La Tierra"
        >
          <Globe className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">La Tierra</span>
        </button>

        <button
          onClick={() => onModeChange('deep')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            currentMode === 'deep'
              ? 'bg-gradient-to-r from-purple-500/80 to-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title="Espacio Profundo"
        >
          <Sparkles className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">Espacio Profundo</span>
        </button>

        <button
          onClick={() => onModeChange('observatory')}
          className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            currentMode === 'observatory'
              ? 'bg-gradient-to-r from-cyan-500/80 to-cyan-600 text-white shadow-lg shadow-cyan-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title="Observatorio Sky"
        >
          <Telescope className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden lg:inline">Observatorio Sky</span>
        </button>
      </nav>

      {/* Derecha: Herramientas, Laboratorio, Asistente y Perfil */}
      <div className="flex items-center space-x-1.5 md:space-x-2 overflow-x-auto hide-scrollbar flex-shrink-0">
        {/* Guía Rápida NASA */}
        <button
          onClick={onOpenQuickHelp}
          title="Guía Rápida de Misión y Controles"
          className="flex items-center space-x-1.5 p-2 md:px-3 md:py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium transition-all flex-shrink-0"
        >
          <HelpCircle className="w-4 h-4 md:w-3.5 md:h-3.5 text-cyan-400" />
          <span className="hidden md:inline">Guía NASA</span>
        </button>

        {/* Agujero Negro GRRT */}
        <button
          onClick={onOpenGrrt}
          title="Simulador de Agujero Negro Relativista GRRT"
          className="flex items-center space-x-1.5 p-2 md:px-3 md:py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 text-xs font-medium transition-all flex-shrink-0"
        >
          <span className="w-2 h-2 md:w-2 md:h-2 rounded-full bg-orange-500 animate-ping" />
          <span className="hidden md:inline">Gargantua GRRT</span>
        </button>

        {/* Laboratorio de Física */}
        <button
          onClick={onOpenPhysicsLab}
          title="Laboratorio de Simulaciones Físicas"
          className="p-2 md:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex-shrink-0"
          aria-label="Abrir Laboratorio de Simulaciones"
        >
          <FlaskConical className="w-4 h-4 md:w-4 md:h-4 text-cyan-400" />
        </button>

        {/* Asistente IA */}
        <button
          onClick={onOpenAssistant}
          title="Asistente Astronómico Inteligente"
          className="p-2 md:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex-shrink-0"
          aria-label="Abrir Asistente Astro-IA"
        >
          <Bot className="w-4 h-4 md:w-4 md:h-4 text-purple-400" />
        </button>

        {/* Cuestionarios / Retos */}
        {profile.uiSettings.enableGamification && (
          <button
            onClick={onOpenQuiz}
            title="Misiones y Retos del Cosmos"
            className="p-2 md:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex-shrink-0"
            aria-label="Abrir Cuestionario Astronómico"
          >
            <HelpCircle className="w-4 h-4 md:w-4 md:h-4 text-amber-400" />
          </button>
        )}

        {/* Modo Aula / Profesor */}
        {profile.id === 'profesor' && (
          <button
            onClick={onOpenTeacherModal}
            title="Panel de Control del Profesor"
            className="p-2 md:p-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors flex-shrink-0"
          >
            <School className="w-4 h-4 md:w-4 md:h-4" />
          </button>
        )}

        {/* Accesibilidad */}
        <button
          onClick={onOpenAccessibility}
          title="Opciones de Accesibilidad"
          className="p-2 md:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex-shrink-0"
          aria-label="Configuración de Accesibilidad"
        >
          <Eye className="w-4 h-4 md:w-4 md:h-4" />
        </button>

        {/* Silenciar Audio */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Activar Sonido Cósmico' : 'Silenciar'}
          className="p-2 md:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex-shrink-0"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 md:w-4 md:h-4 text-red-400" /> : <Volume2 className="w-4 h-4 md:w-4 md:h-4 text-emerald-400" />}
        </button>

        {/* Selector de Perfil Adaptativo */}
        <button
          onClick={onOpenProfileSelector}
          title={`Perfil activo: ${profile.name}`}
          className="flex items-center space-x-2 p-2 md:px-3 md:py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-all shadow-md flex-shrink-0"
        >
          <User className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden md:inline">{profile.name}</span>
        </button>
      </div>
    </header>
  );
};
