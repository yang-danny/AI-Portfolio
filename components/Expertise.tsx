'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio-data';
import SkillNode from './SkillNode';

export default function Expertise() {
  return (
    <section id="expertise" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            EXPERTISE
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-cyan to-primary-purple mx-auto" />
        </motion.div>

        {/* Skills Network Visualization */}
        <div className="relative min-h-[500px] md:min-h-[600px]">
          {/* Connection Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Desktop View - Horizontal Layout */}
            <g className="hidden md:block">
              <motion.line
                x1="20%" y1="50%" x2="50%" y2="50%"
                stroke="url(#lineGradient1)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="50%" y1="50%" x2="80%" y2="50%"
                stroke="url(#lineGradient2)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
              />
            </g>

            {/* Mobile View - Vertical Layout */}
            <g className="md:hidden">
              <motion.line
                x1="50%" y1="20%" x2="50%" y2="50%"
                stroke="url(#lineGradient1)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="50%" y1="50%" x2="50%" y2="80%"
                stroke="url(#lineGradient2)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
              />
            </g>
          </svg>

          {/* Skill Nodes - Desktop: Horizontal, Mobile: Vertical */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-8 px-4 md:px-0 h-full py-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-auto"
              >
                <SkillNode skill={skill} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
