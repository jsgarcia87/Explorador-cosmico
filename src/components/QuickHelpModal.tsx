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
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-950/95 border border-cyan-500/30 shadow-2xl text-slate-200">
        {/* Cabecera NASA Mission Control */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-950/40 to-blue-950/40">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-outfit font-bold text-white tracking-wide">
                GUÍA RÁPIDA DE MISIÓN — OBSERVATORIO NASA / ESA
              </h2>
              <p className="text-xs font-mono text-cyan-300">
                MANUAL DEL ASTRÓNOMO Y CONTROLES MÓVILES / PC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar guía rápida"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido en cuadrícula inmersiva */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Sección 1: Controles Táctiles y de Ratón */}
          <div className="space-y-3">
            <h3 className="text-sm font-outfit font-semibold uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
              <Touchpad className="w-4 h-4" />
              <span>Controles de Navegación Espacial (Móvil & PC)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
                <div className="p-2 rounded bg-cyan-500/10 text-cyan-300 font-mono text-sm">👆 / 🖱️</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Órbita 3D y Rotación</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Arrastra con un dedo (o clic izquierdo) para rotar la cámara libremente alrededor del objetivo.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
                <div className="p-2 rounded bg-cyan-500/10 text-cyan-300 font-mono text-sm">✌️ / ⚙️</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Zoom Óptico Continuo</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pellizca con dos dedos (o usa la rueda del ratón) para un acercamiento astronómico milimétrico.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
                <div className="p-2 rounded bg-cyan-500/10 text-cyan-300 font-mono text-sm">🎯 / 🪐</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Telemetría y Selección</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pulsa sobre cualquier planeta, estrella o agujero negro para desplegar su ficha científica en vivo.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
                <div className="p-2 rounded bg-cyan-500/10 text-cyan-300 font-mono text-sm">⏳ / 🌌</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Control del Reloj Orbital</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Acelera o pausa el tiempo kepleriano en la consola inferior para ver órbitas y eclipses en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Atajos de Teclado */}
          <div className="space-y-3">
            <h3 className="text-sm font-outfit font-semibold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span>Atajos de Teclado (Consola Avanzada)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-white/10 rounded text-amber-300">1 - 4</kbd>
                <p className="text-[11px] text-slate-400 mt-1">Cambiar de Escena</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-white/10 rounded text-amber-300">Espacio</kbd>
                <p className="text-[11px] text-slate-400 mt-1">Pausar / Reanudar</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-white/10 rounded text-amber-300">M</kbd>
                <p className="text-[11px] text-slate-400 mt-1">Silenciar Audio</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <kbd className="px-2 py-0.5 text-xs font-mono bg-white/10 rounded text-amber-300">Esc</kbd>
                <p className="text-[11px] text-slate-400 mt-1">Cerrar Telemetría</p>
              </div>
            </div>
          </div>

          {/* Sección 3: Nota Pedagógica NASA sobre Escalas */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-cyan-950/40 border border-cyan-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-300">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h4 className="text-xs font-outfit font-bold uppercase tracking-wider">
                Aviso Pedagógico — Rigor y Escalas (Estándar NASA/ESA)
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              En el Sistema Solar real, el vacío es tan colosal que a escala física 1:1 los planetas serían granos invisibles de polvo. Para facilitar la enseñanza, el observatorio utiliza una <strong className="text-cyan-300">Escala Visual Didáctica</strong> en la vista general, pero calcula y muestra las cifras en <strong className="text-cyan-300">Unidades Astronómicas (UA) y Kilómetros Reales</strong> en el panel de inspección.
            </p>
          </div>

          {/* Sección 4: Instalación PWA Offline */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Compatible con Aulas Sin Internet (PWA)</h4>
                <p className="text-xs text-slate-400">
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
        <div className="flex items-center justify-end px-6 py-4 border-t border-white/10 bg-black/40">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-outfit font-semibold text-xs tracking-wider transition-all shadow-lg shadow-cyan-500/25"
          >
            COMENZAR EXPLORACIÓN
          </button>
        </div>
      </div>
    </div>
  );
};
