import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  uniform vec2 mousePos;
  uniform float time;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Distance from vertex to mouse
    float dist = distance(uv, mousePos);
    
    // Create a wave effect around the mouse
    float wave = sin(dist * 20.0 - time * 5.0) * 0.1;
    float attenuation = smoothstep(0.3, 0.0, dist);
    
    float elevation = wave * attenuation;
    pos.z += elevation;
    
    vElevation = elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    vec3 baseColor = vec3(0.05, 0.05, 0.05); // Dark gray
    vec3 highlightColor = vec3(0.56, 0.647, 0.698); // Accent #8fa5b2
    
    // Grid pattern
    vec2 grid = fract(vUv * 20.0);
    float line = step(0.95, grid.x) + step(0.95, grid.y);
    
    vec3 color = mix(baseColor, highlightColor, line * 0.2);
    
    // Add glowing elevation
    color += highlightColor * (vElevation * 10.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const Exp3_CursorDistortion = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    mousePos: { value: new THREE.Vector2(0.5, 0.5) }
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
      
      // Map pointer from [-1, 1] to [0, 1] for UV coordinates
      const targetX = (state.pointer.x * 0.5) + 0.5;
      const targetY = (state.pointer.y * 0.5) + 0.5;
      
      // Smoothly interpolate mouse position
      materialRef.current.uniforms.mousePos.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.mousePos.value.x, targetX, 0.1
      );
      materialRef.current.uniforms.mousePos.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.mousePos.value.y, targetY, 0.1
      );
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <mesh rotation={[-Math.PI * 0.2, 0, 0]}>
        <planeGeometry args={[4, 4, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
