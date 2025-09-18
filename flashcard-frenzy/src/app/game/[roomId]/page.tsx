'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/hooks/useGame';
import GameLobby from '@/components/game/GameLobby';
import Flashcard from '@/components/game/Flashcard';
import Scoreboard from '@/components/game/Scoreboard';
import PlayerList from '@/components/game/PlayerList';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Player } from '@/types/game'; // Import Player from the new types file

export default function GameRoom({ params }: { params: { roomId: string } }) {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  
  const {
    roomId,
    players,
    currentPlayer,
    currentFlashcard,
    flashcardIndex,
    gameStatus,
    isHost,
    toggleReady,
    startGame,
    submitAnswer,
    nextFlashcard,
    resetGame,
  } = useGame(params.roomId);

  // Handle user leaving the game
  const handleLeaveGame = async () => {
    setIsLeaving(true);
    
    try {
      // In a real app, you would notify other players and clean up
      // await supabase.rpc('leave_game', { room_id: roomId });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error leaving game:', error);
      setIsLeaving(false);
    }
  };

  // Handle answering a flashcard
  const handleAnswer = (isCorrect: boolean) => {
    if (!currentPlayer) return;
    submitAnswer(isCorrect);
  };

  // Render the appropriate game screen based on game state
  const renderGameScreen = () => {
    switch (gameStatus) {
      case 'waiting':
        return (
          <GameLobby
            roomId={roomId || ''}
            currentUser={currentPlayer}
            onStartGame={startGame}
          />
        );
      
      case 'in_progress':
        if (!currentFlashcard) return null;
        
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Question {flashcardIndex + 1} of {10} {/* Replace with actual total */}
                  </h1>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${((flashcardIndex + 1) / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <Flashcard
                  question={currentFlashcard.question}
                  answer={currentFlashcard.answer}
                  points={currentFlashcard.points}
                  onAnswer={handleAnswer}
                  isAnswered={!!currentFlashcard.answeredBy}
                  answeredBy={currentFlashcard.answeredBy}
                  isHost={isHost}
                  onNext={nextFlashcard}
                />
              </div>
              
              <div className="lg:col-span-1">
                <PlayerList 
                  players={players} 
                  currentPlayerId={currentPlayer?.id || ''} 
                />
              </div>
            </div>
          </div>
        );
      
      case 'finished':
        return (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Scoreboard
              players={players.map(p => ({
                ...p,
                correctAnswers: Math.floor(p.score / 100), // Simple calculation for demo
                fastestAnswer: 1000 + Math.random() * 3000, // Mock data
              }))}
              currentPlayerId={currentPlayer?.id || ''}
              onPlayAgain={() => {
                resetGame();
                startGame();
              }}
              onReturnToLobby={() => resetGame()}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  // Show loading state while connecting
  if (!currentPlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Connecting to game room...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Flashcard Frenzy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Room: {roomId} {isHost && '(Host)'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {players.slice(0, 3).map((player) => (
                <div 
                  key={player.id}
                  className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center border-2 border-white dark:border-gray-800"
                  title={player.username}
                >
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">
                    {player.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              ))}
              {players.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-800">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    +{players.length - 3}
                  </span>
                </div>
              )}
            </div>
            
            <Button
              variant="danger"
              size="sm"
              onClick={handleLeaveGame}
              isLoading={isLeaving}
            >
              Leave Game
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={gameStatus}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderGameScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Flashcard Frenzy © {new Date().getFullYear()}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
