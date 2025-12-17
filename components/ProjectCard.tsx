'use client';

import { useState } from 'react';
import { Project } from '@/data/portfolio-data';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative md:h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
    >
      {/* Cyberpunk Border Glow Container */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-xl opacity-0 group-hover:opacity-75 blur-md transition duration-500 group-hover:duration-200" />
      
      {/* Main Card Content */}
      <div className="relative h-full glass bg-dark-800 rounded-xl overflow-hidden flex flex-col border border-gray-800 group-hover:border-transparent transition-colors duration-300">
        
        {/* Holographic Scanline Effect */}
        <div className={`absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-primary-cyan/10 to-transparent translate-y-[-100%] ${isHovered ? 'animate-scan' : ''}`} style={{ height: '50%' }} />
        
        {/* Tech Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-cyan rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-purple rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

        {/* Project Image Area */}
        <div className="relative h-48 bg-dark-900 overflow-hidden group-hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 to-primary-purple/10" />
          
          {/* Animated Background Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-20" 
                  style={{ 
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '20px 20px' 
                  }} 
             />
             <motion.div 
               className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-cyan to-primary-purple opacity-40 blur-2xl"
               animate={{ scale: isHovered ? [1, 1.2, 1] : 1, rotate: isHovered ? 90 : 0 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
          </div>

          {/* Placeholder Icon */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div 
              className="text-6xl"
              animate={{ y: isHovered ? [0, -5, 0] : 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💡
            </motion.div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 flex-1 flex flex-col relative z-20">
          <h3 className="text-xl font-display font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-cyan to-primary-purple group-hover:to-white transition-all duration-300">
            {project.title}
          </h3>
          
          <div className="mb-4 h-0.5 w-12 bg-gray-700 group-hover:w-full group-hover:bg-gradient-to-r from-primary-cyan to-primary-purple transition-all duration-500" />
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-1 group-hover:text-gray-300 transition-colors">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] uppercase tracking-wider rounded border border-primary-cyan/20 text-primary-cyan bg-primary-cyan/5 group-hover:bg-primary-cyan/10 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-[10px] rounded border border-gray-700 text-gray-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* View Project Button */}
          <motion.button 
            className="w-full py-3 rounded-lg bg-dark-700/50 border border-primary-cyan/30 text-primary-cyan text-sm font-bold tracking-widest uppercase hover:bg-primary-cyan hover:text-dark-900 transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Project <ExternalLink size={14} />
            </span>
            <div className="absolute inset-0 bg-primary-cyan translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
