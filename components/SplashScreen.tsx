
import React from 'react';
import { ZELLIGE_PATTERN } from '../constants';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="relative h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-orange-400 to-amber-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        {ZELLIGE_PATTERN}
      </div>

      {/* Clouds/Silhouette */}
      <div className="absolute top-1/4 w-full h-1/2 bg-no-repeat bg-center opacity-30" style={{ backgroundImage: "url('https://picsum.photos/seed/morocco/400/300')", mixBlendMode: 'overlay' }}></div>

      {/* Header Scroll */}
      <div className="relative z-10 mt-12 w-full animate-bounce">
        <div className="bg-[#EBD6B5] border-y-4 border-[#C19A6B] py-4 px-6 shadow-xl transform -rotate-1">
          <h1 className="text-2xl font-bold text-amber-900 text-center uppercase tracking-widest arabic-font">
            Ibn Battuta
          </h1>
          <p className="text-sm font-semibold text-amber-800 text-center uppercase italic">
            La Voûte de l'Algorithmique
          </p>
        </div>
      </div>

      {/* Character Animation Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 bg-white/20 rounded-full border-4 border-white/30 flex items-center justify-center overflow-hidden">
           <img 
            src="https://picsum.photos/seed/battuta/200/200" 
            alt="Ibn Battuta" 
            className="w-40 h-40 object-cover rounded-full border-2 border-white/50"
          />
        </div>
        <div className="mt-4 text-white text-center">
          <p className="font-bold text-lg drop-shadow-md">Explore le Maroc &</p>
          <p className="font-bold text-lg drop-shadow-md">Apprends Python !</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 w-full mb-8">
        <button 
          onClick={onStart}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all py-5 px-8 rounded-2xl shadow-[0_6px_0_#059669] border-2 border-emerald-400 text-white font-bold text-xl uppercase"
        >
          Commencer l'Aventure !
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
