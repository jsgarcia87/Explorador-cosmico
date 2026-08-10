import React from 'react';
import { TelescopeSpectrum } from '../engine/NightSkyScene';
import { Telescope, Radio, Flame, Sparkles, Eye, MapPin } from 'lucide-react';

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
  const spectrumOptions: { id: TelescopeSpectrum; name: string; icon: React.ReactNode; color: string }[] = [
    { id: 'visible', name: 'Óptico Visible', icon: <Eye className="w-3.5 h-3.5" />, color: 'text-[#ede9e4]' },
    { id: 'infrared', name: 'Infrarrojo (James Webb / IR)', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-orange-400' },
    { id: 'ultraviolet', name: 'Ultravioleta (Hubble / UV)', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'text-[#9878b8]' },
    { id: 'xray', name: 'Rayos X (Chandra / X-Ray)', icon: <Telescope className="w-3.5 h-3.5" />, color: 'text-[#7aafc8]' },
    { id: 'radio', name: 'Radioastronomía (ALMA / VLA)', icon: <Radio className="w-3.5 h-3.5" />, color: 'text-emerald-400' }
  ];

  return (
    <div className="fixed top-16 left-6 z-40 flex flex-col space-y-3 animate-fade-in">
      {/* Indicador GPS y Bóveda del Observatorio */}
      <div className="flex items-center space-x-3 px-3.5 py-2 rounded-[6px] bg-[rgba(3,3,5,1)]/70 backdrop-blur-xl border border-[rgba(237,233,228,0.10)] shadow-xl text-xs font-mono text-[rgba(237,233,228,0.6)]">
        <MapPin className="w-3.5 h-3.5 text-[#7aafc8]" />
        <span>OBSERVATORIO TERRESTRE • <strong>{latLong.lat}</strong> / <strong>{latLong.long}</strong></span>
      </div>

      {/* Barra de selectores de instrumentos multiespectrales */}
      <div className="p-2 rounded-[8px] bg-[rgba(3,3,5,1)]/70 backdrop-blur-xl border border-[rgba(237,233,228,0.10)] shadow-2xl space-y-1">
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
