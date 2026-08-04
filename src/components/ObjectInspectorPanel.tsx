import React, { useState } from 'react';
import { PlanetData } from '../data/planets';
import { DeepSpaceObjectData } from '../data/deepSpace';
import { ConstellationData } from '../data/constellations';
import { ProfileId, USER_PROFILES } from '../data/profiles';
import { X, Volume2, Scale, Info, Atom, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { cosmicAudio } from '../engine/CosmicAudio';

export type SelectedObjectData =
  | { kind: 'planet'; data: PlanetData }
  | { kind: 'deep_space'; data: DeepSpaceObjectData }
  | { kind: 'constellation'; data: ConstellationData }
  | null;

interface ObjectInspectorPanelProps {
  selected: SelectedObjectData;
  onClose: () => void;
  activeProfile: ProfileId;
  onOpenGrrt?: () => void;
}

export const ObjectInspectorPanel: React.FC<ObjectInspectorPanelProps> = ({
  selected,
  onClose,
  activeProfile,
  onOpenGrrt
}) => {
  if (!selected) return null;

  const userProfile = USER_PROFILES[activeProfile];
  const [currentLevel, setCurrentLevel] = useState<'infantil' | 'jovenes' | 'adultos'>(
    userProfile.uiSettings.defaultEduLevel
  );

  // Obtener datos por tipo
  let name = '';
  let icon = '';
  let type = '';
  let eduSummary = '';
  let eduFacts: string[] = [];
  let eduExtra = '';
  let extraLabel = '';

  if (selected.kind === 'planet') {
    const d = selected.data;
    name = d.name;
    icon = d.icon;
    type = d.type;
    const edu = d.edu[currentLevel];
    eduSummary = edu.summary;
    eduFacts = edu.facts;
    if ('funFact' in edu) {
      eduExtra = edu.funFact;
      extraLabel = '🎈 ¿Sabías que?';
    } else if ('experiment' in edu) {
      eduExtra = edu.experiment;
      extraLabel = '🔬 Reto y Experimento';
    } else if ('physicsLaw' in edu) {
      eduExtra = edu.physicsLaw;
      extraLabel = '📐 Ley Física Gobernante';
    }
  } else if (selected.kind === 'deep_space') {
    const d = selected.data;
    name = d.name;
    icon = d.icon;
    type = d.type;
    const edu = d.edu[currentLevel];
    eduSummary = edu.summary;
    eduFacts = edu.facts;
    if ('funFact' in edu) {
      eduExtra = edu.funFact;
      extraLabel = '🎈 ¿Sabías que?';
    } else if ('experiment' in edu) {
      eduExtra = edu.experiment;
      extraLabel = '🔬 Reto del Observador';
    } else if ('physicsLaw' in edu) {
      eduExtra = edu.physicsLaw;
      extraLabel = '📐 Ecuación Cosmológica';
    }
  } else if (selected.kind === 'constellation') {
    const d = selected.data;
    name = d.name;
    icon = d.icon;
    type = `Constelación (${d.season}) • ${d.latinName}`;
    eduSummary = d.scientificNote;
    eduFacts = [
      `Mitología Griega: ${d.mythology.grecia}`,
      `Mitología Egipcia: ${d.mythology.egipto}`,
      `Astronomía Maya: ${d.mythology.maya}`
    ];
    eduExtra = `Tradición China: ${d.mythology.china}`;
    extraLabel = '📜 Mitología Multicultural';
  }

  const handleSpeak = () => {
    const speechText = `${name}. ${eduSummary}. ${eduFacts.join('. ')}`;
    cosmicAudio.speakNarration(speechText);
  };

  return (
    <aside
      className="fixed top-20 right-6 z-40 w-96 max-h-[82vh] flex flex-col rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden animate-slide-in"
      aria-label="Panel de inspección astronómica"
    >
      {/* Cabecera del panel */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/60">
        <div className="flex items-center space-x-3">
          <span className="text-2xl" role="img" aria-label={name}>
            {icon}
          </span>
          <div>
            <h3 className="font-outfit font-bold text-lg text-white leading-tight">
              {name}
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              {type}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleSpeak}
            title="Narrar con Voz Guía"
            className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-colors"
            aria-label="Escuchar narración"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              cosmicAudio.stopSpeech();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar panel de inspección"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pestañas adaptativas de nivel educativo */}
      <div className="flex border-b border-white/10 bg-black/40">
        <button
          onClick={() => setCurrentLevel('infantil')}
          className={`flex-1 py-2 text-xs font-outfit font-bold transition-all border-b-2 ${
            currentLevel === 'infantil'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          🎒 Infantil
        </button>
        <button
          onClick={() => setCurrentLevel('jovenes')}
          className={`flex-1 py-2 text-xs font-outfit font-bold transition-all border-b-2 ${
            currentLevel === 'jovenes'
              ? 'border-purple-400 text-purple-300 bg-purple-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          🚀 Jóvenes
        </button>
        <button
          onClick={() => setCurrentLevel('adultos')}
          className={`flex-1 py-2 text-xs font-outfit font-bold transition-all border-b-2 ${
            currentLevel === 'adultos'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          🔭 Astrofísica
        </button>
      </div>

      {/* Contenido desplazable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2">
        {/* Resumen principal */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {eduSummary}
          </p>
        </div>

        {/* Hechos científicos clave */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>DATOS DE LA MISIÓN</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {eduFacts.map((fact, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span className="leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección Extra (Reto / Sabías que / Ley física) */}
        {eduExtra && (
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
            <span className="text-xs font-outfit font-bold text-cyan-300 block mb-1">
              {extraLabel}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {eduExtra}
            </p>
          </div>
        )}

        {/* Ficha técnica astrofísica detallada (Para Planetas) */}
        {selected.kind === 'planet' && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Atom className="w-3.5 h-3.5 text-emerald-400" />
              <span>TELEMETRÍA NASA / JPL</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px]">RADIO</span>
                <strong className="text-slate-200">{selected.data.realRadiusKm.toLocaleString()} km</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px]">GRAVEDAD</span>
                <strong className="text-slate-200">{selected.data.gravityMs2} m/s²</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px]">TEMPERATURA</span>
                <strong className="text-slate-200">{selected.data.tempCelsius} °C</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px]">DISTANCIA SOL</span>
                <strong className="text-slate-200">{selected.data.realDistanceAU} AU</strong>
              </div>
            </div>

            {selected.data.atmosphere && selected.data.atmosphere.length > 0 && (
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-1 font-mono">ATMÓSFERA PRINCIPAL</span>
                <div className="flex flex-wrap gap-1">
                  {selected.data.atmosphere.map((gas, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                      {gas}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botón especial si es Gargantua para abrir Simulador GRRT */}
        {selected.kind === 'deep_space' && selected.data.isGrrtBlackHole && onOpenGrrt && (
          <button
            onClick={onOpenGrrt}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-outfit font-bold text-xs shadow-lg shadow-orange-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Abrir Visor Relativista GRRT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Pie del drawer */}
      <div className="p-3 border-t border-white/10 bg-slate-900/40 text-center">
        <span className="text-[11px] text-slate-400 flex items-center justify-center space-x-1">
          <Scale className="w-3.5 h-3.5 text-cyan-400" />
          <span>Escalas reales consultables con el Sistema Solar</span>
        </span>
      </div>
    </aside>
  );
};
