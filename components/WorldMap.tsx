
import React from 'react';
// Added Gender to the imported types
import { UserProfile, City, Gender } from '../types';
import { CITIES, ZELLIGE_PATTERN, LEVELS } from '../constants';

interface WorldMapProps {
  user: UserProfile;
  onSelectLevel: (levelId: string) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ user, onSelectLevel }) => {
  return (
    <div className="relative h-full flex flex-col bg-sky-100 overflow-hidden">
      {/* Top UI Header */}
      <div className="relative z-20 bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full">
            <span className="text-orange-500 font-bold">🔥</span>
            <span className="font-bold text-orange-700">{user.streak}</span>
          </div>
          <div className="flex items-center space-x-1 bg-red-100 px-3 py-1 rounded-full">
            <span className="text-red-500 font-bold">❤️</span>
            <span className="font-bold text-red-700">{user.hearts}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-amber-100 px-4 py-1 rounded-full border border-amber-200 flex items-center">
            <span className="text-xs font-bold text-amber-800 mr-2">NIVEAU</span>
            <span className="text-lg font-bold text-amber-900">{Math.floor(user.score / 500) + 1}</span>
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="relative flex-1 bg-[#f9ebca] overflow-y-auto">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {ZELLIGE_PATTERN}
        </div>

        {/* Path lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path 
            d="M 50 120 Q 70 250 30 380 T 50 600" 
            fill="none" 
            stroke="#C19A6B" 
            strokeWidth="8" 
            strokeDasharray="12,12" 
            className="opacity-40"
          />
        </svg>

        <div className="relative min-h-[1000px] py-20 px-4">
          {CITIES.map((city, idx) => {
            const isCompleted = user.completedLevels.some(lId => 
              LEVELS.find(l => l.id === lId)?.cityId === city.id
            );
            const isAccessible = idx === 0 || user.completedLevels.length > 0; // Simple unlock logic

            return (
              <div 
                key={city.id}
                className="relative mb-32 flex flex-col items-center"
                style={{
                  transform: `translateX(${(city.position.x - 50) * 2}px)`
                }}
              >
                {/* Node */}
                <button
                  onClick={() => isAccessible && onSelectLevel(LEVELS.find(l => l.cityId === city.id)!.id)}
                  disabled={!isAccessible}
                  className={`
                    relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl
                    ${isAccessible ? `${city.color} ${city.accent} border-b-8 hover:scale-105 active:translate-y-1 active:border-b-4` : 'bg-gray-300 border-gray-400 border-b-4 grayscale cursor-not-allowed'}
                  `}
                >
                  <div className="text-4xl transform -translate-y-1">
                    {city.id === 'rabat' ? '🕌' : city.id === 'marrakech' ? '🕌' : '🏘️'}
                  </div>
                  
                  {isAccessible && (
                     <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full shadow-md">
                        <span className="text-xs">⭐</span>
                     </div>
                  )}
                </button>

                {/* City Label */}
                <div className="mt-4 text-center">
                  <h3 className={`font-bold text-lg ${isAccessible ? 'text-amber-900' : 'text-gray-400'}`}>
                    {city.name}
                  </h3>
                  <p className="text-xs text-amber-800 opacity-60 max-w-[120px]">
                    {city.description}
                  </p>
                </div>

                {/* Avatar positioning if current */}
                {idx === user.completedLevels.length && (
                  <div className="absolute -top-12 animate-bounce">
                    <div className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md mb-1 shadow-sm uppercase">
                      Tu es ici !
                    </div>
                    <div className="text-4xl text-center">
                      {user.avatar === Gender.BOY ? '👳‍♂️' : '🧕'}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile Bar */}
      <div className="relative z-20 bg-amber-900 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl overflow-hidden">
            {user.avatar === Gender.BOY ? '👳‍♂️' : '🧕'}
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">{user.name}</p>
            <p className="text-amber-200 text-xs mt-1">Savant d'Algorithmique</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-amber-300 text-[10px] font-bold uppercase">Points de Sagesse</p>
          <p className="text-xl font-bold text-white leading-none">{user.score}</p>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
