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

const MODE_META: Record<SceneMode, { label: string; context: string }> = {
  solar: { label: 'Sistema Solar', context: 'Datos astronómicos en vivo de exoplanetas y dinámica estelar local.' },
  earth: { label: 'Sistema Tierra-Luna', context: 'Geofísica, topografía y meteorología en tiempo real.' },
  deep: { label: 'Espacio Profundo', context: 'Exploración del catálogo Messier, NGC y cinemática de cuerpos lejanos.' },
  observatory: { label: 'Observatorio Óptico', context: 'Datos espectroscópicos simulados del telescopio JWST y Hubble.' },
  cosmicweb: { label: 'Red Cósmica y Materia Oscura', context: 'Estructura a gran escala del Universo (SDSS/IllustrisTNG).' },
  black_hole: { label: 'Simulador GRRT', context: 'Trazado de rayos relativista: Agujeros negros y métrica de Kerr.' }
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

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 12,
        pointerEvents: 'none',
        fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
      }}
    >
      {/* Top-left: Mode + Context */}
      <div
        style={{
          position: 'absolute',
          top: 52,
          left: 16,
          opacity: 0.35,
        }}
      >
        <div style={{ fontSize: 10, letterSpacing: '0.14em', fontWeight: 700, color: '#ede9e4', marginBottom: 3 }}>
          <span style={{ color: '#c8964a', marginRight: 6 }}>&#x2726;</span>
          {meta.label}
        </div>
        <div style={{ fontSize: 9, letterSpacing: '0.06em', color: 'rgba(237,233,228,0.6)' }}>
          {meta.context}
        </div>
      </div>

      {/* Top-right: Technical readouts */}
      <div
        style={{
          position: 'absolute',
          top: 52,
          right: 16,
          textAlign: 'right',
          opacity: 0.3,
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.08em', color: '#ede9e4', marginBottom: 2 }}>
          {formatSimDate(currentDate)}
        </div>
        <div style={{ fontSize: 9, letterSpacing: '0.08em', color: 'rgba(237,233,228,0.6)', marginBottom: 2 }}>
          {formatSimTime(currentDate)}
        </div>
        <div style={{ fontSize: 9, letterSpacing: '0.08em', color: isPaused ? '#c8964a' : 'rgba(237,233,228,0.5)' }}>
          {formatTimeSpeed(timeSpeed, isPaused)} · {fps} FPS
        </div>
      </div>

      {/* Bottom-left: Crosshair + mode indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: 16,
          opacity: 0.25,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* Crosshair reticle */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(237,233,228,0.6)" strokeWidth="1">
          <circle cx="12" cy="12" r="6" />
          <line x1="12" y1="2" x2="12" y2="7" />
          <line x1="12" y1="17" x2="12" y2="22" />
          <line x1="2" y1="12" x2="7" y2="12" />
          <line x1="17" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="1.5" fill="rgba(237,233,228,0.4)" stroke="none" />
        </svg>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(237,233,228,0.5)' }}>
            EXPLORACIÓN INTERACTIVA
          </div>
          <div style={{ fontSize: 8, letterSpacing: '0.06em', color: 'rgba(237,233,228,0.35)', marginTop: 1 }}>
            ARRASTRAR PARA ORBITAR · SCROLL PARA ZOOM
          </div>
        </div>
      </div>

      {/* Bottom-right: Prev/Next module navigation */}
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          pointerEvents: 'auto',
        }}
      >
        {prevMode && (
          <button
            onClick={() => onModeChange(prevMode)}
            title={`Anterior: ${MODE_META[prevMode].label}`}
            style={{
              background: 'rgba(237,233,228,0.04)',
              border: '1px solid rgba(237,233,228,0.08)',
              borderRadius: 4,
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              color: 'rgba(237,233,228,0.4)',
              fontSize: 9,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ede9e4';
              e.currentTarget.style.background = 'rgba(237,233,228,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(237,233,228,0.4)';
              e.currentTarget.style.background = 'rgba(237,233,228,0.04)';
            }}
          >
            <ChevronLeft size={12} />
            <span className="hidden md:inline">{MODE_META[prevMode].label}</span>
          </button>
        )}
        {nextMode && (
          <button
            onClick={() => onModeChange(nextMode)}
            title={`Siguiente: ${MODE_META[nextMode].label}`}
            style={{
              background: 'rgba(237,233,228,0.04)',
              border: '1px solid rgba(237,233,228,0.08)',
              borderRadius: 4,
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              color: 'rgba(237,233,228,0.4)',
              fontSize: 9,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ede9e4';
              e.currentTarget.style.background = 'rgba(237,233,228,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(237,233,228,0.4)';
              e.currentTarget.style.background = 'rgba(237,233,228,0.04)';
            }}
          >
            <span className="hidden md:inline">{MODE_META[nextMode].label}</span>
            <ChevronRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
};
