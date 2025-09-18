'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'sonner';

interface PlayerResult {
  id: string;
  username: string;
  score: number;
}

interface FlashcardResult {
  flashcardId: string;
  question: string;
  answer: string;
  points: number;
  answeredBy?: string;
  isCorrect?: boolean;
}

interface MatchResult {
  _id: string;
  roomId: string;
  players: PlayerResult[];
  flashcardsPlayed: FlashcardResult[];
  createdAt: string;
}

const MatchHistoryPage: React.FC = () => {
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchResults = async () => {
      try {
        const response = await fetch('/api/match-results');
        if (!response.ok) {
          throw new Error('Failed to fetch match results');
        }
        const data: MatchResult[] = await response.json();
        setMatchResults(data);
      } catch (err: any) {
        setError(err.message);
        toast.error('Failed to load match history.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchResults();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading match history...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Match History</h1>
      {matchResults.length === 0 ? (
        <p>No match results found. Play some games to see your history!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchResults.map((match) => (
            <Card key={match._id} className="flex flex-col">
              <CardHeader>
                <CardTitle>Match in Room: {match.roomId}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-500 mb-2">
                  Played on: {new Date(match.createdAt).toLocaleString()}
                </p>
                <h3 className="font-semibold mb-1">Players:</h3>
                <ul className="list-disc list-inside mb-4">
                  {match.players.map((player) => (
                    <li key={player.id}>
                      {player.username}: {player.score} points
                    </li>
                  ))}
                </ul>
                <Link href={`/match-history/${match._id}`} passHref>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchHistoryPage;