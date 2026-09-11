import React from 'react';
import { useAppStore } from '../../store/useAppStore';

const SECTIONS = ['HOME', 'WORK', 'SYSTEMS', 'LAB', 'ABOUT', 'CONTACT'];

export const Navigation = () => {
  const { activeSection, setActiveSection } = useAppStore();

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {SECTIONS.map((section) => (
        <button
          key={section}
          onClick={() => {
            setActiveSection(section.toLowerCase());
            const target = document.getElementById(section.toLowerCase());
            if (target) {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo(target);
              } else {
                target.scrollIntoView();
              }
            }
          }}
          className={`text-xs font-mono tracking-widest text-left transition-colors duration-300 ${
            activeSection === section.toLowerCase() ? 'text-accent' : 'text-white/40 hover:text-white'
          }`}
        >
          {section}
        </button>
      ))}
    </nav>
  );
};
