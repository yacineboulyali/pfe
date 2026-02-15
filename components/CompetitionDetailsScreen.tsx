
import React from 'react';
import { ZELLIGE_PATTERN } from '../constants';

interface RoomPlayer {
  id: string;
  name: string;
  score: number;
  rank: number;
  avatarSeed: string;
}

interface CompetitionDetailsScreenProps {
  roomCode: string;
  onBack: () => void;
}

const ROOM_PLAYERS: RoomPlayer[] = [
  { id: 'p1', name: 'Mustafa_Algo', score: 2560, rank: 1, avatarSeed: 'Mustafa' },
  { id: 'p2', name: 'Laila_Explorer', score: 2120, rank: 2, avatarSeed: 'Laila' },
  { id: 'p3', name: 'Hassan_Bot', score: 1840, rank: 3, avatarSeed: 'Hassan' },
  { id: 'p4', name: 'Moi (Vous)', score: 1463, rank: 4, avatarSeed: 'Felix' },
  { id: 'p5', name: 'Fatima_Code', score: 1250, rank: 5, avatarSeed: 'Fatima' },
];

const CompetitionDetailsScreen: React.FC<CompetitionDetailsScreenProps> = ({ roomCode, onBack }) => {
  return (
    <div className="relative h-full flex flex-col bg-[#FFF3D6] overflow-y-auto pb-32 scrollbar-hide">
      {/* Decorative Header */}
      <div className="relative pt-16 pb-12 px-8 text-center bg-[#FFDFB0] rounded-b-[4rem] shadow-md z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none scale-150">
          {ZELLIGE_PATTERN}
        </div>
        
        <button 
          onClick={onBack}
          className="absolute top-10 left-6 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#93441A] shadow-lg active:scale-95 transition-all z-30"
        >
          <span className="material-icons-round">arrow_back</span>
        </button>

        <div className="relative z-10">
          <h1 className="text-3xl font-mono font-black text-[#93441A] tracking-widest uppercase mb-2">
            {roomCode}
          </h1>
          <div className="inline-flex items-center gap-2 bg-[#93441A] px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
             <span className="material-icons-round text-emerald-400 text-sm">groups</span>
             <span className="text-[10px] font-black text-white uppercase tracking-widest">Salle Active</span>
          </div>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="relative z-10 px-6 -mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-[2.5rem] shadow-xl border-4 border-emerald-500/20 flex flex-col items-center">
            <span className="text-2xl mb-1">🏺</span>
            <span className="text-[8px] font-black text-[#93441A]/40 uppercase tracking-widest mb-1">XP Totale</span>
            <span className="text-xl font-display font-black text-[#93441A]">9,233</span>
          </div>
          
          <div className="bg-white p-5 rounded-[2.5rem] shadow-xl border-4 border-[#DAAB3A]/20 flex flex-col items-center">
            <span className="text-2xl mb-1">🧭</span>
            <span className="text-[8px] font-black text-[#93441A]/40 uppercase tracking-widest mb-1">Joueurs</span>
            <span className="text-xl font-display font-black text-[#93441A]">{ROOM_PLAYERS.length}</span>
          </div>
        </div>
      </div>

      {/* Podium Mini section */}
      <div className="px-6 mt-8 space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-[10px] font-black text-[#93441A]/60 uppercase tracking-[0.2em]">Classement de la salle</h3>
          <span className="material-icons-round text-[#DAAB3A] text-lg">emoji_events</span>
        </div>

        <div className="space-y-3">
          {ROOM_PLAYERS.map((player) => {
            const isTop3 = player.rank <= 3;
            const medalColor = player.rank === 1 ? 'text-amber-400' : player.rank === 2 ? 'text-slate-400' : 'text-orange-600';
            const isUser = player.id === 'p4';

            return (
              <div 
                key={player.id}
                className={`
                  flex items-center gap-4 p-4 rounded-3xl transition-all
                  ${isUser ? 'bg-white border-4 border-[#DAAB3A] shadow-xl relative scale-[1.02]' : 'bg-white/50 border-2 border-transparent'}
                `}
              >
                <div className="w-8 text-center">
                   {isTop3 ? (
                     <span className={`material-icons-round text-xl ${medalColor}`}>workspace_premium</span>
                   ) : (
                     <span className="text-xs font-black text-[#93441A]/30">{player.rank}</span>
                   )}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white overflow-hidden border-2 border-[#FFDFB0] shadow-inner">
                   <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.avatarSeed}&backgroundColor=ffdfbf`} 
                    alt={player.name} 
                    className="w-full h-full object-cover"
                   />
                </div>

                <div className="flex-1">
                  <h4 className={`text-sm font-black uppercase tracking-tight ${isUser ? 'text-[#93441A]' : 'text-[#93441A]/70'}`}>
                    {player.name}
                  </h4>
                  <p className="text-[9px] font-bold text-[#93441A]/40 uppercase tracking-widest">
                    Aventurier
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-[#93441A]">{player.score.toLocaleString()}</span>
                  <span className="text-[8px] font-black text-emerald-600 uppercase">XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invite more button */}
      <div className="p-8 mt-4">
        <button className="w-full py-4 border-2 border-dashed border-[#DAAB3A] rounded-3xl text-[10px] font-black text-[#B67332] uppercase tracking-[0.2em] hover:bg-[#DAAB3A]/5 transition-all">
          + Inviter d'autres explorateurs
        </button>
      </div>

      {/* Decor */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FFF3D6] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default CompetitionDetailsScreen;
