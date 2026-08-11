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
    <div className="fixed inset-0 md:inset-y-0 md:right-auto md:left-0 z-40 md:w-[450px] md:max-w-[90vw] md:p-4 flex flex-col pointer-events-none" role="dialog" aria-modal="true" aria-labelledby="a11y-title">
      <div className="flex-1 w-full p-4 md:p-6 rounded-none md:rounded-[8px] bg-[rgba(8,8,12,0.95)] border border-[rgba(237,233,228,0.10)] shadow-2xl backdrop-blur-xl pointer-events-auto flex flex-col overflow-hidden animate-in slide-in-from-left duration-300 overflow-y-auto">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(237,233,228,0.07)]">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-[#7aafc8]" />
            <div>
              <h2 id="a11y-title" className="text-lg font-outfit font-bold text-[#ede9e4]">
                Centro de Accesibilidad Universal
              </h2>
              <span className="text-xs font-mono text-[rgba(237,233,228,0.5)]">
                Diseño para todos • Estándares WCAG 2.1 AA
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
            aria-label="Cerrar ventana de accesibilidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de opciones de accesibilidad */}
        <div className="space-y-4">
          {/* 1. Alto Contraste */}
          <div className="flex items-center justify-between p-3.5 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)]">
            <div>
              <span className="text-sm font-outfit font-bold text-[#ede9e4] block">Alto Contraste Visual</span>
              <span className="text-xs text-[rgba(237,233,228,0.5)]">Aumenta el resplandor de los textos e íconos sobre el fondo estelar.</span>
            </div>
            <button
              onClick={() => handleToggle('highContrast', !settings.highContrast)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.highContrast ? 'bg-[#7aafc8]' : 'bg-white/20'
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
          <div className="p-3.5 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] space-y-2">
            <span className="text-sm font-outfit font-bold text-[#ede9e4] block">Filtro de Color / Daltonismo</span>
            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              {(['none', 'protanopia', 'deuteranopia', 'tritanopia'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleToggle('colorBlindMode', mode)}
                  className={`py-2.5 px-3 rounded-[4px] text-xs font-medium capitalize transition-all min-h-[44px] md:min-h-0 ${
                    settings.colorBlindMode === mode
                      ? 'bg-[#7aafc8] text-black font-bold shadow-md'
                      : 'bg-black/40 text-[rgba(237,233,228,0.6)] hover:bg-[rgba(237,233,228,0.08)] hover:text-[#ede9e4] border border-[rgba(237,233,228,0.07)]'
                  }`}
                >
                  {mode === 'none' ? 'Sin filtro' : mode}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Tamaño de Texto */}
          <div className="p-3.5 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] space-y-2">
            <span className="text-sm font-outfit font-bold text-[#ede9e4] flex items-center space-x-1">
              <Type className="w-4 h-4 text-[#7aafc8]" />
              <span>Tamaño de Letras y Fichas</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => handleToggle('fontSize', size)}
                  className={`py-2.5 rounded-[4px] text-xs font-medium capitalize transition-all min-h-[44px] md:min-h-0 ${
                    settings.fontSize === size
                      ? 'bg-[#7aafc8] text-black font-bold shadow-md'
                      : 'bg-black/40 text-[rgba(237,233,228,0.6)] hover:bg-[rgba(237,233,228,0.08)] border border-[rgba(237,233,228,0.07)]'
                  }`}
                >
                  {size === 'xlarge' ? 'Extra Grande' : size}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Reducción de movimiento */}
          <div className="flex items-center justify-between p-3.5 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)]">
            <div>
              <span className="text-sm font-outfit font-bold text-[#ede9e4] block">Reducir Movimiento / Cinematismo</span>
              <span className="text-xs text-[rgba(237,233,228,0.5)]">Reduce transiciones orbitales rápidas si eres sensible al movimiento.</span>
            </div>
            <button
              onClick={() => handleToggle('reduceMotion', !settings.reduceMotion)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.reduceMotion ? 'bg-[#7aafc8]' : 'bg-white/20'
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
        <div className="pt-4 border-t border-[rgba(237,233,228,0.07)] flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[rgba(237,233,228,0.5)]">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Accesible por teclado y lectores de pantalla.</span>
          </span>
          <button
            onClick={onClose}
            className="w-full md:w-auto px-5 py-3 md:py-2 rounded-[4px] bg-[#7aafc8] hover:bg-[#8ec5dc] text-black font-outfit font-bold transition-colors min-h-[44px] md:min-h-0"
          >
            Aplicar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
