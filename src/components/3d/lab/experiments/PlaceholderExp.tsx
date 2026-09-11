import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Wireframe } from '@react-three/drei';
import * as THREE from 'three';

export const PlaceholderExp = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * 0.1;
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      
      <group ref={group}>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#111111" />
          <Wireframe thickness={0.02} fillMix={1} stroke="#ffffff" fillOpacity={0} />
        </mesh>
      </group>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </>
  );
};
