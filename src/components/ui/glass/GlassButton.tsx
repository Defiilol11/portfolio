import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  target?: string;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, className = '', variant = 'primary', href, target, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-mono text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full";
    
    const variants = {
      primary: "liquid-glass-button px-6 py-3 text-white hover:text-accent",
      secondary: "liquid-glass-button px-4 py-2 text-white/70 hover:text-white bg-transparent",
      ghost: "px-4 py-2 text-white/50 hover:text-white hover:bg-white/5"
    };

    const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

    if (href) {
      return (
        <motion.a 
          href={href}
          target={target}
          rel={target === '_blank' ? 'noreferrer' : undefined}
          className={combinedClasses}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={combinedClasses}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

GlassButton.displayName = 'GlassButton';
