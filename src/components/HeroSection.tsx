import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

export function HeroSection() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-16 h-16 bg-primary/10 rotate-45"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-32 w-24 h-24 rounded-full bg-secondary/20"
        />
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-40 w-12 h-20 bg-accent/30 clip-path-triangle"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-20 h-20 border-2 border-primary/20 rotate-45"
        />

        {/* Enhanced particle system around the name area */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Glowing orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-sm"
            style={{
              left: `${10 + i * 20}%`,
              top: `${40 + Math.sin(i) * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <motion.span
              className="inline-block font-extrabold text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I'm{' '}
            </motion.span>
            <br />
            <motion.span
              className="relative inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent font-black"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                textShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 30px rgba(59, 130, 246, 0.8)",
                  "0 0 60px rgba(147, 51, 234, 0.6)",
                  "0 0 30px rgba(59, 130, 246, 0.8)",
                  "0 0 0px rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{
                opacity: { duration: 1, delay: 0.6 },
                scale: { duration: 1, delay: 0.6, type: "spring", stiffness: 150 },
                textShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                }
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                textShadow: "0 0 50px rgba(59, 130, 246, 1)"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background glow effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent opacity-30 -z-10"
                initial={{
                  filter: "blur(6px) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
                  scale: 0.95
                }}
                animate={{
                  filter: "blur(0px) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  filter: { duration: 1.2, delay: 0.8, ease: "easeOut" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.0 },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.0 }
                }}
              >
                Drawesh Kumar Yadav
              </motion.span>
              
              {/* Main text with blur-to-clear effect */}
              <motion.span
                className="relative z-10 cursor-default"
                initial={{ 
                  opacity: 1,
                  filter: "blur(4px)",
                  scale: 0.98
                }}
                animate={{ 
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(59, 130, 246, 0.8)"
                }}
              >
                Drawesh Kumar Yadav
              </motion.span>

              {/* Sparkle particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    repeatType: "loop"
                  }}
                />
              ))}

              {/* Glitch effect overlay */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-red-500 via-transparent to-blue-500 bg-clip-text text-transparent opacity-0 mix-blend-difference"
                initial={{
                  filter: "blur(4px)"
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: [0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0],
                  x: [0, -2, 2, 0],
                  skewX: [0, 5, -5, 0]
                }}
                transition={{
                  filter: { duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 4, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.35, 0.4, 0.5, 0.8, 0.9, 1], delay: 2.2 },
                  x: { duration: 4, repeat: Infinity, delay: 2.2 },
                  skewX: { duration: 4, repeat: Infinity, delay: 2.2 }
                }}
              >
                Drawesh Kumar Yadav
              </motion.span>
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mb-8"
          >
            <motion.div
              animate={{ rotateY: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.h2 
                className="text-muted-foreground mb-4 text-xl sm:text-2xl font-semibold"
                animate={{
                  backgroundPosition: [0, 100, 0],
                }}
                style={{
                  background: "linear-gradient(90deg, #6b7280, #3b82f6, #8b5cf6, #6b7280)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Computer Science Graduate & Full Stack Developer
              </motion.h2>
            </motion.div>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              whileHover={{ scale: 1.02 }}
            >
              {"A highly motivated computer science graduate with a strong foundation in software development and problem-solving. Passionate about building scalable applications, machine learning, and modern web technologies.".split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 2 + index * 0.05
                  }}
                  whileHover={{
                    color: "#3b82f6",
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { icon: Github, href: "https://github.com/drawesh", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/drawesh-kumar-yadav/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:drawesh2001@gmail.com", label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ 
                  scale: 1.2, 
                  rotateY: 180,
                  color: "var(--primary)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)",
                rotateX: 5,
                rotateY: 5
              }} 
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group"
            >
              <Button 
                size="lg"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">View My Work</span>
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(139, 92, 246, 0.3)",
                rotateX: -5,
                rotateY: -5
              }} 
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group"
            >
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToAbout}
                className="relative overflow-hidden border-2 border-primary/50 hover:border-primary font-semibold bg-background/80 backdrop-blur-sm"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10">About Me</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToAbout}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}