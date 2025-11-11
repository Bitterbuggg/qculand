import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

export default function DormCamera({ stage }) {
  const { camera } = useThree();

  // Memoize camera positions array to prevent recreation on each render
  const positions = useMemo(() => [
    new THREE.Vector3(0.45, 1.5, 2.25),   
    new THREE.Vector3(2, 1.5, 2.25), // Laptop setup
    new THREE.Vector3(-2, 1, 2.25),  // Router focus
    new THREE.Vector3(0, 1, 2.35),   // Desk close-up (USB)
    new THREE.Vector3(1, 1.2, 2.35), // Roommate scene
    new THREE.Vector3(-1, 1.8, 2.15),// Social media post
    new THREE.Vector3(0, 1.5, 2.25), // Phishing email
  ], []);

  // Memoize easing function
  const easeInOut = useMemo(() => (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  , []);

  useEffect(() => {
    const from = camera.position.clone();
    const to = positions[stage] || positions[0];
    const startTime = performance.now();
    const duration = 1000;

    const animate = (time) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeInOut(t);
      camera.position.lerpVectors(from, to, eased);

      camera.lookAt(0, 0.8, 0);

      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [camera, stage, positions, easeInOut]);

  return null;
}
