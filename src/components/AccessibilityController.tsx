import React from 'react';
import { X, Eye, Volume2, Type, Sparkles, ShieldCheck } from 'lucide-react';

export interface AccessibilitySettings {
  highContrast: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  fontSize: 'normal' | 'large' | 'xlarge';
  reduceMotion: boolean;
  autoSpeech: boolean;
}

interface AccessibilityControllerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: AccessibilitySettings) => void;
}

export const AccessibilityController: React.FC<AccessibilityControllerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  const handleToggle = (key: keyof AccessibilitySettings, val: unknown) => {
    onUpdateSettings({
      ...settings,
      [key]: val
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="a11y-title">
      <div className="w-full max-w-xl p-6 rounded-2xl bg-slate-900/95 border border-white/15 shadow-2xl space-y-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 id="a11y-title" className="text-lg font-outfit font-bold text-white">
                Centro de Accesibilidad Universal
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Diseño para todos • Estándares WCAG 2.1 AA
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar ventana de accesibilidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de opciones de accesibilidad */}
        <div className="space-y-4">
          {/* 1. Alto Contraste */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div>
              <span className="text-sm font-outfit font-bold text-white block">Alto Contraste Visual</span>
              <span className="text-xs text-slate-400">Aumenta el resplandor de los textos e íconos sobre el fondo estelar.</span>
            </div>
            <button
              onClick={() => handleToggle('highContrast', !settings.highContrast)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.highContrast ? 'bg-cyan-500' : 'bg-white/20'
              }`}
              aria-label="Alternar alto contraste"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  settings.highContrast ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* 2. Filtros para Daltonismo */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-sm font-outfit font-bold text-white block">Filtro de Color / Daltonismo</span>
            <div className="grid grid-cols-2 gap-2">
              {(['none', 'protanopia', 'deuteranopia', 'tritanopia'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleToggle('colorBlindMode', mode)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium capitalize transition-all ${
                    settings.colorBlindMode === mode
                      ? 'bg-cyan-500 text-black font-bold shadow-md'
                      : 'bg-black/40 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {mode === 'none' ? 'Sin filtro' : mode}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Tamaño de Texto */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-sm font-outfit font-bold text-white flex items-center space-x-1">
              <Type className="w-4 h-4 text-cyan-400" />
              <span>Tamaño de Letras y Fichas</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => handleToggle('fontSize', size)}
                  className={`py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                    settings.fontSize === size
                      ? 'bg-cyan-500 text-black font-bold shadow-md'
                      : 'bg-black/40 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {size === 'xlarge' ? 'Extra Grande' : size}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Reducción de movimiento */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div>
              <span className="text-sm font-outfit font-bold text-white block">Reducir Movimiento / Cinematismo</span>
              <span className="text-xs text-slate-400">Reduce transiciones orbitales rápidas si eres sensible al movimiento.</span>
            </div>
            <button
              onClick={() => handleToggle('reduceMotion', !settings.reduceMotion)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.reduceMotion ? 'bg-cyan-500' : 'bg-white/20'
              }`}
              aria-label="Alternar reducción de movimiento"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  settings.reduceMotion ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Pie */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Accesible por teclado y lectores de pantalla.</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-outfit font-bold transition-colors"
          >
            Aplicar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
