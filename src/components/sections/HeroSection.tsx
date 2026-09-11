import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { GlassButton } from '../ui/glass/GlassButton';

export const HeroSection = () => {
  const { toggleExperienceMode } = useAppStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-start z-10 pointer-events-none">
      <motion.div 
        className="max-w-4xl pointer-events-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-sans tracking-tight mb-6 text-foreground"
          style={{ textWrap: 'balance' }}
        >
          CARLOS TARACENA
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-lg lg:text-xl font-mono text-accent mb-12 tracking-widest uppercase"
        >
          Systems / Software / Interactive Web
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
          <GlassButton 
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            VIEW WORK
          </GlassButton>
          
          <GlassButton 
            variant="secondary"
            onClick={toggleExperienceMode}
          >
            EXPERIENCE MODE
          </GlassButton>
        </motion.div>
      </motion.div>
    </section>
  );
};
