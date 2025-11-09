import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function LandingCamera({ buildings = [], enterCampus }) {
  const { camera } = useThree();
  const frameRef = useRef();
  const [animationStage, setAnimationStage] = useState(0); 

  const positions = [
    { x: 0, y: 10, z: 8 },     
    { x: 0, y: 1, z: 8 },      
    { x: 0, y: 0.15, z: 4.15 },
    { x: 0, y: 2.5, z: 0.5 },    
  ];

  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  useEffect(() => {
    let startTime = performance.now();
    let currentSegment = 0;

    const animate = (time) => {
      const elapsed = time - startTime;
      const duration = 3000;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeInOut(t);

      if (animationStage === 0) {
        let from, to;

        if (currentSegment === 0) {
          from = positions[0];
          to = positions[1];
        } else if (currentSegment === 1) {
          from = positions[1];
          to = positions[2];
        }

        camera.position.lerpVectors(
          new THREE.Vector3(from.x, from.y, from.z),
          new THREE.Vector3(to.x, to.y, to.z),
          eased
        );
        camera.lookAt(0, 2, 0);

        if (t >= 1 && currentSegment < 1) {
          currentSegment++;
          startTime = performance.now();
        } else if (t >= 1 && currentSegment === 1) {
          setAnimationStage(1); 
        }
      }

      if (animationStage === 1) {
        camera.position.set(positions[2].x, positions[2].y, positions[2].z);
        camera.lookAt(0, 1.5, 0);
      }

      if (animationStage === 3) {
        const campusDuration = 2500;
        const campusElapsed = time - startTime;
        const tt = Math.min(campusElapsed / campusDuration, 1);
        const easedCampus = easeInOut(tt);
        const target = positions[3];

        camera.position.set(target.x, target.y, target.z);
        camera.lookAt(0, 1, 0);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [animationStage]);

  useEffect(() => {
    if (enterCampus) {
      setAnimationStage(3);
    }
  }, [enterCampus]);

  return null;
}
