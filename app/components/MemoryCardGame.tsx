'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Card {
  id: number;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
  image: string;
}

interface MemoryCardGameProps {
  images: string[];
  onGameComplete: () => void;
}

// Heart shape grid layout (8 columns x 6 rows = 48 slots, 36 active)
// _ = empty (not used), X = card position
// Row 1: _ X X _ _ X X _
// Row 2: X X X X X X X X
// Row 3: X X X X X X X X
// Row 4: X X X X X X X X
// Row 5: _ X X X X X X _
// Row 6: _ _ _ X X _ _ _
const HEART_GRID_POSITIONS = [
  // Row 1: cols 1,2,5,6
  { col: 1, row: 0 }, { col: 2, row: 0 }, { col: 5, row: 0 }, { col: 6, row: 0 },
  // Row 2: cols 0-7
  { col: 0, row: 1 }, { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 3, row: 1 },
  { col: 4, row: 1 }, { col: 5, row: 1 }, { col: 6, row: 1 }, { col: 7, row: 1 },
  // Row 3: cols 0-7
  { col: 0, row: 2 }, { col: 1, row: 2 }, { col: 2, row: 2 }, { col: 3, row: 2 },
  { col: 4, row: 2 }, { col: 5, row: 2 }, { col: 6, row: 2 }, { col: 7, row: 2 },
  // Row 4: cols 0-7
  { col: 0, row: 3 }, { col: 1, row: 3 }, { col: 2, row: 3 }, { col: 3, row: 3 },
  { col: 4, row: 3 }, { col: 5, row: 3 }, { col: 6, row: 3 }, { col: 7, row: 3 },
  // Row 5: cols 1-6
  { col: 1, row: 4 }, { col: 2, row: 4 }, { col: 3, row: 4 }, { col: 4, row: 4 },
  { col: 5, row: 4 }, { col: 6, row: 4 },
  // Row 6: cols 3,4
  { col: 3, row: 5 }, { col: 4, row: 5 },
];

export default function MemoryCardGame({ images, onGameComplete }: MemoryCardGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Initialize game
  useEffect(() => {
    const numPairs = 18; // 36 cards = 18 pairs for heart layout
    const gameCards: Card[] = [];
    
    for (let i = 0; i < numPairs; i++) {
      gameCards.push({
        id: i * 2,
        pairId: i,
        isFlipped: false,
        isMatched: false,
        image: images[i % images.length],
      });
      gameCards.push({
        id: i * 2 + 1,
        pairId: i,
        isFlipped: false,
        isMatched: false,
        image: images[i % images.length],
      });
    }
    
    // Shuffle cards
    setCards(gameCards.sort(() => Math.random() - 0.5));
  }, [images]);

  // Check for matches
  useEffect(() => {
    if (flipped.length === 2) {
      const card1 = cards[flipped[0]];
      const card2 = cards[flipped[1]];
      
      if (card1.pairId === card2.pairId) {
        setMatched([...matched, card1.pairId]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
      setMoves(m => m + 1);
    }
  }, [flipped, cards, matched]);

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && matched.length === 18) {
      setTimeout(() => {
        onGameComplete();
      }, 500);
    }
  }, [matched, cards, onGameComplete]);

  const toggleFlip = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(cards[index].pairId)) {
      setFlipped([...flipped, index]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Title and Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          Our Memories
        </h1>
        <p className="text-gray-600">Moves: {moves}</p>
      </motion.div>

      {/* Heart-shaped grid */}
      <div className="relative w-full max-w-6xl mb-8 flex justify-center">
        <div 
          className="grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: 'repeat(8, 1fr)',
            width: '100%',
            maxWidth: '900px',
          }}
        >
          {cards.map((card, index) => {
            const pos = HEART_GRID_POSITIONS[index];
            const isFlippedState = flipped.includes(index) || matched.includes(card.pairId);

            return (
              <div
                key={card.id}
                style={{
                  gridColumn: `${pos.col + 1} / span 1`,
                  gridRow: `${pos.row + 1} / span 1`,
                }}
              >
                <motion.div
                  onClick={() => toggleFlip(index)}
                  className="w-full aspect-square cursor-pointer relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Front of card */}
                  <motion.div
                    className="w-full h-full rounded-lg bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center shadow-lg cursor-pointer absolute inset-0"
                    animate={{
                      opacity: isFlippedState ? 0 : 1,
                      pointerEvents: isFlippedState ? 'none' : 'auto',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ rotate: isFlippedState ? 0 : 360 }}
                      transition={{ duration: 0.6 }}
                      className="text-xl md:text-2xl"
                    >
                      💝
                    </motion.div>
                  </motion.div>

                  {/* Back of card */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-white p-1 shadow-lg overflow-hidden"
                    animate={{
                      opacity: isFlippedState ? 1 : 0,
                      pointerEvents: isFlippedState ? 'auto' : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-full h-full rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={card.image}
                        alt="Memory card"
                        fill
                        sizes="(max-width: 768px) 90px, 110px"
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Matched animation */}
                {matched.includes(card.pairId) && (
                  <motion.div
                    className="absolute inset-0 w-full aspect-square pointer-events-none"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 0],
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-yellow-300 to-pink-300 blur-sm" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Celebration message */}
      {matched.length > 0 && matched.length < 18 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-center"
        >
          {Math.round((matched.length / 18) * 100)}% Complete! 💕
        </motion.p>
      )}
    </div>
  );
}
