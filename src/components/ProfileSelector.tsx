import React from 'react';
import { ProfileId, USER_PROFILES, UserProfile } from '../data/profiles';
import { X, Check, ShieldCheck } from 'lucide-react';

interface ProfileSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: ProfileId;
  onSelectProfile: (id: ProfileId) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  isOpen,
  onClose,
  activeProfile,
  onSelectProfile
}) => {
  if (!isOpen) return null;

  const profilesList = Object.values(USER_PROFILES) as UserProfile[];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-black/80 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="profile-selector-title">
      <div className="relative w-full md:max-w-2xl p-4 md:p-6 rounded-t-[12px] md:rounded-[8px] bg-[rgba(8,8,12,1)]/90 border border-[rgba(237,233,228,0.10)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(237,233,228,0.07)]">
          <div>
            <h2 id="profile-selector-title" className="text-xl font-outfit font-bold text-[#ede9e4] flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-[#7aafc8]" />
              <span>Selecciona tu Perfil de Observador</span>
            </h2>
            <p className="text-xs text-[rgba(237,233,228,0.5)] mt-1">
              La interfaz y las explicaciones del Universo se adaptarán automáticamente a tu nivel y entorno.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
            aria-label="Cerrar ventana de selección de perfil"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de perfiles adaptativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {profilesList.map((profile) => {
            const isSelected = profile.id === activeProfile;
            return (
              <button
                key={profile.id}
                onClick={() => {
                  onSelectProfile(profile.id);
                  onClose();
                }}
                className={`flex flex-col text-left p-4 rounded-[6px] border transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[rgba(122,175,200,0.15)] border-[rgba(122,175,200,0.3)] shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                    : 'bg-[rgba(237,233,228,0.04)] border-[rgba(237,233,228,0.07)] hover:border-white/30 hover:bg-[rgba(237,233,228,0.08)]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-mono tracking-wider font-bold px-2 py-0.5 rounded-full bg-black/40 text-[#8ec5dc] border border-[rgba(122,175,200,0.3)]/30">
                    {profile.badge}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#7aafc8] flex items-center justify-center text-black font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <h3 className="text-base font-outfit font-bold text-[#ede9e4] mt-2 group-hover:text-[#8ec5dc] transition-colors">
                  {profile.name}
                </h3>
                <span className="text-[11px] font-medium text-[#7aafc8] mb-2">
                  {profile.subtitle}
                </span>

                <p className="text-xs text-[rgba(237,233,228,0.6)] leading-relaxed">
                  {profile.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Pie del modal */}
        <div className="mt-4 md:mt-6 pt-4 border-t border-[rgba(237,233,228,0.07)] flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[rgba(237,233,228,0.5)] flex-shrink-0">
          <span className="hidden md:inline">Modo Kiosko ideal para museos con temporizador auto-guiado.</span>
          <button
            onClick={onClose}
            className="w-full md:w-auto px-4 py-3 md:py-2 rounded-[4px] bg-[rgba(237,233,228,0.08)] hover:bg-[rgba(237,233,228,0.12)] text-[#ede9e4] font-medium transition-colors min-h-[44px] md:min-h-0"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
