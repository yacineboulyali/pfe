
import React from 'react';
import { City, Level, TurtleAction } from './types';

export const CITIES: City[] = [
  {
    id: 'rabat',
    name: 'Rabat',
    landmark: 'Tour Hassan',
    locked: false,
    color: 'bg-amber-600',
    accent: 'border-amber-700',
    position: { x: 50, y: 80 },
    description: "La capitale lumineuse."
  }
];

export const LEVELS: Level[] = [
  {
    id: 'lvl1',
    cityId: 'rabat',
    title: 'Rabat : Tour Hassan',
    mission: 'Bienvenue aventurier ! Fais avancer Ibn Battuta tout droit en utilisant un bloc forward(50).',
    startPos: { x: 175, y: 220, angle: 0 },
    targetPath: [{ x: 175, y: 170 }, { x: 175, y: 120 }],
    availableBlocks: ['forward']
  },
  {
    id: 'lvl2',
    cityId: 'chefchaouen',
    title: 'Chefchaouen : La Perle Bleue',
    mission: 'Apprends à tourner ! Avance, tourne à droite, puis avance encore dans les ruelles bleues.',
    startPos: { x: 100, y: 180, angle: 0 },
    targetPath: [{ x: 100, y: 130 }, { x: 150, y: 130 }],
    availableBlocks: ['forward', 'right']
  },
  {
    id: 'lvl3',
    cityId: 'marrakech',
    title: 'Marrakech : La Koutoubia',
    mission: 'Navigue dans les souks : combine les virages pour atteindre la grande place Jemaa el-Fna.',
    startPos: { x: 50, y: 220, angle: 0 },
    targetPath: [{ x: 50, y: 170 }, { x: 100, y: 170 }, { x: 100, y: 120 }, { x: 150, y: 120 }],
    availableBlocks: ['forward', 'right', 'left']
  },
  {
    id: 'lvl4',
    cityId: 'agadir',
    title: 'Agadir : Oufella',
    mission: 'Utilise une boucle pour dessiner le périmètre de la forteresse protectrice.',
    startPos: { x: 120, y: 200, angle: 0 },
    targetPath: [{ x: 120, y: 150 }, { x: 170, y: 150 }, { x: 170, y: 200 }, { x: 120, y: 200 }],
    availableBlocks: ['forward', 'right', 'for_loop']
  },
  {
    id: 'lvl5',
    cityId: 'dakhla',
    title: 'Dakhla : Le Phare',
    mission: "Trace un escalier de sable (avance, droite, avance, gauche) répété 3 fois pour monter au phare.",
    startPos: { x: 50, y: 250, angle: 0 },
    targetPath: [
      { x: 50, y: 200 }, { x: 100, y: 200 }, 
      { x: 100, y: 150 }, { x: 150, y: 150 }, 
      { x: 150, y: 100 }, { x: 200, y: 100 }
    ],
    availableBlocks: ['forward', 'right', 'left', 'for_loop', 'comment']
  },
  {
    id: 'lvl6',
    cityId: 'laayoune',
    title: 'Laâyoune : Portes du Désert',
    mission: "Défi Ultime ! Combine tout ton savoir pour tracer la route vers le grand sud.",
    startPos: { x: 175, y: 220, angle: 0 },
    targetPath: [{ x: 175, y: 170 }, { x: 100, y: 170 }, { x: 100, y: 120 }],
    availableBlocks: ['forward', 'right', 'left', 'for_loop']
  }
];

export const BLOCK_LABELS: Record<TurtleAction, string> = {
  forward: 'forward(50)',
  backward: 'backward(50)',
  right: 'turn_right(90)',
  left: 'turn_left(90)',
  penUp: 'pen_up()',
  penDown: 'pen_down()',
  comment: '# comment',
  for_loop: 'for i in range(4):'
};

export const ZELLIGE_PATTERN = (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <pattern id="zellige" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <circle cx="10" cy="10" r="2" fill="rgba(0,0,0,0.03)" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#zellige)" />
  </svg>
);
