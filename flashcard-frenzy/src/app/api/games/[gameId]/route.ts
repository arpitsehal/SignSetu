import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Game from '@/models/Game';

export async function GET(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    await connectToDatabase();
    const game = await Game.findById(params.gameId);
    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { playerId, action, data } = await request.json();
    await connectToDatabase();

    const game = await Game.findById(params.gameId);
    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    switch (action) {
      case 'join':
        if (!game.players.includes(playerId)) {
          game.players.push(playerId);
          game.scores[playerId] = 0;
        }
        break;
      case 'start':
        if (game.hostId === playerId) {
          game.status = 'in_progress';
        }
        break;
      case 'updateScore':
        if (game.players.includes(playerId)) {
          game.scores[playerId] += data.points;
        }
        break;
      case 'end':
        if (game.hostId === playerId) {
          game.status = 'completed';
        }
        break;
    }

    await game.save();
    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
  }
}