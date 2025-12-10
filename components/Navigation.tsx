'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';



const navItems = [
  { name: 'HOME', href: '#home' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'EXPERTISE', href: '#expertise' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#home" 
              className="group relative text-4xl md:text-4xl font-display font-bold
                         transition-all duration-300 
                         hover:scale-110 
                         hover:animate-pulse
                         inline-block"
            >
              {/* Flashing border effect */}
              <span className="absolute inset-0 rounded-lg border-2 border-transparent 
                             group-hover:border-primary-cyan 
                             group-hover:animate-[flash_1.5s_ease-in-out_infinite]
                             group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]
                             transition-all duration-300
                             -m-2 p-2" />
              
              {/* Logo text with shake effect */}
              <span className="relative z-10 inline-block gradient-text group-hover:animate-[shake_0.5s_ease-in-out]">
                D.Y
              </span>
            </a>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative text-sm font-medium transition-all duration-300 
                            hover:scale-110 
                            hover:animate-pulse
                            inline-block px-3 py-1
                            ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-primary-cyan'
                      : 'text-gray-300'
                  }`}
                >
                  {/* Flashing border effect */}
                  <span className="absolute inset-0 rounded border border-transparent 
                                 group-hover:border-primary-cyan 
                                 group-hover:animate-[flash_1.5s_ease-in-out_infinite]
                                 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.4)]
                                 transition-all duration-300" />
                  
                  {/* Nav text with shake effect */}
                  <span className="relative z-10 inline-block group-hover:animate-[shake_0.5s_ease-in-out]">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-dark-900/95 backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative text-2xl font-medium transition-all duration-300 
                            hover:scale-110 
                            hover:animate-pulse
                            inline-block px-4 py-2
                            ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-primary-cyan'
                      : 'text-gray-300'
                  }`}
                >
                  {/* Flashing border effect */}
                  <span className="absolute inset-0 rounded border-2 border-transparent 
                                 group-hover:border-primary-cyan 
                                 group-hover:animate-[flash_1.5s_ease-in-out_infinite]
                                 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]
                                 transition-all duration-300" />
                  
                  {/* Nav text with shake effect */}
                  <span className="relative z-10 inline-block group-hover:animate-[shake_0.5s_ease-in-out]">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
