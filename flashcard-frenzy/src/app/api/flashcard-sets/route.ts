import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import FlashcardSet from '@/models/FlashcardSet';

export async function GET() {
  try {
    await connectToDatabase();
    const flashcardSets = await FlashcardSet.find({});
    return NextResponse.json(flashcardSets);
  } catch (error) {
    console.error('Failed to fetch flashcard sets:', error);
    return NextResponse.json({ error: 'Failed to fetch flashcard sets' }, { status: 500 });
  }
}