'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MemoryCardGame from './MemoryCardGame';
import ProposalScreen from './ProposalScreen';

export default function AnniversaryApp() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Your anniversary photos
  const memoryImages = [
    '/memories/1.avif',
    '/memories/2.avif',
    '/memories/3.avif',
    '/memories/4.avif',
    '/memories/5.avif',
    '/memories/6.avif',
    '/memories/7.avif',
    '/memories/8.avif',
    '/memories/9.avif',
    '/memories/10.avif',
    '/memories/11.avif',
    '/memories/12.avif',
    '/memories/13.avif',
    '/memories/14.avif',
    '/memories/15.avif',
    '/memories/16.avif',
    '/memories/17.avif',
    '/memories/18.avif',
  ];

  // Return the memory images
  const getImages = (): string[] => {
    return memoryImages;
  };

  const handleGameComplete = () => {
    setGameComplete(true);
  };

  const handleReset = () => {
    setGameStarted(false);
    setGameComplete(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 via-red-50 to-pink-100 flex items-center justify-center p-4">
      {/* Welcome Screen */}
      {!gameStarted && !gameComplete && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-8"
          >
            💝
          </motion.div>

          <h1
            className="text-5xl md:text-7xl font-bold text-red-600 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Love Story
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            A special anniversary memory game just for my love, Iskandar Hendricks.
          </p>

          <p className="text-gray-600 mb-12 max-w-xl mx-auto">
            Find all the matching memory pairs to reveal a special surprise. Each card holds a precious moment we shared together.
          </p>

          <motion.button
            onClick={() => setGameStarted(true)}
            className="px-12 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-2xl font-bold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game 💕
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-gray-600"
          >
            This game features up to 36 of your favorite photos!
          </motion.p>
        </motion.div>
      )}

      {/* Game Screen */}
      {gameStarted && !gameComplete && (
        <motion.div
          key="game"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="w-full"
        >
          <div className="max-w-4xl mx-auto">
            <MemoryCardGame
              images={getImages()}
              onGameComplete={handleGameComplete}
            />
          </div>
        </motion.div>
      )}

      {/* Proposal Screen */}
      {gameComplete && (
        <motion.div
          key="proposal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-screen"
        >
          <ProposalScreen onReset={handleReset} />
        </motion.div>
      )}
    </div>
  );
}
