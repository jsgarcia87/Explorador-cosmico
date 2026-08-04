import React from 'react';
import { X, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface GrrtModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrrtModal: React.FC<GrrtModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="grrt-title">
      <div className="w-full max-w-6xl h-[88vh] flex flex-col rounded-2xl bg-slate-950 border border-white/20 shadow-2xl overflow-hidden">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
            <div>
              <h2 id="grrt-title" className="text-lg font-outfit font-bold text-white flex items-center space-x-2">
                <span>Simulador de Raytracing General Relativista (GRRT)</span>
                <span className="text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Gargantua • M87*
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Solución de geodésicas de Kerr / Schwarzschild para el horizonte de sucesos y disco de acreción.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="./simulador-grrt/index.html"
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir en pestaña independiente"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors border border-white/10"
            >
              <span>Ventana Completa</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar simulador GRRT"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Visor Iframe del simulador GRRT embebido */}
        <div className="flex-1 w-full h-full relative bg-black">
          <iframe
            src="./simulador-grrt/index.html"
            title="Simulador de Agujero Negro GRRT"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope"
          />
        </div>

        {/* Pie de página explicativo */}
        <div className="p-3 border-t border-white/10 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Motor original GRRT implementado y conectado con telemetría de Relatividad General de Einstein.</span>
          </span>
          <span className="font-mono text-orange-400">
            METRICA: ds² = -(1 - 2Mr/ρ²)dt² - (4Mar sin²θ/ρ²)dtdφ + ...
          </span>
        </div>
      </div>
    </div>
  );
};
