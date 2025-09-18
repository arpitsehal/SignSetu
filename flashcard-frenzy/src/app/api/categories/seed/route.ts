import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import FlashcardSet from '@/models/FlashcardSet';

export async function POST() {
  try {
    await connectToDatabase();

    const initialSets = [
      {
        title: 'Basic Greetings',
        description: 'Learn common greeting signs in Indian Sign Language',
        category: 'Greetings',
        difficulty: 'easy',
        flashcards: [
          { question: 'Hello', answer: 'Wave hand near face', points: 100 },
          { question: 'Good Morning', answer: 'Both hands raised with palms facing forward, moving upward', points: 100 },
          { question: 'Thank You', answer: 'Touch lips with fingertips, then move hand forward', points: 100 }
        ]
      },
      {
        title: 'Numbers 1-10',
        description: 'Basic number signs in Indian Sign Language',
        category: 'Numbers',
        difficulty: 'easy',
        flashcards: [
          { question: 'One', answer: 'Index finger pointing up', points: 100 },
          { question: 'Two', answer: 'Index and middle finger pointing up', points: 100 },
          { question: 'Three', answer: 'Index, middle, and ring finger pointing up', points: 100 }
        ]
      },
      {
        title: 'Family Members',
        description: 'Signs for family relations',
        category: 'Family',
        difficulty: 'medium',
        flashcards: [
          { question: 'Mother', answer: 'Thumb touching chin', points: 100 },
          { question: 'Father', answer: 'Thumb touching forehead', points: 100 },
          { question: 'Sister', answer: 'Female sign with sibling motion', points: 100 }
        ]
      },
      {
        title: 'Common Foods',
        description: 'Signs for everyday food items',
        category: 'Food',
        difficulty: 'easy',
        flashcards: [
          { question: 'Water', answer: 'Tap index finger on chin', points: 100 },
          { question: 'Eat', answer: 'Bring flattened O-hand to mouth repeatedly', points: 100 },
          { question: 'Milk', answer: 'Squeeze hand repeatedly as if milking', points: 100 }
        ]
      },
      {
        title: 'Colors',
        description: 'Learn various color signs',
        category: 'Colors',
        difficulty: 'medium',
        flashcards: [
          { question: 'Red', answer: 'Rub index finger down lips', points: 100 },
          { question: 'Blue', answer: 'Shake B-hand side to side', points: 100 },
          { question: 'Green', answer: 'Shake G-hand side to side', points: 100 }
        ]
      },
      {
        title: 'Animals',
        description: 'Signs for common animals',
        category: 'Animals',
        difficulty: 'hard',
        flashcards: [
          { question: 'Dog', answer: 'Pat thigh, then snap fingers', points: 100 },
          { question: 'Cat', answer: 'Stroke whiskers with thumb and index finger', points: 100 },
          { question: 'Bird', answer: 'Form beak with thumb and index finger, tap together', points: 100 }
        ]
      },
      {
        title: 'Alphabets',
        description: 'Learn the Indian Sign Language alphabet',
        category: 'Alphabets',
        difficulty: 'medium',
        flashcards: [
          { question: 'A', answer: 'Closed fist, thumb up', points: 100 },
          { question: 'B', answer: 'Flat hand, thumb tucked', points: 100 },
          { question: 'C', answer: 'Hand shaped like C', points: 100 }
        ]
      },
      {
        title: 'Common Phrases',
        description: 'Learn common phrases in Indian Sign Language',
        category: 'Phrases',
        difficulty: 'medium',
        flashcards: [
          { question: 'How are you?', answer: 'Hands meet at chest, then move outwards', points: 100 },
          { question: 'Nice to meet you', answer: 'Right hand touches left, then both move forward', points: 100 },
          { question: 'Excuse me', answer: 'Brush fingertips of one hand against palm of other', points: 100 }
        ]
      }
    ];

    await FlashcardSet.insertMany(initialSets);
    return NextResponse.json({ message: 'Initial flashcard sets created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed flashcard sets' }, { status: 500 });
  }
}