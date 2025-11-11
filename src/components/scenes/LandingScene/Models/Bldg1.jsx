import React, { useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Bldg1({ onClick, isInteractable, ...props }) {
  const { scene } = useGLTF("./models/Bldg1.glb");
  const [hovered, setHovered] = useState(false);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Add hover effect for interactable buildings
  useMemo(() => {
    if (isInteractable) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.userData.originalEmissive = child.material.emissive?.clone() || new THREE.Color(0x000000);
        }
      });
    }
  }, [clonedScene, isInteractable]);

  // Handle hover effect
  const handlePointerOver = (e) => {
    if (!isInteractable) return;
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material.emissive) {
        child.material.emissive.setHex(0x4488ff);
      }
    });
  };

  const handlePointerOut = (e) => {
    if (!isInteractable) return;
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
    
    clonedScene.traverse((child) => {
      if (child.isMesh && child.userData.originalEmissive) {
        child.material.emissive.copy(child.userData.originalEmissive);
      }
    });
  };

  const handleClick = (e) => {
    if (!isInteractable) return;
    e.stopPropagation();
    onClick?.();
  };

  return (
    <primitive
      object={clonedScene}
      scale={0.575}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      {...props} 
    />
  );
}

useGLTF.preload("./models/Bldg1.glb");
