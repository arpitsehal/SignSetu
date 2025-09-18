import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import MatchResult from '@/models/MatchResult';

export async function POST(request: Request) {
  try {
    const matchData = await request.json();
    await connectToDatabase();

    const matchResult = new MatchResult(matchData);
    await matchResult.save();

    return NextResponse.json({ message: 'Match result saved successfully', matchResult }, { status: 201 });
  } catch (error) {
    console.error('Failed to save match result:', error);
    return NextResponse.json({ error: 'Failed to save match result' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const matchResults = await MatchResult.find({});
    return NextResponse.json(matchResults);
  } catch (error) {
    console.error('Failed to fetch match results:', error);
    return NextResponse.json({ error: 'Failed to fetch match results' }, { status: 500 });
  }
}