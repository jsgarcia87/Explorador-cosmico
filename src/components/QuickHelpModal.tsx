import React from 'react';
import { X, Touchpad, MousePointer, HelpCircle, ShieldCheck, Download, Smartphone, Compass } from 'lucide-react';

interface QuickHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickHelpModal: React.FC<QuickHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 md:inset-y-0 md:right-auto md:left-0 z-40 md:w-[450px] md:max-w-[90vw] md:p-4 flex flex-col pointer-events-none" role="dialog" aria-modal="true" aria-labelledby="quick-help-title">
      <div className="flex-1 w-full rounded-none md:rounded-[8px] bg-[rgba(8,8,12,0.95)] border border-[rgba(237,233,228,0.10)] shadow-2xl backdrop-blur-xl pointer-events-auto flex flex-col overflow-hidden animate-in slide-in-from-left duration-300 text-[#ede9e4]">
        {/* Cabecera NASA Mission Control */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-[rgba(237,233,228,0.07)] bg-gradient-to-r from-[rgba(8,20,40,0.4)] to-[rgba(8,15,30,0.4)] flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-[4px] bg-[rgba(122,175,200,0.2)] text-[#7aafc8] border border-[rgba(122,175,200,0.2)]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 id="quick-help-title" className="text-lg font-outfit font-bold text-[#ede9e4] tracking-wide">
                GUÍA RÁPIDA DE MISIÓN
              </h2>
              <p className="text-xs font-mono text-[#8ec5dc]">
                MANUAL DEL ASTRÓNOMO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[4px] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.08)] transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
            aria-label="Cerrar guía rápida"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - scrollable area */}
        <div className="p-4 md:p-6 space-y-5 md:space-y-6 flex-1 overflow-y-auto min-h-0">
          {/* Sección 1: Controles Táctiles y de Ratón */}
          <div className="space-y-3">
            <h3 className="text-sm font-outfit font-semibold uppercase tracking-wider text-[#7aafc8] flex items-center space-x-2">
              <Touchpad className="w-4 h-4" />
              <span>Controles de Navegación</span>
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-start space-x-3">
                <div className="p-2 rounded bg-[rgba(122,175,200,0.1)] text-[#8ec5dc] font-mono text-sm">👆 / 🖱️</div>
                <div>
                  <h4 className="text-xs font-bold text-[#ede9e4]">Órbita 3D y Rotación</h4>
                  <p className="text-xs text-[rgba(237,233,228,0.5)] mt-0.5">
                    Arrastra con un dedo (o clic izquierdo) para rotar la cámara libremente alrededor del objetivo.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-start space-x-3">
                <div className="p-2 rounded bg-[rgba(122,175,200,0.1)] text-[#8ec5dc] font-mono text-sm">✌️ / ⚙️</div>
                <div>
                  <h4 className="text-xs font-bold text-[#ede9e4]">Zoom Óptico Continuo</h4>
                  <p className="text-xs text-[rgba(237,233,228,0.5)] mt-0.5">
                    Pellizca con dos dedos (o usa la rueda del ratón) para un acercamiento astronómico milimétrico.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-start space-x-3">
                <div className="p-2 rounded bg-[rgba(122,175,200,0.1)] text-[#8ec5dc] font-mono text-sm">🎯 / 🪐</div>
                <div>
                  <h4 className="text-xs font-bold text-[#ede9e4]">Telemetría y Selección</h4>
                  <p className="text-xs text-[rgba(237,233,228,0.5)] mt-0.5">
                    Pulsa sobre cualquier planeta para desplegar su ficha científica en vivo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard shortcuts — hidden on touch/mobile */}
          <div className="hidden md:block space-y-3">
            <h3 className="text-sm font-outfit font-semibold uppercase tracking-wider text-[#c8964a] flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span>Atajos de Teclado</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)]">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-[rgba(237,233,228,0.08)] rounded text-[#d4a65a]">1 - 4</kbd>
                <p className="text-[11px] text-[rgba(237,233,228,0.5)] mt-1">Escenas</p>
              </div>
              <div className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)]">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-[rgba(237,233,228,0.08)] rounded text-[#d4a65a]">Espacio</kbd>
                <p className="text-[11px] text-[rgba(237,233,228,0.5)] mt-1">Pausar / Reanudar</p>
              </div>
              <div className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)]">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-[rgba(237,233,228,0.08)] rounded text-[#d4a65a]">M</kbd>
                <p className="text-[11px] text-[rgba(237,233,228,0.5)] mt-1">Silenciar Audio</p>
              </div>
              <div className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)]">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-[rgba(237,233,228,0.08)] rounded text-[#d4a65a]">Esc</kbd>
                <p className="text-[11px] text-[rgba(237,233,228,0.5)] mt-1">Cerrar Telemetría</p>
              </div>
            </div>
          </div>

          {/* Sección 3: Nota Pedagógica NASA sobre Escalas */}
          <div className="p-4 rounded-[6px] bg-gradient-to-r from-[rgba(8,20,40,0.4)] to-[rgba(8,30,40,0.4)] border border-[rgba(122,175,200,0.2)] space-y-2">
            <div className="flex items-center space-x-2 text-[#8ec5dc]">
              <ShieldCheck className="w-5 h-5 text-[#7aafc8]" />
              <h4 className="text-xs font-outfit font-bold uppercase tracking-wider">
                Aviso Pedagógico — Rigor y Escalas (Estándar NASA/ESA)
              </h4>
            </div>
            <p className="text-xs text-[rgba(237,233,228,0.6)] leading-relaxed">
              En el Sistema Solar real, el vacío es tan colosal que a escala física 1:1 los planetas serían granos invisibles de polvo. Para facilitar la enseñanza, el observatorio utiliza una <strong className="text-[#8ec5dc]">Escala Visual Didáctica</strong> en la vista general, pero calcula y muestra las cifras en <strong className="text-[#8ec5dc]">Unidades Astronómicas (UA) y Kilómetros Reales</strong> en el panel de inspección.
            </p>
          </div>

          {/* Sección 4: Instalación PWA Offline */}
          <div className="p-4 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-[#ede9e4]">Compatible con Aulas Sin Internet (PWA)</h4>
                <p className="text-xs text-[rgba(237,233,228,0.5)]">
                  Instala el observatorio como aplicación nativa en el menú "Añadir a pantalla de inicio" del móvil o tablet.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono">
              OFFLINE READY
            </span>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="flex items-center justify-end px-4 md:px-6 py-3 md:py-4 border-t border-[rgba(237,233,228,0.07)] bg-black/40 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-5 py-3 md:py-2 rounded-[4px] bg-gradient-to-r from-[#7aafc8] to-[#5b8fb4] hover:from-[#8ec5dc] hover:to-[#7aafc8] text-[#ede9e4] font-outfit font-semibold text-xs tracking-wider transition-all shadow-lg shadow-[rgba(122,175,200,0.15)] min-h-[44px] md:min-h-0"
          >
            COMENZAR EXPLORACIÓN
          </button>
        </div>
      </div>
    </div>
  );
};
