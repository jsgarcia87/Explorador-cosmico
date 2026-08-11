import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Atom, Eye, Flame, Compass, ChevronRight, ChevronDown } from 'lucide-react';

interface GrrtModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EduSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string[];
  formula?: string;
  funFact: string;
}

const EDU_SECTIONS: EduSection[] = [
  {
    id: 'kerr',
    title: '1. Métrica de Kerr & Horizonte de Sucesos',
    subtitle: 'La distorsión del espaciotiempo en rotación',
    icon: <Atom className="w-5 h-5 text-[#7aafc8]" />,
    content: [
      'A diferencia de los agujeros negros estáticos (Schwarzschild), los agujeros negros astrofísicos reales como Gargantua o M87* poseen un momento angular extremadamente elevado (espín a/M).',
      'Este giro arrastra el tejido del espaciotiempo a su alrededor en un fenómeno conocido como "arrastre del sistema de referencia" (Frame Dragging o efecto Lense-Thirring).',
      'El horizonte de sucesos es el límite de no retorno donde la velocidad de escape iguala a la velocidad de la luz (c).'
    ],
    formula: 'r_+ = \\frac{GM}{c^2} \\left(1 + \\sqrt{1 - a_*^2}\\right)',
    funFact: 'En un agujero negro con espín máximo (a = 0.999), el horizonte de sucesos se reduce a la mitad del tamaño que tendría uno estático de la misma masa.'
  },
  {
    id: 'lensing',
    title: '2. Lente Gravitacional & Esfera Fotónica',
    subtitle: 'Por qué vemos la parte trasera del disco',
    icon: <Eye className="w-5 h-5 text-violet-400" />,
    content: [
      'La inmensa gravedad curva las trayectorias de los fotones según la ecuación geodésica de Binet. La luz emitida por la parte trasera del disco de acreción viaja por encima y por debajo del agujero negro hasta nuestros ojos.',
      'A una distancia de 1.5 radios de Schwarzschild se encuentra la "Esfera Fotónica": una zona donde la gravedad es tan precisa que los fotones pueden orbitar en círculos infinitos antes de escapar o caer.',
      'El anillo brillante que rodea la sombra negra (Anillo de Einstein) está formado por fotones que han dado múltiples vueltas alrededor del horizonte antes de llegar a la cámara.'
    ],
    formula: 'd^2u/d\\phi^2 + u = \\frac{3GM}{c^2} u^2',
    funFact: 'Si pudieras permanecer inmóvil dentro de la esfera fotónica de un agujero negro supermasivo, podrías ver tu propia nuca mirando hacia adelante.'
  },
  {
    id: 'doppler',
    title: '3. Asimetría Doppler Relativista',
    subtitle: 'El brillo del frente de avance',
    icon: <Flame className="w-5 h-5 text-[#c8964a]" />,
    content: [
      'El plasma en el disco interior orbita a fracciones significativas de la velocidad de la luz. Esto provoca dos efectos ópticos masivos del relativismo especial y general:',
      '• Beaming (Impulso Doppler): El lado del disco que gira hacia nosotros concentra sus fotones y aumenta su frecuencia (desplazamiento al azul y brillo extremo).',
      '• Desplazamiento al Rojo Gravitacional: Los fotones pierden energía al escalar fuera del pozo gravitatorio, enrojeciendo el lado que se aleja y las zonas más cercanas al horizonte.'
    ],
    formula: 'I_{\\nu} = D^3 I_{\\nu, 0} \\quad \\text{donde } D = \\frac{1}{\\gamma(1 - \\beta \\cos\\theta)}',
    funFact: 'Esta asimetría lumínica fue observada empíricamente por el Event Horizon Telescope (EHT) en la famosa fotografía del agujero negro M87* y en Sgr A*.'
  },
  {
    id: 'jets',
    title: '4. Jets Relativistas GRMHD',
    subtitle: 'Chorros polares impulsados por campos magnéticos',
    icon: <Compass className="w-5 h-5 text-blue-400" />,
    content: [
      'Las líneas de campo magnético arremolinadas en el disco se retuercen intensamente en el eje de rotación del agujero negro (Mecanismo de Blandford-Znajek).',
      'Este dinamo electromagnético colosal extrae energía rotacional directamente de la ergosfera, disparando haces gemelos de plasma y radiación sincrotrón en direcciones opuestas a velocidades cercanas a la de la luz.'
    ],
    formula: 'P_{BZ} \\propto B^2 r_H^2 a_*^2 c',
    funFact: 'El jet de M87* se proyecta más de 5,000 años luz en el espacio profundo, perforando toda su galaxia anfitriona.'
  }
];

