
import React from 'react';
import { UserProfile, Gender, Level } from '../types';
import { CITIES, ZELLIGE_PATTERN, LEVELS } from '../constants';

interface WorldMapProps {
  user: UserProfile;
  onSelectLevel: (levelId: string) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ user, onSelectLevel }) => {
  const completedCount = user.completedLevels.length;
  const totalLevels = LEVELS.length;
  const progressPercent = (completedCount / totalLevels) * 100;

  return (
    <div className="relative h-full flex flex-col bg-sky-100 overflow-hidden mosaic-pattern">
      {/* Top UI Header with Progress Bar */}
      <div className="relative z-20 bg-white/95 backdrop-blur-sm shadow-md p-4 pt-10 flex flex-col gap-3 border-b-2 border-amber-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200 shadow-sm">
              <span className="text-sm">🔥</span>
              <span className="font-black text-orange-700 text-xs">{user.streak}</span>
            </div>
            <div className="flex items-center space-x-1 bg-red-100 px-2.5 py-1 rounded-full border border-red-200 shadow-sm">
              <span className="text-sm">❤️</span>
              <span className="font-black text-red-700 text-xs">{user.hearts}</span>
            </div>
          </div>
          
          <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full border border-accent/30 shadow-sm">
            <span className="text-accent material-icons-round text-sm mr-1">monetization_on</span>
            <span className="text-xs font-black text-primary">{user.score.toLocaleString()}</span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-4 bg-gray-100 rounded-full border-2 border-gray-200 overflow-hidden relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Shine effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-full"></div>
            </div>
          </div>
          <span className="text-[10px] font-black text-primary uppercase whitespace-nowrap">
            Rabat: {completedCount}/{totalLevels}
          </span>
        </div>
      </div>

      {/* Map Content - Duolingo Style Path */}
      <div className="relative flex-1 bg-background-light overflow-y-auto scrollbar-hide pb-24">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {ZELLIGE_PATTERN}
        </div>

        {/* Path Curve */}
        <svg className="absolute inset-0 w-full h-[2000px] pointer-events-none opacity-20">
          <path 
            d="M 50 100 Q 80 300 30 500 T 50 800 T 70 1100 T 40 1400" 
            fill="none" 
            stroke="#93441A" 
            strokeWidth="12" 
            strokeDasharray="15,20" 
            strokeLinecap="round"
          />
        </svg>

        <div className="relative py-12 flex flex-col items-center space-y-24 min-h-[1200px]">
          {LEVELS.map((level, idx) => {
            const isCompleted = user.completedLevels.includes(level.id);
            const isAccessible = idx === 0 || user.completedLevels.includes(LEVELS[idx-1].id);
            const isCurrent = isAccessible && !isCompleted;
            
            const xOffset = Math.sin(idx * 1.5) * 60;

            return (
              <div 
                key={level.id}
                className="relative flex flex-col items-center"
                style={{ transform: `translateX(${xOffset}px)` }}
              >
                <button
                  onClick={() => isAccessible && onSelectLevel(level.id)}
                  disabled={!isAccessible}
                  className={`
                    relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl
                    ${isCompleted ? 'bg-emerald-500 border-b-8 border-emerald-700' : 
                      isCurrent ? 'bg-secondary border-b-8 border-primary animate-pulse' : 
                      'bg-gray-200 border-b-8 border-gray-400 grayscale cursor-not-allowed'}
                    hover:scale-105 active:translate-y-1 active:border-b-4
                  `}
                >
                  <span className={`material-icons-round text-3xl text-white`}>
                    {isCompleted ? 'check' : isCurrent ? 'play_arrow' : 'lock'}
                  </span>
                  
                  {isCurrent && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1.5 rounded-xl shadow-lg border-2 border-secondary font-display font-bold text-primary text-[10px] uppercase animate-bounce">
                       C'est parti !
                       <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
                    </div>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <h3 className={`font-black text-[10px] uppercase tracking-widest ${isAccessible ? 'text-primary' : 'text-gray-400'}`}>
                    {level.title}
                  </h3>
                </div>

                {idx === 0 && (
                  <div className="absolute -left-28 top-0 pointer-events-none opacity-40">
                    <span className="material-icons-round text-6xl text-primary">fort</span>
                    <p className="font-display font-bold text-[8px] uppercase text-primary text-center">Kasbah</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
