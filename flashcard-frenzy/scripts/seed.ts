import dotenv from 'dotenv'; // Import dotenv first

// Provide the absolute path to your .env file
dotenv.config({ path: 'c:\\Users\\sehal\\Documents\\SignSetu\\flashcard-frenzy\\.env', override: true });

import mongoose from 'mongoose';
import FlashcardSet from '../src/models/FlashcardSet'; // Adjust path as needed

const mockFlashcardSets = [
  {
    title: 'General Knowledge',
    description: 'A set of general knowledge flashcards.',
    createdBy: new mongoose.Types.ObjectId(), // Placeholder, replace with a real user ID if available
    isPublic: true,
    category: 'General Knowledge',
    difficulty: 'medium',
    flashcards: [
      { question: 'What is the capital of France?', answer: 'Paris', points: 100 },
      { question: 'Which planet is known as the Red Planet?', answer: 'Mars', points: 100 },
      { question: 'What is 2 + 2?', answer: '4', points: 50 },
      { question: 'What is the largest ocean on Earth?', answer: 'Pacific Ocean', points: 150 },
    ],
  },
  {
    title: 'Science Basics',
    description: 'Fundamental science questions.',
    createdBy: new mongoose.Types.ObjectId(), // Placeholder
    isPublic: true,
    category: 'Science',
    difficulty: 'easy',
    flashcards: [
      { question: 'What is the chemical symbol for water?', answer: 'H2O', points: 50 },
      { question: 'What force keeps us on the ground?', answer: 'Gravity', points: 75 },
      { question: 'What is the powerhouse of the cell?', answer: 'Mitochondria', points: 120 },
    ],
  },
];

async function seedDatabase() {
  const { connectToDatabase } = await import('../src/lib/mongodb'); // Import connectToDatabase here
  await connectToDatabase(); // Call connectToDatabase after dotenv has loaded
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB.');

    await FlashcardSet.deleteMany({});
    console.log('Cleared existing flashcard sets.');

    await FlashcardSet.insertMany(mockFlashcardSets);
    console.log('Seeded database with mock flashcard sets.');

    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();