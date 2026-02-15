
import React, { useState } from 'react';
import { Gender } from '../types';
import { ZELLIGE_PATTERN } from '../constants';

interface AuthScreenProps {
  onComplete: (name: string, phone: string, avatar: Gender) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState<Gender>(Gender.BOY);

  const handleNext = () => {
    if (step === 1 && name && phone) setStep(2);
    else if (step === 2) onComplete(name, phone, avatar);
  };

  return (
    <div className="relative h-full flex flex-col p-6 bg-amber-50">
      <div className="absolute inset-0 opacity-10 z-0">
        {ZELLIGE_PATTERN}
      </div>

      <div className="relative z-10 mt-8 mb-4">
        <div className="w-full bg-amber-200 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-500" 
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto">
        {step === 1 ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-3xl font-bold text-amber-900 leading-tight">Crée ton profil d'aventurier</h2>
            <p className="text-amber-800 opacity-80">Rejoins la caravane du savoir d'Ibn Battuta.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-amber-900 mb-1 ml-1 uppercase">Nom d'explorateur</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Yasmine"
                  className="w-full p-4 rounded-xl border-2 border-amber-200 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-amber-900 mb-1 ml-1 uppercase">Numéro de téléphone</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+212 6..."
                  className="w-full p-4 rounded-xl border-2 border-amber-200 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <h2 className="text-3xl font-bold text-amber-900 leading-tight">Choisis ton apparence</h2>
             <p className="text-amber-800 opacity-80">Personnalise ton voyageur médiéval.</p>

             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setAvatar(Gender.BOY)}
                  className={`relative p-6 rounded-2xl border-4 transition-all ${avatar === Gender.BOY ? 'border-emerald-500 bg-emerald-50 scale-105' : 'border-amber-100 bg-white'}`}
                >
                  <div className="w-full aspect-square bg-amber-100 rounded-xl mb-3 flex items-center justify-center">
                    <span className="text-4xl">👳‍♂️</span>
                  </div>
                  <span className="font-bold text-amber-900">Explorateur</span>
                  {avatar === Gender.BOY && <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full text-xs">✓</div>}
                </button>

                <button 
                  onClick={() => setAvatar(Gender.GIRL)}
                  className={`relative p-6 rounded-2xl border-4 transition-all ${avatar === Gender.GIRL ? 'border-emerald-500 bg-emerald-50 scale-105' : 'border-amber-100 bg-white'}`}
                >
                  <div className="w-full aspect-square bg-amber-100 rounded-xl mb-3 flex items-center justify-center">
                    <span className="text-4xl">🧕</span>
                  </div>
                  <span className="font-bold text-amber-900">Exploratrice</span>
                  {avatar === Gender.GIRL && <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full text-xs">✓</div>}
                </button>
             </div>
          </div>
        )}
      </div>

      <div className="relative z-10 pt-4 pb-2">
        <button 
          onClick={handleNext}
          disabled={step === 1 && (!name || !phone)}
          className={`w-full py-5 rounded-2xl shadow-[0_6px_0_#059669] border-2 border-emerald-400 text-white font-bold text-xl transition-all active:translate-y-1 active:shadow-none ${step === 1 && (!name || !phone) ? 'bg-gray-400 border-gray-300 shadow-none cursor-not-allowed grayscale' : 'bg-emerald-500'}`}
        >
          {step === 1 ? 'Recevoir le Code' : 'Commencer !'}
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
