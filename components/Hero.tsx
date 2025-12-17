'use client';

import { useState, useEffect, useRef } from 'react';
import NeuralCanvas from './NeuralCanvas';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [buttonsAnimated, setButtonsAnimated] = useState(false);
  const fullText = "Welcome, I'm Danny, a";
  
  const heroRef = useRef<HTMLElement>(null);
  
  // Track scroll progress of hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scroll progress to animation values
  const scale3D = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]); // Scale down faster
  const opacity3D = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0]); // Fade out faster
  
  // Shared content animations - synchronized with 3D background
  // They scale down and fade out exactly like the background to create a "moving forward" effect
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0]); // Disappear by 50% scroll
  
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
      }, 120); // Slower typing speed: 120ms per character
    }, 3000); // Wait 3 seconds for sunrise to complete

    return () => clearTimeout(sunriseDelay);
  }, []);
  
  // Track when button animations complete
  useEffect(() => {
    if (typingComplete) {
      const timer = setTimeout(() => {
        setButtonsAnimated(true);
      }, 2500); // After both buttons finish opening (1s delay + 1.5s duration)
      return () => clearTimeout(timer);
    }
  }, [typingComplete]);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center bg-dark-800 overflow-hidden">
     
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
          >
            <span className="gradient-text">FULL STACK ENGINEER & </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={typingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
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
          {/* Download Resume Button - Opens like a book from left */}
          <motion.a
            href="/Danny-Yang-Resume.pdf"
            download="Danny-Yang-Resume.pdf"
            className="btn-primary text-sm tracking-wider flex items-center gap-2"
            initial={{ opacity: 0, y: 100 }}
            animate={typingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
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
          </motion.a>

          {/* Contact Button - Opens like a book from right */}
          <motion.button
            onClick={() => {
              // Dispatch custom event to open chatbot
              window.dispatchEvent(new CustomEvent('openChatbot'));
            }}
            className="btn-secondary text-sm tracking-wider flex items-center gap-2"
            initial={{ opacity: 0, y: 100 }}
            animate={typingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}

          >
            <img src='/ai-icon.png' alt='AI Icon' className='w-8 h-8' />
            LET'S CHAT
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{ opacity: contentOpacity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary-cyan rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

