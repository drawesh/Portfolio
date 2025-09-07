import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Code, Palette, Zap, Users } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code is my passion."
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Blending functionality with beautiful, intuitive user interfaces."
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimizing every aspect for lightning-fast user experiences."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with teams to deliver exceptional results."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-muted/20 via-transparent to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-64 h-64 border border-primary/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-48 h-48 border border-purple-500/5 rounded-full"
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent font-bold"
            whileHover={{ scale: 1.02 }}
          >
            About Me
          </motion.h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate Computer Science graduate from SRM Institute of Science and Technology with a strong 
            foundation in software development and problem-solving. I love turning complex problems into simple, 
            beautiful, and intuitive solutions. As a recent graduate (2025 passout), 
            I'm always eager to learn new technologies and apply them to real-world challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6">My Journey</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Recently completed my BTech in Computer Science and Engineering at SRM Institute of Science and Technology 
                (2025 passout). My academic journey has been enriched with practical 
                experience and real-world applications through various projects and hands-on learning.
              </p>
              <p className="text-muted-foreground">
                I specialize in Python, JavaScript, React.js, Node.js, and have a strong foundation in machine learning 
                with TensorFlow and data analysis. I've also earned certifications in IBM Data Science, AWS Machine Learning 
                Foundations, and Cybersecurity fundamentals.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 mt-8"
            >
              {[
                { number: "6+", label: "Projects" },
                { number: "2025", label: "Graduate" },
                { number: "100%", label: "Passion" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card className="p-6 h-full glass dark:glass-dark hover:shadow-2xl transition-all duration-500 card-hover-effect group border-0">
                  <motion.div
                    whileHover={{ rotateY: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 p-3 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg w-fit group-hover:shadow-lg"
                  >
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-purple-500 transition-colors duration-300" />
                  </motion.div>
                  <h4 className="mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}