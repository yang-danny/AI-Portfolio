'use client';

import { SkillCategory } from '@/data/portfolio-data';

interface SkillNodeProps {
  skill: SkillCategory;
}

export default function SkillNode({ skill }: SkillNodeProps) {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Node Circle */}
      <div className="relative mb-4">
        {/* Outer Glow Ring */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
          style={{ 
            backgroundColor: skill.color,
            transform: 'scale(1.5)'
          }}
        />
        
        {/* Main Circle */}
        <div 
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center border-2 glass transition-all duration-300 group-hover:scale-110"
          style={{ 
            borderColor: skill.color,
            boxShadow: `0 0 20px ${skill.color}40`
          }}
        >
          {/* Inner Gradient Circle */}
          <div 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full opacity-20"
            style={{ 
              background: `radial-gradient(circle, ${skill.color} 0%, transparent 70%)`
            }}
          />
          
          {/* Center Dot */}
          <div 
            className="absolute w-4 h-4 rounded-full animate-pulse"
            style={{ backgroundColor: skill.color }}
          />
        </div>
      </div>

      {/* Skill Name */}
      <h3 
        className="text-xl md:text-2xl font-display font-semibold mb-3"
        style={{ color: skill.color }}
      >
        {skill.name}
      </h3>

      {/* Technologies List */}
      <div className="flex flex-col gap-1.5">
        {skill.technologies.map((tech) => (
          <span 
            key={tech} 
            className="text-gray-400 text-sm md:text-base"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
