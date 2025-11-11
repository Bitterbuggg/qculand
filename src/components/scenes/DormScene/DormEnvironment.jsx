import { useGLTF } from '@react-three/drei';
import { useEffect, memo } from 'react';

function DormEnvironment() {
  const dorm = useGLTF('./models/qcu_dorm.glb');

  // Cleanup resources on unmount
  useEffect(() => {
    return () => {
      if (dorm.scene) {
        dorm.scene.traverse((child) => {
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
  }, [dorm.scene]);

  return <primitive object={dorm.scene} scale={1} position={[0, 0, 0]} />;
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
useGLTF.preload('./models/qcu_dorm.glb');

// Export memoized component to prevent unnecessary re-renders
export default memo(DormEnvironment);
