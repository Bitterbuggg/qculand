import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Bldg1(props) {
  const { scene } = useGLTF("./models/Bldg1.glb");

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      object={clonedScene}
      scale={0.575}
      {...props} 
    />
  );
}

useGLTF.preload("./models/Bldg1.glb");
