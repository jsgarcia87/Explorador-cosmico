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

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-auto md:left-6 md:translate-x-0 md:bottom-6 z-40 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-x-2 md:gap-x-3 gap-y-2 p-2 glass-panel border-l-2 border-t-2 border-primary/40 font-mono">
      <button
        onClick={onTogglePause}
        className="p-2 border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
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

      <div className="flex items-center space-x-1.5 md:space-x-2 w-full md:w-auto justify-center md:justify-start mt-1 md:mt-0 px-2">
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
              className={`px-3 py-1.5 text-[10px] tracking-widest font-bold transition-all flex-1 md:flex-none text-center border-b-2 min-h-[44px] md:min-h-0 ${
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
        className="p-2 border border-telemetry-dim bg-space-dark hover:bg-white/10 text-telemetry-muted hover:text-white transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center flex-shrink-0"
        aria-label="Restablecer tiempo a fecha actual"
      >
        <RotateCcw className="w-3 h-3" />
      </button>
    </div>
  );
};

