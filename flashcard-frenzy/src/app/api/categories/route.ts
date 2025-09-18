import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import FlashcardSet from '@/models/FlashcardSet';

// Get all unique categories
export async function GET() {
  try {
    await connectToDatabase();
    const categories = await FlashcardSet.distinct('category');
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// Create a new flashcard set with category
export async function POST(request: Request) {
  try {
    const { title, description, category, difficulty, flashcards, createdBy } = await request.json();
    await connectToDatabase();

    const flashcardSet = new FlashcardSet({
      title,
      description,
      category,
      difficulty,
      flashcards,
      createdBy
    });

    await flashcardSet.save();
    return NextResponse.json(flashcardSet);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create flashcard set' }, { status: 500 });
  }
}