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
    <div className="fixed inset-0 md:inset-y-0 md:left-auto md:right-0 z-40 md:w-[500px] md:max-w-[90vw] md:p-4 flex items-center pointer-events-none" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
      <div className="w-full h-full md:h-auto md:max-h-full overflow-y-auto p-4 md:p-6 rounded-none md:rounded-[8px] bg-[rgba(8,8,12,0.95)] border border-[rgba(237,233,228,0.10)] shadow-2xl backdrop-blur-xl pointer-events-auto animate-in slide-in-from-right duration-300">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(237,233,228,0.07)]">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-[#c8964a]" />
            <div>
              <h2 id="quiz-title" className="text-lg font-outfit font-bold text-[#ede9e4]">
                Misiones & Cuestionarios del Cosmos
              </h2>
              <span className="text-xs font-mono text-[#7aafc8]">
                Reto Activo: {profile.badge}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
            aria-label="Cerrar cuestionario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Indicador de progreso */}
            <div className="flex items-center justify-between text-xs font-mono text-[rgba(237,233,228,0.5)] mb-2">
              <span>PREGUNTA {currentIndex + 1} DE {COSMIC_QUIZ.length}</span>
              <span>PUNTUACIÓN: <strong className="text-[#c8964a]">{score}</strong></span>
            </div>

            <div className="w-full bg-[rgba(237,233,228,0.08)] h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-[#7aafc8] h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / COSMIC_QUIZ.length) * 100}%` }}
              />
            </div>

            {/* Pregunta */}
            <h3 className="text-base font-outfit font-bold text-[#ede9e4] mb-4 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Opciones */}
            <div className="space-y-2 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let btnStyle = 'bg-[rgba(237,233,228,0.04)] border-[rgba(237,233,228,0.07)] text-[#ede9e4] hover:bg-[rgba(237,233,228,0.08)]';

                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-500/20 border-red-400 text-red-300';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-[rgba(122,175,200,0.2)] border-[rgba(122,175,200,0.3)] text-[#ede9e4] shadow-md';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 rounded-[6px] border text-xs font-medium transition-all flex items-center justify-between min-h-[44px] ${btnStyle}`}
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
              <div className="p-3.5 rounded-[6px] bg-[rgba(122,175,200,0.1)] border border-[rgba(122,175,200,0.2)] text-xs text-[rgba(237,233,228,0.6)] mb-6 leading-relaxed font-medium">
                <span className="font-outfit font-bold text-[#8ec5dc] block mb-1">💡 Explicación Científica:</span>
                {currentQ.explanation}
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex justify-end">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className={`w-full md:w-auto px-6 py-3 md:py-2.5 rounded-[6px] font-outfit font-bold text-xs transition-all min-h-[44px] md:min-h-0 ${
                    selectedOption !== null
                      ? 'bg-[#7aafc8] hover:bg-[#8ec5dc] text-black shadow-lg shadow-[rgba(122,175,200,0.15)]'
                      : 'bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.4)] cursor-not-allowed'
                  }`}
                >
                  Comprobar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full md:w-auto px-6 py-3 md:py-2.5 rounded-[6px] bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-[#ede9e4] font-outfit font-bold text-xs shadow-lg shadow-purple-500/25 transition-all min-h-[44px] md:min-h-0"
                >
                  {currentIndex < COSMIC_QUIZ.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultado Final'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Pantalla final de resultados */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-[#c8964a] border border-[rgba(200,150,74,0.3)] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-outfit font-bold text-[#ede9e4]">
              ¡Cuestionario Completado!
            </h3>

            <p className="text-sm text-[rgba(237,233,228,0.6)]">
              Has acertado <strong className="text-[#c8964a]">{score}</strong> de <strong className="text-[#ede9e4]">{COSMIC_QUIZ.length}</strong> preguntas cósmicas.
            </p>

            <div className="p-4 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] inline-block text-xs font-mono text-[#8ec5dc]">
              INSIGNIA DESBLOQUEADA: <strong className="text-[#ede9e4] font-bold">{profile.badge}</strong>
            </div>

            <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
              <button
                onClick={handleRestart}
                className="w-full md:w-auto px-5 py-2.5 rounded-[6px] bg-[rgba(237,233,228,0.08)] hover:bg-[rgba(237,233,228,0.12)] text-[#ede9e4] font-outfit font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors min-h-[44px] md:min-h-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Repetir Cuestionario</span>
              </button>
              <button
                onClick={onClose}
                className="w-full md:w-auto px-6 py-2.5 rounded-[6px] bg-[#7aafc8] hover:bg-[#8ec5dc] text-black font-outfit font-bold text-xs transition-colors min-h-[44px] md:min-h-0"
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
