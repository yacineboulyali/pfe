
import React, { useState, useMemo } from 'react';
import { ZELLIGE_PATTERN } from '../constants';

interface Player {
  id: string;
  name: string;
  avatarSeed: string;
  xp: number;
  level: string;
}

interface InviteScreenProps {
  roomCode: string;
  onBack: () => void;
}

const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Mustafa_Algo', avatarSeed: 'Mustafa', xp: 2560, level: 'Expert' },
  { id: '2', name: 'Laila_Explorer', avatarSeed: 'Laila', xp: 2120, level: 'Apprenti' },
  { id: '3', name: 'Hassan_Bot', avatarSeed: 'Hassan', xp: 1840, level: 'Génie' },
  { id: '4', name: 'Fatima_Code', avatarSeed: 'Fatima', xp: 1250, level: 'Novice' },
  { id: '5', name: 'Omar_Dev', avatarSeed: 'Omar', xp: 1120, level: 'Voyageur' },
  { id: '6', name: 'Youssef_Py', avatarSeed: 'Youssef', xp: 3400, level: 'Légende' },
  { id: '7', name: 'Zineb_Battuta', avatarSeed: 'Zineb', xp: 950, level: 'Débutant' },
  { id: '8', name: 'Anas_Script', avatarSeed: 'Anas', xp: 1600, level: 'Intermédiaire' },
];

const InviteScreen: React.FC<InviteScreenProps> = ({ roomCode, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<Set<string>>(new Set());
  const [isSending, setIsSending] = useState(false);

  const filteredPlayers = useMemo(() => {
    return MOCK_PLAYERS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedPlayerIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedPlayerIds(newSet);
  };

  const handleSendInvitations = () => {
    setIsSending(true);
    // Simulation d'envoi
    setTimeout(() => {
      setIsSending(false);
      onBack();
      alert(`Invitations envoyées à ${selectedPlayerIds.size} explorateur(s) pour la salle ${roomCode} !`);
    }, 1500);
  };

  return (
    <div className="relative h-full flex flex-col bg-[#FFF3D6] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {ZELLIGE_PATTERN}
      </div>

      {/* Sticky Header */}
      <header className="relative z-30 pt-16 pb-6 px-6 bg-[#FFDFB0] rounded-b-[3rem] shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#93441A] shadow-lg active:scale-95 transition-all"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-display font-black text-[#93441A] uppercase leading-none">Inviter des Joueurs</h1>
            <p className="text-[10px] font-black text-[#93441A]/50 uppercase tracking-widest mt-1">Salle: {roomCode}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un explorateur..."
            className="w-full bg-white/90 backdrop-blur-sm border-2 border-white rounded-3xl py-4 pl-12 pr-6 text-sm font-bold text-[#93441A] shadow-inner focus:outline-none focus:border-[#DAAB3A] transition-all placeholder:text-[#93441A]/30"
          />
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-[#DAAB3A]">search</span>
        </div>
      </header>

      {/* Players List */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-40 space-y-3 scrollbar-hide relative z-10">
        {filteredPlayers.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4 opacity-30">
            <span className="material-icons-round text-5xl">person_search</span>
            <p className="font-black text-xs uppercase tracking-widest text-[#93441A]">Aucun explorateur trouvé</p>
          </div>
        ) : (
          filteredPlayers.map((player) => {
            const isSelected = selectedPlayerIds.has(player.id);
            return (
              <div 
                key={player.id}
                onClick={() => toggleSelection(player.id)}
                className={`
                  flex items-center gap-4 p-4 rounded-3xl transition-all cursor-pointer border-4
                  ${isSelected ? 'bg-white border-[#DAAB3A] shadow-xl scale-[1.02]' : 'bg-white/40 border-transparent'}
                `}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-full border-2 overflow-hidden bg-white shadow-inner ${isSelected ? 'border-[#DAAB3A]' : 'border-gray-200'}`}>
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.avatarSeed}&backgroundColor=ffdfbf`}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 bg-[#10B981] w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-md animate-in zoom-in">
                       <span className="material-icons-round text-white text-[12px]">check</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className={`font-black text-sm uppercase tracking-tight ${isSelected ? 'text-[#93441A]' : 'text-[#93441A]/70'}`}>
                    {player.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                      {player.level}
                    </span>
                    <span className="text-[9px] font-bold text-[#93441A]/40 uppercase tracking-widest">
                      {player.xp} XP
                    </span>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#DAAB3A] border-[#DAAB3A]' : 'bg-transparent border-gray-200'}`}>
                   {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Footer Action */}
      <div className={`fixed bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#FFF3D6] to-transparent z-40 transition-all duration-500 ${selectedPlayerIds.size > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <button 
          onClick={handleSendInvitations}
          disabled={isSending}
          className="w-full bg-[#DAAB3A] hover:bg-[#C99A26] active:translate-y-1 py-5 rounded-[2.5rem] shadow-[0_6px_0_#A67C1A] flex items-center justify-center gap-3 transition-all group"
        >
          {isSending ? (
            <span className="material-icons-round text-white animate-spin">sync</span>
          ) : (
            <span className="material-icons-round text-white">send</span>
          )}
          <span className="text-white font-black text-sm uppercase tracking-[0.2em]">
            {isSending ? 'Envoi...' : `Inviter ${selectedPlayerIds.size} Joueur${selectedPlayerIds.size > 1 ? 's' : ''}`}
          </span>
        </button>
      </div>
    </div>
  );
};

export default InviteScreen;
