
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
    <div className="relative h-full flex flex-col bg-background-light overflow-y-auto pb-24 mosaic-pattern">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {ZELLIGE_PATTERN}
      </div>

      {/* Header Profile Section */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-accent shadow-xl overflow-hidden bg-white">
            <img 
              src={user.avatar === Gender.BOY 
                ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=ffdfbf" 
                : "https://api.dicebear.com/7.x/avataaars/svg?seed=Yasmine&backgroundColor=ffdfbf"} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md border border-accent/20 flex items-center gap-1">
             <span className="text-accent material-icons-round text-sm">monetization_on</span>
             <span className="text-xs font-bold text-primary">{user.score.toLocaleString()} pt</span>
          </div>
        </div>
        
        <h1 className="mt-6 text-2xl font-display font-bold text-primary">{user.name}</h1>
      </div>

      {/* Stats Cards Grid */}
      <div className="relative z-10 px-6 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-amber-100 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🏛️</span>
            <span className="text-[10px] font-bold text-primary/60 uppercase">Niveau Max</span>
          </div>
          <span className="text-3xl font-display font-bold text-primary">{user.completedLevels.length || 12}</span>
        </div>
        
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-amber-100 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🧭</span>
            <span className="text-[10px] font-bold text-primary/60 uppercase">Meilleur Temps</span>
          </div>
          <span className="text-2xl font-display font-bold text-primary">1m 45s</span>
        </div>
      </div>

      {/* Daily Streak Card */}
      <div className="relative z-10 px-6 mt-6">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-amber-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-tight">Série Quotidienne</h3>
            <span className="text-accent">🔥</span>
          </div>
          
          <div className="flex justify-between items-end gap-1">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-primary/40">{day.label}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${day.active ? 'bg-secondary border-primary text-white shadow-sm' : 'bg-gray-50 border-gray-100 text-transparent'}`}>
                  {day.active && <span className="material-icons-round text-sm">local_fire_department</span>}
                </div>
              </div>
            ))}
            <div className="ml-2 flex flex-col items-center gap-2">
               <span className="text-[10px] font-bold text-primary/40">Di</span>
               <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                 <span className="text-primary font-bold">{user.streak}</span>
               </div>
            </div>
          </div>
          
          {/* Progress fill visual */}
          <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-secondary rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>

      {/* Settings Menu List */}
      <div className="relative z-10 px-6 mt-6">
        <div className="bg-white rounded-3xl shadow-sm border border-amber-100 overflow-hidden">
          <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-amber-50 transition-colors border-b border-gray-100">
            <span className="material-icons-round text-secondary">settings</span>
            <span className="flex-1 text-left text-sm font-bold text-primary">Paramètres du Profil</span>
            <span className="material-icons-round text-primary/20">chevron_right</span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-amber-50 transition-colors border-b border-gray-100">
            <span className="material-icons-round text-secondary">vpn_key</span>
            <span className="flex-1 text-left text-sm font-bold text-primary">Changer le Mot de Passe</span>
            <span className="material-icons-round text-primary/20">chevron_right</span>
          </button>
          
          <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-amber-50 transition-colors">
            <span className="material-icons-round text-secondary">help_outline</span>
            <span className="flex-1 text-left text-sm font-bold text-primary">Aide</span>
            <span className="material-icons-round text-primary/20">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
