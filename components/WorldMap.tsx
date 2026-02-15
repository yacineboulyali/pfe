
import React from 'react';
import { UserProfile, Gender, Level } from '../types';
import { CITIES, ZELLIGE_PATTERN, LEVELS } from '../constants';

interface WorldMapProps {
  user: UserProfile;
  onSelectLevel: (levelId: string) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ user, onSelectLevel }) => {
  return (
    <div className="relative h-full flex flex-col bg-sky-100 overflow-hidden mosaic-pattern">
      {/* Top UI Header */}
      <div className="relative z-20 bg-white/90 backdrop-blur-sm shadow-md p-4 flex justify-between items-center border-b-2 border-amber-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
            <span className="text-orange-500 font-bold">🔥</span>
            <span className="font-bold text-orange-700">{user.streak}</span>
          </div>
          <div className="flex items-center space-x-1 bg-red-100 px-3 py-1 rounded-full border border-red-200">
            <span className="text-red-500 font-bold">❤️</span>
            <span className="font-bold text-red-700">{user.hearts}</span>
          </div>
        </div>
        <div className="flex items-center bg-amber-50 px-4 py-1 rounded-full border border-accent/30 shadow-sm">
          <span className="text-accent material-icons-round text-sm mr-1">monetization_on</span>
          <span className="text-sm font-bold text-primary">{user.score.toLocaleString()}</span>
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

        <div className="relative py-20 flex flex-col items-center space-y-24 min-h-[1200px]">
          {LEVELS.map((level, idx) => {
            const isCompleted = user.completedLevels.includes(level.id);
            const isAccessible = idx === 0 || user.completedLevels.includes(LEVELS[idx-1].id);
            const isCurrent = isAccessible && !isCompleted;
            
            // Calcul d'un décalage horizontal sinusoïdal pour le sentier
            const xOffset = Math.sin(idx * 1.5) * 60;

            return (
              <div 
                key={level.id}
                className="relative flex flex-col items-center"
                style={{ transform: `translateX(${xOffset}px)` }}
              >
                {/* Level Node */}
                <button
                  onClick={() => isAccessible && onSelectLevel(level.id)}
                  disabled={!isAccessible}
                  className={`
                    relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl
                    ${isCompleted ? 'bg-emerald-500 border-b-8 border-emerald-700' : 
                      isCurrent ? 'bg-secondary border-b-8 border-primary animate-pulse' : 
                      'bg-gray-300 border-b-8 border-gray-400 grayscale cursor-not-allowed'}
                    hover:scale-105 active:translate-y-1 active:border-b-4
                  `}
                >
                  <span className={`material-icons-round text-3xl text-white`}>
                    {isCompleted ? 'check' : isCurrent ? 'play_arrow' : 'lock'}
                  </span>
                  
                  {isCurrent && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1.5 rounded-xl shadow-lg border-2 border-secondary font-display font-bold text-primary text-[10px] uppercase">
                       C'est parti !
                       <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
                    </div>
                  )}
                </button>

                {/* Level Title */}
                <div className="mt-4 text-center">
                  <h3 className={`font-bold text-xs uppercase tracking-widest ${isAccessible ? 'text-primary' : 'text-gray-400'}`}>
                    {level.title}
                  </h3>
                </div>

                {/* City Marker (Every few levels) */}
                {idx % 5 === 0 && (
                  <div className="absolute -left-24 top-0 pointer-events-none opacity-40">
                    <span className="material-icons-round text-6xl text-primary">fort</span>
                    <p className="font-display font-bold text-[8px] uppercase text-primary text-center">Rabat</p>
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
