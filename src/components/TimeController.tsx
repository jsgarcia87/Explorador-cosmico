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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-auto md:left-6 md:translate-x-0 md:bottom-6 z-40 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start space-x-2 md:space-x-3 gap-y-2 p-3 rounded-[6px] bg-[rgba(8,8,12,0.85)] backdrop-blur-xl border border-[rgba(237,233,228,0.07)] shadow-2xl">
      <button
        onClick={onTogglePause}
        className="p-3 md:p-2.5 rounded-[4px] bg-[rgba(122,175,200,0.2)] hover:bg-[rgba(122,175,200,0.3)] text-[#7aafc8] border border-[rgba(122,175,200,0.3)] transition-all flex-shrink-0"
        aria-label={isPaused ? 'Reanudar tiempo astronómico' : 'Pausar tiempo astronómico'}
      >
        {isPaused ? <Play className="w-5 h-5 md:w-4 md:h-4 fill-current" /> : <Pause className="w-5 h-5 md:w-4 md:h-4 fill-current" />}
      </button>

      <div className="flex flex-col px-3 border-x md:border-l-0 border-[rgba(237,233,228,0.07)] flex-shrink-0">
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[rgba(237,233,228,0.4)] flex items-center space-x-1">
          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 inline mr-1" />
          <span>RELOJ ORBITAL</span>
        </span>
        <div className="text-xs md:text-sm font-mono font-bold text-[#ede9e4] flex items-center space-x-2">
          <span>{formattedDate}</span>
          <span className="text-[rgba(237,233,228,0.2)]">·</span>
          <span className="text-[#c8964a]">{formattedTime}</span>
        </div>
      </div>

      <div className="flex items-center space-x-1.5 md:space-x-1 w-full md:w-auto justify-center md:justify-start mt-1 md:mt-0">
        <FastForward className="w-4 h-4 md:w-3.5 md:h-3.5 text-[rgba(237,233,228,0.3)] mr-1" />
        {speeds.map((speed) => {
          const isActive = timeSpeed === speed && !isPaused;
          return (
            <button
              key={speed}
              onClick={() => {
                if (isPaused) onTogglePause();
                onSpeedChange(speed);
              }}
              className={`px-3 py-2 md:px-2.5 md:py-1.5 rounded-[4px] text-sm md:text-xs font-mono font-bold transition-all flex-1 md:flex-none text-center ${
                isActive
                  ? 'bg-[rgba(122,175,200,0.25)] text-[#7aafc8] border border-[rgba(122,175,200,0.3)]'
                  : 'bg-[rgba(237,233,228,0.04)] text-[rgba(237,233,228,0.4)] hover:bg-[rgba(237,233,228,0.08)] hover:text-[#ede9e4] border border-transparent'
              }`}
            >
              {speed}x
            </button>
          );
        })}
      </div>

      <button
        onClick={onResetTime}
        title="Restablecer a fecha actual"
        className="absolute md:relative right-4 top-4 md:right-auto md:top-auto p-2.5 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.3)] hover:text-[#ede9e4] transition-colors"
        aria-label="Restablecer tiempo a fecha actual"
      >
        <RotateCcw className="w-4 h-4 md:w-3.5 md:h-3.5" />
      </button>
    </div>
  );
};
