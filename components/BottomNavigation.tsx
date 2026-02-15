
import React from 'react';
import { GameState } from '../types';

interface BottomNavigationProps {
  currentTab: GameState;
  onTabChange: (state: GameState) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: GameState.MAP, icon: 'home' },
    { id: GameState.LEADERBOARD, icon: 'stars' },
    { id: GameState.NOTIFICATIONS, icon: 'notifications' },
    { id: GameState.PROFILE, icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t-2 border-amber-100 py-3 px-6 flex justify-between items-center z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as GameState)}
            className={`flex flex-col items-center transition-all ${isActive ? 'scale-110' : 'opacity-40 grayscale hover:opacity-70'}`}
          >
            {isActive && tab.id === GameState.LEADERBOARD ? (
              <div className="w-12 h-12 rounded-full bg-[#93441A] flex items-center justify-center -mt-8 shadow-xl border-4 border-white transition-all transform animate-in zoom-in">
                 <span className="material-icons-round text-white text-2xl">emoji_events</span>
              </div>
            ) : isActive && tab.id === GameState.NOTIFICATIONS ? (
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center -mt-8 shadow-xl border-4 border-white transition-all transform animate-in zoom-in">
                 <span className="material-icons-round text-white text-2xl">notifications</span>
              </div>
            ) : (
              <span className={`material-icons-round text-2xl ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                {tab.icon}
              </span>
            )}
            {(isActive && tab.id !== GameState.LEADERBOARD && tab.id !== GameState.NOTIFICATIONS) && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1"></div>}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
