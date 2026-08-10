import React from 'react';
import { X, Touchpad, MousePointer, HelpCircle, ShieldCheck, Download, Smartphone, Compass } from 'lucide-react';

interface QuickHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickHelpModal: React.FC<QuickHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[8px] bg-[rgba(3,3,5,0.95)] border border-[rgba(122,175,200,0.2)] shadow-2xl text-[#ede9e4]">
        {/* Cabecera NASA Mission Control */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(237,233,228,0.07)] bg-gradient-to-r from-[rgba(8,20,40,0.4)] to-[rgba(8,15,30,0.4)]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-[4px] bg-[rgba(122,175,200,0.2)] text-[#7aafc8] border border-[rgba(122,175,200,0.2)]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-outfit font-bold text-[#ede9e4] tracking-wide">
                GUÍA RÁPIDA DE MISIÓN — OBSERVATORIO NASA / ESA
              </h2>
              <p className="text-xs font-mono text-[#8ec5dc]">
                MANUAL DEL ASTRÓNOMO Y CONTROLES MÓVILES / PC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[4px] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.08)] transition-colors"
            aria-label="Cerrar guía rápida"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido en cuadrícula inmersiva */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Sección 1: Controles Táctiles y de Ratón */}
          <div className="space-y-3">
            <h3 className="text-sm font-outfit font-semibold uppercase tracking-wider text-[#7aafc8] flex items-center space-x-2">
              <Touchpad className="w-4 h-4" />
              <span>Controles de Navegación Espacial (Móvil & PC)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    Pulsa sobre cualquier planeta, estrella o agujero negro para desplegar su ficha científica en vivo.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-start space-x-3">
                <div className="p-2 rounded bg-[rgba(122,175,200,0.1)] text-[#8ec5dc] font-mono text-sm">⏳ / 🌌</div>
                <div>
                  <h4 className="text-xs font-bold text-[#ede9e4]">Control del Reloj Orbital</h4>
                  <p className="text-xs text-[rgba(237,233,228,0.5)] mt-0.5">
                    Acelera o pausa el tiempo kepleriano en la consola inferior para ver órbitas y eclipses en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Atajos de Teclado */}
          <div className="space-y-3">
            <h3 className="text-sm font-outfit font-semibold uppercase tracking-wider text-[#c8964a] flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span>Atajos de Teclado (Consola Avanzada)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)]">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-[rgba(237,233,228,0.08)] rounded text-[#d4a65a]">1 - 4</kbd>
                <p className="text-[11px] text-[rgba(237,233,228,0.5)] mt-1">Cambiar de Escena</p>
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
        <div className="flex items-center justify-end px-6 py-4 border-t border-[rgba(237,233,228,0.07)] bg-black/40">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[4px] bg-gradient-to-r from-[#7aafc8] to-[#5b8fb4] hover:from-[#8ec5dc] hover:to-[#7aafc8] text-[#ede9e4] font-outfit font-semibold text-xs tracking-wider transition-all shadow-lg shadow-[rgba(122,175,200,0.15)]"
          >
            COMENZAR EXPLORACIÓN
          </button>
        </div>
      </div>
    </div>
  );
};
