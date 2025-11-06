import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  color: string;
  delay?: number;
}

const GeometricShape: React.FC<Props> = ({ color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1.2, 0],
        rotate: [0, 90, 180, 270]
      }}
      transition={{
        duration: 6,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute -z-10"
      style={{ 
        background: `linear-gradient(135deg, ${color}, transparent)`,
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        filter: 'blur(3px)'
      }}
    />
  );
};

export default GeometricShape;