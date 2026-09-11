import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import { projects } from '../../../data/projects';
import type { Capability, PortfolioProject } from '../../../data/projects';
import { ProjectModal } from './ProjectModal';

interface CapabilityModalProps {
  capability: Capability | null;
  onClose: () => void;
}

export const CapabilityModal = ({ capability, onClose }: CapabilityModalProps) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Focus Trap & Escape key listener
  useEffect(() => {
    if (!capability || selectedProject) return; // If child modal is open, let it handle Escape
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [capability, selectedProject, onClose]);

  const relatedProjects = capability 
    ? projects.filter(p => p.capabilities.includes(capability.id))
    : [];

  return (
    <>
      <AnimatePresence>
        {capability && !selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
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
              aria-labelledby="capability-title"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto z-10 flex flex-col pointer-events-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 p-6 md:p-8 border-b border-white/10 bg-black/40 backdrop-blur-md flex justify-between items-start gap-4 z-20">
                <div>
                  <h2 id="capability-title" className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-white mb-2">
                    {capability.label}
                  </h2>
                  <p className="text-sm font-mono text-accent">
                    {capability.description}
                  </p>
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
                {/* Related Projects */}
                <section>
                  <h3 className="text-sm font-mono text-white/40 mb-4 tracking-widest flex items-center justify-between">
                    <span>PROJECTS</span>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{relatedProjects.length}</span>
                  </h3>
                  
                  {relatedProjects.length > 0 ? (
                    <div className="space-y-3">
                      {relatedProjects.map(project => (
                        <button
                          key={project.id}
                          onClick={() => setSelectedProject(project)}
                          className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 group"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-lg font-bold font-sans text-white group-hover:text-accent transition-colors">
                              {project.name}
                            </h4>
                            <svg className="text-white/30 group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 duration-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </div>
                          <p className="text-sm text-white/60 font-sans line-clamp-1">
                            {project.shortDescription}
                          </p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/40 italic text-sm">No verified projects for this capability yet.</p>
                  )}
                </section>

                {/* Technologies */}
                <section>
                  <h3 className="text-sm font-mono text-white/40 mb-3 tracking-widest">TECHNOLOGIES</h3>
                  <div className="flex flex-wrap gap-2">
                    {capability.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 text-sm font-sans text-white/70 bg-white/5 border border-white/10 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </GlassPanel>
          </div>
        )}
      </AnimatePresence>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
};
