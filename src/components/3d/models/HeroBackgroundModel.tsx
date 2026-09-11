import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const HeroBackgroundModel = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const scrollOffset = useRef(0);

  // A thick Torus Knot is perfect for maximizing glass refraction and looking highly futuristic
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(2, 0.8, 64, 32), []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Smooth scroll tracking (very slow parallax)
    const targetScroll = window.scrollY * 0.002;
    scrollOffset.current = THREE.MathUtils.damp(scrollOffset.current, targetScroll, 4, delta);

    // Idle morphing rotation
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.2;

    // Very subtle parallax Y movement so it doesn't fly off screen
    mesh.current.position.y = -scrollOffset.current * 0.1;
    
    // Subtly react to pointer
    mesh.current.rotation.z = THREE.MathUtils.damp(
      mesh.current.rotation.z, 
      (state.pointer.x * Math.PI) / 10, 
      2, 
      delta
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <mesh ref={mesh} geometry={geometry}>
        <MeshTransmissionMaterial 
          backside
          samples={2}
          resolution={128}
          thickness={2.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          ior={1.5}
          color="#ffffff"
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};
