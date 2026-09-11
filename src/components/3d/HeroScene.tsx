import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerformanceMonitor, ContactShadows } from '@react-three/drei';
import { HeroBackgroundModel } from './models/HeroBackgroundModel';

export const HeroScene = () => {
  const [dpr, setDpr] = useState(1.5); // Default to a reasonable resolution

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)}>
          <Suspense fallback={null}>
            {/* Cinematic Lighting Setup */}
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.2} />
            <spotLight 
              position={[5, 5, 5]} 
              angle={0.15} 
              penumbra={1} 
              intensity={2} 
              color="#00f0ff" // Accent color (Cyan)
              castShadow 
            />
            <spotLight 
              position={[-5, -5, -5]} 
              angle={0.2} 
              penumbra={1} 
              intensity={1} 
              color="#ff00f0" // Secondary accent
            />
            <directionalLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />

            {/* The Futuristic Background Assembly */}
            <group position={[2, 0, -2]} scale={1.2}>
              <HeroBackgroundModel />
            </group>

            {/* Soft shadow plane to ground the object */}
            <ContactShadows 
              position={[0, -2, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4} 
            />

            {/* High dynamic range environment for reflections */}
            <Environment preset="city" />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
};
