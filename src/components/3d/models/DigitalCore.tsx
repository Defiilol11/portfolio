import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

export const DigitalCore = () => {
  const group = useRef<THREE.Group>(null);
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const baseRotation = useRef(new THREE.Vector2(0, 0));
  const scrollOffset = useRef(0);
  
  // Use local model
  const { nodes } = useGLTF('/models/ball_bearing.glb') as any;

  // Enhance the imported material for a "liquid glass" feel using physical transmission
  const coreMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.95, // Glassmorphism
      thickness: 2.0,     // Refraction thickness
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
      transparent: true,
      opacity: 1.0,
    });
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // 1. Scroll tracking
    const targetScroll = window.scrollY * 0.002;
    scrollOffset.current = THREE.MathUtils.damp(scrollOffset.current, targetScroll, 4, delta);

    // 2. Base idle rotation (accumulated independently so it doesn't spin wildly)
    baseRotation.current.x += delta * 0.1;
    baseRotation.current.y += delta * 0.05;

    // 3. Pointer reaction (limited offset)
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;

    targetRotation.current.x = THREE.MathUtils.damp(targetRotation.current.x, targetX, 4, delta);
    targetRotation.current.y = THREE.MathUtils.damp(targetRotation.current.y, targetY, 4, delta);

    // 4. Combine all factors into final rotation and position
    // Rotation
    group.current.rotation.x = targetRotation.current.y + scrollOffset.current; 
    group.current.rotation.y = baseRotation.current.x + targetRotation.current.x;
    group.current.rotation.z = baseRotation.current.y - scrollOffset.current * 0.5;

    // Position (parallax effect with scroll)
    group.current.position.y = -scrollOffset.current * 1.5;
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={group} scale={1.5} dispose={null}>
        {/* We map over the GLTF nodes to apply our custom high-end material */}
        {Object.values(nodes).map((node: any) => {
          if (node.isMesh) {
            return (
              <mesh
                key={node.uuid}
                castShadow
                receiveShadow
                geometry={node.geometry}
                material={coreMaterial}
              />
            );
          }
          return null;
        })}
      </group>
    </Float>
  );
};

// Preload the model
useGLTF.preload('/models/ball_bearing.glb');
