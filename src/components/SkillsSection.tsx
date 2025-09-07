import { motion } from 'motion/react';
import { Card } from './ui/card';

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming",
      skills: [
        { name: "Python", level: 90, color: "bg-yellow-500" },
        { name: "JavaScript", level: 85, color: "bg-yellow-400" },
        { name: "C++", level: 80, color: "bg-blue-600" },
        { name: "C", level: 75, color: "bg-gray-600" },
        { name: "SQL", level: 85, color: "bg-blue-700" },
      ]
    },
    {
      title: "Web Development",
      skills: [
        { name: "React.js", level: 85, color: "bg-blue-500" },
        { name: "Node.js", level: 80, color: "bg-green-600" },
        { name: "HTML/CSS", level: 90, color: "bg-orange-500" },
        { name: "Flask", level: 85, color: "bg-gray-700" },
        { name: "MongoDB", level: 75, color: "bg-green-500" },
      ]
    },
    {
      title: "ML & Tools",
      skills: [
        { name: "TensorFlow", level: 80, color: "bg-orange-600" },
        { name: "Pandas", level: 85, color: "bg-blue-800" },
        { name: "NumPy", level: 85, color: "bg-blue-400" },
        { name: "OpenCV", level: 80, color: "bg-green-600" },
        { name: "AWS", level: 70, color: "bg-orange-400" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-cyan-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-cyan-950/30" />
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`skill-particle-${i}`}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, Math.sin(i) * 100, 0],
              y: [0, Math.cos(i) * 100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + Math.sin(i) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent font-bold"
            whileHover={{ scale: 1.02 }}
          >
            Skills & Technologies
          </motion.h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life. 
            I'm always learning and expanding my skill set to stay current with the latest technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ 
                  rotateY: 10,
                  rotateX: 5,
                  scale: 1.02
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="transform-gpu"
              >
                <Card className="p-6 h-full glass dark:glass-dark hover:shadow-2xl transition-all duration-500 card-hover-effect group border-0">
                  <motion.h3 
                    className="mb-6 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: categoryIndex * 0.3 }}
                  >
                    {category.title}
                  </motion.h3>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 
                        }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                        className="relative"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: categoryIndex * 0.3 + skillIndex * 0.1,
                              ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                            className={`h-full ${skill.color} rounded-full relative`}
                          >
                            {/* Animated glow effect */}
                            <motion.div
                              animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className={`absolute inset-0 ${skill.color} rounded-full blur-sm`}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 3D Floating Tech Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 relative h-32 overflow-hidden"
        >
          {['⚛️', '🐍', '🐳', '☁️', '🎨', '🚀'].map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute text-3xl"
              style={{
                left: `${(index * 15) + 10}%`,
                top: '50%',
              }}
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 360],
                rotateZ: [0, 180, 360],
              }}
              transition={{
                duration: 3 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
              whileHover={{ scale: 1.5 }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}