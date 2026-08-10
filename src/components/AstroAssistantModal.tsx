import React, { useState } from 'react';
import { ProfileId, USER_PROFILES } from '../data/profiles';
import { X, Bot, Send, Volume2, Sparkles, User, HelpCircle } from 'lucide-react';
import { cosmicAudio } from '../engine/CosmicAudio';

interface AstroAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: ProfileId;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AstroAssistantModal: React.FC<AstroAssistantModalProps> = ({
  isOpen,
  onClose,
  activeProfile
}) => {
  const profile = USER_PROFILES[activeProfile];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `¡Hola! Soy Astro-IA, tu tutor astronómico de inteligencia artificial. Veo que estás en modo "${profile.name}". ¿En qué misterio del Universo te gustaría que indaguemos hoy?`,
      timestamp: 'Ahora'
    }
  ]);
  const [input, setInput] = useState<string>('');

  const suggestedQuestions: string[] = [
    '¿Cómo se formó el Sistema Solar?',
    '¿Qué pasa si caigo dentro de un Agujero Negro?',
    '¿Cuál es la diferencia entre un Púlsar y un Quásar?',
    '¿Por qué vemos siempre la misma cara de la Luna?'
  ];

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Ahora'
    };

    // Respuesta inteligente astrofísica adaptada según consulta
    let responseText = 'El universo está lleno de misterios fascinantes. ';
    const lower = query.toLowerCase();
    if (lower.includes('agujero') || lower.includes('negro') || lower.includes('gargantua') || lower.includes('sagitario')) {
      responseText = 'Un agujero negro es una región del espacio-tiempo donde la gravedad es tan extrema que ni los fotones de luz pueden escapar de su horizonte de sucesos. Su centro alberga una singularidad matemática.';
    } else if (lower.includes('sistema') || lower.includes('solar') || lower.includes('planetas')) {
      responseText = 'El Sistema Solar nació hace 4.6 mil millones de años del colapso gravitatorio de una nube molecular gigante. El 99.86% de la masa formó el Sol y el disco restante dio origen a los 8 planetas.';
    } else if (lower.includes('pulsar') || lower.includes('quasar') || lower.includes('quásar')) {
      responseText = 'Un Púlsar es una estrella de neutrones giratoria altamente magnetizada. Un Quásar, en cambio, es un núcleo galáctico activo supermasivo devorando materia y emitiendo luminosidad superior a mil galaxias.';
    } else if (lower.includes('luna') || lower.includes('cara')) {
      responseText = 'Vemos siempre la misma cara de la Luna debido a la "rotación sincrónica": la Luna tarda exactamente el mismo tiempo en dar una vuelta sobre sí misma que en orbitar la Tierra (27.3 días).';
    } else {
      responseText = `¡Excelente pregunta astronómica! En astrofísica, ese fenómeno se estudia analizando espectrometría lumínica y mecánica orbital. ¿Te gustaría realizar una simulación en el Laboratorio para comprobarlo?`;
    }

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'assistant',
      text: responseText,
      timestamp: 'Ahora'
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');

    if (profile.uiSettings.enableSpeechNarration) {
      cosmicAudio.speakNarration(responseText);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-[400px] max-w-[90vw] p-4 flex flex-col pointer-events-none" role="dialog" aria-modal="true" aria-labelledby="astro-assistant-title">
      <div className="w-full h-full flex flex-col rounded-[8px] bg-[rgba(8,8,12,0.95)] border border-[rgba(237,233,228,0.10)] shadow-2xl backdrop-blur-xl pointer-events-auto overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(237,233,228,0.07)] bg-[rgba(3,3,5,1)]/70">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-[6px] bg-purple-500/20 border border-[rgba(152,120,184,0.3)]/40 text-[#a88cc8]">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 id="astro-assistant-title" className="text-lg font-outfit font-bold text-[#ede9e4]">
                Astro-IA • Tutor Astronómico Inteligente
              </h2>
              <span className="text-xs font-mono text-[#7aafc8]">
                Perfil Activo: {profile.name}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              cosmicAudio.stopSpeech();
              onClose();
            }}
            className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] transition-colors"
            aria-label="Cerrar asistente inteligente"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Historial de conversación */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-[#a88cc8] border border-[rgba(152,120,184,0.3)]/30 flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-md p-4 rounded-[8px] text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#7aafc8] text-black font-medium rounded-tr-none'
                    : 'bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] text-[#ede9e4] rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                {msg.sender === 'assistant' && (
                  <div className="mt-2 pt-2 border-t border-[rgba(237,233,228,0.07)] flex items-center justify-between text-[10px] text-[rgba(237,233,228,0.5)]">
                    <span>Voz Inteligente NASA</span>
                    <button
                      onClick={() => cosmicAudio.speakNarration(msg.text)}
                      title="Repetir narración"
                      className="text-[#8ec5dc] hover:text-[#ede9e4] flex items-center space-x-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Escuchar</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#7aafc8] flex items-center justify-center text-black font-bold flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preguntas sugeridas y barra de envío */}
        <div className="p-4 border-t border-[rgba(237,233,228,0.07)] bg-[rgba(3,3,5,0.60)] space-y-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[rgba(237,233,228,0.5)] flex items-center mr-1">
              <HelpCircle className="w-3 h-3 mr-1" />
              <span>Sugerencias:</span>
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] border border-[rgba(237,233,228,0.07)] text-xs text-[#8ec5dc] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta a Astro-IA sobre estrellas, agujeros negros o física..."
              className="flex-1 px-4 py-2.5 rounded-[6px] bg-black/60 border border-[rgba(237,233,228,0.10)] text-[#ede9e4] text-xs placeholder-slate-500 focus:outline-none focus:border-[rgba(122,175,200,0.3)] transition-all"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[6px] bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-[#ede9e4] font-outfit font-bold text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-purple-500/25"
            >
              <span>Preguntar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
