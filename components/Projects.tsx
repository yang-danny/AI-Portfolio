'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { projects } from '@/data/portfolio-data';
import ProjectCard from './ProjectCard';

// Wrapper component to handle individual scroll animations
// Needs to be a separate component to use useTransform with the shared scrollYProgress
const ScrollAnimatedCard = ({ children, index, total, scrollProgress }: { children: React.ReactNode, index: number, total: number, scrollProgress: MotionValue<number> }) => {
  // Calculate when this specific card should start fading out
  // Fade out sequence starts at 10% scroll and ends at 70% scroll
  const step = 0.6 / total;
  const start = 0.1 + (index * step);
  const end = start + 0.2; // Fade duration
  
  const opacity = useTransform(scrollProgress, [start, end], [1, 0]);
  const scale = useTransform(scrollProgress, [start, end], [1, 0.8]);
  const y = useTransform(scrollProgress, [start, end], [0, -50]);
  
  return (
    <motion.div style={{ opacity, scale, y }}>
      {children}
    </motion.div>
  );
};

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <section ref={containerRef} id="projects" className="py-20 md:py-32 bg-dark-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            PROJECTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-cyan to-primary-purple mx-auto" />
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
                hidden: { opacity: 0, y: 100 },
                show: { 
                  opacity: 1, 
                  y: 0, 
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
    </section>
  );
}
