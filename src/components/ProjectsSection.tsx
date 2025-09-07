import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProjectsSection() {
  const projects = [
    {
      title: "Sconnect (Scholar Connect)",
      description: "Built a Python based server which provides the services of both Github and Google Scholar allowing users to showcase their works and interact with fellow interdisciplinary scholars.",
      image: "https://images.unsplash.com/photo-1721046013656-0a0980264689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHJlc2VhcmNoJTIwcGxhdGZvcm18ZW58MXx8fHwxNzU2NzM5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "Flask", "HTML", "CSS", "SQL DB"],
      demoUrl: "https://sconnect-one.vercel.app/",
      githubUrl: "https://github.com/drawesh/Sconnect",
      featured: true
    },
    {
      title: "Parking Lot Simulator",
      description: "Developed an interactive parking lot simulation system with real-time vehicle management, space allocation algorithms, and visualization of parking operations.",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwbG90JTIwc2ltdWxhdGlvbnxlbnwxfHx8fDE3NTY3MzkyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["JavaScript", "HTML", "CSS", "Simulation", "Algorithms"],
      demoUrl: "https://parking-lot-simulator.vercel.app/",
      githubUrl: "https://github.com/drawesh/Parking-Lot-Simulator",
      featured: true
    },
    {
      title: "Google Clone",
      description: "Created a fully functional Google search engine clone with responsive design, search suggestions, and clean UI that mimics the original Google interface.",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBzZWFyY2glMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU2NzM5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["HTML", "CSS", "JavaScript", "API Integration", "Responsive Design"],
      demoUrl: "https://google-clone-seven-tau.vercel.app/",
      githubUrl: "https://github.com/drawesh/Google-Clone",
      featured: true
    },
    {
      title: "Weather App",
      description: "Built a modern weather application with real-time weather data, location-based forecasts, and interactive weather maps with beautiful UI.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc1NjczOTI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["JavaScript", "API", "HTML", "CSS", "Weather Data"],
      demoUrl: "https://weather-app-omega-pied.vercel.app/",
      githubUrl: "https://github.com/drawesh/Weather-App",
      featured: false
    },
    {
      title: "Memory Game",
      description: "Created an interactive memory card game with multiple difficulty levels, scoring system, and smooth animations for an engaging user experience.",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW1vcnklMjBnYW1lJTIwY2FyZHN8ZW58MXx8fHwxNzU2NzM5MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["JavaScript", "HTML", "CSS", "Game Logic", "Animations"],
      demoUrl: "https://memory-game-three-navy.vercel.app/",
      githubUrl: "https://github.com/drawesh/Memory-Game",
      featured: false
    },
    {
      title: "Weather Predictor",
      description: "Developed a Python-based weather prediction system using advanced algorithms, achieving 92% accuracy on 10,000+ data points.",
      image: "https://images.unsplash.com/photo-1737912133578-159cdde20086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwcHJlZGljdGlvbiUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc1NjczOTI1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "Data Mining", "Machine Learning", "Pandas"],
      demoUrl: "#",
      githubUrl: "https://github.com/drawesh/Weather-Predictor",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-muted/20 via-transparent to-muted/40 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-32 h-32 border border-purple-500/10 rounded-full"
        />
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`project-particle-${i}`}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent font-bold"
            whileHover={{ scale: 1.02 }}
          >
            Featured Projects
          </motion.h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Here are some of my favorite projects that showcase my skills and passion for creating 
            innovative solutions. Each project represents a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Featured Projects - Large Cards */}
        <div className="mb-16">
          <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            Featured Work
          </motion.h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} featured />
            ))}
          </div>
        </div>

        {/* Other Projects - Smaller Grid */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            More Projects
          </motion.h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoUrl: string;
    githubUrl: string;
  };
  index: number;
  featured?: boolean;
}

function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group transform-gpu"
    >
      <Card className="overflow-hidden glass dark:glass-dark hover:shadow-2xl transition-all duration-700 card-hover-effect h-full border-0 relative group-hover:border-primary/20">
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`}
            />
          </motion.div>
          
          {/* Overlay with actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button size="sm" variant="secondary" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-4 h-4 mr-2" />
                  Demo
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button size="sm" variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className={`p-6 ${featured ? 'p-8' : ''}`}>
          <motion.h4 
            className="mb-3"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h4>
          <p className={`text-muted-foreground mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}