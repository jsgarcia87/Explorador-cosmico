import React, { useState } from 'react';
import { PlanetData } from '../data/planets';
import { DeepSpaceObjectData } from '../data/deepSpace';
import { ConstellationData } from '../data/constellations';
import { ProfileId, USER_PROFILES } from '../data/profiles';
import { X, Volume2, Scale, Info, Atom, ExternalLink, Sparkles } from 'lucide-react';
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
      extraLabel = 'DATA EXTRA';
    } else if ('experiment' in edu) {
      eduExtra = edu.experiment;
      extraLabel = 'RETO / EXPERIMENTO';
    } else if ('physicsLaw' in edu) {
      eduExtra = edu.physicsLaw;
      extraLabel = 'LEY FÍSICA GOBERNANTE';
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
      extraLabel = 'DATA EXTRA';
    } else if ('experiment' in edu) {
      eduExtra = edu.experiment;
      extraLabel = 'RETO DEL OBSERVADOR';
    } else if ('physicsLaw' in edu) {
      eduExtra = edu.physicsLaw;
      extraLabel = 'ECUACIÓN COSMOLÓGICA';
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
    extraLabel = 'MITOLOGÍA MULTICULTURAL';
  }

  const handleSpeak = () => {
    const speechText = `${name}. ${eduSummary}. ${eduFacts.join('. ')}`;
    cosmicAudio.speakNarration(speechText);
  };

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 w-full md:bottom-auto md:left-auto md:top-20 md:right-6 md:w-96 max-h-[45vh] md:max-h-[82vh] z-40 flex flex-col glass-panel border-t-2 md:border-l-2 md:border-t-2 border-primary/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden animate-slide-up md:animate-slide-in font-mono"
      aria-label="Panel de inspección astronómica"
    >
      {/* Cabecera del panel */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-primary/5">
        <div className="flex items-center space-x-3">
          <span className="text-2xl md:text-3xl filter drop-shadow-[0_0_5px_var(--primary)]" role="img" aria-label={name}>
            {icon}
          </span>
          <div>
            <h3 className="font-display font-bold text-lg md:text-xl text-primary tracking-widest uppercase">
              {name}
            </h3>
            <span className="text-[10px] tracking-wider text-telemetry-muted uppercase">
              {type}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          {selected.kind === 'planet' && onOpenCompare && (
            <button
              onClick={() => onOpenCompare(selected.data.id)}
              title="Comparar con otro cuerpo celeste"
              className="p-2 border border-accent/20 bg-accent/5 hover:bg-accent/20 text-accent transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
              aria-label="Comparar"
            >
              <Scale className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleSpeak}
            title="Narrar con Voz Guía"
            className="p-2 border border-primary/20 bg-primary/5 hover:bg-primary/20 text-primary transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
            aria-label="Escuchar narración"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              cosmicAudio.stopSpeech();
              onClose();
            }}
            className="p-2 border border-telemetry-dim bg-space-dark hover:bg-white/10 hover:text-white text-telemetry-muted transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
            aria-label="Cerrar panel de inspección"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pestañas adaptativas de nivel educativo */}
      <div className="flex border-b border-primary/10 bg-space-dark/80 text-[9px] tracking-widest uppercase">
        <button
          onClick={() => setCurrentLevel('infantil')}
          className={`flex-1 py-2 font-bold transition-all border-b-2 ${
            currentLevel === 'infantil'
              ? 'border-primary text-primary bg-primary/10'
              : 'border-transparent text-telemetry-dim hover:text-telemetry-muted hover:bg-primary/5'
          }`}
        >
          LVL_1: BÁSICO
        </button>
        <button
          onClick={() => setCurrentLevel('jovenes')}
          className={`flex-1 py-2 font-bold transition-all border-b-2 ${
            currentLevel === 'jovenes'
              ? 'border-accent text-accent bg-accent/10'
              : 'border-transparent text-telemetry-dim hover:text-telemetry-muted hover:bg-accent/5'
          }`}
        >
          LVL_2: INTERMEDIO
        </button>
        <button
          onClick={() => setCurrentLevel('adultos')}
          className={`flex-1 py-2 font-bold transition-all border-b-2 ${
            currentLevel === 'adultos'
              ? 'border-white text-white bg-white/5'
              : 'border-transparent text-telemetry-dim hover:text-telemetry-muted hover:bg-white/5'
          }`}
        >
          LVL_3: AVANZADO
        </button>
      </div>

      {/* Contenido desplazable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pr-2 custom-scrollbar">
        {/* Resumen principal */}
        <div className="p-3 border-l-2 border-primary/40 bg-primary/5">
          <p className="text-[11px] text-white/90 leading-relaxed font-data tracking-wide">
            {eduSummary}
          </p>
        </div>

        {/* Hechos científicos clave */}
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase tracking-widest text-primary flex items-center space-x-2 border-b border-primary/20 pb-1">
            <Info className="w-3 h-3" />
            <span>DATOS DE LA MISIÓN</span>
          </h4>
          <ul className="space-y-2 text-[10px] text-telemetry-muted font-data tracking-wide">
            {eduFacts.map((fact, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-primary mt-0.5">■</span>
                <span className="leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección Extra (Reto / Sabías que / Ley física) */}
        {eduExtra && (
          <div className="p-3 border border-accent/20 bg-accent/5">
            <span className="text-[9px] tracking-widest text-accent block mb-2 border-b border-accent/20 pb-1">
              {extraLabel}
            </span>
            <p className="text-[10px] text-telemetry-muted leading-relaxed font-data tracking-wide">
              {eduExtra}
            </p>
          </div>
        )}

        {/* Ficha técnica astrofísica detallada (Para Planetas) */}
        {selected.kind === 'planet' && (
          <div className="space-y-3 pt-3 border-t border-primary/20">
            <h4 className="text-[10px] uppercase tracking-widest text-primary flex items-center space-x-2">
              <Atom className="w-3 h-3 text-white" />
              <span>TELEMETRÍA NASA / JPL</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-[9px] tracking-widest font-data">
              <div className="p-2 border border-primary/10 bg-black/40">
                <span className="text-telemetry-dim block mb-0.5">RADIO</span>
                <strong className="text-white text-[10px]">{selected.data.realRadiusKm.toLocaleString()} km</strong>
              </div>
              <div className="p-2 border border-primary/10 bg-black/40">
                <span className="text-telemetry-dim block mb-0.5">GRAVEDAD</span>
                <strong className="text-white text-[10px]">{selected.data.gravityMs2} m/s²</strong>
              </div>
              <div className="p-2 border border-primary/10 bg-black/40">
                <span className="text-telemetry-dim block mb-0.5">TEMPERATURA</span>
                <strong className="text-white text-[10px]">{selected.data.tempCelsius} °C</strong>
              </div>
              <div className="p-2 border border-primary/10 bg-black/40">
                <span className="text-telemetry-dim block mb-0.5">DISTANCIA SOL</span>
                <strong className="text-white text-[10px]">{selected.data.realDistanceAU} AU</strong>
              </div>
              {selected.data.orbitalElements && (
                <>
                  <div className="p-2 border border-primary/20 bg-primary/5">
                    <span className="text-primary block mb-0.5">EXCENTRICIDAD (e)</span>
                    <strong className="text-white text-[10px]">{selected.data.orbitalElements.e.toFixed(4)}</strong>
                  </div>
                  <div className="p-2 border border-primary/20 bg-primary/5">
                    <span className="text-primary block mb-0.5">INCLINACIÓN (i)</span>
                    <strong className="text-white text-[10px]">{selected.data.orbitalElements.iDeg.toFixed(2)}°</strong>
                  </div>
                  <div className="p-2 border border-primary/20 bg-primary/5 col-span-2">
                    <span className="text-primary block mb-0.5">PERÍODO SIDERAL</span>
                    <strong className="text-white text-[10px]">
                      {selected.data.orbitalElements.periodDays >= 365
                        ? `${(selected.data.orbitalElements.periodDays / 365.256).toFixed(2)} años`
                        : `${selected.data.orbitalElements.periodDays.toFixed(1)} días`}
                    </strong>
                  </div>
                </>
              )}
            </div>

            {selected.data.atmosphere && selected.data.atmosphere.length > 0 && (
              <div className="p-2 border border-primary/10 bg-black/40">
                <span className="text-telemetry-dim block mb-1 text-[9px] tracking-widest">ATMÓSFERA PRINCIPAL</span>
                <div className="flex flex-wrap gap-1">
                  {selected.data.atmosphere.map((gas, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20">
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
            className="w-full flex items-center justify-center space-x-2 py-3 border border-accent bg-accent/10 hover:bg-accent/20 text-accent uppercase tracking-widest text-[10px] transition-all font-bold"
          >
            <Sparkles className="w-3 h-3" />
            <span>INIT_GRRT_SIMULATOR</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Pie del drawer */}
      <div className="p-2 border-t border-primary/20 bg-black/60 text-center">
        <span className="text-[9px] tracking-widest text-telemetry-dim flex items-center justify-center space-x-2">
          <Scale className="w-3 h-3 text-primary/50" />
          <span>SCL: REAL_TIME / SCALED</span>
        </span>
      </div>
    </aside>
  );
};

