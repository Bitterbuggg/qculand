import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function CameraRig({ entered, target }) {
  const cameraPos = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3());
  const currentPos = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3());
  const introStartTime = useRef(performance.now());
  const [introDone, setIntroDone] = useState(false);

  const introStartPos = new THREE.Vector3(0, 5, 6);
  const introEndPos = new THREE.Vector3(0, 0.5, 5);
  const introLookAt = new THREE.Vector3(0, 0, 0);

  useEffect(() => {
    if (!target) return;
    cameraPos.current.copy(target.position);
    lookAtTarget.current.copy(target.lookAt);
    currentPos.current.copy(introStartPos);
    currentLook.current.copy(introLookAt);
  }, [target]);

  useEffect(() => {
    if (!target) return;
    cameraPos.current.copy(target.position);
    lookAtTarget.current.copy(target.lookAt);
  }, [target]);

  useFrame(({ camera }) => {
    const elapsed = (performance.now() - introStartTime.current) / 1000;

    if (!entered && !introDone) {
      const t = Math.min(elapsed / 3, 1); 
      camera.position.lerpVectors(introStartPos, introEndPos, t);
      camera.lookAt(introLookAt);
      if (t >= 1) setIntroDone(true);
      return;
    }

    if (entered && target) {
      currentPos.current.lerp(cameraPos.current, 0.05);
      currentLook.current.lerp(lookAtTarget.current, 0.05);
      camera.position.copy(currentPos.current);
      camera.lookAt(currentLook.current);
    }
  });

  return null;
}
