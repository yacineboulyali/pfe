
import React, { useState, useEffect } from 'react';
import { GameState, UserProfile, Gender } from './types';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import WorldMap from './components/WorldMap';
import GameLevel from './components/GameLevel';
import ProfileScreen from './components/ProfileScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import NotificationScreen from './components/NotificationScreen';
import BottomNavigation from './components/BottomNavigation';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SPLASH);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentLevelId, setCurrentLevelId] = useState<string | null>(null);

  const handleStart = () => setGameState(GameState.AUTH);

  const handleAuthComplete = (name: string, phone: string, avatar: Gender) => {
    setUser({
      name,
      phone,
      avatar,
      streak: 5,
      hearts: 5,
      badges: [],
      score: 1463,
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

  const showNavbar = user && (
    gameState === GameState.MAP || 
    gameState === GameState.PROFILE || 
    gameState === GameState.LEADERBOARD ||
    gameState === GameState.NOTIFICATIONS
  );

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-amber-50 shadow-2xl overflow-hidden flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {gameState === GameState.SPLASH && <SplashScreen onStart={handleStart} />}
        
        {gameState === GameState.AUTH && (
          <AuthScreen onComplete={handleAuthComplete} />
        )}

        {gameState === GameState.MAP && user && (
          <WorldMap user={user} onSelectLevel={handleSelectLevel} />
        )}

        {gameState === GameState.PROFILE && user && (
          <ProfileScreen user={user} />
        )}

        {gameState === GameState.LEADERBOARD && user && (
          <LeaderboardScreen user={user} />
        )}

        {gameState === GameState.NOTIFICATIONS && user && (
          <NotificationScreen user={user} />
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

      {showNavbar && (
        <BottomNavigation 
          currentTab={gameState} 
          onTabChange={(state) => setGameState(state)} 
        />
      )}
    </div>
  );
};

export default App;
