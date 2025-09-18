import { useEffect, useCallback } from 'react'; // Removed useState as it's not directly used here
import { create } from 'zustand';
// Removed supabase import as it's not directly used in this file
import { toast } from 'react-hot-toast';
import { Player, Flashcard } from '@/types/game'; // Import Player and Flashcard from the new types file
// Removed MatchResult import as it's not used

// Define an interface for the structure of a flashcard set
interface FlashcardSet {
  flashcards: Flashcard[];
  // Add any other properties that a flashcard set might have if needed
}

type GameState = {
  roomId: string | null;
  players: Player[];
  currentPlayer: Player | null;
  currentFlashcard: Flashcard | null;
  flashcardIndex: number;
  flashcards: Flashcard[];
  gameStatus: 'waiting' | 'in_progress' | 'finished';
  isHost: boolean;
  // New state to track flashcards played with results
  playedFlashcards: {
    id: string; // Changed from flashcardId to id
    question: string;
    answer: string;
    points: number;
    answeredBy?: string; // Username of player who answered correctly
    isCorrect?: boolean; // Whether the current player answered correctly (if applicable)
  }[];
  setRoomId: (roomId: string) => void;
  setCurrentPlayer: (player: Player) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayer: (playerId: string, updates: Partial<Player>) => void;
  startGame: () => Promise<void>;
  nextFlashcard: () => Promise<void>;
  submitAnswer: (isCorrect: boolean) => Promise<void>;
  resetGame: () => void;
};

// Removed MOCK_FLASHCARDS as it's commented out and not used

const useGameStore = create<GameState>((set, get) => ({
  roomId: null,
  players: [],
  currentPlayer: null,
  currentFlashcard: null,
  flashcardIndex: -1,
  flashcards: [],
  gameStatus: 'waiting',
  isHost: false,
  playedFlashcards: [], // Initialize new state

  setRoomId: (roomId) => set({ roomId }),

  setCurrentPlayer: (player) => {
    set({ currentPlayer: player });
    // If this is the first player, make them the host
    if (get().players.length === 0) {
      set({ isHost: true });
    }
  },

  addPlayer: (player) => {
    set((state) => ({
      players: [...state.players, player],
    }));
  },

  removePlayer: (playerId) => {
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    }));
  },

  updatePlayer: (playerId, updates) => {
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, ...updates } : p
      ),
    }));
  },

  startGame: async () => {
    // In a real app, you would fetch flashcards from your database
    // For now, we'll use mock data
    // const flashcards = [...MOCK_FLASHCARDS];

    try {
      const response = await fetch('/api/flashcard-sets');
      if (!response.ok) {
        throw new Error('Failed to fetch flashcard sets');
      }
      const data = await response.json();
      // Assuming data is an array of flashcard sets, and we want to combine all flashcards
      const flashcards = data.flatMap((set: FlashcardSet) => set.flashcards); // Fixed 'any' type

      set({
        flashcards,
        gameStatus: 'in_progress',
        flashcardIndex: 0,
        currentFlashcard: flashcards[0],
        playedFlashcards: [], // Reset played flashcards at the start of a new game
      });

      // Update all players that the game has started
      set((state) => ({
        players: state.players.map((p) => ({
          ...p,
          isReady: false,
          score: 0,
        })),
      }));
    } catch (error: unknown) { // Changed error to unknown
      console.error('Error starting game:', error);
      toast.error(
        (error instanceof Error && error.message) ||
          'Failed to start game. Please try again.'
      );
    }
  },

  nextFlashcard: async () => {
    const { flashcardIndex, flashcards, roomId, players, playedFlashcards } = get();
    const nextIndex = flashcardIndex + 1;

    if (nextIndex >= flashcards.length) {
      // Game over
      set({ gameStatus: 'finished' });

      // Prepare and send match results to the API
      if (roomId) {
        const matchData = {
          roomId,
          players: players.map(p => ({ id: p.id, username: p.username, score: p.score })),
          flashcardsPlayed: playedFlashcards,
        };

        try {
          const response = await fetch('/api/match-results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(matchData),
          });

          if (!response.ok) {
            throw new Error('Failed to save match results');
          }
          toast.success('Match results saved!');
        } catch (error: unknown) { // Changed error to unknown
          console.error('Error saving match results:', error);
          toast.error(
            (error instanceof Error && error.message) ||
            'Failed to save match results.'
          );
        }
      }
      return;
    }

    set({
      flashcardIndex: nextIndex,
      currentFlashcard: {
        ...flashcards[nextIndex],
        answeredBy: undefined,
        answeredAt: undefined,
      },
    });
  },

  submitAnswer: async (isCorrect: boolean) => {
    const { currentPlayer, currentFlashcard } = get();
    if (!currentPlayer || !currentFlashcard) return;

    // Update player score
    const points = isCorrect ? currentFlashcard.points : 0;

    set((state) => ({
      players: state.players.map((p) =>
        p.id === currentPlayer.id
          ? { ...p, score: p.score + points }
          : p
      ),
      currentFlashcard: {
        ...currentFlashcard,
        answeredBy: isCorrect ? currentPlayer.username : undefined,
        answeredAt: new Date(),
      },
      // Add the played flashcard to the playedFlashcards array
      playedFlashcards: [
        ...state.playedFlashcards,
        {
          id: currentFlashcard.id, // Changed from flashcardId to id
          question: currentFlashcard.question,
          answer: currentFlashcard.answer,
          points: currentFlashcard.points,
          answeredBy: isCorrect ? currentPlayer.username : undefined,
          isCorrect: isCorrect,
        },
      ],
    }));

    // Show feedback
    toast.success(isCorrect ? 'Correct!' : 'Incorrect!');
  },

  resetGame: () => {
    set({
      currentFlashcard: null,
      flashcardIndex: -1,
      flashcards: [],
      gameStatus: 'waiting',
      players: get().players.map((p) => ({
        ...p,
        score: 0,
        isReady: false,
      })),
      playedFlashcards: [], // Reset played flashcards on game reset
    });
  },
}));

