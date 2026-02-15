
export enum GameState {
  SPLASH = 'SPLASH',
  AUTH = 'AUTH',
  MAP = 'MAP',
  LEVEL = 'LEVEL',
  PROFILE = 'PROFILE',
  LEADERBOARD = 'LEADERBOARD',
  NOTIFICATIONS = 'NOTIFICATIONS'
}

export enum Gender {
  BOY = 'BOY',
  GIRL = 'GIRL'
}

export interface UserProfile {
  name: string;
  phone: string;
  avatar: Gender;
  streak: number;
  hearts: number;
  badges: string[];
  score: number;
  completedLevels: string[];
}

export interface City {
  id: string;
  name: string;
  landmark: string;
  locked: boolean;
  color: string;
  accent: string;
  position: { x: number; y: number };
  description: string;
}

export type TurtleAction = 'forward' | 'backward' | 'right' | 'left' | 'penUp' | 'penDown' | 'comment' | 'for_loop';

export interface CodeBlock {
  id: string;
  type: TurtleAction;
  value?: number;
  text?: string;
  label: string;
  children?: CodeBlock[];
}

export interface Level {
  id: string;
  cityId: string;
  title: string;
  mission: string;
  targetPath: { x: number; y: number }[];
  startPos: { x: number; y: number; angle: number };
  availableBlocks: TurtleAction[];
}
