
import React, { useState, useEffect } from 'react';
import { Gender } from '../types';
import { ZELLIGE_PATTERN } from '../constants';

interface AuthScreenProps {
  onComplete: (name: string, phone: string, avatar: Gender) => void;
  onBack: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onComplete, onBack }) => {
  const [mode, setMode] = useState<'nouveau' | 'existant'>('nouveau');
  const [username, setUsername] = useState('Ibn_Python');
  const [securityKey, setSecurityKey] = useState('');
  
  // Simulation d'une clé générée par défaut
  useEffect(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSecurityKey(result);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(securityKey);
  };

  const handleSubmit = () => {
    onComplete(username, "0600000000", Gender.BOY);
  };

  return (
    <div className="relative h-full flex flex-col items-center bg-gradient-to-b from-[#A65E2E] to-[#D99A26] overflow-hidden font-body">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none scale-150 rotate-12">
        {ZELLIGE_PATTERN}
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-20 w-full px-6 pt-12 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white active:scale-90 transition-all"
        >
          <span className="material-icons-round">chevron_left</span>
        </button>
        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-[#DAAB3A] rounded-full"></div>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div className="relative z-10 w-[90%] mt-8 bg-[#FBF7F0] rounded-[3.5rem] shadow-2xl p-8 flex flex-col items-center border-t-4 border-white/50">
        
        {/* Titles */}
        <h1 className="text-3xl font-display font-bold text-[#8B4513] tracking-wider mb-1">
          CONFIGURATION
        </h1>
        <p className="text-[10px] font-black text-[#A65E2E]/60 uppercase tracking-[0.2em] mb-8 text-center">
          Compte de Voyageur
        </p>

        {/* Tab Switcher */}
        <div className="w-full bg-[#F0EBE0] p-1 rounded-full flex mb-8">
          <button 
            onClick={() => setMode('nouveau')}
            className={`flex-1 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'nouveau' ? 'bg-white text-[#8B4513] shadow-md scale-[1.02]' : 'text-[#A65E2E]/40'}`}
          >
            Nouveau
          </button>
          <button 
            onClick={() => setMode('existant')}
            className={`flex-1 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${mode === 'existant' ? 'bg-white text-[#8B4513] shadow-md scale-[1.02]' : 'text-[#A65E2E]/40'}`}
          >
            Existant
          </button>
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-[10px] font-black text-[#8B4513] uppercase tracking-widest mb-2 ml-2">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border-2 border-[#D99A26]/30 rounded-3xl py-4 px-6 text-[#8B4513] font-bold focus:outline-none focus:border-[#D99A26] transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#D1FAE5] text-[#065F46] px-3 py-1.5 rounded-full flex items-center gap-1 border border-[#A7F3D0]">
                <span className="material-icons-round text-sm">check_circle</span>
                <span className="text-[9px] font-black uppercase tracking-tighter">Disponible</span>
              </div>
            </div>
          </div>

          {/* Security Key Section (Editable) */}
          <div>
            <label className="block text-[10px] font-black text-[#8B4513] uppercase tracking-widest mb-2 ml-2">
              Clé de sécurité générée
            </label>
            <div className="relative bg-[#FBF7F0] border-2 border-dashed border-[#D99A26]/40 rounded-3xl p-4 flex items-center justify-between group transition-all focus-within:border-[#D99A26]">
              <input 
                type="text"
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value.toUpperCase())}
                className="bg-transparent text-xl font-mono font-black text-[#8B4513] tracking-[0.2em] outline-none w-full"
                spellCheck={false}
              />
              <button 
                onClick={handleCopy}
                className="text-[#A65E2E] active:scale-90 transition-all ml-2 hover:text-[#8B4513]"
                title="Copier la clé"
              >
                <span className="material-icons-round">content_copy</span>
              </button>
            </div>
            <p className="text-[9px] text-[#A65E2E]/50 italic text-center mt-3 px-4 leading-tight">
              Cette clé est unique. Note-la bien dans ton carnet de voyage ! Tu peux aussi la personnaliser.
            </p>
          </div>
        </div>
      </div>

      {/* NEW Navigation Buttons Footer */}
      <div className="mt-auto mb-10 w-full px-8 flex items-center gap-4 relative z-20">
        <button 
          onClick={onBack}
          className="flex-1 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-[2rem] hover:bg-white/20 active:scale-95 transition-all shadow-lg"
        >
          Retour
        </button>
        
        <button 
          onClick={handleSubmit}
          className="flex-[2] bg-[#DAAB3A] hover:bg-[#C99A26] active:translate-y-1 py-5 rounded-[2rem] shadow-[0_6px_0_#A67C1A] flex items-center justify-center gap-3 group transition-all"
        >
          <span className="text-white font-display font-bold text-lg uppercase tracking-widest">
            {mode === 'nouveau' ? "S'inscrire" : "Connexion"}
          </span>
          <span className="material-icons-round text-white group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-white/10 blur-[50px] pointer-events-none rounded-full"></div>
    </div>
  );
};

export default AuthScreen;
