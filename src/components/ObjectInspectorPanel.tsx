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
  onOpenCompare?: (id: string) => void;
}

export const ObjectInspectorPanel: React.FC<ObjectInspectorPanelProps> = ({
  selected,
  onClose,
  activeProfile,
  onOpenGrrt,
  onOpenCompare
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
      className="fixed bottom-0 left-0 right-0 w-full md:bottom-auto md:left-auto md:top-20 md:right-6 md:w-96 max-h-[60vh] md:max-h-[82vh] z-40 flex flex-col rounded-t-3xl md:rounded-[8px] bg-[rgba(3,3,5,0.95)] border-t md:border-t-0 md:border border-[rgba(237,233,228,0.12)] md:border-[rgba(237,233,228,0.10)] shadow-[0_-8px_32px_rgba(0,0,0,0.5)] md:shadow-2xl overflow-hidden animate-slide-up md:animate-slide-in"
      aria-label="Panel de inspección astronómica"
    >
      {/* Indicador de arrastre para móviles (decorativo) */}
      <div className="md:hidden flex justify-center pt-3 pb-1 bg-[rgba(8,8,12,0.60)]">
        <div className="w-12 h-1.5 rounded-full bg-white/20" />
      </div>

      {/* Cabecera del panel */}
      <div className="flex items-center justify-between p-4 pt-2 md:pt-4 border-b border-[rgba(237,233,228,0.07)] bg-[rgba(8,8,12,0.60)]">
        <div className="flex items-center space-x-3">
          <span className="text-2xl md:text-3xl" role="img" aria-label={name}>
            {icon}
          </span>
          <div>
            <h3 className="font-outfit font-bold text-lg md:text-xl text-[#ede9e4] leading-tight">
              {name}
            </h3>
            <span className="text-xs md:text-sm font-mono text-[#7aafc8]">
              {type}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          {selected.kind === 'planet' && onOpenCompare && (
            <button
              onClick={() => onOpenCompare(selected.data.id)}
              title="Comparar con otro cuerpo celeste"
              className="p-2.5 md:p-2 rounded-[4px] bg-[rgba(200,150,74,0.1)] hover:bg-[rgba(200,150,74,0.2)] text-[#c8964a] transition-colors"
              aria-label="Comparar"
            >
              <Scale className="w-5 h-5 md:w-4 md:h-4" />
            </button>
          )}
          <button
            onClick={handleSpeak}
            title="Narrar con Voz Guía"
            className="p-2.5 md:p-2 rounded-[4px] bg-[rgba(122,175,200,0.1)] hover:bg-[rgba(122,175,200,0.2)] text-[#8ec5dc] transition-colors"
            aria-label="Escuchar narración"
          >
            <Volume2 className="w-5 h-5 md:w-4 md:h-4" />
          </button>
          <button
            onClick={() => {
              cosmicAudio.stopSpeech();
              onClose();
            }}
            className="p-2.5 md:p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] transition-colors"
            aria-label="Cerrar panel de inspección"
          >
            <X className="w-5 h-5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>

      {/* Pestañas adaptativas de nivel educativo */}
      <div className="flex border-b border-[rgba(237,233,228,0.07)] bg-black/40">
        <button
          onClick={() => setCurrentLevel('infantil')}
          className={`flex-1 py-2 text-xs font-outfit font-bold transition-all border-b-2 ${
            currentLevel === 'infantil'
              ? 'border-[rgba(122,175,200,0.3)] text-[#8ec5dc] bg-[rgba(122,175,200,0.1)]'
              : 'border-transparent text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4]'
          }`}
        >
          🎒 Infantil
        </button>
        <button
          onClick={() => setCurrentLevel('jovenes')}
          className={`flex-1 py-2 text-xs font-outfit font-bold transition-all border-b-2 ${
            currentLevel === 'jovenes'
              ? 'border-[rgba(152,120,184,0.3)] text-[#a88cc8] bg-[rgba(152,120,184,0.1)]'
              : 'border-transparent text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4]'
          }`}
        >
          🚀 Jóvenes
        </button>
        <button
          onClick={() => setCurrentLevel('adultos')}
          className={`flex-1 py-2 text-xs font-outfit font-bold transition-all border-b-2 ${
            currentLevel === 'adultos'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4]'
          }`}
        >
          🔭 Astrofísica
        </button>
      </div>

      {/* Contenido desplazable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2">
        {/* Resumen principal */}
        <div className="p-3.5 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)]">
          <p className="text-sm text-[#ede9e4] leading-relaxed font-medium">
            {eduSummary}
          </p>
        </div>

        {/* Hechos científicos clave */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#7aafc8] flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>DATOS DE LA MISIÓN</span>
          </h4>
          <ul className="space-y-2 text-xs text-[rgba(237,233,228,0.6)]">
            {eduFacts.map((fact, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-[#7aafc8] font-bold">•</span>
                <span className="leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección Extra (Reto / Sabías que / Ley física) */}
        {eduExtra && (
          <div className="p-3.5 rounded-[6px] bg-gradient-to-br from-[rgba(122,175,200,0.1)] to-[rgba(91,143,180,0.1)] border border-[rgba(122,175,200,0.2)]">
            <span className="text-xs font-outfit font-bold text-[#8ec5dc] block mb-1">
              {extraLabel}
            </span>
            <p className="text-xs text-[rgba(237,233,228,0.6)] leading-relaxed font-mono">
              {eduExtra}
            </p>
          </div>
        )}

        {/* Ficha técnica astrofísica detallada (Para Planetas) */}
        {selected.kind === 'planet' && (
          <div className="space-y-2 pt-2 border-t border-[rgba(237,233,228,0.07)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[rgba(237,233,228,0.5)] flex items-center space-x-1.5">
              <Atom className="w-3.5 h-3.5 text-emerald-400" />
              <span>TELEMETRÍA NASA / JPL</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-[rgba(237,233,228,0.4)] block text-[10px]">RADIO</span>
                <strong className="text-[#ede9e4]">{selected.data.realRadiusKm.toLocaleString()} km</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-[rgba(237,233,228,0.4)] block text-[10px]">GRAVEDAD</span>
                <strong className="text-[#ede9e4]">{selected.data.gravityMs2} m/s²</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-[rgba(237,233,228,0.4)] block text-[10px]">TEMPERATURA</span>
                <strong className="text-[#ede9e4]">{selected.data.tempCelsius} °C</strong>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-[rgba(237,233,228,0.4)] block text-[10px]">DISTANCIA SOL</span>
                <strong className="text-[#ede9e4]">{selected.data.realDistanceAU} AU ({Math.round(selected.data.realDistanceAU * 149.6)}M km)</strong>
              </div>
              {selected.data.orbitalElements && (
                <>
                  <div className="p-2 rounded bg-black/40 border border-[rgba(122,175,200,0.15)]">
                    <span className="text-[#7aafc8]/80 block text-[10px]">EXCENTRICIDAD (e)</span>
                    <strong className="text-[#8ec5dc]">{selected.data.orbitalElements.e.toFixed(4)}</strong>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-[rgba(122,175,200,0.15)]">
                    <span className="text-[#7aafc8]/80 block text-[10px]">INCLINACIÓN (i)</span>
                    <strong className="text-[#8ec5dc]">{selected.data.orbitalElements.iDeg.toFixed(2)}°</strong>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-[rgba(122,175,200,0.15)]">
                    <span className="text-[#7aafc8]/80 block text-[10px]">PERÍODO SIDERAL</span>
                    <strong className="text-[#8ec5dc]">
                      {selected.data.orbitalElements.periodDays >= 365
                        ? `${(selected.data.orbitalElements.periodDays / 365.256).toFixed(2)} años`
                        : `${selected.data.orbitalElements.periodDays.toFixed(1)} días`}
                    </strong>
                  </div>
                </>
              )}
            </div>

            {selected.data.atmosphere && selected.data.atmosphere.length > 0 && (
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-[rgba(237,233,228,0.4)] block text-[10px] mb-1 font-mono">ATMÓSFERA PRINCIPAL</span>
                <div className="flex flex-wrap gap-1">
                  {selected.data.atmosphere.map((gas, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[rgba(237,233,228,0.04)] text-[#8ec5dc] border border-[rgba(237,233,228,0.07)]">
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
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-[6px] bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-[#ede9e4] font-outfit font-bold text-xs shadow-lg shadow-orange-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Abrir Visor Relativista GRRT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Pie del drawer */}
      <div className="p-3 border-t border-[rgba(237,233,228,0.07)] bg-[rgba(8,8,12,1)]/40 text-center">
        <span className="text-[11px] text-[rgba(237,233,228,0.5)] flex items-center justify-center space-x-1">
          <Scale className="w-3.5 h-3.5 text-[#7aafc8]" />
          <span>Escalas reales consultables con el Sistema Solar</span>
        </span>
      </div>
    </aside>
  );
};
