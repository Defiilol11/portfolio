import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { capabilities } from '../../data/projects';
import type { Capability } from '../../data/projects';
import { CapabilityModal } from '../ui/glass/CapabilityModal';
import { GlassPanel } from '../ui/glass/GlassPanel';

export const SystemsSection = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="systems" className="relative w-full min-h-screen py-32 pointer-events-none flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pointer-events-auto z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          className="w-full"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-sans font-bold mb-4 tracking-tight"
          >
            SYSTEMS & CAPABILITIES
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="mb-16 max-w-2xl text-white/70 text-lg font-sans leading-relaxed"
          >
            Un mapa interactivo de mis competencias técnicas, fundamentado en evidencia real.
            Haz clic en cada nodo para explorar los proyectos y repositorios asociados.
          </motion.p>

          {/* Grid de Capabilities */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {capabilities.map((cap) => (
              <GlassPanel
                key={cap.id}
                intensity="light"
                onClick={() => setSelectedCapability(cap)}
                className="p-6 cursor-pointer group hover:border-accent/40 transition-colors duration-300 relative overflow-hidden"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <h3 className="text-sm font-mono text-white/90 font-bold mb-3 tracking-widest group-hover:text-accent transition-colors duration-300">
                  {cap.label}
                </h3>
                <p className="text-xs text-white/50 font-sans line-clamp-2 leading-relaxed">
                  {cap.description}
                </p>
                
                {/* "Node" visual indicator */}
                <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-accent group-hover:scale-150 transition-all duration-300" />
              </GlassPanel>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <CapabilityModal 
        capability={selectedCapability} 
        onClose={() => setSelectedCapability(null)} 
      />
    </section>
  );
};
