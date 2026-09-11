import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export const Exp4_ParticleField = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 2000; // Keep it light for VRAM

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Initial positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 4;
      const speed = 0.5 + Math.random();
      const offset = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, speed, offset });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      // Swirling galaxy effect
      const radius = Math.sqrt(particle.x * particle.x + particle.z * particle.z);
      const angle = Math.atan2(particle.z, particle.x) + (delta * particle.speed * 0.5);
      
      // Add subtle noise
      const yWave = Math.sin(radius * 2 - time * particle.speed + particle.offset) * 0.2;
      
      dummy.position.set(
        Math.cos(angle) * radius,
        particle.y + yWave,
        Math.sin(angle) * radius
      );
      
      dummy.rotation.x += delta;
      dummy.rotation.y += delta;
      
      const scale = 1.0 + Math.sin(time + particle.offset) * 0.5;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Update data back to array for next frame
      particle.x = dummy.position.x;
      particle.z = dummy.position.z;
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#8fa5b2" />
      
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.02, 0.02, 0.02]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2} 
          metalness={0.8}
        />
      </instancedMesh>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </>
  );
};
