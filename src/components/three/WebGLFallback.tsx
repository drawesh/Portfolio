import { motion } from 'motion/react';

export function WebGLFallback() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Enhanced CSS-only cosmic background */}
      <div className="absolute inset-0 cosmic-bg" />
      
      {/* Animated stars using CSS */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes using CSS transforms */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-4 h-4 border border-blue-400/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${10 + (i % 3) * 30}%`,
              transform: `rotate(${i * 45}deg)`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [i * 45, i * 45 + 180, i * 45 + 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Code-like matrix effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`code-${i}`}
            className="absolute text-green-400/20 text-xs font-mono"
            style={{
              left: `${i * 5}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '110vh'],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {['01', '10', '11', '00'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-32 h-32 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${
                ['rgba(59, 130, 246, 0.1)', 'rgba(139, 92, 246, 0.1)', 'rgba(6, 182, 212, 0.1)', 'rgba(16, 185, 129, 0.1)', 'rgba(245, 158, 11, 0.1)'][i]
              } 0%, transparent 70%)`,
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              x: [0, 50, -25, 0],
              y: [0, -30, 15, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Message for users */}
      <motion.div
        className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/50 backdrop-blur-sm rounded px-3 py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Enhanced with CSS animations
      </motion.div>
    </motion.div>
  );
}