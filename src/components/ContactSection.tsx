import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Check if required environment variables are available
    if (!projectId || !publicAnonKey) {
      setError(
        "Service configuration unavailable. Please try again later.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        10000,
      ); // 10 second timeout

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dd443446/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Service temporarily unavailable. Please try again later.",
          );
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        console.log(
          "Contact form submitted successfully:",
          result,
        );

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        }, 3000);
      } else {
        throw new Error(
          result.error || "Failed to send message",
        );
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError(
            "Request timed out. Please check your connection and try again.",
          );
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "drawesh2001@gmail.com",
      href: "mailto:drawesh2001@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 93256 86889",
      href: "tel:+919325686889",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "New Delhi, India",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-6">Get In Touch</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            I'm always interested in new opportunities and
            exciting projects. Whether you have a project in
            mind or just want to chat about technology, feel
            free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm a graduate actively seeking internship and full-time opportunities. 
                I'd love to hear about your project and discuss how we can work together 
                to bring innovative ideas to life.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 5,
                    x: 10,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className="p-4 bg-card hover:shadow-lg transition-all duration-300">
                    <a
                      href={info.href}
                      className="flex items-center space-x-4 group"
                    >
                      <motion.div
                        whileHover={{
                          rotateY: 180,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-primary/10 rounded-lg"
                      >
                        <info.icon className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="text-sm text-muted-foreground">
                          {info.title}
                        </h4>
                        <p className="group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
              <span className="text-green-700 dark:text-green-300">
                Available for new projects
              </span>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{
                rotateY: -5,
                rotateX: 2,
                scale: 1.01,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="p-8 bg-card hover:shadow-xl transition-all duration-500">
                <h3 className="mb-6">Send a Message</h3>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <label htmlFor="name" className="text-sm">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </motion.div>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor="email"
                        className="text-sm"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="subject"
                      className="text-sm"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor="message"
                      className="text-sm"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="transition-all duration-300 focus:scale-105 resize-none"
                    />
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitted || isSubmitting}
                    >
                      {isSubmitted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Message Sent!
                        </motion.div>
                      ) : isSubmitting ? (
                        <motion.div className="flex items-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </motion.div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 relative h-24 overflow-hidden"
        >
          {/* Floating geometric shapes */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/4 top-0 w-8 h-8 bg-primary/20 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              rotate: [0, -180, -360],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute right-1/3 top-4 w-6 h-6 bg-secondary/30 rotate-45"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute right-1/4 top-2 w-4 h-8 bg-accent/40 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}