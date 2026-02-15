
import React from 'react';
import { UserProfile, Gender } from '../types';
import { ZELLIGE_PATTERN } from '../constants';

interface ProfileScreenProps {
  user: UserProfile;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
  const weekDays = [
    { label: 'Lu', active: true },
    { label: 'Ma', active: true },
    { label: 'Me', active: true },
    { label: 'Je', active: true },
    { label: 'Ve', active: true },
    { label: 'Sa', active: false },
    { label: 'Di', active: false },
  ];

  return (
    <div className="relative h-full flex flex-col bg-[#FFF3D6] overflow-y-auto pb-24 scrollbar-hide">
      {/* Decorative Header (Matching Leaderboard/Notifications) */}
      {/* Ajustement : pb-2 pour donner un peu d'air à la courbure */}
      <div className="relative pt-16 pb-2 px-8 text-center bg-[#FFDFB0] rounded-b-[3rem] shadow-sm z-20">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {ZELLIGE_PATTERN}
        </div>
        
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full border-4 border-[#DAAB3A] shadow-2xl overflow-hidden bg-white">
            <img 
              src={user.avatar === Gender.BOY 
                ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=ffdfbf" 
                : "https://api.dicebear.com/7.x/avataaars/svg?seed=Yasmine&backgroundColor=ffdfbf"} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#93441A] px-4 py-1 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5">
             <span className="text-accent material-icons-round text-[10px]">stars</span>
             <span className="text-[10px] font-black text-white uppercase tracking-wider">{user.score.toLocaleString()} XP</span>
          </div>
        </div>
        
        <h1 className="mt-6 text-3xl font-display font-black text-[#93441A] uppercase tracking-tight leading-none">
          {user.name}
        </h1>
        <p className="text-[10px] font-black text-[#93441A]/60 uppercase tracking-[0.2em] mt-2 mb-4">
          Explorateur Pythonista
        </p>
      </div>

      {/* Main Content Area */}
      {/* Modification : mt-8 pour créer l'espace demandé entre l'en-tête et les blocs suivants */}
      <div className="relative z-10 px-6 mt-8 space-y-6 pb-10">
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-[2rem] shadow-xl border-4 border-transparent hover:border-[#DAAB3A]/20 transition-all flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-2">
              <span className="text-xl">🏛️</span>
            </div>
            <span className="text-[9px] font-black text-[#93441A]/40 uppercase tracking-widest mb-1">Niveau</span>
            <span className="text-2xl font-display font-black text-[#93441A]">{user.completedLevels.length || 12}</span>
          </div>
          
          <div className="bg-white p-5 rounded-[2rem] shadow-xl border-4 border-transparent hover:border-[#DAAB3A]/20 transition-all flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-2">
              <span className="text-xl">🧭</span>
            </div>
            <span className="text-[9px] font-black text-[#93441A]/40 uppercase tracking-widest mb-1">Badge</span>
            <span className="text-2xl font-display font-black text-[#93441A]">Apprenti</span>
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-[#DAAB3A] relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black text-[#93441A] uppercase tracking-tight">Série de Voyage</h3>
            <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
              <span className="text-xs">🔥</span>
              <span className="text-[10px] font-black text-orange-700">{user.streak} JOURS</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end gap-1">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-black text-[#93441A]/30 uppercase">{day.label}</span>
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center border-2 transition-all ${day.active ? 'bg-[#93441A] border-[#93441A] text-white shadow-lg rotate-3' : 'bg-gray-50 border-gray-100 text-transparent'}`}>
                  {day.active && <span className="material-icons-round text-lg">local_fire_department</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Menu List */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border-2 border-transparent overflow-hidden">
          <button className="w-full flex items-center gap-4 px-8 py-5 hover:bg-amber-50 transition-colors border-b-2 border-amber-50">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#B67332]">
              <span className="material-icons-round">settings</span>
            </div>
            <span className="flex-1 text-left text-sm font-black text-[#93441A] uppercase tracking-tight">Paramètres</span>
            <span className="material-icons-round text-[#93441A]/20">chevron_right</span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-8 py-5 hover:bg-amber-50 transition-colors border-b-2 border-amber-50">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#B67332]">
              <span className="material-icons-round">verified_user</span>
            </div>
            <span className="flex-1 text-left text-sm font-black text-[#93441A] uppercase tracking-tight">Confidentialité</span>
            <span className="material-icons-round text-[#93441A]/20">chevron_right</span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-8 py-5 hover:bg-amber-50 transition-colors text-rose-500">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
              <span className="material-icons-round">logout</span>
            </div>
            <span className="flex-1 text-left text-sm font-black uppercase tracking-tight">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Decorative floating shapes */}
      <div className="fixed top-1/2 -left-20 w-64 h-64 bg-[#DAAB3A]/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="fixed bottom-20 -right-20 w-48 h-48 bg-[#FFDFB0]/20 rounded-full blur-[60px] pointer-events-none"></div>
    </div>
  );
};

export default ProfileScreen;
