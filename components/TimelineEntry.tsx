'use client';

import { motion } from 'framer-motion';
import { TimelineEntry as TimelineEntryType } from '@/data/portfolio-data';
import { Briefcase, GraduationCap } from 'lucide-react';

interface TimelineEntryProps {
  entry: TimelineEntryType;
  index: number;
}

export default function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Date - Desktop */}
      <div className={`hidden md:block md:w-1/2 ${isEven ? 'text-right pr-12' : 'text-left pl-12'}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-primary-cyan font-semibold text-lg">
            {entry.startDate} - {entry.endDate}
          </p>
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          {/* Outer Glow */}
          <div className={`absolute inset-0 rounded-full blur-md ${
            entry.type === 'work' ? 'bg-primary-cyan' : 'bg-primary-purple'
          } opacity-50 scale-150`} />
          
          {/* Dot */}
          <div className={`relative w-12 h-12 rounded-full border-4 flex items-center justify-center ${
            entry.type === 'work' 
              ? 'bg-dark-800 border-primary-cyan' 
              : 'bg-dark-800 border-primary-purple'
          }`}>
            {entry.type === 'work' ? (
              <Briefcase size={20} className="text-primary-cyan" />
            ) : (
              <GraduationCap size={20} className="text-primary-purple" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`md:w-1/2 ${isEven ? 'pl-20 md:pl-12' : 'pl-20 md:pr-12'}`}>
        <motion.div
          className="glass rounded-xl p-6 card-hover"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
        >
          {/* Date - Mobile */}
          <p className="md:hidden text-primary-cyan font-semibold text-sm mb-2">
            {entry.startDate} - {entry.endDate}
          </p>

          {/* Title */}
          <h3 className="text-xl font-display font-semibold mb-1 gradient-text">
            {entry.title}
          </h3>

          {/* Organization */}
          <p className="text-gray-300 font-medium mb-3">
            {entry.organization}
          </p>

          {/* Location */}
          {entry.location && (
            <p className="text-gray-400 text-sm mb-3">
              📍 {entry.location}
            </p>
          )}

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {entry.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
