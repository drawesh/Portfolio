import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Award, Calendar } from 'lucide-react';

export function CertificationsSection() {
  const certifications = [
    {
      title: "IBM Data Science Professional",
      issuer: "IBM via Coursera",
      date: "Nov 2023",
      description: "Comprehensive program covering data science methodologies, Python programming, data visualization, and machine learning.",
      skills: ["Python", "Data Analysis", "Machine Learning", "Data Visualization"],
      credentialUrl: "#",
      color: "bg-blue-500"
    },
    {
      title: "Foundation of CyberSecurity",
      issuer: "Google via Coursera",
      date: "May 2024",
      description: "Fundamental concepts of cybersecurity including threat detection, risk management, and security frameworks.",
      skills: ["Security Fundamentals", "Risk Assessment", "Threat Detection", "Compliance"],
      credentialUrl: "#",
      color: "bg-green-500"
    },
    {
      title: "AWS Machine Learning Foundations",
      issuer: "AWS Academy",
      date: "Nov 2023",
      description: "Introduction to machine learning on AWS, covering ML services, algorithms, and practical implementations.",
      skills: ["AWS", "Machine Learning", "Cloud Computing", "ML Services"],
      credentialUrl: "#",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-6">Certifications & Learning</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Continuous learning is key to staying current in technology. Here are some of the 
            certifications and courses I've completed to enhance my skills and knowledge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
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
              <Card className="p-6 h-full bg-card hover:shadow-xl transition-all duration-500">
                {/* Certification Header */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ rotateY: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-lg ${cert.color}/10`}
                  >
                    <Award className={`w-6 h-6 text-white`} style={{ color: cert.color.replace('bg-', '').replace('-500', '') }} />
                  </motion.div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {cert.date}
                  </div>
                </div>

                {/* Certification Info */}
                <div className="mb-4">
                  <motion.h4 
                    className="mb-2"
                    whileHover={{ x: 5 }}
                  >
                    {cert.title}
                  </motion.h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {cert.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto"
                >
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Credential
                    </a>
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Learning Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block p-6 bg-primary/5 rounded-lg border border-primary/20"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-2xl mb-3"
            >
              🎓
            </motion.div>
            <h4 className="mb-2">Committed to Continuous Learning</h4>
            <p className="text-muted-foreground text-sm">
              Always exploring new technologies and enhancing my skill set through online courses, 
              workshops, and hands-on projects.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}