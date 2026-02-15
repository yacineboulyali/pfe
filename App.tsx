
import React, { useState, useEffect } from 'react';
import { GameState, UserProfile, Gender } from './types';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import WorldMap from './components/WorldMap';
import GameLevel from './components/GameLevel';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SPLASH);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentLevelId, setCurrentLevelId] = useState<string | null>(null);

  // Initialize a mock user for testing if needed
  useEffect(() => {
    // If we had local storage persistence, it would go here
  }, []);

  const handleStart = () => setGameState(GameState.AUTH);

  const handleAuthComplete = (name: string, phone: string, avatar: Gender) => {
    setUser({
      name,
      phone,
      avatar,
      streak: 0,
      hearts: 5,
      badges: [],
      score: 0,
      completedLevels: []
    });
    setGameState(GameState.MAP);
  };

  const handleSelectLevel = (levelId: string) => {
    setCurrentLevelId(levelId);
    setGameState(GameState.LEVEL);
  };

  const handleLevelComplete = (success: boolean) => {
    if (success && user) {
      setUser({
        ...user,
        score: user.score + 100,
        completedLevels: [...user.completedLevels, currentLevelId!]
      });
    } else if (!success && user) {
      setUser({
        ...user,
        hearts: Math.max(0, user.hearts - 1)
      });
    }
    setGameState(GameState.MAP);
  };

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-amber-50 shadow-2xl overflow-hidden flex flex-col">
      {gameState === GameState.SPLASH && <SplashScreen onStart={handleStart} />}
      
      {gameState === GameState.AUTH && (
        <AuthScreen onComplete={handleAuthComplete} />
      )}

      {gameState === GameState.MAP && user && (
        <WorldMap user={user} onSelectLevel={handleSelectLevel} />
      )}

      {gameState === GameState.LEVEL && user && currentLevelId && (
        <GameLevel 
          user={user} 
          levelId={currentLevelId} 
          onFinish={handleLevelComplete}
          onBack={() => setGameState(GameState.MAP)}
        />
      )}
    </div>
  );
};

export default App;
