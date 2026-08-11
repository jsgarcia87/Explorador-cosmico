import React from 'react';
import { X, School, BookOpen, Users, Award, Play } from 'lucide-react';

interface TeacherClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartLesson: (mode: 'solar' | 'earth' | 'deep' | 'observatory', targetId?: string) => void;
}

export const TeacherClassroomModal: React.FC<TeacherClassroomModalProps> = ({
  isOpen,
  onClose,
  onStartLesson
}) => {
  if (!isOpen) return null;

  const lessons: {
    id: string;
    title: string;
    grade: string;
    desc: string;
    mode: 'solar' | 'earth' | 'deep' | 'observatory';
    targetId?: string;
  }[] = [
    {
      id: 'l1',
      title: 'Unidad 1: El Sistema Solar y Leyes de Kepler',
      grade: 'Primaria / Secundaria',
      desc: 'Recorrido guiado por el Sol, los 4 planetas rocosos y los 4 gigantes gaseosos comparando sus radios orbitales y gravedad.',
      mode: 'solar'
    },
    {
      id: 'l2',
      title: 'Unidad 2: La Tierra y la Órbita de la Luna',
      grade: 'Secundaria / Bachillerato',
      desc: 'Análisis de la atmósfera terrestre, inclinación axial (23.4°), estaciones climáticas y eclipses provocados por la órbita lunar.',
      mode: 'earth'
    },
    {
      id: 'l3',
      title: 'Unidad 3: Agujeros Negros y Relatividad (Sgr A*)',
      grade: 'Bachillerato / Universidad',
      desc: 'Exploración de Sagitario A*, el agujero negro supermasivo en el centro de la Vía Láctea, horizonte de sucesos, curvatura del espacio-tiempo y GRRT.',
      mode: 'deep',
      targetId: 'sgr_a_star'
    },
    {
      id: 'l4',
      title: 'Unidad 4: Mitología Celestial vs. Astronomía',
      grade: 'Multidisciplinar',
      desc: 'Comparativa en la Bóveda Celeste entre las constelaciones de la IAU y las narraciones mitológicas Griegas, Egipcias y Mayas.',
      mode: 'observatory'
    }
  ];

  return (
    <div className="fixed inset-0 md:inset-y-0 md:right-auto md:left-0 z-40 md:w-[450px] md:max-w-[90vw] md:p-4 flex flex-col pointer-events-none" role="dialog" aria-modal="true" aria-labelledby="teacher-modal-title">
      <div className="flex-1 w-full p-4 md:p-6 rounded-none md:rounded-[8px] bg-[rgba(8,8,12,0.95)] border border-[rgba(237,233,228,0.10)] shadow-2xl backdrop-blur-xl pointer-events-auto flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(237,233,228,0.07)]">
          <div className="flex items-center space-x-3">
            <School className="w-6 h-6 text-[#c8964a]" />
            <div>
              <h2 id="teacher-modal-title" className="text-xl font-outfit font-bold text-[#ede9e4]">
                Modo Profesor / Aula Interactiva
              </h2>
              <p className="text-xs text-[rgba(237,233,228,0.5)]">
                Herramientas docentes para proyectar lecciones pedagógicas en clase.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
            aria-label="Cerrar modo aula"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumen del aula */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="p-3.5 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-center space-x-3">
            <Users className="w-5 h-5 text-[#7aafc8]" />
            <div>
              <span className="text-xs text-[rgba(237,233,228,0.5)] block">ESTADO DEL AULA</span>
              <strong className="text-sm text-[#ede9e4] font-bold">Proyección Activa</strong>
            </div>
          </div>
          <div className="p-3.5 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-[#9878b8]" />
            <div>
              <span className="text-xs text-[rgba(237,233,228,0.5)] block">UNIDADES DISPONIBLES</span>
              <strong className="text-sm text-[#ede9e4] font-bold">4 Módulos NASA</strong>
            </div>
          </div>
          <div className="p-3.5 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-center space-x-3">
            <Award className="w-5 h-5 text-[#c8964a]" />
            <div>
              <span className="text-xs text-[rgba(237,233,228,0.5)] block">NIVEL DOCENTE</span>
              <strong className="text-sm text-[#ede9e4] font-bold">Adaptativo (6-18 años)</strong>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#c8964a] block mb-1">
            SELECCIONA LECCIÓN PARA PROYECTAR
          </span>
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex flex-col gap-3 p-4 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] hover:border-[rgba(200,150,74,0.3)] transition-all"
            >
              <div className="w-full">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[rgba(200,150,74,0.1)] text-[#d4a65a] border border-amber-400/20">
                  {lesson.grade}
                </span>
                <h3 className="text-base font-outfit font-bold text-[#ede9e4] mt-1">
                  {lesson.title}
                </h3>
                <p className="text-xs text-[rgba(237,233,228,0.6)] mt-1 leading-relaxed">
                  {lesson.desc}
                </p>
              </div>

              <button
                onClick={() => {
                  onStartLesson(lesson.mode, lesson.targetId);
                  onClose();
                }}
                className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-[6px] bg-gradient-to-r from-[#c8964a] to-[#d4864a] hover:from-[#d4a65a] hover:to-[#c8964a] text-black font-outfit font-bold text-xs shadow-lg shadow-[rgba(200,150,74,0.15)] transition-all mt-2 min-h-[44px] md:min-h-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Iniciar Lección</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