export const GrrtModal: React.FC<GrrtModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('kerr');
  const [showEduPanel, setShowEduPanel] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentSection = EDU_SECTIONS.find(s => s.id === activeTab) || EDU_SECTIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none">
      <div className="relative w-full h-full flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 bg-[#0a0c18]/90 border-b border-[rgba(122,175,200,0.2)] z-20 backdrop-blur-lg flex-shrink-0 pointer-events-auto">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#7aafc8] animate-pulse shadow-[0_0_12px_rgba(122,175,200,0.5)] flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="text-xs md:text-base font-bold tracking-widest uppercase text-[#ede9e4] font-mono flex items-center gap-2">
                <span className="truncate">Observatorio GRRT</span>
                <span className="hidden sm:inline text-[10px] md:text-xs px-2 py-0.5 rounded bg-[rgba(122,175,200,0.2)] text-[#8ec5dc] border border-[rgba(122,175,200,0.2)]">
                  Simulación Científica
                </span>
              </h2>
              <p className="text-[10px] md:text-xs text-[rgba(237,233,228,0.5)] hidden sm:block truncate">
                Ecuación de Binet, métrica de Kerr-Schwarzschild y radiación Doppler
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <button
              onClick={() => setShowEduPanel(!showEduPanel)}
              className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-2 rounded-[4px] text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all border min-h-[44px] md:min-h-0 ${
                showEduPanel
                  ? 'bg-[rgba(122,175,200,0.2)] text-[#8ec5dc] border-[rgba(122,175,200,0.4)] shadow-[0_0_15px_rgba(122,175,200,0.2)]'
                  : 'bg-[rgba(15,15,25,0.6)] text-[rgba(237,233,228,0.6)] border-[rgba(237,233,228,0.1)] hover:bg-[rgba(15,15,25,0.8)]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#7aafc8]" />
              <span className="hidden sm:inline">{showEduPanel ? 'Ocultar Guía' : 'Guía Científica'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-[4px] bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
              title="Cerrar Simulador"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </header>

        {/* Main content: 3D viewport + education panel */}
        <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* 3D viewport area */}
          <div className="relative flex-1 h-full bg-transparent pointer-events-none" />

          {/* Education aside: bottom sheet on mobile, right panel on desktop */}
          {showEduPanel && (
            <aside className="w-full md:w-96 md:max-w-[90vw] max-h-[50vh] md:max-h-full md:h-full bg-[#0a0d1e]/95 border-t md:border-t-0 md:border-l border-[rgba(122,175,200,0.15)] flex flex-col z-20 backdrop-blur-xl pointer-events-auto animate-in slide-in-from-bottom md:slide-in-from-right duration-300 overflow-hidden">

              {/* Header */}
              <div className="p-3 md:p-5 border-b border-[rgba(237,233,228,0.07)] bg-gradient-to-r from-[rgba(8,20,40,0.4)] to-[rgba(30,15,40,0.3)] flex-shrink-0">
                <div className="flex items-center gap-3 mb-1 md:mb-2">
                  <div className="p-1.5 md:p-2 rounded-[4px] bg-[rgba(122,175,200,0.2)] border border-[rgba(122,175,200,0.3)] text-[#7aafc8]">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#7aafc8] font-bold block">
                      Astrofísica Relativista
                    </span>
                    <h3 className="text-xs md:text-sm font-bold text-[#ede9e4]">
                      Guía Científica
                    </h3>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-[rgba(237,233,228,0.6)] leading-relaxed hidden md:block">
                  Interactúa con los controles de la derecha en el visor 3D para modificar el espín y la acreción mientras exploras los principios fundamentales:
                </p>
              </div>

              {/* Concept tabs */}
              <div className="grid grid-cols-2 gap-1 p-2 md:p-3 border-b border-[rgba(237,233,228,0.07)] bg-black/30 flex-shrink-0">
                {EDU_SECTIONS.map((section) => {
                  const isActive = section.id === activeTab;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-2 md:py-2.5 rounded-[4px] text-[10px] md:text-xs font-medium transition-all text-left min-h-[44px] md:min-h-0 ${
                        isActive
                          ? 'bg-[rgba(122,175,200,0.2)] text-[#8ec5dc] border border-[rgba(122,175,200,0.3)] shadow-sm'
                          : 'text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] hover:bg-[rgba(237,233,228,0.04)]'
                      }`}
                    >
                      {section.icon}
                      <span className="truncate">{section.title.split('.')[1].trim()}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected section content */}
              <div className="flex-1 overflow-y-auto p-3 md:p-5 space-y-3 md:space-y-5 text-sm min-h-0">
                <div>
                  <span className="text-[10px] font-mono text-[#7aafc8] font-bold block uppercase mb-1">
                    Concepto Fundamental
                  </span>
                  <h4 className="text-sm md:text-base font-bold text-[#ede9e4] mb-1">
                    {currentSection.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-violet-300 font-medium">
                    {currentSection.subtitle}
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3">
                  {currentSection.content.map((paragraph, index) => (
                    <p key={index} className="text-[rgba(237,233,228,0.6)] text-[11px] md:text-xs leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {currentSection.formula && (
                  <div className="p-2.5 md:p-3.5 rounded-[6px] bg-black/60 border border-[rgba(122,175,200,0.2)] text-center">
                    <span className="text-[9px] md:text-[10px] uppercase font-mono text-[rgba(237,233,228,0.5)] block mb-1">
                      Fórmula Físico-Matemática
                    </span>
                    <code className="text-[10px] md:text-xs font-mono text-[#8ec5dc] font-bold tracking-wider break-all">
                      {currentSection.formula}
                    </code>
                  </div>
                )}

                <div className="p-3 md:p-4 rounded-[6px] bg-gradient-to-br from-[rgba(50,20,80,0.3)] to-[rgba(20,40,60,0.2)] border border-[rgba(152,120,184,0.25)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#c8964a]" />
                    <span className="text-[10px] md:text-xs font-bold text-[#d4a65a] uppercase tracking-wider">
                      Dato Astronómico
                    </span>
                  </div>
                  <p className="text-[11px] md:text-xs text-[#ede9e4] leading-relaxed italic">
                    "{currentSection.funFact}"
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 md:p-4 border-t border-[rgba(237,233,228,0.07)] bg-black/40 text-[10px] md:text-[11px] text-[rgba(237,233,228,0.5)] text-center font-mono flex-shrink-0">
                <span className="hidden md:inline">Usa el ratón para rotar (clic izquierdo) y hacer zoom (rueda) sobre la métrica gravitacional.</span>
                <span className="md:hidden">Arrastra para rotar • Pellizca para zoom</span>
              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  );
};
