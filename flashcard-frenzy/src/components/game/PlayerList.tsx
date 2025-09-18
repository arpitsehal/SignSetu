'use client';

import { motion } from 'framer-motion';
import { Player } from '@/types/game'; // Import Player from the new types file

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
  className?: string;
}

export default function PlayerList({ players, currentPlayerId, className = '' }: PlayerListProps) {
  // Sort players by score (descending)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Find the current player's position
  const currentPlayerIndex = sortedPlayers.findIndex(p => p.id === currentPlayerId);
  const currentPlayer = sortedPlayers[currentPlayerIndex];

  // Ensure current player is always visible if not in top 3
  const displayPlayers = sortedPlayers.slice(0, 3);
  if (currentPlayerIndex >= 3) {
    displayPlayers.push(currentPlayer);
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Players</h3>
      <div className="space-y-3">
        {displayPlayers.map((player, index) => {
          const isCurrentUser = player.id === currentPlayerId;
          const isTopPlayer = index < 3;
          
          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isCurrentUser 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700' 
                  : 'bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {isTopPlayer && (
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-yellow-800 font-bold text-sm">
                    {index + 1}
                  </div>
                )}
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
                    {player.username}
                    {isCurrentUser && ' (You)'}
                  </p>
                  {!player.isActive && (
                    <span className="text-xs text-red-500">Disconnected</span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-900 dark:text-white font-medium mr-2">
                  {player.score}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  pts
                </span>
              </div>
            </motion.div>
          );
        })}
        
        {players.length > 4 && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
            +{players.length - displayPlayers.length} more players
          </div>
        )}
      </div>
    </div>
  );
}
