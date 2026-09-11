import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export const Exp6_MaterialStudy = () => {
  const group = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
    }
    if (lightRef.current) {
      const time = state.clock.getElapsedTime();
      lightRef.current.position.x = Math.sin(time) * 3;
      lightRef.current.position.z = Math.cos(time) * 3;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.2} />
      <pointLight ref={lightRef} position={[3, 2, 3]} intensity={2} color="#00f0ff" />
      <pointLight position={[-3, -2, -3]} intensity={1} color="#ff00f0" />
      
      <Environment preset="city" />

      <group ref={group}>
        {/* Metal Sphere */}
        <mesh position={[-1.2, 0, 0]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={1.0} 
            roughness={0.1} 
            envMapIntensity={2}
          />
        </mesh>

        {/* Matte Rough Sphere */}
        <mesh position={[1.2, 0, 0]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial 
            color="#8fa5b2" 
            metalness={0.1} 
            roughness={0.9} 
          />
        </mesh>
      </group>

      <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={2} frames={60} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};
