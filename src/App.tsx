import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { CertificationsSection } from "./components/CertificationsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { BusinessProjectsSection } from "./components/BusinessProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Analytics } from "./components/Analytics";
import { BackendStatus } from "./components/BackendStatus";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { PortfolioStats } from "./components/PortfolioStats";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ThreeScene } from "./components/three/ThreeScene";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Add smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        {/* Enhanced Background Effects */}
        <div className="fixed inset-0 -z-50">
          {/* Three.js Cosmic Scene */}
          <div className="absolute inset-0 -z-10">
            <ThreeScene
              enableInteractions={true}
              showBlackHole={true}
              showCodeMatrix={true}
              showGeometricShapes={true}
              className="w-full h-full opacity-60 dark:opacity-80"
            />
          </div>

          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-cyan-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-cyan-950/30" />

          {/* Animated mesh grid */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(59,130,246,0.3)_25px,rgba(59,130,246,0.3)_26px,transparent_27px,transparent_49px,rgba(59,130,246,0.3)_50px,rgba(59,130,246,0.3)_51px,transparent_52px)] bg-[length:50px_50px]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24px,rgba(59,130,246,0.3)_25px,rgba(59,130,246,0.3)_26px,transparent_27px,transparent_49px,rgba(59,130,246,0.3)_50px,rgba(59,130,246,0.3)_51px,transparent_52px)] bg-[length:50px_50px]" />
          </div>

          {/* Floating orbs */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`bg-orb-${i}`}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl"
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 15}%`,
              }}
            />
          ))}
        </div>

        {/* Analytics Tracking */}
        <Analytics />

        {/* Enhanced Navigation */}
        <Navigation
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <HeroSection />
          </motion.div>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <AboutSection />
          </motion.div>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 80,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <SkillsSection />
          </motion.div>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <CertificationsSection />
          </motion.div>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <ProjectsSection />
          </motion.div>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Business Projects Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <BusinessProjectsSection />
          </motion.div>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 80,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <ContactSection />
          </motion.div>
        </main>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Footer />
        </motion.div>

        {/* Enhanced Cursor Followers for Desktop - Only show in production */}
        {process.env.NODE_ENV === "production" && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full pointer-events-none z-40 hidden lg:block blur-sm"
              animate={{
                x:
                  typeof window !== "undefined"
                    ? window.innerWidth / 2
                    : 0,
                y:
                  typeof window !== "undefined"
                    ? window.innerHeight / 2
                    : 0,
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                mass: 0.8,
              }}
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />

            <motion.div
              className="fixed top-0 left-0 w-2 h-2 bg-primary/80 rounded-full pointer-events-none z-40 hidden lg:block"
              animate={{
                x:
                  typeof window !== "undefined"
                    ? window.innerWidth / 2
                    : 0,
                y:
                  typeof window !== "undefined"
                    ? window.innerHeight / 2
                    : 0,
              }}
              transition={{
                type: "spring",
                damping: 50,
                stiffness: 300,
                mass: 0.5,
              }}
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        )}

        {/* Enhanced Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Backend Status Indicator */}
        <BackendStatus />

        {/* Portfolio Stats */}
        <PortfolioStats />

        {/* Enhanced Scroll to Top */}
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
}