export function useGame(roomId?: string) {
  const {
    roomId: currentRoomId,
    players,
    currentPlayer,
    currentFlashcard,
    flashcardIndex,
    gameStatus,
    isHost,
    setRoomId,
    setCurrentPlayer,
    addPlayer,
    // removePlayer, // Removed from destructuring as it's not directly used in this hook
    updatePlayer,
    startGame,
    nextFlashcard,
    submitAnswer,
    resetGame,
  } = useGameStore();

  // Set up real-time subscriptions
  useEffect(() => {
    if (!roomId) return;

    setRoomId(roomId);

    // In a real app, you would subscribe to real-time updates here
    // For now, we'll just set up a mock player
    const mockPlayer = {
      id: 'current-user',
      username: 'You',
      score: 0,
      isReady: false,
      isHost: true,
      isActive: true,
    };

    setCurrentPlayer(mockPlayer);
    addPlayer(mockPlayer);

    // Add some mock players for development
    const mockPlayers = [
      { id: '2', username: 'Alice', score: 0, isReady: true, isHost: false, isActive: true },
      { id: '3', username: 'Bob', score: 0, isReady: true, isHost: false, isActive: true },
      { id: '4', username: 'Charlie', score: 0, isReady: false, isHost: false, isActive: true },
    ];

    mockPlayers.forEach(addPlayer);

    return () => {
      // Clean up subscriptions
      // supabase.removeChannel(gameChannel); // Commented out this line
      setRoomId('');
    };
  }, [roomId, setRoomId, setCurrentPlayer, addPlayer]);

  // Handle player ready state
  const toggleReady = useCallback(() => {
    if (!currentPlayer) return;

    const newReadyState = !currentPlayer.isReady;
    updatePlayer(currentPlayer.id, { isReady: newReadyState });

    toast.success(`You are now ${newReadyState ? 'ready' : 'not ready'}`);
  }, [currentPlayer, updatePlayer]);

  // Handle starting the game
  const handleStartGame = useCallback(async () => {
    if (!isHost) return;

    const readyPlayers = players.filter((p) => p.isReady);
    if (readyPlayers.length < 2) {
      toast.error('Need at least 2 players to start');
      return;
    }

    await startGame();
    toast.success('Game started!');
  }, [isHost, players, startGame]);

  // Handle submitting an answer
  const handleAnswer = useCallback(async (isCorrect: boolean) => {
    if (!currentPlayer || !currentFlashcard || currentFlashcard.answeredBy) return;

    await submitAnswer(isCorrect);
  }, [currentPlayer, currentFlashcard, submitAnswer]);

  // Handle moving to the next flashcard
  const goToNextFlashcard = useCallback(async () => {
    if (!isHost) return;

    await nextFlashcard();
  }, [isHost, nextFlashcard]);

  return {
    // State
    roomId: currentRoomId,
    players,
    currentPlayer,
    currentFlashcard,
    flashcardIndex,
    gameStatus,
    isHost,

    // Actions
    toggleReady,
    startGame: handleStartGame,
    submitAnswer: handleAnswer,
    nextFlashcard: goToNextFlashcard,
    resetGame,
  };
}