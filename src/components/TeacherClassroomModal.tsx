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
      title: 'Unidad 3: Agujeros Negros y Relatividad (M87*)',
      grade: 'Bachillerato / Universidad',
      desc: 'Exploración de Gargantua (M87*), el horizonte de sucesos, curvatura del espacio-tiempo y transporte radiativo relativista GRRT.',
      mode: 'deep',
      targetId: 'gargantua'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="teacher-modal-title">
      <div className="w-full max-w-3xl p-6 rounded-2xl bg-slate-900/95 border border-white/15 shadow-2xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <School className="w-6 h-6 text-amber-400" />
            <div>
              <h2 id="teacher-modal-title" className="text-xl font-outfit font-bold text-white">
                Modo Profesor / Aula Interactiva
              </h2>
              <p className="text-xs text-slate-400">
                Herramientas docentes para proyectar lecciones pedagógicas en clase.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar modo aula"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumen del aula */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
            <Users className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-xs text-slate-400 block">ESTADO DEL AULA</span>
              <strong className="text-sm text-white font-bold">Proyección Activa</strong>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-xs text-slate-400 block">UNIDADES DISPONIBLES</span>
              <strong className="text-sm text-white font-bold">4 Módulos NASA</strong>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs text-slate-400 block">NIVEL DOCENTE</span>
              <strong className="text-sm text-white font-bold">Adaptativo (6-18 años)</strong>
            </div>
          </div>
        </div>

        {/* Lista de Unidades y Lecciones */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
            SELECCIONA LECCIÓN PARA PROYECTAR
          </span>
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all"
            >
              <div className="max-w-lg">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-400/20">
                  {lesson.grade}
                </span>
                <h3 className="text-base font-outfit font-bold text-white mt-1">
                  {lesson.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {lesson.desc}
                </p>
              </div>

              <button
                onClick={() => {
                  onStartLesson(lesson.mode, lesson.targetId);
                  onClose();
                }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-outfit font-bold text-xs shadow-lg shadow-amber-500/25 transition-all"
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
