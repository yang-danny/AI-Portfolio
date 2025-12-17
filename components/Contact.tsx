'use client';

import { motion } from 'framer-motion';
import { contactInfo } from '@/data/portfolio-data';
import ContactForm from './ContactForm';
import { Linkedin, Github, Globe, Mail } from 'lucide-react';

export default function Contact() {
  const socialLinks = [
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: Github, href: contactInfo.github, label: 'GitHub' },
    { icon: Globe, href: contactInfo.portfolio, label: 'Portfolio' },
  ];

  return (
    <section id="contact" className="section-padding bg-dark-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            CONTACT
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-cyan to-primary-purple mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Email */}
            <div className="glass rounded-xl p-8">
              <h3 className="text-xl font-display font-semibold mb-4 gradient-text">
                Get In Touch
              </h3>
              <p className="text-gray-300 mb-6">
                Feel free to reach out for collaborations, opportunities, or just a friendly chat!
              </p>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-primary-cyan hover:text-primary-cyan/80 transition-colors inline-flex items-center gap-2"
              >
                <span className="text-2xl"><Mail /></span>
                {contactInfo.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="glass rounded-xl p-8">
              <h3 className="text-xl font-display font-semibold mb-6 gradient-text">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-lg bg-dark-700/50 border border-primary-cyan/30 flex items-center justify-center transition-all duration-300 hover:bg-primary-cyan/10 hover:border-primary-cyan hover:scale-110 group"
                    aria-label={social.label}
                  >
                    <social.icon size={24} className="text-primary-cyan group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
