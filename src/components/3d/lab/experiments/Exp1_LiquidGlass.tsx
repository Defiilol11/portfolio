import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, OrbitControls, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export const Exp1_LiquidGlass = () => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />

      {/* Hidden Text behind the glass */}
      <Text position={[0, 0, -2]} fontSize={1} color="#8fa5b2">
        REFRACTION
      </Text>

      {/* The Glass Object */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshTransmissionMaterial 
          backside
          samples={3}
          thickness={1.5}
          chromaticAberration={0.08}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1}
          ior={1.4}
          color="#ffffff"
        />
      </mesh>

      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};
