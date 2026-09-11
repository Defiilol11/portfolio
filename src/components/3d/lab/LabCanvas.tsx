import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, View } from '@react-three/drei';

export const LabCanvas = () => {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <Canvas
        eventSource={document.getElementById('root') || undefined}
        className="pointer-events-none"
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  );
};
