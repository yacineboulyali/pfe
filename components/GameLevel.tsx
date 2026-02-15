
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
  for_loop: 'loop'
};

const GameLevel: React.FC<GameLevelProps> = ({ user, levelId, onFinish, onBack }) => {
  const level = LEVELS.find(l => l.id === levelId)!;
  const currentLevelIndex = LEVELS.findIndex(l => l.id === levelId);
  const totalLevels = LEVELS.length;
  const progressPercent = ((currentLevelIndex) / totalLevels) * 100;
  
  const [script, setScript] = useState<CodeBlock[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<'moving' | 'turning' | null>(null);
  const [turtlePos, setTurtlePos] = useState({ x: level.startPos.x, y: level.startPos.y, angle: level.startPos.angle });
  const [path, setPath] = useState<{ x: number; y: number }[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ type: TurtleAction; sourceId?: string } | null>(null);
  const [dropTarget, setDropTarget] = useState<{ id: string; position: 'top' | 'bottom' | 'inside' } | null>(null);

  const target = level.targetPath[level.targetPath.length - 1];
  const distance = Math.sqrt(Math.pow(turtlePos.x - target.x, 2) + Math.pow(turtlePos.y - target.y, 2));
  const isClose = distance < 40;
  const isVeryClose = distance < 15;

  const createBlock = (type: TurtleAction): CodeBlock => ({
    id: Math.random().toString(36).substr(2, 9),
    type,
    label: BLOCK_LABELS[type],
    text: type === 'comment' ? '' : undefined,
    children: type === 'for_loop' ? [] : undefined
  });

  const handleDragStartPalette = (e: React.DragEvent, type: TurtleAction) => {
    setDraggedItem({ type });
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragStartScript = (e: React.DragEvent, block: CodeBlock) => {
    setDraggedItem({ type: block.type, sourceId: block.id });
    e.dataTransfer.setData('blockId', block.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string, targetType: 'root' | 'block' | 'loop-zone') => {
    e.preventDefault();
    e.stopPropagation();
    if (targetType === 'loop-zone') {
      setDropTarget({ id, position: 'inside' });
    } else if (targetType === 'block') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const offset = e.clientY - rect.top;
      setDropTarget({ id, position: offset > rect.height / 2 ? 'bottom' : 'top' });
    } else {
      setDropTarget(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;

    let newScript = [...script];
    let blockToInsert: CodeBlock;

    if (draggedItem.sourceId) {
      const findAndRemove = (list: CodeBlock[]): CodeBlock | null => {
        const idx = list.findIndex(b => b.id === draggedItem.sourceId);
        if (idx !== -1) return list.splice(idx, 1)[0];
        for (const b of list) {
          if (b.children) {
            const found = findAndRemove(b.children);
            if (found) return found;
          }
        }
        return null;
      };
      blockToInsert = findAndRemove(newScript)!;
    } else {
      blockToInsert = createBlock(draggedItem.type);
    }

    if (dropTarget) {
      const insertAt = (list: CodeBlock[]) => {
        const idx = list.findIndex(b => b.id === dropTarget.id);
        if (idx !== -1) {
          if (dropTarget.position === 'top') list.splice(idx, 0, blockToInsert);
          else if (dropTarget.position === 'bottom') list.splice(idx + 1, 0, blockToInsert);
          else if (dropTarget.position === 'inside' && list[idx].children) {
             list[idx].children!.push(blockToInsert);
          }
          return true;
        }
        for (const b of list) {
          if (b.children && insertAt(b.children)) return true;
        }
        return false;
      };
      insertAt(newScript);
    } else {
      newScript.push(blockToInsert);
    }

    setScript(newScript);
    setDraggedItem(null);
    setDropTarget(null);
  };

  const removeBlock = (id: string) => {
    const removeFromList = (list: CodeBlock[]) => {
      const idx = list.findIndex(b => b.id === id);
      if (idx !== -1) list.splice(idx, 1);
      else list.forEach(b => b.children && removeFromList(b.children));
    };
    const newScript = [...script];
    removeFromList(newScript);
    setScript(newScript);
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

  const executeAction = async (block: CodeBlock, turtle: any) => {
    setActiveBlockId(block.id);
    if (block.type === 'comment') {
      await new Promise(r => setTimeout(r, 300));
    } else if (block.type === 'forward') {
      setCurrentAction('moving');
      const rad = (turtle.angle * Math.PI) / 180;
      turtle.x += Math.sin(rad) * 50;
      turtle.y -= Math.cos(rad) * 50;
      setTurtlePos({ ...turtle });
      await new Promise(r => setTimeout(r, 450));
      setPath(prev => [...prev, { x: turtle.x, y: turtle.y }]);
    } else if (block.type === 'right' || block.type === 'left') {
      setCurrentAction('turning');
      const turnDir = block.type === 'right' ? 90 : -90;
      turtle.angle = (turtle.angle + turnDir + 360) % 360;
      setTurtlePos({ ...turtle });
      await new Promise(r => setTimeout(r, 450));
    } else if (block.type === 'for_loop' && block.children) {
      const iterations = level.id === 'lvl5' ? 3 : 4;
      for (let i = 0; i < iterations; i++) {
        for (const child of block.children) {
          await executeAction(child, turtle);
        }
      }
    }
    setCurrentAction(null);
  };

  const runCode = async () => {
    setIsRunning(true);
    let turtle = { ...level.startPos };
    setPath([{ x: turtle.x, y: turtle.y }]);

    for (const block of script) {
      await executeAction(block, turtle);
    }

    setActiveBlockId(null);
    const finalDistance = Math.sqrt(Math.pow(turtle.x - target.x, 2) + Math.pow(turtle.y - target.y, 2));
    setTimeout(() => onFinish(finalDistance < 25), 800);
  };

  const renderBlock = (block: CodeBlock) => {
    const isTarget = dropTarget?.id === block.id;
    const isLoop = block.type === 'for_loop';
    
    return (
      <div key={block.id} className="relative group">
        {isTarget && dropTarget?.position === 'top' && <div className="h-1 bg-emerald-400 rounded-full mb-1 animate-pulse" />}
        
        <div 
          draggable={!isRunning}
          onDragStart={(e) => handleDragStartScript(e, block)}
          onDragOver={(e) => handleDragOver(e, block.id, 'block')}
          className={`flex flex-col rounded-2xl shadow-sm border-2 transition-all duration-200 cursor-grab active:cursor-grabbing hover:brightness-110 hover:shadow-md hover:border-white/30 ${
            activeBlockId === block.id 
              ? 'bg-emerald-500 border-emerald-600 scale-105 z-10 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
              : isLoop 
                ? 'bg-[#DAAB3A] border-[#B88E28]' 
                : 'bg-[#93441A] border-[#93441A]'
          }`}
        >
          <div className="flex items-center justify-between py-3 px-4">
            <span className="text-white font-mono text-xs">{block.label}</span>
            <div className="flex items-center gap-2">
               <button onClick={() => removeBlock(block.id)} disabled={isRunning} className="text-white/40 hover:text-white transition-colors">
                  <span className="material-icons-round text-sm">close</span>
               </button>
               <span className="material-icons-round text-white/40 text-sm">drag_indicator</span>
            </div>
          </div>

          {isLoop && (
            <div 
              onDragOver={(e) => handleDragOver(e, block.id, 'loop-zone')}
              className={`mx-3 mb-3 p-4 rounded-xl border-2 border-dashed transition-colors ${
                dropTarget?.id === block.id && dropTarget?.position === 'inside' 
                  ? 'bg-white/40 border-white' 
                  : 'bg-white/10 border-white/20'
              }`}
            >
              {block.children && block.children.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {block.children.map(child => renderBlock(child))}
                </div>
              ) : (
                <div className="py-4 flex items-center justify-center italic text-white/60 text-[10px] pointer-events-none">
                  Drop inside loop...
                </div>
              )}
            </div>
          )}
        </div>

        {isTarget && dropTarget?.position === 'bottom' && <div className="h-1 bg-emerald-400 rounded-full mt-1 animate-pulse" />}
      </div>
    );
  };

  return (
    <div className="relative h-full flex flex-col bg-background-light overflow-hidden mosaic-pattern">
      {/* Activity Header with Large Progress Bar */}
      <header className="flex items-center p-4 pt-10 pb-2 bg-gradient-to-b from-white/95 to-transparent z-10 gap-4">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary border-2 border-gray-100 shadow-sm active:scale-95 transition-all"
        >
          <span className="material-icons-round">close</span>
        </button>
        
        {/* Dynamic Progress Bar */}
        <div className="flex-1 h-5 bg-gray-100 rounded-full border-2 border-gray-200 overflow-hidden relative shadow-inner">
           <div 
             className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700 ease-out relative"
             style={{ width: `${progressPercent}%` }}
           >
             <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-full"></div>
             {/* Progress Star/Tip */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                <span className="text-[10px] animate-pulse">✨</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 shadow-sm">
           <span className="text-red-500 material-icons-round text-sm">favorite</span>
           <span className="font-black text-red-700 text-xs">{user.hearts}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pb-4 gap-4 overflow-hidden relative z-10">
        <section className="h-[28%] w-full bg-white rounded-3xl shadow-xl border-4 border-amber-100 relative overflow-hidden flex flex-col">
          <div className="flex-1 relative bg-blue-50/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 blur-[3px] scale-110 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1000')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:25px_25px] opacity-30"></div>
            <svg className="absolute inset-0 w-full h-full opacity-30">
               <polyline points={`${level.startPos.x},${level.startPos.y} ` + level.targetPath.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#DAAB3A" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,10" />
            </svg>
            <div className={`absolute w-12 h-12 border-4 border-dashed rounded-full flex items-center justify-center transition-all duration-300 ${isVeryClose ? 'border-emerald-600 bg-emerald-200 scale-110 shadow-[0_0_30px_rgba(16,185,129,0.8)]' : isClose ? 'border-emerald-400 bg-emerald-100/50 animate-pulse' : 'border-accent bg-accent/10 opacity-70'}`} style={{ left: `${target.x}px`, top: `${target.y}px`, transform: 'translate(-50%, -50%)' }}>
              <span className="material-icons-round text-accent text-xl">location_on</span>
            </div>
            <svg className="absolute inset-0 w-full h-full">
               <polyline points={path.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute transition-all duration-500 ease-in-out z-30" style={{ left: `${turtlePos.x}px`, top: `${turtlePos.y}px`, transform: `translate(-50%, -50%) rotate(${turtlePos.angle}deg)` }}>
              <div className={`relative w-12 h-12 transition-transform ${currentAction === 'moving' ? 'animate-turtle-walk' : currentAction === 'turning' ? 'animate-turtle-pivot' : ''}`}>
                <div className="w-10 h-10 rounded-full shadow-lg border-2 border-white absolute top-0 left-0 z-10 bg-white flex items-center justify-center text-2xl overflow-hidden">
                  {user.avatar === 'BOY' ? '👳‍♂️' : '🧕'}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative px-2 -mb-2 z-20">
           <div className="bg-white rounded-2xl p-3 shadow-lg border-l-4 border-secondary flex items-start gap-3 relative animate-in fade-in zoom-in">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center text-xl shadow-inner border border-amber-200">
                🧭
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest block">Étape {currentLevelIndex + 1}/{totalLevels}</span>
                    <span className="text-[10px] font-bold text-primary/40 italic">{level.title}</span>
                 </div>
                 <p className="text-xs font-bold text-primary leading-tight">{level.mission}</p>
              </div>
           </div>
        </div>

        <section 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e)}
          className="flex-1 bg-[#F9F5EC] rounded-[2rem] border-2 border-dashed border-amber-200/50 p-6 flex flex-col gap-4 shadow-inner relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-black text-[#93441A] uppercase tracking-wider font-display">Code Editor</h2>
            <div className="bg-[#EBD6B5]/60 px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#93441A]/10">
               <span className="material-icons-round text-emerald-600 text-sm">code</span>
               <span className="text-[10px] font-bold text-emerald-800">Python 3.x</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-2">
            {level.availableBlocks.map(action => (
              <button
                key={action}
                draggable={!isRunning}
                onDragStart={(e) => handleDragStartPalette(e, action as TurtleAction)}
                className="bg-[#93441A] text-white py-3 px-4 rounded-2xl font-mono text-xs flex justify-between items-center shadow-md active:translate-y-0.5 transition-all hover:brightness-110 cursor-grab"
              >
                <span>{BLOCK_LABELS[action as TurtleAction]}</span>
                <span className="material-icons-round text-white/40 text-sm">drag_indicator</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 min-h-0 scrollbar-hide">
             {script.length === 0 ? (
                <div className="flex-1 border-2 border-dashed border-[#93441A]/10 rounded-3xl flex items-center justify-center text-[#93441A]/20 italic text-xs text-center px-8">
                   Faites glisser les blocs ici pour construire votre code Python
                </div>
             ) : (
                script.map(block => renderBlock(block))
             )}
          </div>

          <div className="flex gap-4 mt-auto">
             <button onClick={clearScript} disabled={isRunning} className="bg-white flex-1 py-4 rounded-3xl shadow-md border-b-4 border-gray-200 flex items-center justify-center gap-2 font-black text-xs text-primary/60 hover:bg-gray-50 active:translate-y-1 active:border-b-0 transition-all uppercase">
                <span className="material-icons-round text-sm">refresh</span> Reset
             </button>
             <button onClick={runCode} disabled={script.length === 0 || isRunning} className={`flex-[2] py-4 rounded-3xl shadow-md border-b-4 flex items-center justify-center gap-2 font-black text-xs text-white uppercase transition-all active:translate-y-1 active:border-b-0 ${script.length === 0 || isRunning ? 'bg-gray-300 border-gray-400' : 'bg-[#10b981] border-[#0c8e62] hover:brightness-110'}`}>
                <span className={`material-icons-round text-sm ${isRunning ? 'animate-spin' : ''}`}>
                   {isRunning ? 'sync' : 'play_arrow'}
                </span>
                {isRunning ? 'Running...' : 'Execute'}
             </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GameLevel;
