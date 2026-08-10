import React, { useState } from 'react';
import { CONSTELLATIONS_IAU } from '../data/constellations';
import { Star } from 'lucide-react';

interface ConstellationLegendProps {
  onToggleConstellation: (id: string, visible: boolean) => void;
  onHideAll: () => void;
}

export const ConstellationLegend: React.FC<ConstellationLegendProps> = ({
  onToggleConstellation,
  onHideAll
}) => {
  const [activeConstellations, setActiveConstellations] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    const next = new Set(activeConstellations);
    if (next.has(id)) {
      next.delete(id);
      onToggleConstellation(id, false);
    } else {
      next.add(id);
      onToggleConstellation(id, true);
    }
    setActiveConstellations(next);
  };

  const handleClear = () => {
    setActiveConstellations(new Set());
    onHideAll();
  };

  return (
    <div className="absolute top-24 right-6 w-72 bg-black/80 backdrop-blur-md border border-[rgba(237,233,228,0.07)] rounded-[6px] overflow-hidden shadow-2xl z-40 flex flex-col max-h-[60vh]">
      <div className="p-4 border-b border-[rgba(237,233,228,0.07)] flex justify-between items-center bg-[rgba(237,233,228,0.04)]">
        <h3 className="text-[#ede9e4] font-medium flex items-center gap-2">
          <Star className="w-4 h-4 text-blue-400" />
          Constelaciones
        </h3>
        {activeConstellations.size > 0 && (
          <button 
            onClick={handleClear}
            className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1 bg-red-400/10 rounded"
          >
            Limpiar
          </button>
        )}
      </div>
      
      <div className="overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="flex flex-col gap-1">
          {CONSTELLATIONS_IAU.map((c) => {
            const isActive = activeConstellations.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => handleToggle(c.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-[4px] text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500/20 text-blue-100 border border-blue-500/30' 
                    : 'text-gray-400 hover:bg-[rgba(237,233,228,0.04)] hover:text-gray-200 border border-transparent'
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs opacity-60 font-mono">{c.id.toUpperCase()}</span>
                </div>
                <div className={`w-3 h-3 rounded-full border ${isActive ? 'bg-blue-400 border-blue-400' : 'border-gray-500'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
