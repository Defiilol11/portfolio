import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;
  uniform vec2 pointer;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Distance to pointer
    float dist = distance(vUv, pointer);
    float hover = smoothstep(0.3, 0.0, dist);
    
    vec2 p = vUv;
    
    // Calculate RGB shift based on hover and noise
    float rShift = hover * 0.05 * sin(time * 10.0 + p.y * 20.0);
    float gShift = hover * 0.03 * sin(time * 15.0 - p.x * 20.0);
    float bShift = hover * 0.04 * cos(time * 12.0 + p.y * 10.0);
    
    // Procedural texture (since we don't have an actual image loaded)
    vec2 grid = fract(p * 10.0);
    float line = step(0.9, grid.x) + step(0.9, grid.y);
    float basePattern = mix(0.1, 0.3, line);
    
    // Sample "image" with shifted UVs
    float r = fract(noise(p + vec2(rShift, 0.0)) + basePattern);
    float g = fract(noise(p + vec2(0.0, gShift)) + basePattern);
    float b = fract(noise(p + vec2(0.0, bShift)) + basePattern);
    
    vec3 col = mix(vec3(r, g, b) * 0.2, vec3(0.56, 0.647, 0.698), hover * 0.5);
    
    // CRT scanline effect
    col -= sin(p.y * 100.0 + time * 5.0) * 0.05;
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const Exp5_ImageDisplacement = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    pointer: { value: new THREE.Vector2(0.5, 0.5) }
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
      
      const targetX = (state.pointer.x * 0.5) + 0.5;
      const targetY = (state.pointer.y * 0.5) + 0.5;
      
      materialRef.current.uniforms.pointer.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.pointer.value.x, targetX, 0.1
      );
      materialRef.current.uniforms.pointer.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.pointer.value.y, targetY, 0.1
      );
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <mesh>
        <planeGeometry args={[4, 3, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
};
