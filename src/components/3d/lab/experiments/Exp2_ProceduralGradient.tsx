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
  
  // Palette generator based on cosine waves
  vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
    return a + b*cos( 6.28318*(c*t+d) );
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 3.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        float d = length(uv) * exp(-length(uv0));
        
        vec3 col = palette(length(uv0) + i*.4 + time*.4, 
                           vec3(0.5, 0.5, 0.5),
                           vec3(0.5, 0.5, 0.5),
                           vec3(1.0, 1.0, 1.0),
                           vec3(0.263, 0.416, 0.557) // Liquid Titanium Blue accents
                          );
        
        d = sin(d*8. + time)/8.;
        d = abs(d);
        d = pow(0.01 / d, 1.2);
        
        finalColor += col * d;
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const Exp2_ProceduralGradient = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    time: { value: 0 }
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta * 0.5;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <mesh>
        <planeGeometry args={[4, 4]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
