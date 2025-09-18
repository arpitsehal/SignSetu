import mongoose from 'mongoose';

const playerResultSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

const flashcardResultSchema = new mongoose.Schema({
  id: { type: String, required: true }, // <--- This is what the schema expects
  question: { type: String, required: true },
  answer: { type: String, required: true },
  points: { type: Number, required: true },
  answeredBy: { type: String }, // Player who answered it correctly
  isCorrect: { type: Boolean }, // Whether the current player answered correctly
});

const matchResultSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true },
    players: [playerResultSchema],
    flashcardsPlayed: [flashcardResultSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.MatchResult || mongoose.model('MatchResult', matchResultSchema);