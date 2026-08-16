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
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:justify-end md:p-4 pointer-events-none" role="dialog" aria-modal="true" aria-labelledby="astro-assistant-title">
      {/* Fondo oscuro en móvil para enfocar el bottom sheet */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm md:hidden pointer-events-auto" onClick={onClose} />
      
      <div className="relative w-full h-[85vh] md:h-auto md:w-[400px] md:max-h-[90vh] flex flex-col rounded-t-[20px] md:rounded-[8px] bg-[rgba(8,8,12,0.98)] border-t md:border border-[rgba(237,233,228,0.10)] shadow-2xl pointer-events-auto animate-in slide-in-from-bottom md:slide-in-from-right duration-300 overflow-hidden">
        
        {/* Indicador de arrastre móvil */}
        <div className="w-12 h-1.5 bg-[rgba(237,233,228,0.2)] rounded-full mx-auto mt-3 mb-1 md:hidden flex-shrink-0" />

        <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-[rgba(237,233,228,0.07)] bg-[rgba(3,3,5,1)]/70 flex-shrink-0">
          <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
            <div className="p-1.5 md:p-2 rounded-[6px] bg-purple-500/20 border border-[rgba(152,120,184,0.3)]/40 text-[#a88cc8] flex-shrink-0">
              <Bot className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="min-w-0">
              <h2 id="astro-assistant-title" className="text-sm md:text-lg font-outfit font-bold text-[#ede9e4] truncate">
                Astro-IA
              </h2>
              <span className="text-[10px] md:text-xs font-mono text-[#7aafc8]">
                Perfil: {profile.name}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              cosmicAudio.stopSpeech();
              onClose();
            }}
            className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center flex-shrink-0"
            aria-label="Cerrar asistente inteligente"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2 md:space-x-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-[#a88cc8] border border-[rgba(152,120,184,0.3)]/30 flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3 md:p-4 rounded-[8px] text-[11px] md:text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#7aafc8] text-black font-medium rounded-tr-none'
                    : 'bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] text-[#ede9e4] rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                {msg.sender === 'assistant' && (
                  <div className="mt-2 pt-2 border-t border-[rgba(237,233,228,0.07)] flex items-center justify-between text-[10px] text-[rgba(237,233,228,0.5)]">
                    <span className="hidden sm:inline">Voz Inteligente NASA</span>
                    <button
                      onClick={() => cosmicAudio.speakNarration(msg.text)}
                      title="Repetir narración"
                      className="text-[#8ec5dc] hover:text-[#ede9e4] flex items-center space-x-1 min-h-[44px] md:min-h-0"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Escuchar</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#7aafc8] flex items-center justify-center text-black font-bold flex-shrink-0">
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggestions + input */}
        <div className="p-3 md:p-4 border-t border-[rgba(237,233,228,0.07)] bg-[rgba(3,3,5,0.60)] space-y-2 md:space-y-3 flex-shrink-0">
          <div className="grid grid-cols-2 md:flex md:items-center gap-1.5 md:gap-2 md:overflow-x-auto md:pb-1">
            <span className="col-span-2 md:col-auto text-[10px] font-mono uppercase tracking-wider text-[rgba(237,233,228,0.5)] flex items-center mb-0.5 md:mb-0 md:mr-1">
              <HelpCircle className="w-3 h-3 mr-1" />
              <span>Sugerencias:</span>
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2 md:px-3 py-1.5 rounded-full bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] border border-[rgba(237,233,228,0.07)] text-[10px] md:text-xs text-[#8ec5dc] transition-colors text-left md:whitespace-nowrap min-h-[44px] md:min-h-0 flex items-center"
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
              placeholder="Pregunta sobre estrellas, agujeros negros..."
              className="flex-1 px-3 md:px-4 py-2.5 rounded-[6px] bg-black/60 border border-[rgba(237,233,228,0.10)] text-[#ede9e4] text-xs placeholder-slate-500 focus:outline-none focus:border-[rgba(122,175,200,0.3)] transition-all min-h-[44px] md:min-h-0"
            />
            <button
              type="submit"
              className="px-4 md:px-5 py-2.5 rounded-[6px] bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-[#ede9e4] font-outfit font-bold text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-purple-500/25 min-h-[44px] md:min-h-0"
            >
              <span className="hidden sm:inline">Preguntar</span>
              <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};
