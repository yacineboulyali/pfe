
import React from 'react';
import { UserProfile, Gender } from '../types';
import { ZELLIGE_PATTERN } from '../constants';

interface LeaderboardScreenProps {
  user: UserProfile;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ user }) => {
  const topPlayers = [
    { name: 'MUSTAFA', points: 2563, rank: 2, avatar: '🦁', color: 'bg-secondary' },
    { name: 'BATUTA.PY', points: 3142, rank: 1, avatar: '👳‍♂️', color: 'bg-primary' },
    { name: 'LAILA', points: 2120, rank: 3, avatar: '🧕', color: 'bg-accent' },
  ];

  const others = [
    { name: 'Hassan S.', title: '+4', points: 1842, rank: 4, avatar: '👤', trend: 'up' },
    { name: 'You', title: '(Pythonista)', points: user.score, rank: 5, avatar: user.avatar === Gender.BOY ? '👳‍♂️' : '🧕', isUser: true },
    { name: 'Fatima Z.', title: '-2', points: 1256, rank: 6, avatar: '👤', trend: 'down' },
    { name: 'Omar M.', title: '+1', points: 1120, rank: 7, avatar: '👤', trend: 'up' },
  ];

  return (
    <div className="relative h-full flex flex-col bg-[#FFF3D6] overflow-y-auto pb-24 scrollbar-hide">
      {/* Back Button */}
      <div className="absolute top-10 left-6 z-30">
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-lg active:scale-95 transition-all">
          <span className="material-icons-round">arrow_back</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="relative pt-16 pb-8 px-8 text-center bg-[#FFDFB0] rounded-b-[3rem] shadow-sm">
        <h1 className="text-3xl font-display font-black text-[#93441A] uppercase tracking-tight leading-none">
          Global Adventurer
        </h1>
        <p className="text-[10px] font-black text-[#93441A]/60 uppercase tracking-[0.2em] mt-1">
          Leaderboard
        </p>

        {/* Podium Area */}
        <div className="flex items-end justify-center gap-2 mt-12 h-64">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-14 h-14 rounded-full border-4 border-[#C19A6B] overflow-hidden bg-white shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-2xl">{topPlayers[0].avatar}</div>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#93441A] px-2 py-0.5 rounded-full text-[8px] font-bold text-white whitespace-nowrap">
                {topPlayers[0].points.toLocaleString()} pt
              </div>
            </div>
            <div className="w-20 h-28 bg-[#B67332] rounded-t-2xl shadow-xl flex flex-col items-center pt-4 border-t-4 border-white/20">
               <span className="text-3xl font-black text-white leading-none">2</span>
               <span className="text-[8px] font-black text-white/80 uppercase mt-1">{topPlayers[0].name}</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2 scale-110 z-10">
              <div className="w-18 h-18 rounded-full border-4 border-[#DAAB3A] overflow-hidden bg-white shadow-2xl relative">
                <div className="w-full h-full flex items-center justify-center text-3xl">{topPlayers[1].avatar}</div>
                <div className="absolute top-0 right-0 w-5 h-5 bg-[#DAAB3A] rounded-full border-2 border-white flex items-center justify-center">
                   <span className="text-[10px]">⭐</span>
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#93441A] px-2 py-0.5 rounded-full text-[9px] font-black text-white whitespace-nowrap border border-white/20">
                {topPlayers[1].points.toLocaleString()} pt
              </div>
            </div>
            <div className="w-24 h-36 bg-[#93441A] rounded-t-3xl shadow-2xl flex flex-col items-center pt-6 border-t-4 border-white/20">
               <span className="text-4xl font-black text-white leading-none">1</span>
               <span className="text-[10px] font-black text-white/80 uppercase mt-2">{topPlayers[1].name}</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-14 h-14 rounded-full border-4 border-[#EBD6B5] overflow-hidden bg-white shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-2xl">{topPlayers[2].avatar}</div>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#93441A] px-2 py-0.5 rounded-full text-[8px] font-bold text-white whitespace-nowrap">
                {topPlayers[2].points.toLocaleString()} pt
              </div>
            </div>
            <div className="w-20 h-24 bg-[#DAAB3A] rounded-t-2xl shadow-xl flex flex-col items-center pt-4 border-t-4 border-white/20">
               <span className="text-3xl font-black text-white leading-none">3</span>
               <span className="text-[8px] font-black text-white/80 uppercase mt-1">{topPlayers[2].name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1 px-4 py-8 flex flex-col gap-4">
        {others.map((p) => (
          <div 
            key={p.rank} 
            className={`
              flex items-center gap-4 p-4 rounded-3xl transition-all
              ${p.isUser ? 'bg-white border-4 border-[#DAAB3A] shadow-xl relative z-10 scale-[1.02]' : 'bg-transparent'}
            `}
          >
            <span className="text-lg font-black text-[#93441A]/40 w-6 text-center">{p.rank}</span>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-inner ${p.isUser ? 'bg-[#7EC1B5]' : 'bg-gray-200'}`}>
              {p.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                 <h4 className="font-bold text-primary">{p.name}</h4>
                 <span className={`text-[10px] font-black uppercase ${p.trend === 'up' ? 'text-emerald-500' : p.trend === 'down' ? 'text-rose-500' : 'text-amber-600'}`}>
                    {p.trend === 'up' && '▲'} {p.trend === 'down' && '▼'} {p.title}
                 </span>
              </div>
            </div>
            <div className="bg-[#F8E6C3] px-4 py-1.5 rounded-full border border-[#DAAB3A]/30 shadow-sm flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#DAAB3A]"></div>
               <span className="text-xs font-black text-[#93441A]">{p.points.toLocaleString()} pt</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action / Theme Toggle */}
      <div className="fixed bottom-24 right-6 z-50">
         <button className="w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-gray-100 active:scale-90 transition-all">
            <span className="material-icons-round text-primary">nights_stay</span>
         </button>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
