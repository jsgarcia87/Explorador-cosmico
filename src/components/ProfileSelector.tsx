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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="profile-selector-title">
      <div className="relative w-full max-w-2xl p-6 rounded-2xl bg-slate-900/90 border border-white/15 shadow-2xl overflow-hidden">
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div>
            <h2 id="profile-selector-title" className="text-xl font-outfit font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <span>Selecciona tu Perfil de Observador</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              La interfaz y las explicaciones del Universo se adaptarán automáticamente a tu nivel y entorno.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
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
                className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-mono tracking-wider font-bold px-2 py-0.5 rounded-full bg-black/40 text-cyan-300 border border-cyan-400/30">
                    {profile.badge}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center text-black font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <h3 className="text-base font-outfit font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                  {profile.name}
                </h3>
                <span className="text-[11px] font-medium text-cyan-400 mb-2">
                  {profile.subtitle}
                </span>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {profile.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Pie del modal */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Modo Kiosko ideal para museos con temporizador auto-guiado.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
