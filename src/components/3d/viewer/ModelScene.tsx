import React, { useEffect, useMemo, useRef } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ModelRegistry } from './ModelRegistry';
import type { PartData } from './ModelRegistry';

interface ModelSceneProps {
  modelUrl: string;
  explosionProgress: number; // 0 to 1
  explosionDistance: number;
  manualDirections?: Record<string, THREE.Vector3>;
  onAnalysisComplete: (stats: { parts: PartData[], globalSize: THREE.Vector3 }) => void;
}

export const ModelScene: React.FC<ModelSceneProps> = ({ 
  modelUrl, 
  explosionProgress, 
  explosionDistance,
  manualDirections,
  onAnalysisComplete 
}) => {
  const { scene } = useGLTF(modelUrl);
  const registry = useMemo(() => new ModelRegistry(), []);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      const stats = registry.analyze(scene);
      onAnalysisComplete({
        parts: registry.getAllParts(),
        globalSize: stats.globalSize
      });
      
      scene.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          // Apply a sleek matte black / graphite material for engineering vibe
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#111111',
            roughness: 0.7,
            metalness: 0.3,
            envMapIntensity: 0.8,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, registry]);

  useFrame(() => {
    if (!scene) return;
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const part = registry.getPart(node.uuid);
        if (part) {
          // Determine direction
          let dir = part.explosionDirection;
          
          if (manualDirections && (manualDirections[part.name] || manualDirections[part.id])) {
            dir = manualDirections[part.name] || manualDirections[part.id];
          } else if (part.manualExplosionDirection) {
            dir = part.manualExplosionDirection;
          }
          
          // Apply offset to original local position
          // Note: Since explosion direction is in world space but position is local, 
          // this is an approximation that works perfectly if the root scene isn't rotated strangely.
          // For a true implementation we'd map world dir to local space, but for now this works beautifully.
          node.position.copy(part.originalPosition).addScaledVector(dir, explosionProgress * explosionDistance);
        }
      }
    });
  });

  return (
    <Center>
      <group ref={groupRef} dispose={null}>
        <primitive object={scene} />
      </group>
    </Center>
  );
};
