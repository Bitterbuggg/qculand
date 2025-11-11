import React, { useEffect, useRef, memo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function DormStudent({ action = 'typing' }) {
  const group = useRef();
  const { scene, animations } = useGLTF('./models/qcu_student_1.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;

    Object.values(actions).forEach((a) => a.stop());

    const animMap = {
      typing: 'typing',
      success: 'success',
      fail: 'fail',
    };

    const selected = animMap[action] || animMap.typing;
    const currentAction = actions[selected];

    if (currentAction) {
      currentAction.reset().fadeIn(0.2).play();
    }

    return () => {
      if (currentAction) currentAction.fadeOut(0.2);
    };
  }, [action, actions]);

  // Cleanup resources on unmount
  useEffect(() => {
    return () => {
      // Stop all animations
      if (actions) {
        Object.values(actions).forEach((action) => {
          if (action) action.stop();
        });
      }

      // Dispose geometries, materials, and textures
      if (scene) {
        scene.traverse((child) => {
          if (child.geometry) {
            child.geometry.dispose();
          }
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => {
                disposeMaterial(material);
              });
            } else {
              disposeMaterial(child.material);
            }
          }
        });
      }
    };
  }, [scene, actions]);

  return (
    <group ref={group} position={[0, -0.5, 0.65]} rotation={[0, 0, 0]} scale={0.025}>
      <primitive object={scene} />
    </group>
  );
}

// Helper function to dispose materials and textures
function disposeMaterial(material) {
  if (!material) return;
  
  // Dispose textures
  if (material.map) material.map.dispose();
  if (material.lightMap) material.lightMap.dispose();
  if (material.bumpMap) material.bumpMap.dispose();
  if (material.normalMap) material.normalMap.dispose();
  if (material.specularMap) material.specularMap.dispose();
  if (material.envMap) material.envMap.dispose();
  if (material.aoMap) material.aoMap.dispose();
  if (material.roughnessMap) material.roughnessMap.dispose();
  if (material.metalnessMap) material.metalnessMap.dispose();
  if (material.emissiveMap) material.emissiveMap.dispose();
  
  material.dispose();
}

// Preload model
useGLTF.preload('./models/qcu_student_1.glb');

// Export memoized component to prevent unnecessary re-renders
export default memo(DormStudent);
