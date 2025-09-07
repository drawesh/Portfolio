import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/drawesh", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:drawesh2001@gmail.com", label: "Email" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo/Name */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-medium"
          >
            Drawesh Kumar Yadav
          </motion.button>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.2,
                  y: -3,
                  rotateY: 180
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 text-sm"
          >
            {[
              { name: 'Home', href: '#home' },
              { name: 'About', href: '#about' },
              { name: 'Skills', href: '#skills' },
              { name: 'Certifications', href: '#certifications' },
              { name: 'Projects', href: '#projects' },
              { name: 'Contact', href: '#contact' }
            ].map((link) => (
              <motion.button
                key={link.name}
                onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-px bg-border max-w-xs"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground"
          >
            <p className="flex items-center justify-center gap-2">
              © 2025 Made with 
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ['#ef4444', '#f97316', '#ef4444']
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart size={14} fill="currentColor" />
              </motion.span>
              by Drawesh
            </p>
            <p className="mt-2 text-xs">
              Built with React, TypeScript, Tailwind CSS & Motion
            </p>
          </motion.div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="Back to top"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↑
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}