'use client';

import { useState } from 'react';
import { Project } from '@/data/portfolio-data';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="glass rounded-xl overflow-hidden card-hover group cursor-pointer h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-dark-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-cyan to-primary-purple opacity-50 blur-xl" />
        </div>
        {/* Placeholder for actual project image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-10">💡</div>
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/30 to-primary-purple/30 backdrop-blur-sm transition-all duration-300" />
        )}
      </div>

      {/* Project Info */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-display font-semibold mb-3 gradient-text">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-dark-700/50 border border-primary-cyan/30 text-primary-cyan"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 text-xs rounded-full bg-dark-700/50 border border-gray-600 text-gray-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* View Project Button */}
        <button className="w-full py-2.5 px-4 rounded-lg border border-primary-cyan/50 text-primary-cyan text-sm font-medium transition-all duration-300 hover:bg-primary-cyan/10 hover:border-primary-cyan flex items-center justify-center gap-2 group">
          VIEW PROJECT
          <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
