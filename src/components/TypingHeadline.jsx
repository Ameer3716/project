// src/components/TypingHeadline.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TypingHeadline = ({ text }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-5xl md:text-7xl font-bold text-[#F0F0F0] mb-6 leading-tight"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ marginRight: '1rem' }}
        >
          {word === 'Perfect' ? (
            <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">
              {word}
            </span>
          ) : (
            word
          )}
        </motion.span>
      ))}
      <motion.span
        variants={child}
        className="inline-block"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
      >
        |
      </motion.span>
    </motion.h1>
  );
};

export default TypingHeadline;