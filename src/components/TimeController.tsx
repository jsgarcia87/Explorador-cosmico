import React from 'react';
import { Play, Pause, RotateCcw, FastForward, Clock } from 'lucide-react';

interface TimeControllerProps {
  currentDate: Date;
  timeSpeed: number;
  isPaused: boolean;
  onSpeedChange: (speed: number) => void;
  onTogglePause: () => void;
  onResetTime: () => void;
}

export const TimeController: React.FC<TimeControllerProps> = ({
  currentDate,
  timeSpeed,
  isPaused,
  onSpeedChange,
  onTogglePause,
  onResetTime
}) => {
  const speeds = [1, 10, 100, 1000, 10000];

  const formattedDate = currentDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();
  const formattedTime = currentDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const shortDate = currentDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
  }).toUpperCase();

  return (
    <>
      {/* Mobile: compact floating pill */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[380px] z-40 flex items-center justify-between gap-1 px-2 py-1.5 bg-[#0a0f1e]/95 backdrop-blur-xl border border-[rgba(122,175,200,0.3)] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] font-mono">
        <button
          onClick={onTogglePause}
          className="p-2 border border-[rgba(122,175,200,0.4)] bg-[rgba(122,175,200,0.15)] text-[#7aafc8] rounded-full flex-shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label={isPaused ? 'Reanudar' : 'Pausar'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
        </button>

        <div className="flex flex-col px-2 min-w-0 flex-shrink-0 items-center">
          <span className="text-[9px] text-[#ede9e4] font-bold tracking-wider">{shortDate}</span>
          <span className="text-[9px] text-[#d4864a] tracking-wider">{formattedTime}</span>
        </div>

        <div className="flex items-center gap-1 flex-1 justify-center overflow-x-auto hide-scrollbar mask-edges">
          {speeds.map((speed) => {
            const isActive = timeSpeed === speed && !isPaused;
            const label = speed >= 1000 ? `${speed/1000}k` : `${speed}`;
            return (
              <button
                key={speed}
                onClick={() => {
                  if (isPaused) onTogglePause();
                  onSpeedChange(speed);
                }}
                className={`px-1.5 py-1 text-[9px] tracking-wider font-bold min-w-[32px] min-h-[32px] text-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-[#7aafc8]/20 text-[#7aafc8] border border-[#7aafc8]/50'
                    : 'bg-transparent text-[rgba(237,233,228,0.5)] border border-transparent'
                }`}
              >
                {label}x
              </button>
            );
          })}
        </div>

        <button
          onClick={onResetTime}
          className="p-2 bg-[rgba(237,233,228,0.05)] rounded-full text-[rgba(237,233,228,0.5)] flex-shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Restablecer tiempo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Desktop: original full bar */}
      <div className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-x-3 p-2 glass-panel border-l-2 border-t-2 border-primary/40 font-mono">
        <button
          onClick={onTogglePause}
          className="p-2 border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex-shrink-0 flex items-center justify-center"
          aria-label={isPaused ? 'Reanudar tiempo astronómico' : 'Pausar tiempo astronómico'}
        >
          {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
        </button>

        <div className="flex flex-col px-4 border-x border-primary/20 flex-shrink-0">
          <span className="text-[9px] uppercase tracking-[0.2em] text-telemetry-dim flex items-center space-x-2">
            <Clock className="w-3 h-3 text-primary/50" />
            <span>RELOJ ORBITAL</span>
          </span>
          <div className="text-xs font-data font-bold text-white flex items-center space-x-2 mt-1 tracking-widest">
            <span>{formattedDate}</span>
            <span className="text-telemetry-dim">|</span>
            <span className="text-accent">{formattedTime}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-2">
          <FastForward className="w-3 h-3 text-telemetry-dim mr-2" />
          {speeds.map((speed) => {
            const isActive = timeSpeed === speed && !isPaused;
            return (
              <button
                key={speed}
                onClick={() => {
                  if (isPaused) onTogglePause();
                  onSpeedChange(speed);
                }}
                className={`px-3 py-1.5 text-[10px] tracking-widest font-bold transition-all text-center border-b-2 ${
                  isActive
                    ? 'bg-primary/20 text-primary border-primary shadow-[0_0_8px_rgba(122,175,200,0.3)]'
                    : 'bg-space-dark text-telemetry-muted border-transparent hover:bg-primary/5 hover:text-white hover:border-primary/50'
                }`}
              >
                {speed}X
              </button>
            );
          })}
        </div>

        <button
          onClick={onResetTime}
          title="Restablecer a fecha actual"
          className="p-2 border border-telemetry-dim bg-space-dark hover:bg-white/10 text-telemetry-muted hover:text-white transition-colors flex-shrink-0 flex items-center justify-center"
          aria-label="Restablecer tiempo a fecha actual"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </>
  );
};
