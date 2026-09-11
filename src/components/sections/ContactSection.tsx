import React from 'react';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="relative w-full bg-background min-h-screen flex items-center justify-center py-32 z-20"
    >
      <div className="max-w-4xl w-full mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-sm font-mono text-white/40 mb-12 tracking-[0.3em] uppercase">Contact</h2>
          
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold leading-[1.1] tracking-tight mb-24 text-white">
            LET'S BUILD<br />
            <span className="text-white/40">SOMETHING</span><br />
            MEANINGFUL.
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <a 
              href="mailto:taracenadev@gmail.com"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-sans font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Email Me</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            <a 
              href="https://github.com/Defiilol11"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors font-sans text-lg"
            >
              <span className="relative">
                GitHub
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-out" />
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a 
              href="https://www.linkedin.com/in/carlos-taracena/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors font-sans text-lg"
            >
              <span className="relative">
                LinkedIn
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-out" />
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </motion.div>
        
        <div className="mt-32 text-white/30 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-4">
          <span>&copy; {new Date().getFullYear()} CARLOS TARACENA</span>
          <span>&bull;</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </section>
  );
};
