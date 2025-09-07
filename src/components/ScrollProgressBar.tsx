import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    // Update immediately
    updateScrollProgress();

    // Update on scroll with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-50 origin-left shadow-lg"
      style={{
        scaleX: scrollProgress
      }}
      animate={{
        boxShadow: [
          "0 0 5px rgba(59, 130, 246, 0.3)",
          "0 0 20px rgba(59, 130, 246, 0.6)",
          "0 0 5px rgba(59, 130, 246, 0.3)"
        ]
      }}
      transition={{
        scaleX: { duration: 0.1, ease: "easeOut" },
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    />
  );
}