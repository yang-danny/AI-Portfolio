'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { projects } from '@/data/portfolio-data';
import ProjectCard from './ProjectCard';
import { Zap } from 'lucide-react';

// Particle interface for client-side rendering
interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

// Wrapper component to handle individual scroll animations
const ScrollAnimatedCard = ({ children, index, total, scrollProgress }: { children: React.ReactNode, index: number, total: number, scrollProgress: MotionValue<number> }) => {
  const step = 0.6 / total;
  const start = 0.1 + (index * step);
  const end = start + 0.2;
  
  const opacity = useTransform(scrollProgress, [start, end], [1, 0]);
  const scale = useTransform(scrollProgress, [start, end], [1, 0.8]);
  const y = useTransform(scrollProgress, [start, end], [0, -50]);
  
  return (
    <motion.div style={{ opacity, scale, y }}>
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
      staggerChildren: 0.08,
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

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Generate particles client-side only
  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
    setParticles(generatedParticles);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const title = "PROJECTS";

  return (
    <section ref={containerRef} id="projects" className="relative py-20 md:py-32 bg-dark-800 overflow-hidden">
      {/* Animated Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 25s linear infinite',
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
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
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
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary-cyan/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-purple/15 rounded-full blur-3xl"
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      {/* Neon Lines */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-purple/40 to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-cyan/40 to-transparent" />

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
            <Zap className="inline w-4 h-4 text-primary-purple mr-2" />
            FEATURED WORK
            <Zap className="inline w-4 h-4 text-primary-cyan ml-2" />
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 100, rotateX: -15 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  transition: { 
                    duration: 1.0,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  } 
                }
              }}
            >
              <ScrollAnimatedCard 
                index={index} 
                total={projects.length} 
                scrollProgress={scrollYProgress}
              >
                <ProjectCard project={project} />
              </ScrollAnimatedCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CSS for grid animation */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>
    </section>
  );
}
