import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState<'logo' | 'split' | 'complete'>('logo');

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setStage('split');
    }, 1500);

    const splitTimer = setTimeout(() => {
      setStage('complete');
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(splitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {stage === 'logo' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-8xl font-serif text-gold tracking-wider"
            >
              X|V
            </motion.div>
          )}
          
          {stage === 'split' && (
            <div className="flex items-center text-8xl font-serif text-gold tracking-wider">
              <motion.span
                animate={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                X
              </motion.span>
              <motion.span
                className="mx-2"
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                |
              </motion.span>
              <motion.span
                animate={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                V
              </motion.span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
