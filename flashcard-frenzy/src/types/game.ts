import { ObjectId } from 'mongoose';

export interface Player {
  id: string;
  username: string;
  avatar?: string;
  score: number;
  isActive: boolean;
  isCurrentUser?: boolean;
  isReady?: boolean;
  isHost?: boolean;
  userId?: ObjectId;
  joinedAt?: Date;
  isConnected?: boolean; // Add this line
}

export interface Flashcard {
  id: string; // <--- Here
  question: string;
  answer: string;
  points: number;
  answeredBy?: string;
  answeredAt?: Date;
}