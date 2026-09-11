import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface GlassProjectCardProps {
  title: string;
  category: string;
  description: string;
  image?: string;
  link?: string;
  className?: string;
  index?: number;
}

export const GlassProjectCard: React.FC<GlassProjectCardProps> = ({
  title,
  category,
  description,
  image,
  link,
  className = '',
  index = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className={`group relative ${className}`}
    >
      <GlassPanel className="h-full flex flex-col transition-all duration-500 hover:bg-white/[0.08] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)]">
        {image && (
          <div className="w-full h-48 overflow-hidden bg-black/20 border-b border-white/5">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <span className="text-[10px] font-mono tracking-widest text-accent mb-3 uppercase">{category}</span>
          <h3 className="text-xl font-sans font-bold text-white mb-3 tracking-tight">{title}</h3>
          <p className="text-sm text-white/60 leading-relaxed font-sans mb-6 flex-grow">
            {description}
          </p>
          {link && (
            <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs font-mono text-white/40 group-hover:text-accent transition-colors">EXPLORE</span>
              <span className="text-accent transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          )}
        </div>
      </GlassPanel>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="absolute inset-0 z-10">
          <span className="sr-only">View {title}</span>
        </a>
      )}
    </motion.div>
  );
};
