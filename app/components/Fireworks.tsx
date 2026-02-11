'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Fireworks = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Create multiple bursts of fireworks
    const createBurst = (delay: number) => {
      setTimeout(() => {
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
          id: Math.random(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 0.5,
        }));
        setParticles((prev) => [...prev, ...newParticles]);
      }, delay);
    };

    // Create 3 bursts
    createBurst(0);
    createBurst(500);
    createBurst(1000);
  }, []);

  const colors = ['#FF6B6B', '#FFE66D', '#95E1D3', '#C7CEEA', '#FF85B3', '#FECA57'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400 + 100,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      ))}

      {/* Confetti-like rectangles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            width: '10px',
            height: '10px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
          initial={{ opacity: 1, rotate: 0 }}
          animate={{
            opacity: 0,
            rotate: 360,
            y: window.innerHeight + 20,
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 0.5,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
};

export default Fireworks;
