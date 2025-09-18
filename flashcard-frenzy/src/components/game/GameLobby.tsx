'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { User } from '@supabase/supabase-js'; // Import User type
import { Player } from '@/types/game'; // Import Player type

interface GameLobbyProps {
  roomId: string;
  currentUser: Player | null; // Changed from User | null to Player | null
  onStartGame: () => void;
}

export default function GameLobby({ roomId, currentUser, onStartGame }: GameLobbyProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would subscribe to real-time updates for the game room
    // This is a simplified version for demonstration
    fetchGameState();

    // Set up real-time subscription
    const gameChannel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'game_rooms' },
        (payload) => {
          console.log('Game room update:', payload);
          fetchGameState();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gameChannel);
    };
  }, [roomId]);

  const fetchGameState = async () => {
    // In a real app, you would fetch the current game state from your database
    // This is mock data for demonstration
    setPlayers([
      {
        id: currentUser?.id || 'current-user-mock',
        username: currentUser?.username || 'Player 1',
        avatar: currentUser?.avatar || '',
        score: 0, // Added missing score property
        isActive: true, // Added missing isActive property
        isReady,
        isHost: true
      },
      { id: '2', username: 'Alice', avatar: '', score: 0, isActive: true, isReady: true, isHost: false }, // Added missing score and isActive
      { id: '3', username: 'Bob', avatar: '', score: 0, isActive: true, isReady: true, isHost: false },   // Added missing score and isActive
    ]);
    setIsHost(true); // For demo purposes, current user is always host
  };

  const toggleReady = async () => {
    try {
      setIsReady(!isReady);
      // In a real app, update the player's ready status in the database
      // await supabase.from('game_players').update({ is_ready: !isReady }).eq('user_id', currentUser.id);
    } catch (error: unknown) { // Changed error to unknown
      console.error('Error updating ready status:', error);
      toast.error(
        (error instanceof Error && error.message) ||
          'An error occurred while updating ready status'
      );
      setIsReady(!isReady); // Revert on error
    }
  };

  const copyRoomLink = () => {
    const url = `${window.location.origin}/game/${roomId}`;
    navigator.clipboard.writeText(url);
    toast.success('Room link copied to clipboard!');
  };

  const handleStartGame = () => {
    if (players.filter(p => p.isReady).length < 2) {
      toast.error('Need at least 2 players ready to start');
      return;
    }
    onStartGame();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Game Lobby</h1>
            <p className="text-gray-600 dark:text-gray-400">Room ID: {roomId}</p>
          </div>
          <Button
            variant="outline"
            onClick={copyRoomLink}
            className="mt-4 md:mt-0"
          >
            Copy Invite Link
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Players List */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Players ({players.length}/8)
            </h2>
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span className="font-medium text-indigo-600 dark:text-indigo-300">
                        {player.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {player.username} {player.isHost && '(Host)'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {player.isReady ? 'Ready' : 'Not Ready'}
                      </p>
                    </div>
                  </div>
                  {player.isReady && (
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Game Settings */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Game Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Questions
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  defaultValue="10"
                >
                  {[5, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>{num} questions</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  defaultValue="general"
                >
                  <option value="general">General Knowledge</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="geography">Geography</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              <div className="pt-4">
                <Button
                  onClick={toggleReady}
                  variant={isReady ? 'secondary' : 'primary'}
                  fullWidth
                  className="mb-3"
                >
                  {isReady ? 'Not Ready' : 'I\'m Ready'}
                </Button>

                  <Button
                    onClick={handleStartGame}
                    fullWidth
                    disabled={!isHost || !currentUser || !players.some(p => p.isReady && p.id !== currentUser.id)} // Added !currentUser check
                  >
                    Start Game
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}