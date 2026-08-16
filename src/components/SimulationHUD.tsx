import React from 'react';
import { SceneMode } from '../engine/CosmicEngine';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SimulationHUDProps {
  currentMode: SceneMode;
  currentDate: Date;
  fps: number;
  timeSpeed: number;
  isPaused: boolean;
  onModeChange: (mode: SceneMode) => void;
}

const MODE_META: Record<SceneMode, { label: string; short: string; context: string }> = {
  solar: { label: 'Sistema Solar', short: 'Solar', context: 'Datos astronómicos en vivo de exoplanetas y dinámica estelar local.' },
  earth: { label: 'Sistema Tierra-Luna', short: 'Tierra', context: 'Geofísica, topografía y meteorología en tiempo real.' },
  deep: { label: 'Espacio Profundo', short: 'Deep', context: 'Exploración del catálogo Messier, NGC y cinemática de cuerpos lejanos.' },
  observatory: { label: 'Observatorio Óptico', short: 'Obs.', context: 'Datos espectroscópicos simulados del telescopio JWST y Hubble.' },
  cosmicweb: { label: 'Red Cósmica y Materia Oscura', short: 'Red', context: 'Estructura a gran escala del Universo (SDSS/IllustrisTNG).' },
  black_hole: { label: 'Simulador GRRT', short: 'GRRT', context: 'Trazado de rayos relativista: Agujeros negros y métrica de Kerr.' }
};

const MODE_ORDER: SceneMode[] = ['solar', 'earth', 'deep', 'observatory', 'cosmicweb', 'black_hole'];

function formatSimDate(d: Date): string {
  const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  return `${d.getDate().toString().padStart(2,'0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatSimTime(d: Date): string {
  return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')} UTC`;
}

function formatTimeSpeed(speed: number, paused: boolean): string {
  if (paused) return 'PAUSA';
  if (speed === 1) return '1× REAL';
  if (speed >= 1000) return `${(speed/1000).toFixed(0)}k×`;
  return `${speed}×`;
}

