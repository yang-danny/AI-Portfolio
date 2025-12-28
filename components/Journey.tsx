'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { timeline } from '@/data/portfolio-data';
import TimelineEntry from './TimelineEntry';
import { Clock, Zap } from 'lucide-react';

// Particle interface
interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

// Glitch text variants
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

export default function Journey() {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Generate particles client-side only
  useEffect(() => {
    const generatedParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
    setParticles(generatedParticles);
  }, []);

  const title = "JOURNEY";

  return (
    <section id="journey" className="section-padding bg-dark-800 relative overflow-hidden">
      {/* Animated Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary-purple rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -70, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.3, 0],
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

      {/* Glowing Orbs */}
      <motion.div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary-purple/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-cyan/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      {/* Neon Lines */}
      <motion.div 
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-purple/40 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-cyan/40 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Cyberpunk Title */}
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
              className="text-4xl md:text-6xl font-display font-bold absolute top-0 left-0 text-primary-purple/30"
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
              className="text-4xl md:text-6xl font-display font-bold absolute top-0 left-0 text-primary-cyan/30"
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
                    textShadow: "0 0 20px rgba(168, 85, 247, 0.8)",
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
            className="h-1 bg-gradient-to-r from-primary-purple via-primary-cyan to-primary-purple mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400 mt-4 tracking-widest text-sm"
          >
            <Clock className="inline w-4 h-4 text-primary-purple mr-2" />
            CAREER TIMELINE
            <Clock className="inline w-4 h-4 text-primary-cyan ml-2" />
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 overflow-hidden">
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-primary-cyan via-primary-blue to-primary-purple"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ transformOrigin: 'top' }}
            />
            {/* Pulse effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary-cyan via-white/50 to-transparent"
              animate={{ y: ['-100%', '500%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />
          </div>

          {/* Timeline Entries */}
          <div className="space-y-12">
            {timeline.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
              >
                <TimelineEntry entry={entry} index={index} />
              </motion.div>
            ))}
          </div>
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
