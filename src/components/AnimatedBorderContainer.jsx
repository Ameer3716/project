// src/components/AnimatedBorderContainer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBorderContainer = ({ children }) => {
  return (
    <div className="animated-border-container">
      <motion.div
        className="animated-border-bg"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="animated-border-content">{children}</div>
    </div>
  );
};

export default AnimatedBorderContainer;