import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * vec4(vPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float time;
  uniform vec3 color;
  
  void main() {
    // Calculate fresnel
    vec3 viewDirection = normalize(-vPosition);
    float fresnel = dot(viewDirection, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 3.0);
    
    // Calculate scanlines
    float scanline = sin(vPosition.y * 50.0 - time * 5.0) * 0.5 + 0.5;
    scanline = smoothstep(0.4, 0.6, scanline);
    
    vec3 finalColor = color * (fresnel + scanline * 0.2);
    
    gl_FragColor = vec4(finalColor, fresnel + 0.1);
  }
`;

export const Exp8_Holographic = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color: { value: new THREE.Color('#00f0ff') }
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.4, 32, 100]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Internal Wireframe for extra holo effect */}
      <mesh>
        <torusGeometry args={[1, 0.4, 16, 50]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.1} />
      </mesh>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </>
  );
};
