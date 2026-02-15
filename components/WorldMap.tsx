
import React from 'react';
import { UserProfile, Gender, Level } from '../types';
import { CITIES, ZELLIGE_PATTERN, LEVELS } from '../constants';

interface WorldMapProps {
  user: UserProfile;
  onSelectLevel: (levelId: string) => void;
}

// Custom Flat Design Tower tailored per city
const FlatTowerIcon: React.FC<{ status: 'locked' | 'current' | 'completed', cityId: string }> = ({ status, cityId }) => {
  const isLocked = status === 'locked';
  
  // Design configuration per city
  const cityThemes: Record<string, { main: string, dark: string, accent: string, detail: string, shape: 'square' | 'dome' | 'cylindrical' | 'modern' }> = {
    rabat: {
      main: '#D97706', dark: '#B45309', accent: '#78350F', detail: '#FEF3C7', shape: 'square'
    },
    chefchaouen: {
      main: '#2563EB', dark: '#1D4ED8', accent: '#1E40AF', detail: '#DBEAFE', shape: 'dome'
    },
    marrakech: {
      main: '#93441A', dark: '#713511', accent: '#451A03', detail: '#FFEDD5', shape: 'square'
    },
    agadir: {
      main: '#F8FAFC', dark: '#CBD5E1', accent: '#64748B', detail: '#F1F5F9', shape: 'modern'
    },
    dakhla: {
      main: '#EA580C', dark: '#C2410C', accent: '#9A3412', detail: '#FFEDD5', shape: 'cylindrical'
    },
    laayoune: {
      main: '#F472B6', dark: '#DB2777', accent: '#9D174D', detail: '#FCE7F3', shape: 'square'
    }
  };

  const theme = isLocked 
    ? { main: '#CBD5E1', dark: '#94A3B8', accent: '#64748B', detail: '#F1F5F9' } 
    : (cityThemes[cityId] || cityThemes.rabat);

  const config = cityThemes[cityId] || cityThemes.rabat;

  return (
    <svg width="56" height="72" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
      {/* Tower Body Based on Shape */}
      {config.shape === 'cylindrical' ? (
        <rect x="16" y="16" width="24" height="48" rx="12" fill={theme.main} />
      ) : config.shape === 'dome' ? (
        <rect x="14" y="24" width="28" height="40" rx="4" fill={theme.main} />
      ) : (
        <rect x="12" y="16" width="32" height="48" rx="2" fill={theme.main} />
      )}
      
      {/* Side Shadow */}
      <rect x="12" y="16" width="12" height="48" fill={theme.detail} fillOpacity="0.15" />
      
      {/* City-Specific Top Detail */}
      {config.shape === 'dome' ? (
        <path d="M14 24C14 16.268 20.268 10 28 10C35.732 10 42 16.268 42 24V28H14V24Z" fill={theme.dark} />
      ) : config.shape === 'modern' ? (
        <path d="M12 16L28 4L44 16V20H12V16Z" fill={theme.dark} />
      ) : config.shape === 'cylindrical' ? (
        <circle cx="28" cy="16" r="12" fill={theme.dark} />
      ) : (
        <g>
          <rect x="10" y="10" width="36" height="6" fill={theme.dark} rx="1" />
          <rect x="14" y="6" width="4" height="6" fill={theme.dark} rx="1" />
          <rect x="26" y="6" width="4" height="6" fill={theme.dark} rx="1" />
          <rect x="38" y="6" width="4" height="6" fill={theme.dark} rx="1" />
        </g>
      )}

      {/* Decorative Elements (Windows/Arches) */}
      <rect x="24" y="30" width="8" height="12" rx="4" fill={theme.dark} />
      <rect x="26" y="32" width="4" height="8" rx="2" fill={theme.accent} fillOpacity="0.4" />
      
      {/* Status Badges */}
      {!isLocked && status === 'completed' && (
        <g transform="translate(32, 48)">
          <circle cx="10" cy="10" r="10" fill="white" />
          <circle cx="10" cy="10" r="8" fill="#10B981" />
          <path d="M7 10L9 12L13 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {isLocked && (
        <g transform="translate(20, 48)">
          <circle cx="8" cy="8" r="9" fill="white" fillOpacity="0.8" />
          <path d="M5 8V6.5C5 5.11929 6.34315 4 8 4C9.65685 4 11 5.11929 11 6.5V8H12V12H4V8H5ZM6 8H10V6.5C10 6.22386 9.10457 6 8 6C6.89543 6 6 6.22386 6 6.5V8Z" fill="#64748B" />
        </g>
      )}
    </svg>
  );
};

