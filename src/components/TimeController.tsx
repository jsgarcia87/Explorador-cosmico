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
  });
  const formattedTime = currentDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-auto md:left-6 md:translate-x-0 md:bottom-6 z-40 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start space-x-2 md:space-x-3 gap-y-2 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-white/15 shadow-2xl">
      {/* Botón de pausa / reproducción */}
      <button
        onClick={onTogglePause}
        className="p-3 md:p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex-shrink-0"
        aria-label={isPaused ? 'Reanudar tiempo astronómico' : 'Pausar tiempo astronómico'}
      >
        {isPaused ? <Play className="w-5 h-5 md:w-4 md:h-4 fill-current" /> : <Pause className="w-5 h-5 md:w-4 md:h-4 fill-current" />}
      </button>

      {/* Fecha y hora actual del observatorio */}
      <div className="flex flex-col px-3 border-x md:border-l-0 border-white/10 flex-shrink-0">
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center space-x-1">
          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 inline mr-1" />
          <span>RELOJ ORBITAL</span>
        </span>
        <div className="text-xs md:text-sm font-mono font-bold text-white flex items-center space-x-2">
          <span>{formattedDate}</span>
          <span className="text-slate-400">•</span>
          <span className="text-cyan-300">{formattedTime}</span>
        </div>
      </div>

      {/* Selectores de velocidad */}
      <div className="flex items-center space-x-1.5 md:space-x-1 w-full md:w-auto justify-center md:justify-start mt-1 md:mt-0">
        <FastForward className="w-4 h-4 md:w-3.5 md:h-3.5 text-slate-400 mr-1" />
        {speeds.map((speed) => {
          const isActive = timeSpeed === speed && !isPaused;
          return (
            <button
              key={speed}
              onClick={() => {
                if (isPaused) onTogglePause();
                onSpeedChange(speed);
              }}
              className={`px-3 py-2 md:px-2.5 md:py-1.5 rounded-lg text-sm md:text-xs font-mono font-bold transition-all flex-1 md:flex-none text-center ${
                isActive
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {speed}x
            </button>
          );
        })}
      </div>

      {/* Botón de reset al tiempo real actual */}
      <button
        onClick={onResetTime}
        title="Restablecer a fecha actual"
        className="absolute md:relative right-4 top-4 md:right-auto md:top-auto p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        aria-label="Restablecer tiempo a fecha actual"
      >
        <RotateCcw className="w-4 h-4 md:w-3.5 md:h-3.5" />
      </button>
    </div>
  );
};
