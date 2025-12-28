'use client';

import { useState, useEffect, useRef } from 'react';
import NeuralCanvas from './NeuralCanvas';
import { motion, useScroll, useTransform } from 'framer-motion';

// Particle interface for client-side rendering
interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [buttonsAnimated, setButtonsAnimated] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const fullText = "Welcome, I'm Danny, a";
  
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Generate particles client-side only
  useEffect(() => {
    const generatedParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 4,
    }));
    setParticles(generatedParticles);
  }, []);
  
  // Track scroll progress of hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scroll progress to animation values
  const scale3D = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const opacity3D = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0]);
  
  // Shared content animations
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0]);
  
  const textFilter = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['blur(0px)', 'blur(4px)']
  );

  // Typing animation effect - starts after 3D sunrise completes (3s)
  useEffect(() => {
    const sunriseDelay = setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTypingComplete(true);
        }
      }, 120);
    }, 3000);

    return () => clearTimeout(sunriseDelay);
  }, []);
  
  // Track when button animations complete
  useEffect(() => {
    if (typingComplete) {
      const timer = setTimeout(() => {
        setButtonsAnimated(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [typingComplete]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-dark-800 overflow-hidden">
      <div ref={heroRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Animated Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 30s linear infinite',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
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
              opacity: [0, 0.8, 0],
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

      {/* Neon Lines */}
      <motion.div 
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-cyan/30 to-transparent z-5"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-purple/30 to-transparent z-5"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      {/* Corner Tech Accents */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-primary-cyan/30 rounded-tl-lg z-5" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-primary-purple/30 rounded-tr-lg z-5" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-primary-purple/30 rounded-bl-lg z-5" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-primary-cyan/30 rounded-br-lg z-5" />

      {/* Data Stream Lines */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-cyan/20 to-transparent overflow-hidden z-5">
        <motion.div
          className="w-full h-16 bg-gradient-to-b from-transparent via-primary-cyan/80 to-transparent"
          animate={{ y: ['-100%', '800%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute right-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-purple/20 to-transparent overflow-hidden z-5">
        <motion.div
          className="w-full h-16 bg-gradient-to-b from-transparent via-primary-purple/80 to-transparent"
          animate={{ y: ['800%', '-100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>
     
      {/* 3D Background - Scales down and fades on scroll */}
      <div className="absolute inset-0 z-0 ">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            scale: scale3D,
            opacity: opacity3D
          }}
        >   
          <NeuralCanvas />
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        {/* Typing Animation - with scroll spark effect */}
        <motion.div 
          className="text-3xl md:text-4xl font-display font-bold mb-4 min-h-[3rem] flex items-center justify-center"
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            filter: textFilter
          }}
        >
          <span>{displayedText}</span>
          {!typingComplete && (
            <motion.span
              className="inline-block w-0.5 h-8 bg-primary-cyan ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
            />
          )}
        </motion.div>

        {/* Role Titles - Rise Up with Different Delays + Scroll spark effect */}
        <motion.div 
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight overflow-hidden"
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            filter: textFilter
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={typingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <span className="gradient-text">FULL STACK ENGINEER & </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={typingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="relative"
          >
            <span className="gradient-text">AI ENGINEER</span>
          </motion.div>
        </motion.div>

        {/* Buttons - Slide out on scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={typingComplete ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          style={{ 
            perspective: '2000px',
            opacity: contentOpacity,
            scale: contentScale,
          }}
        >
          {/* Download Resume Button - Glass Effect */}
          <motion.div
            className="button-wrap"
            initial={{ opacity: 0, y: 100 }}
            animate={typingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
          >
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Danny-Yang-Resume.pdf';
                link.download = 'Danny-Yang-Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="glass-btn glass-btn-primary bg-gradient-to-r from-primary-cyan to-primary-purple"
              style={{ minWidth: '180px' }}
            >
              <span className="justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                MY RESUME
              </span>
            </button>
            <div className="button-shadow"></div>
          </motion.div>

          {/* Contact Button - Glass Effect */}
          <motion.div
            className="button-wrap"
            initial={{ opacity: 0, y: 100 }}
            animate={typingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
          >
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openChatbot'));
              }}
              className="glass-btn glass-btn-secondary "
              style={{ minWidth: '180px' }}
            >
              <span className="justify-center">
                <img src='/ai-icon.png' alt='AI Icon' className='w-6 h-6' />
                LET'S CHAT
              </span>
            </button>
            <div className="button-shadow"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Enhanced */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{ opacity: contentOpacity }}
      >
        <motion.div 
          className="w-8 h-12 border-2 border-primary-cyan/50 rounded-full flex items-start justify-center p-2 relative"
          animate={{ 
            borderColor: ['rgba(0, 217, 255, 0.5)', 'rgba(168, 85, 247, 0.5)', 'rgba(0, 217, 255, 0.5)'],
            boxShadow: ['0 0 10px rgba(0, 217, 255, 0.3)', '0 0 20px rgba(168, 85, 247, 0.3)', '0 0 10px rgba(0, 217, 255, 0.3)']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-primary-cyan rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <motion.p 
          className="text-xs text-gray-400 mt-2 tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL
        </motion.p>
      </motion.div>

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
