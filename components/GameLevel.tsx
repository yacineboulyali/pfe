
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, Level, TurtleAction, CodeBlock } from '../types';
import { LEVELS, BLOCK_LABELS, ZELLIGE_PATTERN } from '../constants';

interface GameLevelProps {
  user: UserProfile;
  levelId: string;
  onFinish: (success: boolean) => void;
  onBack: () => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ user, levelId, onFinish, onBack }) => {
  const level = LEVELS.find(l => l.id === levelId)!;
  const [script, setScript] = useState<CodeBlock[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [turtlePos, setTurtlePos] = useState({ x: level.startPos.x, y: level.startPos.y, angle: level.startPos.angle });
  const [path, setPath] = useState<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const target = level.targetPath[0];
  const distance = Math.sqrt(Math.pow(turtlePos.x - target.x, 2) + Math.pow(turtlePos.y - target.y, 2));
  const isClose = distance < 60;
  const isVeryClose = distance < 20;

  const addBlock = (type: TurtleAction) => {
    if (isRunning) return;
    const newBlock: CodeBlock = { 
      id: Math.random().toString(), 
      type, 
      label: BLOCK_LABELS[type],
      text: type === 'comment' ? '' : undefined
    };
    setScript([...script, newBlock]);
  };

  const updateComment = (id: string, text: string) => {
    setScript(script.map(b => b.id === id ? { ...b, text } : b));
  };

  const removeBlock = (id: string) => {
    if (isRunning) return;
    setScript(script.filter(b => b.id !== id));
  };

  const resetLevel = () => {
    setTurtlePos({ x: level.startPos.x, y: level.startPos.y, angle: level.startPos.angle });
    setPath([]);
    setIsRunning(false);
  };

  const runCode = async () => {
    setIsRunning(true);
    let currentPos = { ...level.startPos };
    let newPath = [{ x: currentPos.x, y: currentPos.y }];

    for (const block of script) {
      if (block.type === 'comment') {
        await new Promise(r => setTimeout(r, 200));
        continue;
      }

      await new Promise(r => setTimeout(r, 500));
      
      switch (block.type) {
        case 'forward':
          const rad = (currentPos.angle * Math.PI) / 180;
          currentPos.x += Math.sin(rad) * 100;
          currentPos.y -= Math.cos(rad) * 100;
          break;
        case 'right':
          currentPos.angle = (currentPos.angle + 90) % 360;
          break;
        case 'left':
          currentPos.angle = (currentPos.angle - 90 + 360) % 360;
          break;
      }
      
      setTurtlePos({ ...currentPos });
      newPath = [...newPath, { x: currentPos.x, y: currentPos.y }];
      setPath(newPath);
    }

    const successThreshold = 20;
    const finalDistance = Math.sqrt(Math.pow(currentPos.x - target.x, 2) + Math.pow(currentPos.y - target.y, 2));
    
    setTimeout(() => {
      onFinish(finalDistance < successThreshold);
    }, 1000);
  };

  return (
    <div className="relative h-full flex flex-col bg-sky-50 overflow-hidden">
      {/* Level Header */}
      <div className="relative z-20 bg-white p-4 flex items-center justify-between border-b shadow-sm">
        <button onClick={onBack} className="text-2xl text-amber-900">✕</button>
        <div className="flex-1 px-4">
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
             <div className="bg-emerald-500 h-full w-1/3 transition-all"></div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-red-500 font-bold">❤️</span>
          <span className="font-bold text-amber-900">{user.hearts}</span>
        </div>
      </div>

      {/* Mission Text */}
      <div className="p-4 bg-amber-100 border-b border-amber-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
            🐢
          </div>
          <div>
            <h4 className="font-bold text-amber-900 text-sm">{level.title}</h4>
            <p className="text-xs text-amber-800 leading-tight">{level.mission}</p>
          </div>
        </div>
      </div>

      {/* Simulation Viewport */}
      <div className="relative h-1/3 bg-orange-50 overflow-hidden border-b-4 border-orange-200" ref={canvasRef}>
        <div className="absolute inset-0 opacity-10">
          {ZELLIGE_PATTERN}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="text-[120px] filter grayscale contrast-50">🕌</div>
        </div>

        <div 
          className={`absolute w-14 h-14 border-4 border-dashed rounded-full flex items-center justify-center transition-all duration-300 ${
            isVeryClose 
              ? 'border-emerald-600 bg-emerald-200 scale-110 shadow-[0_0_30px_rgba(16,185,129,0.8)]' 
              : isClose 
                ? 'border-emerald-400 bg-emerald-100/50 animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                : 'border-amber-400 bg-amber-100/20 opacity-70'
          }`}
          style={{ 
            left: `${target.x}px`, 
            top: `${target.y}px`, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isClose ? 'bg-emerald-600 scale-125' : 'bg-amber-600'}`}></div>
          {!isClose && (
            <div className="absolute -top-6 text-[10px] font-bold text-amber-700 bg-white/80 px-1.5 py-0.5 rounded shadow-sm border border-amber-100 whitespace-nowrap">
              Objectif
            </div>
          )}
        </div>

        <svg className="absolute inset-0 w-full h-full">
           <polyline 
             points={path.map(p => `${p.x},${p.y}`).join(' ')} 
             fill="none" 
             stroke="#10b981" 
             strokeWidth="5" 
             strokeLinecap="round" 
             strokeLinejoin="round" 
             className="drop-shadow-sm"
           />
        </svg>

        <div 
          className="absolute transition-all duration-500 ease-in-out z-30"
          style={{ 
            left: `${turtlePos.x}px`, 
            top: `${turtlePos.y}px`, 
            transform: `translate(-50%, -50%) rotate(${turtlePos.angle}deg)` 
          }}
        >
          <div className="text-4xl turtle-float filter drop-shadow-md">🐢</div>
        </div>
      </div>

      {/* Script Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-2 bg-amber-50/50 text-[10px] font-bold text-amber-700 uppercase tracking-widest border-b flex justify-between items-center">
          <span>Ton Script Python</span>
          <span className="text-[9px] opacity-60">Séquence d'algorithmes</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
          {script.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-amber-400 opacity-40">
              <span className="text-4xl mb-2">📋</span>
              <p className="text-xs font-bold">Ajoute des blocs ci-dessous</p>
            </div>
          ) : (
            script.map((block, i) => (
              <div 
                key={block.id} 
                className={`flex items-center justify-between p-3 rounded-xl shadow-sm animate-in slide-in-from-left-2 duration-200 border-2 ${
                  block.type === 'comment' 
                    ? 'bg-emerald-50 border-emerald-100 italic' 
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <span className={`font-mono text-xs w-4 ${block.type === 'comment' ? 'text-emerald-300' : 'text-blue-300'}`}>
                    {i + 1}
                  </span>
                  {block.type === 'comment' ? (
                    <div className="flex items-center flex-1 space-x-2">
                      <span className="text-emerald-600 font-bold font-mono">#</span>
                      <input 
                        type="text"
                        placeholder="Explique ta logique ici..."
                        value={block.text || ''}
                        onChange={(e) => updateComment(block.id, e.target.value)}
                        disabled={isRunning}
                        className="bg-transparent border-none focus:outline-none text-emerald-800 text-sm flex-1 w-full placeholder:text-emerald-200"
                      />
                    </div>
                  ) : (
                    <span className="font-bold text-blue-900 text-sm">{block.label}</span>
                  )}
                </div>
                
                {/* Bouton de suppression stylisé */}
                <button 
                  onClick={() => removeBlock(block.id)} 
                  disabled={isRunning}
                  className={`
                    ml-2 p-2 rounded-full transition-all flex items-center justify-center
                    ${block.type === 'comment' ? 'text-emerald-300 hover:bg-emerald-100 hover:text-red-500' : 'text-blue-300 hover:bg-blue-100 hover:text-red-500'}
                    ${isRunning ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                  `}
                  title="Supprimer ce bloc"
                >
                  <span className="text-lg leading-none font-bold">✕</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Block Selection Tray */}
        <div className="p-4 bg-amber-100/50 border-t border-amber-200">
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {level.availableBlocks.map(action => (
              <button
                key={action}
                onClick={() => addBlock(action)}
                disabled={isRunning}
                className={`whitespace-nowrap px-4 py-3 rounded-2xl shadow-sm font-bold text-xs active:scale-95 transition-all disabled:opacity-50 border-2 ${
                  action === 'comment'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-white border-amber-200 text-amber-900 hover:bg-amber-50'
                }`}
              >
                {BLOCK_LABELS[action]}
              </button>
            ))}
          </div>

          <div className="mt-4 flex space-x-3">
             <button 
               onClick={resetLevel}
               className="flex-1 bg-amber-200 text-amber-900 font-bold py-4 rounded-2xl shadow-[0_4px_0_#d97706] active:translate-y-1 active:shadow-none transition-all"
             >
               Réinitialiser
             </button>
             <button 
               onClick={runCode}
               disabled={script.length === 0 || isRunning}
               className={`flex-[2] py-4 rounded-2xl font-bold text-white shadow-[0_4px_0_#059669] active:translate-y-1 active:shadow-none transition-all ${script.length === 0 || isRunning ? 'bg-gray-400 shadow-none' : 'bg-emerald-500'}`}
             >
               {isRunning ? 'Exécution...' : 'Lancer le Script !'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLevel;
