import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { ModeToggle } from './components/layout/ModeToggle';
import { GlassNav } from './components/ui/glass/GlassNav';
import { HeroSection } from './components/sections/HeroSection';
import { HeroScene } from './components/3d/HeroScene';
import { SystemsSection } from './components/sections/SystemsSection';
import { ModelViewer } from './components/3d/viewer/ModelViewer';
import { useAppStore } from './store/useAppStore';
import { LabSection } from './components/sections/LabSection';
import { LabCanvas } from './components/3d/lab/LabCanvas';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';

function App() {
  const { isExperienceMode } = useAppStore();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    // Register to window for external access by Navigation
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global UI */}
      <ModeToggle />
      <GlassNav />

      {/* 3D Canvas Context (Always present for HERO, but handles global state if needed) */}
      <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${isExperienceMode ? 'opacity-100' : 'opacity-100'}`}>
         <HeroScene />
      </div>

      {/* Lab Global Canvas (Handles all Drei Views) */}
      <LabCanvas />

      {/* DOM Content */}
      <main className="relative z-10 w-full md:ml-[120px] max-w-6xl px-6 md:px-8 pb-32 pt-24 md:pt-0">
        <HeroSection />
        
        {/* Project: Stellar Tracker */}
        <section id="work" className="mt-32 w-full pt-16">
            <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 tracking-tight">STELLAR TRACKER</h2>
            <div className="mb-12 max-w-3xl text-white/70 space-y-4 text-lg font-sans leading-relaxed">
               <p>
                 Sistema mecatrónico de posicionamiento estelar automatizado.
                 Diseñado para calcular la trayectoria de cuerpos celestes y alinear instrumentos ópticos 
                 con alta precisión utilizando telemetría en tiempo real.
               </p>
               <p className="text-sm font-mono text-accent">
                 EXPLORACIÓN INTERACTIVA DE COMPONENTES ↓
               </p>
            </div>
            <ModelViewer 
               model="/models/cupula.glb" 
               title="SYSTEM ARCHITECTURE"
               subtitle="TELEMETRY & STRUCTURAL EXPLORATION"
               link="https://stellar-tracker.vercel.app/"
            />
        </section>

        {/* CREATIVE LAB */}
        <SystemsSection />
        <LabSection />
      </main>

      {/* Editorial Final Sections (Full Width) */}
      <AboutSection />
      <ContactSection />
    </div>
  );
}

export default App;
