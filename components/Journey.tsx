'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/portfolio-data';
import TimelineEntry from './TimelineEntry';

export default function Journey() {
  return (
    <section id="journey" className="section-padding bg-dark-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            JOURNEY
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-cyan to-primary-purple mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-cyan via-primary-blue to-primary-purple opacity-30 -translate-x-1/2" />

          {/* Timeline Entries */}
          <div className="space-y-12">
            {timeline.map((entry, index) => (
              <TimelineEntry key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
