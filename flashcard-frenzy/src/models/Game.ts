import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  points: { type: Number, default: 100 },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answeredAt: { type: Date },
});

const playerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, default: 0 },
  isReady: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now },
});

const gameSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: [playerSchema],
    flashcards: [flashcardSchema],
    currentFlashcardIndex: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['waiting', 'in_progress', 'finished'],
      default: 'waiting',
    },
    maxPlayers: { type: Number, default: 4 },
    isPublic: { type: Boolean, default: true },
    startedAt: { type: Date },
    finishedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Game || mongoose.model('Game', gameSchema);
