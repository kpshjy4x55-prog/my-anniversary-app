'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Fireworks from './Fireworks';

interface ProposalScreenProps {
  onReset: () => void;
}

export default function ProposalScreen({ onReset }: ProposalScreenProps) {
  const [showFireworks, setShowFireworks] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    setAccepted(true);
    setShowFireworks(true);
  };

  const handleNoHover = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  if (accepted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-red-100 relative overflow-hidden"
      >
        {showFireworks && <Fireworks />}

        <motion.div
          initial={{ scale: 0, rotateZ: -30 }}
          animate={{ scale: 1, rotateZ: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center z-10"
        >
          <h1
            className="text-5xl md:text-7xl font-bold text-red-600 mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            You Made Me Happy!
          </h1>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-8"
          >
            🎉💕
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-red-500 mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            I love you so much!
          </motion.p>

          {/* Hamster Celebration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl"
            >
              🐹
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl"
            >
              💕
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl"
            >
              🐹
            </motion.div>
          </motion.div>

          <motion.button
            onClick={onReset}
            className="px-8 py-3 bg-red-500 text-white rounded-full text-lg font-semibold hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-red-50 p-4"
    >
      {/* Main proposal text */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          💕
        </motion.div>

        <h2
          className="text-4xl md:text-6xl font-bold text-red-600 mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          I want to spend another 365 days loving you.
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-700 mb-12"
        >
          Do you want the same?
        </motion.p>
      </motion.div>

      {/* Hamster celebration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-6 mb-12"
      >
        <motion.span
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-5xl"
        >
          🐹
        </motion.span>
        <motion.span
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-5xl"
        >
          🐹
        </motion.span>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-6 flex-col sm:flex-row"
      >
        <motion.button
          onClick={handleYes}
          className="px-12 py-4 bg-red-500 text-white rounded-full text-2xl font-bold hover:bg-red-600 transition-colors shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Yes! 💕
        </motion.button>

        <motion.button
          onMouseEnter={handleNoHover}
          className="px-12 py-4 bg-gray-400 text-white rounded-full text-2xl font-bold cursor-pointer relative"
          style={{
            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
          }}
          animate={{
            x: noButtonPosition.x,
            y: noButtonPosition.y,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          No
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
