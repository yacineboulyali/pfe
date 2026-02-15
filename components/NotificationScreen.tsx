
import React from 'react';
import { UserProfile } from '../types';
import { ZELLIGE_PATTERN } from '../constants';

interface NotificationScreenProps {
  user: UserProfile;
}

interface NotificationItem {
  id: string;
  type: 'streak' | 'achievement' | 'friend' | 'system';
  title: string;
  message: string;
  time: string;
  icon: string;
  color: string;
  unread: boolean;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ user }) => {
  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'streak',
      title: 'Ta série est en danger !',
      message: 'Ibn Battuta t\'attend pour explorer Rabat. Ne perds pas tes 5 jours de série !',
      time: 'Il y a 2h',
      icon: 'local_fire_department',
      color: 'bg-orange-100 text-orange-600 border-orange-200',
      unread: true
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Nouveau badge débloqué !',
      message: 'Félicitations ! Tu as obtenu le badge "Apprenti Géomètre" pour avoir réussi le tracé du carré.',
      time: 'Il y a 5h',
      icon: 'workspace_premium',
      color: 'bg-emerald-100 text-emerald-600 border-emerald-200',
      unread: true
    },
    {
      id: '3',
      type: 'friend',
      title: 'Mustafa t\'a dépassé !',
      message: 'Ton rival Mustafa vient de grimper à la 2ème place du classement. Reprends l\'avantage !',
      time: 'Hier',
      icon: 'trending_up',
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      unread: false
    },
    {
      id: '4',
      type: 'system',
      title: 'Maintenance terminée',
      message: 'La voûte de l\'algorithmique est maintenant plus fluide que jamais grâce à nos dernières mises à jour.',
      time: 'Il y a 2 jours',
      icon: 'settings_suggest',
      color: 'bg-gray-100 text-gray-600 border-gray-200',
      unread: false
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Coffre de Gemmes !',
      message: 'Tu as reçu 50 gemmes pour ta connexion quotidienne. Continue comme ça !',
      time: 'Il y a 3 jours',
      icon: 'redeem',
      color: 'bg-amber-100 text-amber-600 border-amber-200',
      unread: false
    }
  ];

  return (
    <div className="relative h-full flex flex-col bg-[#FFF3D6] overflow-hidden">
      {/* Header Section (Matching Leaderboard) */}
      <div className="relative pt-16 pb-10 px-8 text-center bg-[#FFDFB0] rounded-b-[3rem] shadow-sm z-20">
        <h1 className="text-3xl font-display font-black text-[#93441A] uppercase tracking-tight leading-none">
          Journal d'Activité
        </h1>
        <p className="text-[10px] font-black text-[#93441A]/60 uppercase tracking-[0.2em] mt-1">
          Notifications
        </p>
        
        <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2">
           <button className="bg-white px-6 py-2 rounded-full shadow-lg border-2 border-[#DAAB3A]/20 text-[10px] font-black text-[#B67332] uppercase tracking-widest active:scale-95 transition-all">
              Tout marquer lu
           </button>
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-12 pb-24 space-y-5 scrollbar-hide relative z-10">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {ZELLIGE_PATTERN}
        </div>

        {notifications.map((notif) => (
          <div 
            key={notif.id}
            className={`
              relative flex gap-4 p-5 rounded-[2.5rem] transition-all duration-300
              ${notif.unread 
                ? 'bg-white border-4 border-[#DAAB3A] shadow-xl scale-[1.01]' 
                : 'bg-white/40 border-2 border-transparent opacity-80'}
            `}
          >
            {/* Unread Indicator Dot */}
            {notif.unread && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#DAAB3A] rounded-full border-2 border-white flex items-center justify-center shadow-md">
                 <span className="text-[10px]">⭐</span>
              </div>
            )}

            {/* Icon Box (Circular style like Ranking) */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-inner border-2 ${notif.unread ? 'bg-[#FFDFB0] border-[#DAAB3A]/30' : 'bg-gray-100 border-gray-200'}`}>
              <span className={`material-icons-round text-2xl ${notif.unread ? 'text-[#93441A]' : 'text-gray-400'}`}>
                {notif.icon}
              </span>
            </div>

            {/* Content Text */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className={`font-black text-sm mb-1 ${notif.unread ? 'text-[#93441A]' : 'text-[#93441A]/60'}`}>
                {notif.title}
              </h3>
              <p className={`text-xs leading-tight mb-3 ${notif.unread ? 'font-bold text-[#93441A]/80' : 'text-[#93441A]/50'}`}>
                {notif.message}
              </p>
              
              <div className="flex justify-end">
                <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider ${notif.unread ? 'bg-[#F8E6C3] border-[#DAAB3A]/30 text-[#93441A]' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                   {notif.time}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* End of list decoration */}
        <div className="py-10 text-center opacity-20">
           <div className="w-12 h-1 bg-[#93441A] mx-auto rounded-full mb-4"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#93441A]">Fin du parchemin</p>
        </div>
      </div>

      {/* Background Decorative Shapes */}
      <div className="absolute top-1/2 -right-20 w-64 h-64 bg-[#FFDFB0]/20 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-48 h-48 bg-[#DAAB3A]/10 rounded-full blur-[60px] pointer-events-none"></div>
    </div>
  );
};

export default NotificationScreen;
