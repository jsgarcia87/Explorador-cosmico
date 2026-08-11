import React, { useState } from 'react';
import { TelescopeSpectrum } from '../engine/NightSkyScene';
import { Telescope, Radio, Flame, Sparkles, Eye, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface ObservatoryHUDProps {
  currentSpectrum: TelescopeSpectrum;
  onSpectrumChange: (spectrum: TelescopeSpectrum) => void;
  latLong?: { lat: string; long: string };
}

export const ObservatoryHUD: React.FC<ObservatoryHUDProps> = ({
  currentSpectrum,
  onSpectrumChange,
  latLong = { lat: '40° 25\' 08" N', long: '3° 42\' 12" O' }
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const spectrumOptions: { id: TelescopeSpectrum; name: string; shortName: string; icon: React.ReactNode; color: string }[] = [
    { id: 'visible', name: 'Óptico Visible', shortName: 'Óptico', icon: <Eye className="w-3.5 h-3.5" />, color: 'text-[#ede9e4]' },
    { id: 'infrared', name: 'Infrarrojo (James Webb / IR)', shortName: 'IR', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-orange-400' },
    { id: 'ultraviolet', name: 'Ultravioleta (Hubble / UV)', shortName: 'UV', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'text-[#9878b8]' },
    { id: 'xray', name: 'Rayos X (Chandra / X-Ray)', shortName: 'X-Ray', icon: <Telescope className="w-3.5 h-3.5" />, color: 'text-[#7aafc8]' },
    { id: 'radio', name: 'Radioastronomía (ALMA / VLA)', shortName: 'Radio', icon: <Radio className="w-3.5 h-3.5" />, color: 'text-emerald-400' }
  ];

  const currentOpt = spectrumOptions.find(o => o.id === currentSpectrum) || spectrumOptions[0];

  return (
    <div className="fixed top-14 md:top-16 left-2 md:left-6 z-40 flex flex-col space-y-2 md:space-y-3 animate-fade-in">
      {/* GPS indicator */}
      <div className="flex items-center space-x-2 md:space-x-3 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-[6px] bg-[rgba(3,3,5,1)]/70 backdrop-blur-xl border border-[rgba(237,233,228,0.10)] shadow-xl text-[10px] md:text-xs font-mono text-[rgba(237,233,228,0.6)]">
        <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#7aafc8] flex-shrink-0" />
        <span className="truncate">
          <span className="hidden md:inline">OBSERVATORIO TERRESTRE • </span>
          <strong>{latLong.lat}</strong> / <strong>{latLong.long}</strong>
        </span>
      </div>

      {/* Mobile: collapsed spectrum selector */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-2.5 py-2 rounded-[6px] bg-[rgba(3,3,5,1)]/70 backdrop-blur-xl border border-[rgba(237,233,228,0.10)] shadow-xl min-h-[44px]"
        >
          <div className="flex items-center space-x-2">
            <span className={currentOpt.color}>{currentOpt.icon}</span>
            <span className="text-[11px] font-medium text-[#ede9e4]">{currentOpt.shortName}</span>
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-[rgba(237,233,228,0.5)]" /> : <ChevronDown className="w-4 h-4 text-[rgba(237,233,228,0.5)]" />}
        </button>

        {isExpanded && (
          <div className="mt-1 p-1.5 rounded-[6px] bg-[rgba(3,3,5,1)]/70 backdrop-blur-xl border border-[rgba(237,233,228,0.10)] shadow-xl space-y-0.5">
            {spectrumOptions.map((opt) => {
              const isSelected = currentSpectrum === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => { onSpectrumChange(opt.id); setIsExpanded(false); }}
                  className={`w-full flex items-center space-x-2 px-2.5 py-2 rounded-[4px] text-[11px] font-medium transition-all min-h-[44px] ${
                    isSelected
                      ? 'bg-[rgba(122,175,200,0.2)] border border-[rgba(122,175,200,0.3)] text-[#ede9e4]'
                      : 'text-[rgba(237,233,228,0.6)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.04)] border border-transparent'
                  }`}
                >
                  <span className={opt.color}>{opt.icon}</span>
                  <span>{opt.shortName}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop: full spectrum panel */}
      <div className="hidden md:block p-2 rounded-[8px] bg-[rgba(3,3,5,1)]/70 backdrop-blur-xl border border-[rgba(237,233,228,0.10)] shadow-2xl space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(237,233,228,0.5)] px-2 block mb-1">
          INSTRUMENTO / ESPECTRO
        </span>
        <div className="flex flex-col space-y-1">
          {spectrumOptions.map((opt) => {
            const isSelected = currentSpectrum === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSpectrumChange(opt.id)}
                className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-[6px] text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[rgba(122,175,200,0.2)] border border-[rgba(122,175,200,0.3)] text-[#ede9e4] shadow-md shadow-[rgba(122,175,200,0.15)]'
                    : 'text-[rgba(237,233,228,0.6)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.04)] border border-transparent'
                }`}
              >
                <span className={opt.color}>{opt.icon}</span>
                <span>{opt.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
