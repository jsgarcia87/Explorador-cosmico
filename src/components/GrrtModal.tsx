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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
      {/* Marco principal inmersivo */}
      <div className="relative w-full h-full flex flex-col bg-[#05060f] text-[#ede9e4] overflow-hidden">
        
        {/* Barra superior NASA/ESA */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#0a0c18]/90 border-b border-[rgba(122,175,200,0.2)] z-20 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#7aafc8] animate-pulse shadow-[0_0_12px_rgba(122,175,200,0.5)]" />
            <div>
              <h2 className="text-base font-bold tracking-widest uppercase text-[#ede9e4] font-mono flex items-center gap-2">
                Observatorio Geodésico Relativista GPU
                <span className="text-xs px-2 py-0.5 rounded bg-[rgba(122,175,200,0.2)] text-[#8ec5dc] border border-[rgba(122,175,200,0.2)]">
                  Simulación Científica GRRT
                </span>
              </h2>
              <p className="text-xs text-[rgba(237,233,228,0.5)]">
                Resolución nativa en tiempo real de la ecuación de Binet, métrica de Kerr-Schwarzschild y radiación Doppler
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowEduPanel(!showEduPanel)}
              className={`flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-all border ${
                showEduPanel
                  ? 'bg-[rgba(122,175,200,0.2)] text-[#8ec5dc] border-[rgba(122,175,200,0.4)] shadow-[0_0_15px_rgba(122,175,200,0.2)]'
                  : 'bg-[rgba(15,15,25,0.6)] text-[rgba(237,233,228,0.6)] border-[rgba(237,233,228,0.1)] hover:bg-[rgba(15,15,25,0.8)]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#7aafc8]" />
              {showEduPanel ? 'Ocultar Guía Astronómica' : 'Guía del Científico Astronómico'}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-[4px] bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 transition-colors"
              title="Cerrar Simulador"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Contenedor dividido: Visor Raytracer 3D + Panel Astrofísico */}
        <div className="relative flex-1 flex overflow-hidden">
          
          {/* VISOR DE TRAZADO DE RAYOS GRRT EN TIEMPO REAL */}
          <div className="relative flex-1 h-full bg-black">
            <iframe
              src="./simulador-grrt/index.html"
              title="Simulador Raytracer GRRT"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
          </div>

          {/* PANEL ASISTENTE DEL CIENTÍFICO ASTRONÓMICO (DESPLEGABLE) */}
          {showEduPanel && (
            <aside className="w-96 max-w-[90vw] h-full bg-[#0a0d1e]/95 border-l border-[rgba(122,175,200,0.15)] flex flex-col z-20 backdrop-blur-xl animate-in slide-in-from-right duration-300">
              
              {/* Cabecera del Astrónomo */}
              <div className="p-5 border-b border-[rgba(237,233,228,0.07)] bg-gradient-to-r from-[rgba(8,20,40,0.4)] to-[rgba(30,15,40,0.3)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-[4px] bg-[rgba(122,175,200,0.2)] border border-[rgba(122,175,200,0.3)] text-[#7aafc8]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-[#7aafc8] font-bold block">
                      Astrofísica Relativista
                    </span>
                    <h3 className="text-sm font-bold text-[#ede9e4]">
                      Guía Científica del Agujero Negro
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[rgba(237,233,228,0.6)] leading-relaxed">
                  Interactúa con los controles de la derecha en el visor 3D para modificar el espín y la acreción mientras exploras los principios fundamentales:
                </p>
              </div>

              {/* Pestañas de conceptos */}
              <div className="grid grid-cols-2 gap-1 p-3 border-b border-[rgba(237,233,228,0.07)] bg-black/30">
                {EDU_SECTIONS.map((section) => {
                  const isActive = section.id === activeTab;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-[4px] text-xs font-medium transition-all text-left ${
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

              {/* Contenido de la sección seleccionada */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
                <div>
                  <span className="text-xs font-mono text-[#7aafc8] font-bold block uppercase mb-1">
                    Concepto Fundamental
                  </span>
                  <h4 className="text-base font-bold text-[#ede9e4] mb-1">
                    {currentSection.title}
                  </h4>
                  <p className="text-xs text-violet-300 font-medium">
                    {currentSection.subtitle}
                  </p>
                </div>

                {/* Explicación en párrafos */}
                <div className="space-y-3">
                  {currentSection.content.map((paragraph, index) => (
                    <p key={index} className="text-[rgba(237,233,228,0.6)] text-xs leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Fórmula científica */}
                {currentSection.formula && (
                  <div className="p-3.5 rounded-[6px] bg-black/60 border border-[rgba(122,175,200,0.2)] text-center">
                    <span className="text-[10px] uppercase font-mono text-[rgba(237,233,228,0.5)] block mb-1">
                      Fórmula Físico-Matemática
                    </span>
                    <code className="text-xs font-mono text-[#8ec5dc] font-bold tracking-wider">
                      {currentSection.formula}
                    </code>
                  </div>
                )}

                {/* Dato Curioso del Astrónomo */}
                <div className="p-4 rounded-[6px] bg-gradient-to-br from-[rgba(50,20,80,0.3)] to-[rgba(20,40,60,0.2)] border border-[rgba(152,120,184,0.25)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#c8964a]" />
                    <span className="text-xs font-bold text-[#d4a65a] uppercase tracking-wider">
                      Dato Astronómico
                    </span>
                  </div>
                  <p className="text-xs text-[#ede9e4] leading-relaxed italic">
                    "{currentSection.funFact}"
                  </p>
                </div>
              </div>

              {/* Pie de guía */}
              <div className="p-4 border-t border-[rgba(237,233,228,0.07)] bg-black/40 text-[11px] text-[rgba(237,233,228,0.5)] text-center font-mono">
                Usa el ratón para rotar (clic izquierdo) y hacer zoom (rueda) sobre la métrica gravitacional.
              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  );
};
