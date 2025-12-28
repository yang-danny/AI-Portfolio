'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contactInfo } from '@/data/portfolio-data';
import ContactForm from './ContactForm';
import { Linkedin, Github, Globe, Mail, Zap } from 'lucide-react';

// Fixed particle positions to avoid hydration mismatch
const PARTICLE_COUNT = 20;

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function Contact() {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Generate random particles only on client side
  useEffect(() => {
    const generatedParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
    setParticles(generatedParticles);
  }, []);

  const socialLinks = [
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: Github, href: contactInfo.github, label: 'GitHub' },
    { icon: Globe, href: contactInfo.portfolio, label: 'Portfolio' },
  ];

  // Cyberpunk glitch effect variants
  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const title = "CONTACT";

  return (
    <section id="contact" className="section-padding bg-dark-800 relative overflow-hidden">
      {/* Animated Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Floating Particles - Client-side only to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary-cyan rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs with Pulse */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-primary-cyan/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Neon Lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-cyan/50 to-transparent" />
     

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cyberpunk Title with Letter Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={glitchVariants}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            {/* Glitch layers */}
            <motion.h2 
              className="text-4xl md:text-6xl font-display font-bold absolute top-0 left-0 text-primary-cyan/30"
              animate={{
                x: [-2, 2, -2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
              {title}
            </motion.h2>
            <motion.h2 
              className="text-4xl md:text-6xl font-display font-bold absolute top-0 left-0 text-primary-purple/30"
              animate={{
                x: [2, -2, 2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.1,
              }}
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
              {title}
            </motion.h2>
            
            {/* Main title with letter animation */}
            <h2 className="text-4xl md:text-6xl font-display font-bold flex justify-center">
              {title.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="gradient-text inline-block"
                  whileHover={{
                    scale: 1.2,
                    textShadow: "0 0 20px rgba(0, 217, 255, 0.8)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h2>
          </div>
          
          {/* Animated underline */}
          <motion.div 
            className="h-1 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
          
          {/* Subtitle with typewriter effect */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400 mt-4 tracking-widest text-sm"
          >
            <Zap className="inline w-4 h-4 text-primary-cyan mr-2" />
            INITIATING CONNECTION PROTOCOL
            <Zap className="inline w-4 h-4 text-primary-purple ml-2" />
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form with Holographic Border */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 2.0, delay: 0.4, type: "spring", bounce: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative group"
          >
            {/* Animated border glow */}
            <div className="absolute -inset-0.5 rounded-xl opacity-50 blur group-hover:opacity-75 transition duration-500 animate-pulse" />
            <div className="relative">
              <ContactForm />
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 2.0, delay: 0.6, type: "spring", bounce: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {/* Email Card with Scan Effect */}
            <motion.div 
              className="glass rounded-xl p-8 relative overflow-hidden group"
      
            >
              {/* Holographic scan line */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-cyan/20 to-transparent"
                initial={{ y: '-100%' }}
                whileHover={{ y: '200%' }}
                transition={{ duration: 1.5, ease: "linear" }}
              />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-cyan rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-purple rounded-br-lg" />
              
              <h3 className="text-xl font-display font-semibold mb-4 gradient-text relative z-10">
                Get In Touch
              </h3>
              <p className="text-gray-300 mb-6 relative z-10">
                Feel free to reach out for collaborations, opportunities, or just a friendly chat!
              </p>
              <motion.a 
                href={`mailto:${contactInfo.email}`}
                className="text-primary-cyan hover:text-white transition-colors inline-flex items-center gap-3 relative z-10 group/email"
                whileHover={{ x: 10 }}
              >
                <motion.span 
                  className="text-2xl p-2 rounded-lg text-primary-cyan"
            
                >
                  <Mail />
                </motion.span>
                <span className=" text-primary-cyan">
                  {contactInfo.email}
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links Card with Neon Effect */}
            <motion.div 
              className="glass rounded-xl p-8 relative overflow-hidden"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-purple rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-cyan rounded-br-lg" />
              
              <h3 className="text-xl font-display font-semibold mb-6 gradient-text">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-xl bg-dark-700/50 border border-primary-cyan/30 flex items-center justify-center transition-all duration-300 group relative overflow-hidden"
                    aria-label={social.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.15,
                      borderColor: "rgba(0, 217, 255, 1)",
                      boxShadow: "0 0 30px rgba(0, 217, 255, 0.5), inset 0 0 20px rgba(0, 217, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Pulse ring effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-primary-cyan"
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{ 
                        scale: 1.5, 
                        opacity: [0, 0.5, 0],
                        transition: { duration: 0.6, repeat: Infinity }
                      }}
                    />
                    <social.icon size={24} className="text-primary-cyan transition-colors relative z-10" />
                  </motion.a>
                ))}
              </div>
              
              {/* Status indicator */}
              <motion.div 
                className="mt-6 flex items-center gap-2 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <span>Available for new opportunities</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CSS for grid animation */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </section>
  );
}
