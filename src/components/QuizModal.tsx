import React, { useState } from 'react';
import { COSMIC_QUIZ, QuizQuestion } from '../data/missions';
import { ProfileId, USER_PROFILES } from '../data/profiles';
import { X, Award, CheckCircle2, XCircle, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../engine/CosmicAudio';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: ProfileId;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  activeProfile
}) => {
  const profile = USER_PROFILES[activeProfile];

  // Filtrar o mostrar todas las preguntas
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = COSMIC_QUIZ[currentIndex];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);

    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      cosmicAudio.playMissionComplete();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < COSMIC_QUIZ.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      if (score >= Math.floor(COSMIC_QUIZ.length * 0.7)) {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 }
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
      <div className="w-full max-w-xl p-6 rounded-2xl bg-slate-900/95 border border-white/15 shadow-2xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <h2 id="quiz-title" className="text-lg font-outfit font-bold text-white">
                Misiones & Cuestionarios del Cosmos
              </h2>
              <span className="text-xs font-mono text-cyan-400">
                Reto Activo: {profile.badge}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar cuestionario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Indicador de progreso */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>PREGUNTA {currentIndex + 1} DE {COSMIC_QUIZ.length}</span>
              <span>PUNTUACIÓN: <strong className="text-amber-400">{score}</strong></span>
            </div>

            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-cyan-400 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / COSMIC_QUIZ.length) * 100}%` }}
              />
            </div>

            {/* Pregunta */}
            <h3 className="text-base font-outfit font-bold text-white mb-4 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Opciones */}
            <div className="space-y-2 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let btnStyle = 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10';

                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-500/20 border-red-400 text-red-300';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-cyan-500/20 border-cyan-400 text-white shadow-md';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explicación si se respondió */}
            {isSubmitted && (
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-slate-300 mb-6 leading-relaxed font-medium">
                <span className="font-outfit font-bold text-cyan-300 block mb-1">💡 Explicación Científica:</span>
                {currentQ.explanation}
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex justify-end">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className={`px-6 py-2.5 rounded-xl font-outfit font-bold text-xs transition-all ${
                    selectedOption !== null
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/25'
                      : 'bg-white/10 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Comprobar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-outfit font-bold text-xs shadow-lg shadow-purple-500/25 transition-all"
                >
                  {currentIndex < COSMIC_QUIZ.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultado Final'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Pantalla final de resultados */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-outfit font-bold text-white">
              ¡Cuestionario Completado!
            </h3>

            <p className="text-sm text-slate-300">
              Has acertado <strong className="text-amber-400">{score}</strong> de <strong className="text-white">{COSMIC_QUIZ.length}</strong> preguntas cósmicas.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 inline-block text-xs font-mono text-cyan-300">
              INSIGNIA DESBLOQUEADA: <strong className="text-white font-bold">{profile.badge}</strong>
            </div>

            <div className="pt-4 flex items-center justify-center space-x-3">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-outfit font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Repetir Cuestionario</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-outfit font-bold text-xs transition-colors"
              >
                Volver al Observatorio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
