import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../../store/useAppStore';
import { GlassPanel } from './GlassPanel';

const SECTIONS = ['HOME', 'WORK', 'SYSTEMS', 'LAB', 'ABOUT', 'CONTACT'];

export const GlassNav = () => {
  const { activeSection, setActiveSection } = useAppStore();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // More forgiving intersection area
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  const isHidden = activeSection === 'about' || activeSection === 'contact';

  return (
    <>
      <AnimatePresence>
        {!isHidden && (
          <motion.nav 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:block"
          >
            <GlassPanel intensity="light" className="py-6 px-4 flex flex-col gap-6">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.toLowerCase();
                return (
                  <button
                    key={section}
                    onClick={() => {
                      setActiveSection(section.toLowerCase());
                      const target = document.getElementById(section.toLowerCase());
                      if (target) {
                        if ((window as any).lenis) {
                          (window as any).lenis.scrollTo(target);
                        } else {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="relative group flex items-center gap-4 text-xs font-mono tracking-widest text-left"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className={`w-1 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-accent scale-100' : 'bg-white/20 scale-0 group-hover:scale-100 group-hover:bg-white/50'}`} />
                    
                    <span className={`transition-colors duration-300 ${
                      isActive ? 'text-accent' : 'text-white/40 group-hover:text-white'
                    }`}>
                      {section}
                    </span>
                  </button>
                );
              })}
            </GlassPanel>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAV */}
      <AnimatePresence>
        {!isHidden && (
          <motion.nav 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm md:hidden"
          >
            <GlassPanel intensity="heavy" className="px-4 py-3 flex flex-row justify-between items-center rounded-full">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.toLowerCase();
                const shortName = section.substring(0, 3);
                return (
                  <button
                    key={section}
                    onClick={() => {
                      setActiveSection(section.toLowerCase());
                      const target = document.getElementById(section.toLowerCase());
                      if (target) {
                        if ((window as any).lenis) {
                          (window as any).lenis.scrollTo(target);
                        } else {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="relative px-2 py-2 flex flex-col items-center justify-center group"
                    aria-label={`Navigate to ${section}`}
                  >
                    <span className={`font-mono text-[10px] tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-accent font-bold' : 'text-white/50 group-hover:text-white'
                    }`}>
                      {shortName}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="mobileNavIndicator"
                        className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </GlassPanel>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating Home Button when Nav is hidden */}
      <AnimatePresence>
        {isHidden && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              const target = document.getElementById('home');
              if (target && (window as any).lenis) {
                (window as any).lenis.scrollTo(target);
              }
            }}
            className="fixed bottom-8 right-8 z-50 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors shadow-2xl"
            aria-label="Back to top"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
