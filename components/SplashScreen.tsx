
import React from 'react';
import { ZELLIGE_PATTERN } from '../constants';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="relative h-full flex flex-col items-center bg-[#FFF3D6] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        {ZELLIGE_PATTERN}
      </div>

      {/* Profile-style Header */}
      <div className="relative w-full pt-20 pb-12 px-8 text-center bg-[#FFDFB0] rounded-b-[4rem] shadow-md z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none scale-150">
          {ZELLIGE_PATTERN}
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-1 bg-[#93441A]/20 rounded-full mb-6"></div>
          <h1 className="text-4xl font-display font-black text-[#93441A] uppercase tracking-tighter leading-none">
            Ibn Battuta
          </h1>
          <p className="text-[10px] font-black text-[#93441A]/60 uppercase tracking-[0.3em] mt-3">
            La Voûte de l'Algorithmique
          </p>
        </div>
      </div>

      {/* Main Illustration Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-10">
        <div className="relative">
          <div className="w-56 h-56 rounded-[3rem] bg-white shadow-2xl border-4 border-[#DAAB3A]/20 flex items-center justify-center overflow-hidden rotate-3">
             <img 
              src="https://images.unsplash.com/photo-1539667468225-eebb663053e6?auto=format&fit=crop&q=80&w=500" 
              alt="Moroccan Architecture" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#93441A]/40 to-transparent"></div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-3xl shadow-xl border-2 border-[#DAAB3A] -rotate-6 flex flex-col items-center">
             <span className="text-2xl">🐍</span>
             <span className="text-[8px] font-black text-[#93441A] uppercase mt-1">Python Ready</span>
          </div>
        </div>

        <div className="mt-12 text-center space-y-2">
          <h2 className="text-xl font-black text-[#93441A] uppercase tracking-tight">Prêt pour l'aventure ?</h2>
          <p className="text-sm font-bold text-[#93441A]/50 max-w-[200px] leading-tight">
            Explore les cités médiévales et maîtrise l'art du code.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="relative z-20 w-full p-10 mb-4">
        <button 
          onClick={onStart}
          className="w-full bg-[#DAAB3A] hover:bg-[#C99A26] active:translate-y-1 py-6 px-8 rounded-[2.5rem] shadow-[0_8px_0_#A67C1A] flex items-center justify-center gap-4 group transition-all"
        >
          <span className="text-white font-black text-lg uppercase tracking-[0.1em]">
            Commencer
          </span>
          <span className="material-icons-round text-white group-hover:translate-x-2 transition-transform">
            explore
          </span>
        </button>
      </div>

      {/* Background Decor */}
      <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-[#DAAB3A]/10 rounded-full blur-[80px] pointer-events-none"></div>
    </div>
  );
};

export default SplashScreen;
