
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Game from '@/models/Game';

export async function POST(request: Request) {
  try {
    const { hostId, flashcardSetId } = await request.json();
    await connectToDatabase();

    const game = new Game({
      hostId,
      flashcardSetId,
      players: [hostId],
      status: 'waiting',
      scores: {},
    });

    await game.save();
    return NextResponse.json({ gameId: game._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const games = await Game.find({ status: 'waiting' });
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}