const isTouchDevice = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const SimulationHUD: React.FC<SimulationHUDProps> = ({
  currentMode,
  currentDate,
  fps,
  timeSpeed,
  isPaused,
  onModeChange,
}) => {
  const meta = MODE_META[currentMode];
  const modeIdx = MODE_ORDER.indexOf(currentMode);
  const prevMode = modeIdx > 0 ? MODE_ORDER[modeIdx - 1] : null;
  const nextMode = modeIdx < MODE_ORDER.length - 1 ? MODE_ORDER[modeIdx + 1] : null;
  const isTouch = isTouchDevice();

  return (
    <div className="fixed inset-0 z-10 pointer-events-none font-mono">
<<<<<<< Updated upstream
      {/* Mobile: removed — info consolidated into TopNavigation + TimeController */}

      {/* Desktop: Top-left Mode + Context */}
      <div className="hidden md:block absolute top-16 left-6 p-4 glass-panel border-l-2 border-t-2 border-primary/40 rounded-none pointer-events-auto w-64 opacity-80 hover:opacity-100 transition-opacity">
        <div className="text-[10px] tracking-[0.2em] font-bold text-primary mb-2 uppercase flex items-center gap-2 border-b border-primary/20 pb-2">
=======
      {/* Top-left: Mode + Context */}
      <div className="absolute top-14 md:top-16 left-3 md:left-6 p-2.5 md:p-4 glass-panel border-l-2 border-t-2 border-primary/40 rounded-none pointer-events-auto w-44 md:w-64 opacity-80 hover:opacity-100 transition-opacity">
        <div className="text-[9px] md:text-[10px] tracking-[0.2em] font-bold text-primary mb-1.5 md:mb-2 uppercase flex items-center gap-2 border-b border-primary/20 pb-1.5 md:pb-2">
>>>>>>> Stashed changes
          <span className="text-accent animate-pulse-slow">●</span>
          <span className="md:hidden">{meta.short}</span>
          <span className="hidden md:inline">{meta.label}</span>
        </div>
        <div className="hidden md:block text-[9px] tracking-wider text-telemetry-muted leading-relaxed">
          {meta.context}
        </div>
        <div className="mt-2 md:mt-3 hud-barcode"></div>
      </div>

<<<<<<< Updated upstream
      {/* Desktop: Top-right Technical readouts */}
      <div className="hidden md:block absolute top-16 right-6 p-4 glass-panel border-r-2 border-t-2 border-primary/40 rounded-none pointer-events-auto text-right min-w-[160px] opacity-80 hover:opacity-100 transition-opacity">
        <div className="text-[11px] tracking-widest text-white mb-1 font-bold">
=======
      {/* Top-right: Technical readouts */}
      <div className="absolute top-14 md:top-16 right-3 md:right-6 p-2.5 md:p-4 glass-panel border-r-2 border-t-2 border-primary/40 rounded-none pointer-events-auto text-right min-w-[120px] md:min-w-[160px] opacity-80 hover:opacity-100 transition-opacity">
        <div className="text-[10px] md:text-[11px] tracking-widest text-white mb-1 font-bold">
>>>>>>> Stashed changes
          {formatSimDate(currentDate)}
        </div>
        <div className="text-[9px] md:text-[10px] tracking-widest text-telemetry-muted mb-1.5 md:mb-2 font-data">
          {formatSimTime(currentDate)}
        </div>
        <div className={`text-[9px] md:text-[10px] tracking-widest font-data ${isPaused ? 'text-accent animate-flicker' : 'text-primary'}`}>
          {formatTimeSpeed(timeSpeed, isPaused)} <span className="opacity-50 mx-1">|</span> {fps} FPS
        </div>
      </div>

<<<<<<< Updated upstream
      {/* Desktop: Bottom-left Crosshair + mode indicator */}
      <div className="hidden md:flex absolute bottom-24 left-6 p-4 items-center gap-4 opacity-60">
        <div className="relative w-12 h-12 flex items-center justify-center">
=======
      {/* Bottom-left: Crosshair + mode indicator — hidden on small screens to avoid TimeController collision */}
      <div className="absolute bottom-20 md:bottom-16 left-3 md:left-6 p-2 md:p-4 flex items-center gap-3 md:gap-4 opacity-60">
        <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
>>>>>>> Stashed changes
          <div className="absolute inset-0 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary/70 md:w-8 md:h-8" strokeWidth="0.5">
            <line x1="12" y1="2" x2="12" y2="8" />
            <line x1="12" y1="16" x2="12" y2="22" />
            <line x1="2" y1="12" x2="8" y2="12" />
            <line x1="16" y1="12" x2="22" y2="12" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </div>
        <div>
          <div className="text-[8px] md:text-[9px] tracking-[0.15em] text-primary/80 mb-1">
            SYS_EXPLORATION_ACTIVE
          </div>
          <div className="text-[7px] md:text-[8px] tracking-wider text-telemetry-muted uppercase">
            {isTouch
              ? '[DRAG] Orbitar  |  [PINCH] Zoom'
              : '[L-CLICK] Orbit  |  [SCROLL] Zoom'}
          </div>
        </div>
      </div>

      {/* Bottom-right: Prev/Next module navigation */}
<<<<<<< Updated upstream
      <div className="absolute bottom-[80px] md:bottom-16 right-3 md:right-6 flex items-center gap-2 pointer-events-auto">
=======
      <div className="absolute bottom-20 md:bottom-16 right-3 md:right-6 flex items-center gap-1.5 md:gap-2 pointer-events-auto">
>>>>>>> Stashed changes
        {prevMode && (
          <button
            onClick={() => onModeChange(prevMode)}
            title={`Anterior: ${MODE_META[prevMode].label}`}
<<<<<<< Updated upstream
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0f1e]/80 border border-[rgba(237,233,228,0.2)] rounded-full md:rounded-none md:border-[rgba(122,175,200,0.3)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[#7aafc8]/10 transition-all text-[9px] tracking-widest uppercase min-h-[44px] md:min-h-0"
          >
            <ChevronLeft size={12} className="text-[#7aafc8]" />
            <span className="hidden md:inline">{MODE_META[prevMode].label}</span>
=======
            className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 bg-space-deep/80 border border-telemetry-dim text-telemetry-muted hover:text-white hover:border-primary hover:bg-primary/10 transition-all text-[8px] md:text-[9px] tracking-widest uppercase"
          >
            <ChevronLeft size={12} className="text-primary" />
            <span className="hidden sm:inline lg:hidden">{MODE_META[prevMode].short}</span>
            <span className="hidden lg:inline">{MODE_META[prevMode].label}</span>
>>>>>>> Stashed changes
          </button>
        )}
        {nextMode && (
          <button
            onClick={() => onModeChange(nextMode)}
            title={`Siguiente: ${MODE_META[nextMode].label}`}
<<<<<<< Updated upstream
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0f1e]/80 border border-[rgba(237,233,228,0.2)] rounded-full md:rounded-none md:border-[rgba(122,175,200,0.3)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[#7aafc8]/10 transition-all text-[9px] tracking-widest uppercase min-h-[44px] md:min-h-0"
          >
            <span className="hidden md:inline">{MODE_META[nextMode].label}</span>
            <ChevronRight size={12} className="text-[#7aafc8]" />
=======
            className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 bg-space-deep/80 border border-telemetry-dim text-telemetry-muted hover:text-white hover:border-primary hover:bg-primary/10 transition-all text-[8px] md:text-[9px] tracking-widest uppercase"
          >
            <span className="hidden sm:inline lg:hidden">{MODE_META[nextMode].short}</span>
            <span className="hidden lg:inline">{MODE_META[nextMode].label}</span>
            <ChevronRight size={12} className="text-primary" />
>>>>>>> Stashed changes
          </button>
        )}
      </div>
    </div>
  );
};
