import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  points: { type: Number, default: 100 },
});

const flashcardSetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPublic: { type: Boolean, default: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    flashcards: [flashcardSchema],
    plays: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Add text index for search functionality
flashcardSetSchema.index(
  { title: 'text', description: 'text', category: 'text' },
  { weights: { title: 3, description: 1, category: 2 } }
);

export default mongoose.models.FlashcardSet || mongoose.model('FlashcardSet', flashcardSetSchema);
