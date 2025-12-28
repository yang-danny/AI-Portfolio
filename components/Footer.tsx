'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart} from 'lucide-react';

// Particle interface
interface Particle {
  id: number;
  left: number;
  duration: number;
  delay: number;
}

export default function Footer() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const currentYear = new Date().getFullYear();
  
  // Generate particles client-side only
  useEffect(() => {
    const generatedParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <footer className="relative bg-dark-800 overflow-hidden">
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-primary-cyan to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary-cyan/20 via-primary-purple/40 to-primary-cyan/20" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bottom-0 w-1 h-1 bg-primary-cyan/60 rounded-full"
            style={{ left: `${particle.left}%` }}
            animate={{
              y: [0, -60],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8">

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-gray-400 text-sm flex items-center justify-center gap-3">
              <motion.span
                className="text-primary-cyan"
                animate={{ 
                  textShadow: [
                    '0 0 5px rgba(0, 217, 255, 0.5)',
                    '0 0 10px rgba(0, 217, 255, 0.8)',
                    '0 0 5px rgba(0, 217, 255, 0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                © {currentYear}
              </motion.span>
              
              <motion.span 
                className="text-3xl font-display font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
              >
                D.Y
              </motion.span>
              
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ['#ef4444', '#ec4899', '#ef4444'],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Neon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary-cyan/30 via-primary-purple/50 to-primary-cyan/30" />
    </footer>
  );
}
