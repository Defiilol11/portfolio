import React, { useRef } from 'react';
import { GlassPanel } from '../ui/glass/GlassPanel';
import { View } from '@react-three/drei';
import { Exp1_LiquidGlass } from '../3d/lab/experiments/Exp1_LiquidGlass';
import { Exp2_ProceduralGradient } from '../3d/lab/experiments/Exp2_ProceduralGradient';
import { Exp3_CursorDistortion } from '../3d/lab/experiments/Exp3_CursorDistortion';
import { Exp4_ParticleField } from '../3d/lab/experiments/Exp4_ParticleField';
import { Exp5_ImageDisplacement } from '../3d/lab/experiments/Exp5_ImageDisplacement';
import { Exp6_MaterialStudy } from '../3d/lab/experiments/Exp6_MaterialStudy';
import { Exp7_ScrollTransition } from '../3d/lab/experiments/Exp7_ScrollTransition';
import { Exp8_Holographic } from '../3d/lab/experiments/Exp8_Holographic';

const experiments = [
  { id: '01', title: 'Liquid Glass', tech: 'MeshTransmissionMaterial', desc: 'Refraction & IOR calculation', Component: Exp1_LiquidGlass },
  { id: '02', title: 'Procedural Gradient', tech: 'Fragment Shader', desc: 'Time-based math gradient', Component: Exp2_ProceduralGradient },
  { id: '03', title: 'Cursor Distortion', tech: 'Vertex Displacement', desc: 'Raycaster texture warping', Component: Exp3_CursorDistortion },
  { id: '04', title: 'Particle Field', tech: 'InstancedMesh', desc: '100k points with curl noise', Component: Exp4_ParticleField },
  { id: '05', title: 'Image Displacement', tech: 'Depth Map Shader', desc: 'RGB shift on hover transition', Component: Exp5_ImageDisplacement },
  { id: '06', title: '3D Material Study', tech: 'PBR Physical', desc: 'Roughness & metalness mapping', Component: Exp6_MaterialStudy },
  { id: '07', title: 'Scroll Transition', tech: 'Spring Physics', desc: 'Pointer-tied object rotation', Component: Exp7_ScrollTransition },
  { id: '08', title: 'Holographic Surface', tech: 'Custom GLSL Material', desc: 'Fresnel & scanline energy', Component: Exp8_Holographic },
];

export const LabSection = () => {
  return (
    <section id="lab" className="mt-32 w-full pt-16 relative">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-4 tracking-tight">CREATIVE LAB</h2>
        <p className="text-lg font-sans text-white/70 max-w-2xl leading-relaxed">
          Un entorno interactivo para la experimentación con WebGL, shaders, simulaciones físicas y algoritmos de post-procesamiento.
          Interactúa directamente con los lienzos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {experiments.map((exp) => (
          <LabCard key={exp.id} exp={exp} />
        ))}
      </div>
    </section>
  );
};

const LabCard = ({ exp }: { exp: any }) => {
  // El contenedor View usará este ref para trackear su posición en el DOM.
  const containerRef = useRef<HTMLDivElement>(null!);
  const { Component } = exp;

  return (
    <GlassPanel intensity="light" className="flex flex-col h-[380px] md:h-[500px] overflow-hidden group">
      {/* View Container (3D Portal) */}
      <div ref={containerRef} className="relative w-full h-2/3 bg-black/40 border-b border-white/5 cursor-crosshair">
        {/* Usamos @react-three/drei View para montar la escena específica aquí */}
        <View track={containerRef} className="absolute inset-0 z-10">
          <Component />
        </View>
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-white/20 group-hover:text-accent transition-colors">
            EXP_{exp.id}
          </span>
        </div>
      </div>
      
      {/* Card Info (DOM) */}
      <div className="p-6 flex flex-col flex-grow justify-between pointer-events-none">
        <div>
          <h3 className="font-sans font-bold text-xl text-white mb-1 group-hover:text-accent transition-colors">{exp.title}</h3>
          <span className="text-[10px] font-mono uppercase text-white/50">{exp.tech}</span>
        </div>
        <p className="text-sm font-sans text-white/60">{exp.desc}</p>
      </div>
    </GlassPanel>
  );
};
