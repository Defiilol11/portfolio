import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerformanceMonitor, Environment, ContactShadows, Bounds, useBounds } from '@react-three/drei';
import * as THREE from 'three';
import { ModelScene } from './ModelScene';
import type { PartData } from './ModelRegistry';
import { motion } from 'framer-motion';
import { GlassPanel } from '../../ui/glass/GlassPanel';
import { GlassButton } from '../../ui/glass/GlassButton';

class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

import { useProgress } from '@react-three/drei';

function FallbackLoader() {
  const { active, progress } = useProgress();
  
  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 pointer-events-none">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <span className="font-mono text-sm tracking-widest text-accent">LOADING ASSET {progress.toFixed(0)}%</span>
      </div>
    </div>
  );
}

const ZoomManager = ({ zoom }: { zoom: number }) => {
  const { camera } = useThree();
  useEffect(() => {
    (camera as THREE.PerspectiveCamera).zoom = zoom;
    camera.updateProjectionMatrix();
  }, [zoom, camera]);
  return null;
};

const BoundsReset = ({ trigger }: { trigger: number }) => {
  const bounds = useBounds();
  useEffect(() => {
    if (trigger > 0) bounds.refresh().clip().fit();
  }, [trigger, bounds]);
  return null;
};

interface ModelViewerProps {
  model: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ model, title = "ASSET INSPECTOR", subtitle, link }) => {
  const [dpr, setDpr] = useState(1.5);
  const [parts, setParts] = useState<PartData[]>([]);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [explosionProgress, setExplosionProgress] = useState(0);
  const [explosionDistance, setExplosionDistance] = useState(25);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [resetTrigger, setResetTrigger] = useState(0);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglAvailable(false);
    } catch (e) {
      setWebglAvailable(false);
    }
  }, []);

  const handleResetCamera = () => {
    setExplosionProgress(0);
    setZoomLevel(1);
    setResetTrigger(prev => prev + 1);
  };

  if (!webglAvailable) {
    return (
      <GlassPanel className="w-full h-96 flex items-center justify-center">
        <p className="font-mono text-white/50 text-sm">WebGL is required to view 3D assets.</p>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel intensity="heavy" className="relative w-full h-[60vh] md:h-screen max-h-[800px] group">
      {/* Technical Data Overlay (DOM) */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <h3 className="font-sans font-bold text-xl mb-1 text-white">{title}</h3>
        <p className="font-mono text-xs text-accent mb-4 uppercase">{subtitle || model.split('/').pop()}</p>
        
        {link && (
          <GlassButton variant="ghost" href={link} target="_blank" className="mb-4 pointer-events-auto">
            [ LAUNCH APP ] ↗
          </GlassButton>
        )}

        {parts.length > 0 && (
          <GlassPanel 
            intensity="light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block p-4 rounded-xl space-y-2 pointer-events-auto text-xs font-mono"
          >
            <div className="flex justify-between gap-8 text-white/70"><span>MESHES:</span> <span className="text-white">{parts.length}</span></div>
            <div className="h-px w-full bg-white/10 my-2" />
            <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {parts.map(p => (
                <div key={p.id} className="flex justify-between gap-4 py-1 border-b border-white/5 last:border-0 hover:bg-white/5 cursor-crosshair">
                  <span className="truncate max-w-[120px] text-white/50" title={p.name}>{p.name}</span>
                  <span className="text-[10px] text-accent/50">{p.type}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        )}
      </div>

      {/* Explosion & Zoom Controls (DOM) */}
      <GlassPanel intensity="light" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 w-[90%] md:w-72 max-w-[400px] p-4 pointer-events-auto">
        
        {/* Explosion Progress */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between w-full text-xs font-mono text-white/70">
            <span>ASSEMBLED</span>
            <span>EXPLODED</span>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={explosionProgress}
            onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        {/* Distance & Zoom Settings */}
        <div className="flex justify-between w-full items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-white/50 font-mono">DISTANCE: {explosionDistance}x</span>
            <input 
              type="range" 
              min="1" max="50" step="1" 
              value={explosionDistance}
              onChange={(e) => setExplosionDistance(parseFloat(e.target.value))}
              className="w-20 md:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent flex-grow"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-white/50 font-mono">ZOOM: {zoomLevel.toFixed(1)}x</span>
            <input 
              type="range" 
              min="0.5" max="3" step="0.1" 
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="w-20 md:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent flex-grow"
            />
          </div>
        </div>

      </GlassPanel>

      {/* Controls UI Overlay (DOM) */}
      <div className="absolute top-6 right-6 md:top-auto md:bottom-6 z-20 flex gap-4 pointer-events-auto">
        <GlassButton 
          variant="ghost"
          onClick={handleResetCamera}
        >
          [ RESET VIEW ]
        </GlassButton>
      </div>

      <ErrorBoundary fallback={<div className="absolute inset-0 flex items-center justify-center bg-red-900/20 text-red-400 font-mono">Error loading GLB asset.</div>}>
        <Canvas
          camera={{ position: [8, 5, 8], fov: 45 }}
          dpr={dpr}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-move"
        >
          <Suspense fallback={null}>
            <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)}>
              <ZoomManager zoom={zoomLevel} />
              
              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8fa5b2" />
              
              {/* Model with Auto-Framing */}
              <Bounds fit clip margin={2.5}>
                <BoundsReset trigger={resetTrigger} />
                <ModelScene 
                  modelUrl={model} 
                  explosionProgress={explosionProgress}
                  explosionDistance={explosionDistance}
                  onAnalysisComplete={({ parts }) => setParts(parts)} 
                />
              </Bounds>

              {/* Environment Setup */}
              <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={20} blur={2} far={4} resolution={128} frames={60} />
              <Environment preset="city" />
              
              {/* Camera Controls */}
              <OrbitControls 
                ref={controlsRef}
                makeDefault 
                enableDamping 
                dampingFactor={0.05}
                enableZoom={false}
              />
            </PerformanceMonitor>
          </Suspense>
        </Canvas>
        <FallbackLoader />
      </ErrorBoundary>
    </GlassPanel>
  );
};
