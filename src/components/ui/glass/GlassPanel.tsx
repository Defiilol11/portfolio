import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className = '', intensity = 'medium', ...props }, ref) => {
    const intensityClasses = {
      light: 'bg-white/[0.02] backdrop-blur-md border border-white/5',
      medium: 'liquid-glass',
      heavy: 'liquid-glass backdrop-blur-3xl bg-white/[0.08]'
    };

    return (
      <motion.div
        ref={ref}
        className={`rounded-3xl overflow-hidden ${intensityClasses[intensity]} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
