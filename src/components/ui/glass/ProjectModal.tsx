import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import type { PortfolioProject } from '../../../data/projects';
import { GlassButton } from './GlassButton';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Focus Trap & Escape key listener
  useEffect(() => {
    if (!project) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />
          
          {/* Modal */}
          <GlassPanel
            intensity="heavy"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto z-10 flex flex-col pointer-events-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 p-6 md:p-8 border-b border-white/10 bg-black/40 backdrop-blur-md flex justify-between items-start gap-4 z-20">
              <div>
                <h2 id="project-title" className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-white mb-2">
                  {project.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest px-2 py-1 bg-accent/10 text-accent rounded-sm border border-accent/20">
                    {project.status}
                  </span>
                  {project.sourceEvidence.map(src => (
                    <span key={src} className="text-xs font-mono uppercase tracking-widest px-2 py-1 bg-white/5 text-white/50 rounded-sm border border-white/10">
                      Vía {src}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-full"
                aria-label="Cerrar modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-8">
              <section>
                <h3 className="text-sm font-mono text-white/40 mb-3 tracking-widest">OVERVIEW</h3>
                <p className="text-base text-white/80 leading-relaxed font-sans">
                  {project.description}
                </p>
              </section>

              {project.problemSolved && (
                <section>
                  <h3 className="text-sm font-mono text-white/40 mb-3 tracking-widest">PROBLEM SOLVED</h3>
                  <p className="text-base text-white/80 leading-relaxed font-sans">
                    {project.problemSolved}
                  </p>
                </section>
              )}

              {project.technicalApproach && (
                <section>
                  <h3 className="text-sm font-mono text-white/40 mb-3 tracking-widest">TECHNICAL APPROACH</h3>
                  <p className="text-base text-white/80 leading-relaxed font-sans">
                    {project.technicalApproach}
                  </p>
                </section>
              )}

              <section>
                <h3 className="text-sm font-mono text-white/40 mb-3 tracking-widest">TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1.5 text-sm font-sans text-white/70 bg-white/5 border border-white/10 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer Actions */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="p-6 md:p-8 border-t border-white/10 bg-white/[0.02] flex flex-wrap gap-4 mt-auto">
                {project.liveUrl && (
                  <GlassButton onClick={() => window.open(project.liveUrl, '_blank')} className="px-6 py-2.5 flex items-center gap-2">
                    <span>Live Demo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </GlassButton>
                )}
                {project.githubUrl && (
                  <GlassButton onClick={() => window.open(project.githubUrl, '_blank')} className="px-6 py-2.5 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span>GitHub</span>
                  </GlassButton>
                )}
              </div>
            )}
          </GlassPanel>
        </div>
      )}
    </AnimatePresence>
  );
};
