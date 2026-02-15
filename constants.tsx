
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
    title: 'Le Premier Pas',
    mission: 'Ibn Battuta doit avancer de 100 pixels vers le nord pour quitter la porte.',
    startPos: { x: 175, y: 200, angle: 0 },
    targetPath: [{ x: 175, y: 150 }, { x: 175, y: 100 }],
    availableBlocks: ['forward', 'comment']
  },
  {
    id: 'lvl2',
    cityId: 'rabat',
    title: "L'Angle de la Kasbah",
    mission: 'Avance de 50, tourne à droite, puis avance de 50 pour atteindre la fontaine.',
    startPos: { x: 125, y: 175, angle: 0 },
    targetPath: [{ x: 125, y: 125 }, { x: 175, y: 125 }],
    availableBlocks: ['forward', 'right', 'comment']
  },
  {
    id: 'lvl3',
    cityId: 'rabat',
    title: "Le Zig-zag de Salé",
    mission: 'Contourne les murs : Avance, Gauche, Avance, Droite, Avance.',
    startPos: { x: 100, y: 200, angle: 0 },
    targetPath: [{ x: 100, y: 150 }, { x: 50, y: 150 }, { x: 50, y: 100 }],
    availableBlocks: ['forward', 'right', 'left', 'comment']
  },
  {
    id: 'lvl4',
    cityId: 'rabat',
    title: "Le Carré Parfait",
    mission: 'Trace un demi-carré : Avance 50, Droite, Avance 50, Droite, Avance 50.',
    startPos: { x: 150, y: 200, angle: 0 },
    targetPath: [{ x: 150, y: 150 }, { x: 200, y: 150 }, { x: 200, y: 200 }],
    availableBlocks: ['forward', 'right', 'comment']
  },
  {
    id: 'lvl5',
    cityId: 'rabat',
    title: "La Voûte Finale",
    mission: 'Utilise toutes tes connaissances pour atteindre le centre de la Tour Hassan.',
    startPos: { x: 100, y: 100, angle: 90 },
    targetPath: [{ x: 150, y: 100 }, { x: 150, y: 150 }, { x: 200, y: 150 }],
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
