'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

const MatchDetailsPage: React.FC = () => {
  const { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchId) return;

    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`/api/match-results?id=${matchId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch match details');
        }
        const data: MatchResult = await response.json();
        setMatchDetails(data);
      } catch (err: any) {
        setError(err.message);
        toast.error('Failed to load match details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading match details...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!matchDetails) {
    return <div className="container mx-auto p-4">Match not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/match-history" passHref>
        <Button className="mb-4">Back to Match History</Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Match Details for Room: {matchDetails.roomId}</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Match Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-2">
            Played on: {new Date(matchDetails.createdAt).toLocaleString()}
          </p>
          <h3 className="font-semibold mb-1">Players:</h3>
          <ul className="list-disc list-inside">
            {matchDetails.players.map((player) => (
              <li key={player.id}>
                {player.username}: {player.score} points
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Flashcards Played</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchDetails.flashcardsPlayed.map((flashcard, index) => (
          <Card key={flashcard.flashcardId} className="flex flex-col">
            <CardHeader>
              <CardTitle>Question {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2">
                <strong>Question:</strong> {flashcard.question}
              </p>
              <p className="mb-2">
                <strong>Answer:</strong> {flashcard.answer}
              </p>
              <p className="mb-2">
                <strong>Points:</strong> {flashcard.points}
              </p>
              {flashcard.answeredBy && (
                <p className="mb-2">
                  <strong>Answered by:</strong> {flashcard.answeredBy}
                </p>
              )}
              {flashcard.isCorrect !== undefined && (
                <p>
                  <strong>Result:</strong>{' '}
                  <span
                    className={
                      flashcard.isCorrect ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {flashcard.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchDetailsPage;