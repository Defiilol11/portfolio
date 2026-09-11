import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Box, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export const Exp7_ScrollTransition = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Spring values
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Calculate target based on pointer
    // Moving mouse up/down rotates on X axis, left/right on Y axis
    const targetX = state.pointer.y * Math.PI;
    const targetY = state.pointer.x * Math.PI;
    
    // Apply dampening (spring physics)
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetX, 4, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetY, 4, delta);
    
    // Add constant idle rotation on Z
    meshRef.current.rotation.z += delta * 0.2;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
        <meshNormalMaterial />
      </Box>

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
};
