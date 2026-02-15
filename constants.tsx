
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
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    landmark: 'Koutoubia',
    locked: true,
    color: 'bg-rose-600',
    accent: 'border-rose-700',
    position: { x: 30, y: 50 },
    description: "La perle du sud."
  },
  {
    id: 'chefchaouen',
    name: 'Chefchaouen',
    landmark: 'Maisons Bleues',
    locked: true,
    color: 'bg-sky-600',
    accent: 'border-sky-700',
    position: { x: 70, y: 20 },
    description: "La cité bleue des montagnes."
  }
];

export const LEVELS: Level[] = [
  {
    id: 'lvl1',
    cityId: 'rabat',
    title: 'La Porte de la Tour',
    mission: 'Atteins l\'entrée de la Tour Hassan en traçant une ligne droite.',
    startPos: { x: 50, y: 150, angle: 0 },
    targetPath: [{ x: 50, y: 50 }],
    availableBlocks: ['forward', 'right', 'left', 'comment']
  }
];

export const BLOCK_LABELS: Record<TurtleAction, string> = {
  forward: 'Avancer(50)',
  backward: 'Reculer(50)',
  right: 'Tourner Droite(90°)',
  left: 'Tourner Gauche(90°)',
  penUp: 'Lever Stylo',
  penDown: 'Baisser Stylo',
  comment: '# Commentaire'
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
