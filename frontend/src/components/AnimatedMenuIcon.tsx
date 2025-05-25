'use client';

import { motion } from 'framer-motion';

type Props = {
  isOpen: boolean;
};

export function AnimatedMenuIcon({ isOpen }: Props) {
  const commonStyles =
    'absolute w-6 h-[3px] bg-white rounded transform-gpu will-change-transform'; // thicker bars like your CSS example

  return (
    <div className="w-8 h-8 relative flex items-center justify-center">
      {/* Top bar */}
      <motion.span
        className={commonStyles}
        style={{ transformOrigin: 'center' }}
        animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
        transition={{ duration: 0.3 }}
      />

      {/* Middle bar */}
      <motion.span
        className={commonStyles}
        animate={isOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Bottom bar */}
      <motion.span
        className={commonStyles}
        style={{ transformOrigin: 'center' }}
        animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
