'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Player } from '@/types/game'; // Import the base Player interface

interface PlayerScore extends Player { // Extend the Player interface
  correctAnswers: number;
  fastestAnswer?: number; // in milliseconds
}

interface ScoreboardProps {
  players: PlayerScore[];
  currentPlayerId: string;
  onPlayAgain?: () => void;
  onReturnToLobby?: () => void;
  className?: string;
}

export default function Scoreboard({
  players,
  currentPlayerId,
  onPlayAgain,
  onReturnToLobby,
  className = '',
}: ScoreboardProps) {
  // Sort players by score (descending)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  // Find the current player
  const currentPlayer = sortedPlayers.find(p => p.id === currentPlayerId);
  
  // Get top 3 players
  const topPlayers = sortedPlayers.slice(0, 3);
  
  // Calculate stats
  const totalQuestions = Math.max(...sortedPlayers.map(p => p.correctAnswers + (p.score - p.correctAnswers * 100) / 50));
  const averageScore = sortedPlayers.reduce((sum, p) => sum + p.score, 0) / sortedPlayers.length;
  const fastestAnswer = Math.min(...sortedPlayers.map(p => p.fastestAnswer || Infinity));
  const fastestPlayer = sortedPlayers.find(p => p.fastestAnswer === fastestAnswer);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold text-center">Game Over!</h2>
        <p className="text-center text-indigo-100 mt-1">
          Check out the final standings
        </p>
      </div>

      {/* Podium */}
      <div className="px-6 pt-6">
        <div className="flex justify-center items-end h-48 mb-6 space-x-2">
          {[1, 0, 2].map((position) => {
            const player = topPlayers[position];
            if (!player) return null;
            
            const isCurrentUser = player.id === currentPlayerId;
            const height = ["h-32", "h-40", "h-28"][position];
            const bgColor = ["bg-yellow-400", "bg-gray-300", "bg-amber-600"][position];
            const textColor = ["text-yellow-800", "text-gray-800", "text-amber-800"][position];
            
            return (
              <div key={player.id} className="flex flex-col items-center flex-1 max-w-28">
                <div className="text-center mb-2">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1 ${isCurrentUser ? 'ring-2 ring-white' : ''}`}>
                    <span className="font-bold text-lg">
                      {player.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 block truncate">
                    {player.username}
                  </span>
                </div>
                <div className={`${height} ${bgColor} w-full rounded-t-lg flex flex-col items-center justify-end p-2 relative`}>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                    {position === 0 ? (
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    ) : position === 1 ? (
                      <Award className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Award className="w-5 h-5 text-amber-700" />
                    )}
                  </div>
                  <span className={`text-2xl font-bold ${textColor}`}>
                    {player.score}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {player.correctAnswers}/{totalQuestions} correct
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Questions</div>
          <div className="text-lg font-semibold">{totalQuestions}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Avg. Score</div>
          <div className="text-lg font-semibold">{Math.round(averageScore)}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Fastest Answer</div>
          <div className="text-lg font-semibold">
            {fastestPlayer ? `${fastestPlayer.username} (${fastestAnswer}ms)` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Player List */}
      <div className="px-6 pb-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Final Standings
        </h3>
        <div className="space-y-2">
          <AnimatePresence>
            {sortedPlayers.map((player, index) => {
              const isCurrentUser = player.id === currentPlayerId;
              const isTop3 = index < 3;
              
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isCurrentUser 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700' 
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span className="font-medium text-indigo-600 dark:text-indigo-300">
                        {player.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className={`font-medium ${
                        isCurrentUser 
                          ? 'text-indigo-700 dark:text-indigo-300' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {player.username} {isCurrentUser && '(You)'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {player.correctAnswers} correct • {player.score} points
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isTop3 && (
                      <span className="text-yellow-500">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    )}
                    <span className="text-gray-900 dark:text-white font-medium">
                      #{index + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col space-y-3">
          {onPlayAgain && (
            <Button 
              onClick={onPlayAgain}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Play Again
            </Button>
          )}
          {onReturnToLobby && (
            <Button 
              onClick={onReturnToLobby}
              variant="outline"
              className="w-full"
            >
              Return to Lobby
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
