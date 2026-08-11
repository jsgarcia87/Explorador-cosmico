import React, { useState } from 'react';
import { X, Scale } from 'lucide-react';
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
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[rgba(237,233,228,0.7)] mb-1">
          <span>{label}</span>
          <span className="text-[rgba(237,233,228,0.4)]">{unit}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 text-right text-sm font-medium text-[#c8964a]">
            {typeof val1 === 'number' ? formatNumber(val1) : val1}
          </div>
          <div className="w-1/3 flex space-x-1 items-center justify-center">
            <div className="flex-1 flex justify-end">
              <div className="h-1.5 bg-[#c8964a] rounded-l-full transition-all" style={{ width: `${Math.max(bar1, 2)}%` }}></div>
            </div>
            <div className="w-px h-3 bg-[rgba(237,233,228,0.2)]"></div>
            <div className="flex-1 flex justify-start">
              <div className="h-1.5 bg-[#7aafc8] rounded-r-full transition-all" style={{ width: `${Math.max(bar2, 2)}%` }}></div>
            </div>
          </div>
          <div className="flex-1 text-left text-sm font-medium text-[#7aafc8]">
            {typeof val2 === 'number' ? formatNumber(val2) : val2}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[rgba(10,12,16,0.95)] border border-[rgba(237,233,228,0.1)] rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-[rgba(237,233,228,0.05)] bg-[rgba(237,233,228,0.02)]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(237,233,228,0.05)] flex items-center justify-center border border-[rgba(237,233,228,0.1)]">
              <Scale className="w-5 h-5 text-[#ede9e4]" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-[#ede9e4]">Comparador Planetario</h2>
              <p className="text-xs text-[rgba(237,233,228,0.5)]">Analiza métricas a escala real</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[rgba(237,233,228,0.1)] transition-colors text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-8">
            {/* Selector 1 */}
            <div className="flex-1">
              <select
                value={planet1Id}
                onChange={(e) => setPlanet1Id(e.target.value)}
                className="w-full bg-[rgba(200,150,74,0.1)] border border-[rgba(200,150,74,0.3)] text-[#c8964a] rounded-lg p-3 outline-none appearance-none"
              >
                {PLANETS.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
              </select>
            </div>
            {/* VS */}
            <div className="hidden md:flex items-center justify-center text-[rgba(237,233,228,0.3)] font-display font-bold text-xl">VS</div>
            {/* Selector 2 */}
            <div className="flex-1">
              <select
                value={planet2Id}
                onChange={(e) => setPlanet2Id(e.target.value)}
                className="w-full bg-[rgba(122,175,200,0.1)] border border-[rgba(122,175,200,0.3)] text-[#7aafc8] rounded-lg p-3 outline-none appearance-none"
              >
                {PLANETS.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
              </select>
            </div>
          </div>

          {p1 && p2 && (
            <div className="space-y-2 bg-[rgba(237,233,228,0.02)] p-6 rounded-lg border border-[rgba(237,233,228,0.05)]">
              {renderComparisonRow('Radio Ecuatorial', p1.realRadiusKm, p2.realRadiusKm, 'km', p1.realRadiusKm, p2.realRadiusKm)}
              {renderComparisonRow('Gravedad Superficial', p1.gravityMs2, p2.gravityMs2, 'm/s²', p1.gravityMs2, p2.gravityMs2)}
              {renderComparisonRow('Temperatura Media', p1.tempCelsius, p2.tempCelsius, '°C', p1.tempCelsius + 273, p2.tempCelsius + 273)}
              {renderComparisonRow('Velocidad Orbital', p1.realOrbitalSpeedKmS, p2.realOrbitalSpeedKmS, 'km/s', p1.realOrbitalSpeedKmS, p2.realOrbitalSpeedKmS)}
              {renderComparisonRow('Período de Rotación (Día)', p1.rotationPeriodHours, p2.rotationPeriodHours, 'horas', p1.rotationPeriodHours, p2.rotationPeriodHours)}
              
              <div className="mb-4">
                <div className="flex justify-between text-xs text-[rgba(237,233,228,0.7)] mb-1">
                  <span>Masa</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 text-right text-sm font-medium text-[#c8964a]">{p1.massKg}</div>
                  <div className="w-1/3 flex justify-center text-[rgba(237,233,228,0.2)]">|</div>
                  <div className="flex-1 text-left text-sm font-medium text-[#7aafc8]">{p2.massKg}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
