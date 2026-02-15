
import React, { useState } from 'react';
import { UserProfile, Gender } from '../types';
import { ZELLIGE_PATTERN } from '../constants';

interface Competition {
  id: string;
  code: string;
  players: number;
  status: 'active' | 'finished';
}

interface ProfileScreenProps {
  user: UserProfile;
  onInvite: (roomCode: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onInvite }) => {
  const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [competitions, setCompetitions] = useState<Competition[]>([
    { id: '1', code: 'RABAT-PROS', players: 24, status: 'active' },
    { id: '2', code: 'ALGO-TRIP', players: 8, status: 'active' }
  ]);

  const weekDays = [
    { label: 'Lu', active: true },
    { label: 'Ma', active: true },
    { label: 'Me', active: true },
    { label: 'Je', active: true },
    { label: 'Ve', active: true },
    { label: 'Sa', active: false },
    { label: 'Di', active: false },
  ];

  const handleCreateRoom = () => {
    if (!roomCode) return;
    setIsCreating(true);
    
    // Simulation de création
    setTimeout(() => {
      const newComp: Competition = {
        id: Math.random().toString(36).substr(2, 9),
        code: roomCode,
        players: 0,
        status: 'active'
      };
      setCompetitions([newComp, ...competitions]);
      setRoomCode('');
      setIsCreating(false);
    }, 1000);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/\s/g, '-').slice(0, 15);
    setRoomCode(val);
  };

  return (
    <div className="relative h-full flex flex-col bg-[#FFF3D6] overflow-y-auto pb-32 scrollbar-hide">
      {/* Decorative Header */}
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
      <div className="relative z-10 px-6 mt-8 space-y-6">
        
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

        {/* SECTION: Créer une Compétition */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-[#DAAB3A]/30 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#B67332]">
              <span className="material-icons-round">emoji_events</span>
            </div>
            <div>
              <h3 className="text-xs font-black text-[#93441A] uppercase tracking-tight">Nouvelle Compétition</h3>
              <p className="text-[9px] text-[#93441A]/50 uppercase font-bold tracking-widest">Gérer ma salle</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative bg-[#FBF7F0] border-2 border-dashed border-[#DAAB3A]/40 rounded-2xl p-3 flex flex-col gap-2 focus-within:border-[#DAAB3A] transition-all">
              <label className="text-[8px] font-black text-[#93441A]/40 uppercase tracking-widest ml-1">Code de la Room (MAJUSCULES)</label>
              <input 
                type="text"
                value={roomCode}
                onChange={handleCodeChange}
                placeholder="EX: CLASSE-MOROCCO"
                className="bg-transparent text-lg font-mono font-black text-[#93441A] tracking-widest outline-none w-full placeholder:opacity-20 uppercase"
                spellCheck={false}
              />
            </div>
            
            <button 
              onClick={handleCreateRoom}
              disabled={isCreating || !roomCode}
              className={`w-full py-4 rounded-2xl shadow-[0_4px_0_#A67C1A] flex items-center justify-center gap-3 transition-all active:translate-y-1 active:shadow-none ${
                isCreating ? 'bg-gray-200 shadow-[0_4px_0_#999]' : 'bg-[#DAAB3A] hover:bg-[#C99A26]'
              }`}
            >
              <span className="text-white font-black text-xs uppercase tracking-widest">
                {isCreating ? 'Création...' : 'Créer la Compétition'}
              </span>
              {!isCreating && <span className="material-icons-round text-white text-lg">add_circle</span>}
            </button>
          </div>
        </div>

        {/* SECTION: Liste des Compétitions */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
             <h3 className="text-[10px] font-black text-[#93441A]/60 uppercase tracking-[0.2em]">Mes Compétitions Actives</h3>
             <span className="bg-[#93441A]/10 text-[#93441A] text-[9px] font-bold px-2 py-0.5 rounded-full">{competitions.length}</span>
          </div>

          {competitions.length === 0 ? (
            <div className="bg-white/40 border-2 border-dashed border-[#DAAB3A]/20 rounded-3xl py-10 flex flex-col items-center gap-2">
               <span className="material-icons-round text-[#DAAB3A]/40 text-3xl">sentiment_dissatisfied</span>
               <p className="text-[10px] font-bold text-[#93441A]/30 uppercase tracking-widest">Aucune compétition créée</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {competitions.map((comp) => (
                <div key={comp.id} className="bg-white p-4 rounded-3xl shadow-lg border-2 border-white hover:border-[#DAAB3A]/30 transition-all flex items-center justify-between group animate-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center border border-amber-100 shadow-inner">
                      <span className="material-icons-round text-amber-600">stars</span>
                    </div>
                    <div>
                      <h4 className="font-mono font-black text-[#93441A] text-sm tracking-widest uppercase">{comp.code}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="material-icons-round text-[10px] text-emerald-500">groups</span>
                        <span className="text-[9px] font-black text-[#93441A]/50 uppercase tracking-tighter">
                          {comp.players} {comp.players > 1 ? 'Joueurs' : 'Joueur'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onInvite(comp.code)}
                      className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all active:scale-90 shadow-sm"
                      title="Inviter des joueurs"
                    >
                      <span className="material-icons-round text-lg">person_add</span>
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(comp.code)}
                      className="w-10 h-10 rounded-xl bg-[#FBF7F0] flex items-center justify-center text-[#DAAB3A] hover:bg-[#DAAB3A] hover:text-white transition-all active:scale-90"
                      title="Copier le code"
                    >
                      <span className="material-icons-round text-lg">content_copy</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
