import React, { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { motion } from 'framer-motion';

export const ModeToggle = () => {
  const { isExperienceMode, toggleExperienceMode } = useAppStore();

  return (
    <button
      onClick={toggleExperienceMode}
      className="fixed top-6 right-6 z-50 liquid-glass rounded-full px-4 py-2 flex items-center gap-2 overflow-hidden group transition-all"
    >
      <span className="text-sm font-mono tracking-wider z-10 relative">
        {isExperienceMode ? 'EXP. MODE' : 'STD. MODE'}
      </span>
      <div 
        className={`absolute inset-0 bg-accent/20 transition-transform duration-500 ${isExperienceMode ? 'translate-x-0' : '-translate-x-full'}`} 
      />
    </button>
  );
};