const WorldMap: React.FC<WorldMapProps> = ({ user, onSelectLevel }) => {
  const completedCount = user.completedLevels.length;
  const totalLevels = LEVELS.length;
  const progressPercent = (completedCount / totalLevels) * 100;

  // Spacing constants to match Tailwind layout
  const PADDING_TOP = 104; // py-12 (48) + half of button height (56)
  const ITEM_HEIGHT = 240; // button height (112) + gap space-y-32 (128)

  // Generate the polyline points to pass through button centers
  // x: 50% (center) + xOffset
  // y: PADDING_TOP + index * ITEM_HEIGHT
  const generatePathPoints = () => {
    return LEVELS.map((_, idx) => {
      const xOffset = Math.sin(idx * 1.8) * 70;
      const y = PADDING_TOP + idx * ITEM_HEIGHT;
      // We use a viewBox of 400 for a representative width of the mobile container
      const x = 200 + xOffset; 
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="relative h-full flex flex-col bg-sky-100 overflow-hidden mosaic-pattern">
      {/* Top Header */}
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

        <div className="flex items-center gap-3">
          <div className="flex-1 h-4 bg-gray-100 rounded-full border-2 border-gray-200 overflow-hidden relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-full"></div>
            </div>
          </div>
          <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
            Voyage: {completedCount}/{totalLevels}
          </span>
        </div>
      </div>

      {/* Map Content */}
      <div className="relative flex-1 bg-background-light overflow-y-auto scrollbar-hide pb-32">
        {/* Moroccan Zellige Background with 20% opacity as requested */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {ZELLIGE_PATTERN}
        </div>

        {/* Dynamic Path SVG */}
        <svg 
          className="absolute inset-0 w-full h-[1800px] pointer-events-none z-0" 
          viewBox="0 0 400 1800" 
          preserveAspectRatio="none"
        >
          <polyline 
            points={generatePathPoints()}
            fill="none" 
            stroke="#93441A" 
            strokeWidth="10" 
            strokeDasharray="15,20" 
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-20"
          />
        </svg>

        <div className="relative py-12 flex flex-col items-center space-y-32 min-h-[1600px] z-10">
          {LEVELS.map((level, idx) => {
            const isCompleted = user.completedLevels.includes(level.id);
            const isAccessible = idx === 0 || user.completedLevels.includes(LEVELS[idx-1].id);
            const isCurrent = isAccessible && !isCompleted;
            
            const xOffset = Math.sin(idx * 1.8) * 70;
            const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

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
                    relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all
                    ${isCurrent ? 'scale-110 drop-shadow-[0_0_15px_rgba(217,119,6,0.4)]' : ''}
                    hover:scale-105 active:scale-95
                  `}
                >
                  {/* Glowing pulse for active city */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full animate-ping bg-amber-400/20"></div>
                  )}
                  
                  {/* Tower Wrapper */}
                  <div className={`${isCurrent ? 'animate-bounce' : ''}`}>
                    <FlatTowerIcon status={status} cityId={level.cityId} />
                  </div>
                  
                  {isCurrent && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#93441A] px-4 py-2 rounded-2xl shadow-xl border-2 border-white font-display font-bold text-white text-[9px] uppercase tracking-widest animate-pulse">
                       {level.cityId} !
                       <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#93441A]"></div>
                    </div>
                  )}
                </button>

                <div className="mt-4 text-center max-w-[120px]">
                  <h3 className={`font-black text-[9px] uppercase tracking-widest leading-tight ${isAccessible ? 'text-primary' : 'text-gray-400'}`}>
                    {level.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
