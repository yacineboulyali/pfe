
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
    <div className="relative h-full flex flex-col bg-[#FFF3D6] overflow-y-auto scrollbar-hide font-body">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {ZELLIGE_PATTERN}
      </div>

      {/* Profile-style Header */}
      <div className="relative z-30 pt-16 pb-12 px-8 text-center bg-[#FFDFB0] rounded-b-[3.5rem] shadow-sm">
        <div className="absolute top-10 left-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#93441A] shadow-lg active:scale-95 transition-all"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
        </div>
        
        <h1 className="text-3xl font-display font-black text-[#93441A] uppercase tracking-tight leading-none mt-4">
          Configuration
        </h1>
        <p className="text-[10px] font-black text-[#93441A]/60 uppercase tracking-[0.2em] mt-2">
          Carnet de Voyageur
        </p>

        {/* Tab Switcher Style Profil */}
        <div className="flex bg-[#93441A]/5 p-1 rounded-2xl mt-8 max-w-[240px] mx-auto border border-[#93441A]/10">
          <button 
            onClick={() => setMode('nouveau')}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'nouveau' ? 'bg-white text-[#93441A] shadow-sm' : 'text-[#93441A]/40'}`}
          >
            Nouveau
          </button>
          <button 
            onClick={() => setMode('existant')}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'existant' ? 'bg-white text-[#93441A] shadow-sm' : 'text-[#93441A]/40'}`}
          >
            Existant
          </button>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="relative z-10 px-6 mt-8 space-y-6 pb-32">
        
        {/* Username Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-transparent hover:border-[#DAAB3A]/20 transition-all">
          <label className="block text-[10px] font-black text-[#93441A]/40 uppercase tracking-[0.2em] mb-3 ml-1">
            Nom de voyageur
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ton pseudo..."
              className="w-full bg-[#FBF7F0] border-2 border-transparent rounded-2xl py-4 px-5 text-[#93441A] font-black text-sm uppercase tracking-wide focus:outline-none focus:border-[#DAAB3A]/40 focus:bg-white transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg flex items-center gap-1">
              <span className="material-icons-round text-xs">verified</span>
              <span className="text-[8px] font-black uppercase tracking-tighter">Prêt</span>
            </div>
          </div>
        </div>

        {/* Security Key Card (Style "Room Code") */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-[#DAAB3A]/30 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#B67332]">
              <span className="material-icons-round">key</span>
            </div>
            <div>
              <h3 className="text-xs font-black text-[#93441A] uppercase tracking-tight">Code Secret</h3>
              <p className="text-[9px] text-[#93441A]/50 uppercase font-bold tracking-widest italic">À noter précieusement</p>
            </div>
          </div>

          <div className="relative bg-[#FBF7F0] border-2 border-dashed border-[#DAAB3A]/40 rounded-2xl p-4 flex items-center justify-between group focus-within:border-[#DAAB3A] transition-all">
            <input 
              type="text"
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value.toUpperCase())}
              className="bg-transparent text-xl font-mono font-black text-[#93441A] tracking-[0.3em] outline-none w-full placeholder:opacity-20"
              spellCheck={false}
            />
            <button 
              onClick={handleCopy}
              className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#DAAB3A] shadow-sm active:scale-90 transition-all border border-[#DAAB3A]/10"
              title="Copier le code"
            >
              <span className="material-icons-round text-lg">content_copy</span>
            </button>
          </div>
          
          <p className="text-[8px] font-bold text-[#93441A]/30 text-center mt-4 leading-relaxed uppercase tracking-wider">
            Utilise ce code pour retrouver ta progression sur un autre parchemin.
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSubmit}
          className="w-full bg-[#DAAB3A] hover:bg-[#C99A26] active:translate-y-1 py-6 rounded-[2.5rem] shadow-[0_6px_0_#A67C1A] flex items-center justify-center gap-3 group transition-all"
        >
          <span className="text-white font-black text-sm uppercase tracking-[0.2em]">
            {mode === 'nouveau' ? "Ouvrir le Journal" : "Continuer l'Odyssée"}
          </span>
          <span className="material-icons-round text-white group-hover:translate-x-1 transition-transform">
            auto_stories
          </span>
        </button>
      </div>

      {/* Background Decor */}
      <div className="fixed top-1/2 -right-20 w-64 h-64 bg-[#DAAB3A]/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="fixed bottom-10 -left-20 w-48 h-48 bg-[#FFDFB0]/20 rounded-full blur-[60px] pointer-events-none"></div>
    </div>
  );
};

export default AuthScreen;
