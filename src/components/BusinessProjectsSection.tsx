import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Github, Eye, Briefcase, TrendingUp, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BusinessProjectsSection() {
  const businessProjects = [
    {
      title: "Sales Analytics Dashboard",
      description: "Developed a comprehensive sales analytics dashboard for tracking KPIs, revenue trends, and customer insights at TechAnalogy, resulting in 25% improvement in sales efficiency.",
      image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTY5OTAxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Excel", "Power BI", "Python", "Data Analysis", "SQL"],
      impact: "25% increase in sales efficiency",
      type: "Internship Project",
      featured: true
    },
    {
      title: "E-commerce Platform Strategy",
      description: "Designed and implemented a comprehensive e-commerce platform strategy, including market research, competitor analysis, and growth optimization for digital marketplace expansion.",
      image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwcGxhdGZvcm18ZW58MXx8fHwxNzU2OTgxNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Market Research", "Business Strategy", "Analytics", "Digital Marketing"],
      impact: "30% projected revenue increase",
      type: "Strategy Project",
      featured: true
    },
    {
      title: "Customer Acquisition Campaign",
      description: "Led a data-driven customer acquisition campaign utilizing digital marketing strategies, conversion optimization, and automated marketing funnels to boost customer engagement.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhdXRvbWF0aW9ufGVufDF8fHx8MTc1Njk5NzM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Digital Marketing", "Google Analytics", "CRM", "Automation", "A/B Testing"],
      impact: "40% increase in customer acquisition",
      type: "Marketing Project",
      featured: false
    }
  ];

  const featuredBusinessProjects = businessProjects.filter(project => project.featured);
  const otherBusinessProjects = businessProjects.filter(project => !project.featured);

  return (
    <section id="business-projects" className="py-20 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30 dark:from-purple-950/30 dark:via-transparent dark:to-blue-950/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-40 h-40 border border-purple-500/10 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-32 h-32 border border-blue-500/10 rounded-full"
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`business-particle-${i}`}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            animate={{
              x: [0, Math.random() * 150 - 75],
              y: [0, Math.random() * 150 - 75],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
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
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase className="w-5 h-5" />
            <span>Business & Strategy</span>
          </motion.div>
          <motion.h2 
            className="mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent font-bold"
            whileHover={{ scale: 1.02 }}
          >
            Business Projects & Impact
          </motion.h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Showcasing my business acumen and strategic thinking through real-world projects that drove 
            measurable results and business growth. Each project demonstrates data-driven decision making and market insights.
          </p>
        </motion.div>

        {/* Featured Business Projects */}
        <div className="mb-16">
          <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center gap-2"
          >
            <TrendingUp className="w-6 h-6 text-purple-600" />
            High-Impact Projects
          </motion.h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredBusinessProjects.map((project, index) => (
              <BusinessProjectCard key={project.title} project={project} index={index} featured />
            ))}
          </div>
        </div>

        {/* Other Business Projects */}
        {otherBusinessProjects.length > 0 && (
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-2"
            >
              <Users className="w-6 h-6 text-blue-600" />
              Additional Projects
            </motion.h3>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {otherBusinessProjects.map((project, index) => (
                <BusinessProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface BusinessProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    impact: string;
    type: string;
  };
  index: number;
  featured?: boolean;
}

function BusinessProjectCard({ project, index, featured = false }: BusinessProjectCardProps) {
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
      <Card className="overflow-hidden glass dark:glass-dark hover:shadow-2xl transition-all duration-700 card-hover-effect h-full border-0 relative group-hover:border-purple-500/20">
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
          
          {/* Project Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-purple-500/90 text-white rounded-full text-xs font-medium">
              {project.type}
            </span>
          </div>

          {/* Impact Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-500/90 text-white rounded-full text-xs font-medium">
              {project.impact}
            </span>
          </div>
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

          {/* Technologies/Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-xs"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Impact Metrics */}
          <motion.div 
            className="p-4 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-600 dark:text-green-400">Impact:</span>
              <span className="text-muted-foreground">{project.impact}</span>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}