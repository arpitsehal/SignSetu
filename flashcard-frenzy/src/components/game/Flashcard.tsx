'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FlashcardProps {
  question: string;
  answer: string;
  points: number;
  onAnswer: (isCorrect: boolean) => void;
  isAnswered?: boolean;
  answeredBy?: string;
  isHost?: boolean;
  onNext?: () => void;
}

export default function Flashcard({
  question,
  answer,
  points,
  onAnswer,
  isAnswered = false,
  answeredBy,
  isHost = false,
  onNext,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [question]);

  const handleCardClick = () => {
    if (!isAnswered) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!isAnswered) {
      onAnswer(isCorrect);
    }
  };

  console.log('Flashcard Component - onAnswer:', onAnswer, 'isAnswered:', isAnswered); // Add this line

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative h-96 perspective-1000">
        <AnimatePresence initial={false}>
          {/* Front of the card */}
          {!isFlipped && (
            <motion.div
              key="front"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 180 }} // Animate out by flipping
              transition={{ duration: 0.6 }}
              className="w-full h-full absolute bg-white rounded-xl shadow-lg p-6 flex flex-col backface-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center">
                  <h3 className="text-2xl font-medium text-center text-gray-900">
                    {question}
                  </h3>
                </div>
                <div className="mt-4 text-sm text-indigo-600 font-medium">
                  Points: {points}
                </div>
                {isAnswered && answeredBy && (
                  <div className="mt-2 text-sm text-gray-500">
                    Answered by: {answeredBy}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Back of the card */}
          {isFlipped && (
            <motion.div
              key="back"
              initial={{ rotateY: -180 }} // Start from -180 to appear as if flipped from front
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 180 }} // Animate out by flipping
              transition={{ duration: 0.6 }}
              className="w-full h-full absolute bg-indigo-50 rounded-xl shadow-lg p-6 flex flex-col backface-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-2xl font-medium text-center text-gray-900">
                    {answer}
                  </p>
                </div>
                {/* Only show answer buttons if onAnswer prop is provided and card is not yet answered */}
                {onAnswer && !isAnswered && (
                  <div className="mt-4 flex justify-center space-x-4">
                    <Button onClick={() => onAnswer(true)} variant="success">Correct</Button>
                    <Button onClick={() => onAnswer(false)} variant="danger">Incorrect</Button>
                  </div>
                )}
                {isHost && onNext && (
                  <div className="mt-4 flex justify-center">
                    <Button onClick={onNext}>Next Flashcard</Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!isFlipped && !isAnswered && (
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setIsFlipped(true)}>Reveal Answer</Button>
        </div>
      )}
    </div>
  );
}
