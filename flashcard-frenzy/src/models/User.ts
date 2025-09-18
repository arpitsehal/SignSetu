import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatar: { type: String },
    totalScore: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
