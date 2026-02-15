
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
    title: 'Le Grand Départ',
    mission: 'Bienvenue aventurier ! Fais avancer Ibn Battuta tout droit en utilisant un bloc forward(50).',
    startPos: { x: 175, y: 220, angle: 0 },
    targetPath: [{ x: 175, y: 170 }, { x: 175, y: 120 }],
    availableBlocks: ['forward']
  },
  {
    id: 'lvl2',
    cityId: 'rabat',
    title: 'Le Tournant de la Kasbah',
    mission: 'Apprends à tourner ! Avance, tourne à droite, puis avance encore pour atteindre la fontaine.',
    startPos: { x: 100, y: 180, angle: 0 },
    targetPath: [{ x: 100, y: 130 }, { x: 150, y: 130 }],
    availableBlocks: ['forward', 'right']
  },
  {
    id: 'lvl3',
    cityId: 'rabat',
    title: 'Les Ruelles de Chellah',
    mission: 'Navigue dans les ruelles : combine les virages à gauche et à droite pour éviter les obstacles.',
    startPos: { x: 50, y: 220, angle: 0 },
    targetPath: [{ x: 50, y: 170 }, { x: 100, y: 170 }, { x: 100, y: 120 }, { x: 150, y: 120 }],
    availableBlocks: ['forward', 'right', 'left']
  },
  {
    id: 'lvl4',
    cityId: 'rabat',
    title: 'Le Tracé du Carré',
    mission: 'Découvre la puissance des boucles ! Utilise for i in range(4): pour dessiner un carré parfait.',
    startPos: { x: 120, y: 200, angle: 0 },
    targetPath: [{ x: 120, y: 150 }, { x: 170, y: 150 }, { x: 170, y: 200 }, { x: 120, y: 200 }],
    availableBlocks: ['forward', 'right', 'for_loop']
  },
  {
    id: 'lvl5',
    cityId: 'rabat',
    title: "L'Esplanade de la Tour",
    mission: "Défi final ! Atteins le centre de l'esplanade en montant les marches (avance, droite, avance, gauche) répétées 3 fois.",
    startPos: { x: 50, y: 250, angle: 0 },
    targetPath: [
      { x: 50, y: 200 }, { x: 100, y: 200 }, 
      { x: 100, y: 150 }, { x: 150, y: 150 }, 
      { x: 150, y: 100 }, { x: 200, y: 100 }
    ],
    availableBlocks: ['forward', 'right', 'left', 'for_loop', 'comment']
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
