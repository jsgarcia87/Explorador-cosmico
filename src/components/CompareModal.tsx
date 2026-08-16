import React, { useState } from 'react';
import { X, Scale, Target } from 'lucide-react';
import { PLANETS, PlanetData } from '../data/planets';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanetId?: string;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, initialPlanetId }) => {
  if (!isOpen) return null;

  const [planet1Id, setPlanet1Id] = useState(initialPlanetId || PLANETS[0].id);
  const [planet2Id, setPlanet2Id] = useState(initialPlanetId === 'tierra' ? 'marte' : 'tierra');

  const p1 = PLANETS.find(p => p.id === planet1Id) as PlanetData;
  const p2 = PLANETS.find(p => p.id === planet2Id) as PlanetData;

  const formatNumber = (num: number) => new Intl.NumberFormat('es-ES').format(num);

  const renderComparisonRow = (label: string, val1: string | number, val2: string | number, unit: string, num1?: number, num2?: number) => {
    let bar1 = 50;
    let bar2 = 50;
    if (num1 !== undefined && num2 !== undefined) {
      const max = Math.max(Math.abs(num1), Math.abs(num2));
      if (max > 0) {
        bar1 = (Math.abs(num1) / max) * 100;
        bar2 = (Math.abs(num2) / max) * 100;
      }
    }

    return (
      <div className="mb-4 group">
        <div className="flex justify-between text-[9px] uppercase tracking-widest text-telemetry-dim mb-1 group-hover:text-primary transition-colors">
          <span>{label}</span>
          <span>{unit}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 text-right text-xs font-data font-bold text-accent">
            {typeof val1 === 'number' ? formatNumber(val1) : val1}
          </div>
          <div className="w-1/4 md:w-1/3 flex space-x-1 items-center justify-center">
            <div className="flex-1 flex justify-end">
              <div className="h-[2px] bg-accent transition-all" style={{ width: `${Math.max(bar1, 2)}%` }}></div>
            </div>
            <div className="w-px h-4 bg-primary/30"></div>
            <div className="flex-1 flex justify-start">
              <div className="h-[2px] bg-primary transition-all" style={{ width: `${Math.max(bar2, 2)}%` }}></div>
            </div>
          </div>
          <div className="flex-1 text-left text-xs font-data font-bold text-primary">
            {typeof val2 === 'number' ? formatNumber(val2) : val2}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 pointer-events-none font-mono" role="dialog" aria-modal="true" aria-labelledby="compare-modal-title">
      <div className="absolute inset-0 bg-space-deep/90 backdrop-blur-md pointer-events-auto animate-fade-in" onClick={onClose} />
      <div className="relative w-full h-[85vh] md:h-auto md:max-w-4xl max-h-[90vh] flex flex-col rounded-t-[20px] md:rounded-[8px] glass-panel border-t-2 md:border-l-2 border-primary/50 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto animate-in slide-in-from-bottom md:fade-in duration-300">
        
        {/* Indicador de arrastre móvil */}
        <div className="w-12 h-1.5 bg-primary/30 rounded-full mx-auto mt-3 mb-1 md:hidden flex-shrink-0" />
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-primary/20 bg-primary/5">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 border border-primary/30 bg-primary/10 flex items-center justify-center text-primary">
              <Target className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white tracking-widest uppercase">COMPARATIVA PLANETARIA</h2>
              <p className="text-[10px] tracking-widest text-telemetry-dim uppercase">SYS_ANÁLISIS_TELEMETRÍA</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 border border-telemetry-dim bg-space-dark hover:bg-white/10 hover:border-white text-telemetry-muted hover:text-white transition-all min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-8">
            {/* Selector 1 */}
            <div className="flex-1">
              <div className="text-[9px] text-accent tracking-widest uppercase mb-1">OBJETIVO_ALPHA</div>
              <select
                value={planet1Id}
                onChange={(e) => setPlanet1Id(e.target.value)}
                className="w-full bg-accent/5 border border-accent/30 hover:border-accent text-accent p-3 outline-none appearance-none cursor-pointer uppercase tracking-widest text-xs font-bold transition-all min-h-[44px]"
              >
                {PLANETS.map(p => <option key={p.id} value={p.id} className="bg-space-deep text-accent">{p.name}</option>)}
              </select>
            </div>
            {/* VS */}
            <div className="hidden md:flex flex-col items-center justify-center">
               <div className="text-[10px] text-telemetry-dim tracking-widest uppercase">MATCH</div>
               <div className="h-4 w-px bg-primary/30 my-1"></div>
               <Scale className="w-4 h-4 text-primary/50" />
            </div>
            {/* Selector 2 */}
            <div className="flex-1">
              <div className="text-[9px] text-primary tracking-widest uppercase mb-1 text-right">OBJETIVO_BETA</div>
              <select
                value={planet2Id}
                onChange={(e) => setPlanet2Id(e.target.value)}
                className="w-full bg-primary/5 border border-primary/30 hover:border-primary text-primary p-3 outline-none appearance-none cursor-pointer uppercase tracking-widest text-xs font-bold transition-all text-right min-h-[44px]"
              >
                {PLANETS.map(p => <option key={p.id} value={p.id} className="bg-space-deep text-primary">{p.name}</option>)}
              </select>
            </div>
          </div>

          {p1 && p2 && (
            <div className="space-y-2 bg-space-dark/80 p-6 border border-primary/20">
              <div className="text-[10px] uppercase tracking-widest text-primary mb-4 border-b border-primary/20 pb-2">PARÁMETROS FÍSICOS</div>
              {renderComparisonRow('Radio Ecuatorial', p1.realRadiusKm, p2.realRadiusKm, 'km', p1.realRadiusKm, p2.realRadiusKm)}
              {renderComparisonRow('Gravedad Superficial', p1.gravityMs2, p2.gravityMs2, 'm/s²', p1.gravityMs2, p2.gravityMs2)}
              {renderComparisonRow('Temperatura Media', p1.tempCelsius, p2.tempCelsius, '°C', p1.tempCelsius + 273, p2.tempCelsius + 273)}
              {renderComparisonRow('Velocidad Orbital', p1.realOrbitalSpeedKmS, p2.realOrbitalSpeedKmS, 'km/s', p1.realOrbitalSpeedKmS, p2.realOrbitalSpeedKmS)}
              {renderComparisonRow('Período de Rotación (Día)', p1.rotationPeriodHours, p2.rotationPeriodHours, 'horas', p1.rotationPeriodHours, p2.rotationPeriodHours)}
              
              <div className="mb-4">
                <div className="flex justify-between text-[9px] uppercase tracking-widest text-telemetry-dim mb-1">
                  <span>Masa</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 text-right text-xs font-data font-bold text-accent">{p1.massKg}</div>
                  <div className="w-1/3 flex justify-center text-primary/30">|</div>
                  <div className="flex-1 text-left text-xs font-data font-bold text-primary">{p2.massKg}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
