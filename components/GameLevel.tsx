
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, Level, TurtleAction, CodeBlock } from '../types';
import { LEVELS, BLOCK_LABELS, ZELLIGE_PATTERN } from '../constants';

interface GameLevelProps {
  user: UserProfile;
  levelId: string;
  onFinish: (success: boolean) => void;
  onBack: () => void;
}

const ACTION_ICONS: Record<string, string> = {
  forward: 'arrow_forward',
  backward: 'arrow_back',
  right: 'turn_right',
  left: 'turn_left',
  comment: 'segment',
};

const GameLevel: React.FC<GameLevelProps> = ({ user, levelId, onFinish, onBack }) => {
  const level = LEVELS.find(l => l.id === levelId)!;
  const [script, setScript] = useState<CodeBlock[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'moving' | 'turning' | null>(null);
  const [turtlePos, setTurtlePos] = useState({ x: level.startPos.x, y: level.startPos.y, angle: level.startPos.angle });
  const [path, setPath] = useState<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const target = level.targetPath[level.targetPath.length - 1];
  const distance = Math.sqrt(Math.pow(turtlePos.x - target.x, 2) + Math.pow(turtlePos.y - target.y, 2));
  const isClose = distance < 40;
  const isVeryClose = distance < 15;

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

  const clearScript = () => {
    if (isRunning) return;
    setScript([]);
    resetLevel();
  };

  const resetLevel = () => {
    setTurtlePos({ x: level.startPos.x, y: level.startPos.y, angle: level.startPos.angle });
    setPath([{ x: level.startPos.x, y: level.startPos.y }]);
    setIsRunning(false);
    setActiveBlockId(null);
    setCurrentAction(null);
  };

  useEffect(() => {
    setPath([{ x: level.startPos.x, y: level.startPos.y }]);
  }, [level]);

  const runCode = async () => {
    setIsRunning(true);
    let currentPos = { ...level.startPos };
    let newPath = [{ x: currentPos.x, y: currentPos.y }];

    for (const block of script) {
      setActiveBlockId(block.id);
      
      if (block.type === 'comment') {
        await new Promise(r => setTimeout(r, 400));
        continue;
      }

      if (block.type === 'forward') {
        setCurrentAction('moving');
        const rad = (currentPos.angle * Math.PI) / 180;
        currentPos.x += Math.sin(rad) * 50;
        currentPos.y -= Math.cos(rad) * 50;
      } else if (block.type === 'right' || block.type === 'left') {
        setCurrentAction('turning');
        const turnDir = block.type === 'right' ? 90 : -90;
        currentPos.angle = (currentPos.angle + turnDir + 360) % 360;
      }
      
      setTurtlePos({ ...currentPos });
      await new Promise(r => setTimeout(r, 550));
      
      newPath = [...newPath, { x: currentPos.x, y: currentPos.y }];
      setPath(newPath);
      setCurrentAction(null);
    }

    setActiveBlockId(null);
    const successThreshold = 25;
    const finalDistance = Math.sqrt(Math.pow(currentPos.x - target.x, 2) + Math.pow(currentPos.y - target.y, 2));
    
    setTimeout(() => {
      onFinish(finalDistance < successThreshold);
    }, 800);
  };

  return (
    <div className="relative h-full flex flex-col bg-background-light overflow-hidden mosaic-pattern">
      {/* Activity Header */}
      <header className="flex justify-between items-center p-4 pt-10 pb-2 bg-gradient-to-b from-white/80 to-transparent z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border-2 border-accent shadow-sm">
            <span className="material-icons-round text-sm">arrow_back</span>
          </button>
          <div>
            <span className="font-display font-bold text-primary text-sm block leading-none">QUÊTE {level.id.replace('lvl', '')}</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">{level.title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-accent/30">
            <span className="text-accent material-icons-round text-sm mr-1">monetization_on</span>
            <span className="text-xs font-bold text-primary">{user.score}</span>
          </div>
          <div className="flex items-center gap-1">
             <span className="text-red-500 material-icons-round text-sm">favorite</span>
             <span className="font-bold text-primary text-sm">{user.hearts}</span>
          </div>
        </div>
      </header>

      {/* Main Activity Content */}
      <main className="flex-1 flex flex-col px-4 pb-4 gap-4 overflow-hidden relative z-10">
        {/* Simulation Section */}
        <section className="h-[40%] w-full bg-white rounded-3xl shadow-xl border-4 border-amber-100 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start z-20 pointer-events-none">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-[10px] uppercase font-bold tracking-widest">
                Mission: {level.title}
            </div>
          </div>
          
          <div className="flex-1 relative bg-blue-50/10 flex items-center justify-center overflow-hidden">
            {/* Background Layers with Blur Effect */}
            <div 
              className="absolute inset-0 opacity-20 blur-[3px] scale-110 pointer-events-none"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1000')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:25px_25px] opacity-30"></div>
            
            <div className="absolute inset-0 opacity-5 pointer-events-none blur-[1px]">
              {ZELLIGE_PATTERN}
            </div>

            {/* Target Path Ghost */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
               <polyline 
                 points={`${level.startPos.x},${level.startPos.y} ` + level.targetPath.map(p => `${p.x},${p.y}`).join(' ')} 
                 fill="none" 
                 stroke="#DAAB3A" 
                 strokeWidth="12" 
                 strokeLinecap="round" 
                 strokeLinejoin="round" 
                 strokeDasharray="5,10"
               />
            </svg>

            {/* Target Indicator */}
            <div 
              className={`absolute w-12 h-12 border-4 border-dashed rounded-full flex items-center justify-center transition-all duration-300 ${
                isVeryClose 
                  ? 'border-emerald-600 bg-emerald-200 scale-110 shadow-[0_0_30px_rgba(16,185,129,0.8)]' 
                  : isClose 
                    ? 'border-emerald-400 bg-emerald-100/50 animate-pulse' 
                    : 'border-accent bg-accent/10 opacity-70'
              }`}
              style={{ left: `${target.x}px`, top: `${target.y}px`, transform: 'translate(-50%, -50%)' }}
            >
              <span className="material-icons-round text-accent text-xl">location_on</span>
            </div>

            {/* User's Trajectory */}
            <svg className="absolute inset-0 w-full h-full">
               <polyline points={path.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Avatar / Turtle */}
            <div 
              className="absolute transition-all duration-500 ease-in-out z-30"
              style={{ 
                left: `${turtlePos.x}px`, 
                top: `${turtlePos.y}px`, 
                transform: `translate(-50%, -50%) rotate(${turtlePos.angle}deg)` 
              }}
            >
              <div className={`relative w-12 h-12 transition-transform ${currentAction === 'moving' ? 'animate-turtle-walk' : currentAction === 'turning' ? 'animate-turtle-pivot' : ''}`}>
                <div className="w-10 h-10 rounded-full shadow-lg border-2 border-white absolute top-0 left-0 z-10 bg-white flex items-center justify-center text-2xl overflow-hidden">
                  {user.avatar === 'BOY' ? '👳‍♂️' : '🧕'}
                </div>
                <div className="absolute -top-3 -right-3 bg-accent text-white rounded-full p-0.5 shadow-md flex items-center justify-center">
                  <span className="material-icons-round text-xs">navigation</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-3 border-t-2 border-amber-100">
             <p className="text-xs text-amber-900 font-bold leading-tight">{level.mission}</p>
          </div>
        </section>

        {/* Coding Section */}
        <section className="flex-1 flex flex-col gap-3 min-h-0">
          <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide shrink-0">
            {level.availableBlocks.map(action => (
              <button
                key={action}
                onClick={() => addBlock(action)}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all whitespace-nowrap btn-3d ${
                  action === 'comment' 
                    ? 'bg-emerald-500 text-white border-b-4 border-emerald-700' 
                    : 'bg-secondary text-white border-b-4 border-primary'
                }`}
              >
                <span className="material-icons-round text-sm">{ACTION_ICONS[action] || 'extension'}</span>
                {BLOCK_LABELS[action].split('(')[0]}
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white/80 rounded-3xl shadow-inner border-2 border-dashed border-primary/20 p-4 overflow-y-auto relative flex flex-col gap-3">
            <div className="absolute top-2 right-4 text-[10px] font-bold text-primary/30 uppercase tracking-widest pointer-events-none font-display">
                Script d'Ibn Battuta
            </div>
            
            <div className="bg-gray-100 text-gray-400 px-4 py-2 rounded-t-xl rounded-b-md font-bold text-[10px] w-20 flex justify-center shadow-sm uppercase">
               Départ
            </div>

            {script.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-primary/20 italic text-sm">
                 <span className="material-icons-round text-4xl mb-2">auto_fix_high</span>
                 Ajoute des blocs
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {script.map((block, i) => (
                  <div 
                    key={block.id} 
                    className={`flex items-center justify-between p-3 rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-md hover:scale-[1.01] animate-in slide-in-from-left-2 ${
                      activeBlockId === block.id 
                        ? 'bg-accent border-accent scale-105 shadow-lg z-10' 
                        : block.type === 'comment' 
                          ? 'bg-emerald-50 border-emerald-100 hover:border-emerald-400' 
                          : 'bg-amber-50 border-amber-100 hover:border-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`text-[10px] font-mono w-4 ${activeBlockId === block.id ? 'text-white' : 'text-primary/40'}`}>{i + 1}</span>
                      <span className={`material-icons-round text-sm ${activeBlockId === block.id ? 'text-white' : (block.type === 'comment' ? 'text-emerald-500' : 'text-secondary')}`}>
                        {ACTION_ICONS[block.type]}
                      </span>
                      {block.type === 'comment' ? (
                        <input 
                          type="text" 
                          placeholder="Logique..." 
                          disabled={isRunning}
                          className={`bg-transparent border-none focus:outline-none text-xs flex-1 font-body italic ${activeBlockId === block.id ? 'text-white placeholder:text-white/50' : 'text-emerald-800'}`}
                          value={block.text}
                          onChange={(e) => updateComment(block.id, e.target.value)}
                        />
                      ) : (
                        <span className={`font-bold text-xs ${activeBlockId === block.id ? 'text-white' : 'text-primary'}`}>{block.label}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => removeBlock(block.id)}
                      disabled={isRunning}
                      className={`ml-2 transition-all hover:scale-125 ${activeBlockId === block.id ? 'text-white/50' : 'text-primary/20 hover:text-red-500'}`}
                    >
                      <span className="material-icons-round text-lg">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-16 flex gap-3 shrink-0 mt-auto">
            <button 
              onClick={clearScript}
              disabled={isRunning}
              className="h-14 w-14 rounded-2xl bg-white text-primary/40 flex items-center justify-center btn-3d border-b-4 border-gray-200 disabled:opacity-50"
            >
              <span className="material-icons-round text-2xl">delete_outline</span>
            </button>
            <button 
              onClick={runCode}
              disabled={script.length === 0 || isRunning}
              className={`flex-1 h-14 rounded-2xl font-display font-bold text-white text-lg tracking-wide flex items-center justify-center gap-2 btn-3d border-b-4 ${
                script.length === 0 || isRunning 
                  ? 'bg-gray-300 border-gray-400' 
                  : 'bg-primary border-primary/70 shadow-lg'
              }`}
            >
              <span className={`material-icons-round ${isRunning ? 'animate-spin' : ''}`}>
                {isRunning ? 'sync' : 'play_arrow'}
              </span>
              {isRunning ? 'MARCHE...' : 'LANCER'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GameLevel;
