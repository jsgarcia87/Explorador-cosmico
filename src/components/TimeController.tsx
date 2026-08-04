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
    <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/15 shadow-2xl">
      {/* Botón de pausa / reproducción */}
      <button
        onClick={onTogglePause}
        className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all"
        aria-label={isPaused ? 'Reanudar tiempo astronómico' : 'Pausar tiempo astronómico'}
      >
        {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
      </button>

      {/* Fecha y hora actual del observatorio */}
      <div className="flex flex-col px-2 border-r border-white/10">
        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 flex items-center space-x-1">
          <Clock className="w-3 h-3 inline mr-1" />
          <span>RELOJ ORBITAL</span>
        </span>
        <div className="text-xs font-mono font-bold text-white flex items-center space-x-2">
          <span>{formattedDate}</span>
          <span className="text-slate-400">•</span>
          <span className="text-cyan-300">{formattedTime}</span>
        </div>
      </div>

      {/* Selectores de velocidad */}
      <div className="flex items-center space-x-1">
        <FastForward className="w-3.5 h-3.5 text-slate-400 mr-1" />
        {speeds.map((speed) => {
          const isActive = timeSpeed === speed && !isPaused;
          return (
            <button
              key={speed}
              onClick={() => {
                if (isPaused) onTogglePause();
                onSpeedChange(speed);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
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
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        aria-label="Restablecer tiempo a fecha actual"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
