'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { skills } from '@/data/portfolio-data';
import SkillNode from './SkillNode';
import { Cpu, Zap } from 'lucide-react';

// Particle interface
interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

// Wrapper for individual skill scroll animation
const ScrollAnimatedSkill = ({ children, index, total, scrollProgress }: { children: React.ReactNode, index: number, total: number, scrollProgress: MotionValue<number> }) => {
  const step = 0.3 / total;
  const start = 0.05 + (index * step);
  const end = start + 0.1;
  
  const opacity = useTransform(scrollProgress, [start, end], [1, 0]);
  const scale = useTransform(scrollProgress, [start, end], [1, 0.8]);
  const y = useTransform(scrollProgress, [start, end], [0, -50]);
  
  return (
    <motion.div style={{ opacity, scale, y }} className="w-full md:w-auto">
      {children}
    </motion.div>
  );
};

// Glitch text variants
const glitchVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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

export default function Expertise() {
  const containerRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Generate particles client-side only
  useEffect(() => {
    const generatedParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 4,
    }));
    setParticles(generatedParticles);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const title = "EXPERTISE";

  return (
    <section ref={containerRef} id="expertise" className="relative py-20 md:py-32 bg-dark-800 overflow-hidden">
      {/* Animated Cyberpunk Grid Background - Circuit Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 30s linear infinite',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-primary-blue rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 20, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
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
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary-cyan/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-purple/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Neon Lines - Horizontal */}
      <motion.div 
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-cyan/50 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-blue/50 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />

      {/* Data Stream Effect */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-cyan/30 to-transparent overflow-hidden">
        <motion.div
          className="w-full h-20 bg-gradient-to-b from-transparent via-primary-cyan to-transparent"
          animate={{ y: ['-100%', '500%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-purple/30 to-transparent overflow-hidden">
        <motion.div
          className="w-full h-20 bg-gradient-to-b from-transparent via-primary-purple to-transparent"
          animate={{ y: ['500%', '-100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              className="text-4xl md:text-6xl font-display font-bold absolute top-0 left-0 text-primary-blue/30"
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
            className="h-1 bg-gradient-to-r from-primary-cyan via-primary-blue to-primary-purple mx-auto mt-4"
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
            <Cpu className="inline w-4 h-4 text-primary-cyan mr-2" />
            TECHNICAL SKILLS MATRIX
            <Cpu className="inline w-4 h-4 text-primary-blue ml-2" />
          </motion.p>
        </motion.div>

        {/* Skills Network Visualization */}
        <div className="relative min-h-[500px] md:min-h-[600px]">
          {/* Connection Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Desktop View - Horizontal Layout */}
            <g className="hidden md:block">
              <motion.line
                x1="20%" y1="50%" x2="50%" y2="50%"
                stroke="url(#lineGradient1)"
                strokeWidth="2"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="50%" y1="50%" x2="80%" y2="50%"
                stroke="url(#lineGradient2)"
                strokeWidth="2"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                viewport={{ once: true }}
              />
            </g>

            {/* Mobile View - Vertical Layout */}
            <g className="md:hidden">
              <motion.line
                x1="50%" y1="20%" x2="50%" y2="50%"
                stroke="url(#lineGradient1)"
                strokeWidth="2"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="50%" y1="50%" x2="50%" y2="80%"
                stroke="url(#lineGradient2)"
                strokeWidth="2"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                viewport={{ once: true }}
              />
            </g>
          </svg>

          {/* Skill Nodes */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-8 px-4 md:px-0 h-full py-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="w-full md:w-auto"
              >
                <ScrollAnimatedSkill
                  index={index}
                  total={skills.length}
                  scrollProgress={scrollYProgress}
                >
                  <SkillNode skill={skill} />
                </ScrollAnimatedSkill>
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
            transform: translate(40px, 40px);
          }
        }
      `}</style>
    </section>
  );
}
