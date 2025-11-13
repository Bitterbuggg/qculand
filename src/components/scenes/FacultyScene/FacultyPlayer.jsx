import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function FacultyPlayer() {
  const playerRef = useRef();
  const { camera, gl } = useThree();
  
  // Movement state
  const keys = useRef({ w: false, a: false, s: false, d: false });
  const velocity = useRef(new THREE.Vector3());
  const targetPosition = useRef(null);
  
  // Camera controls
  const cameraAngle = useRef(Math.PI); // Start facing forward (180 degrees)
  const cameraPitch = useRef(0.4);
  const cameraDistance = useRef(3.5);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        keys.current[key] = true;
        targetPosition.current = null; // Cancel click-to-move
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        keys.current[key] = false;
      }
    };

    const handleClick = (e) => {
      if (e.button === 0) { // Left click only
        const rect = gl.domElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x, y }, camera);

        const planeZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(planeZ, intersectPoint);

        if (intersectPoint) {
          targetPosition.current = intersectPoint.clone();
        }
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      cameraDistance.current = THREE.MathUtils.clamp(
        cameraDistance.current + e.deltaY * 0.002,
        2.0,
        6.0
      );
    };

    const handleContextMenu = (e) => {
      if (e.button === 2) {
        e.preventDefault();
      }
    };

    let isDragging = false;
    let lastX = 0;

    const handleMouseDown = (e) => {
      if (e.button === 2) {
        isDragging = true;
        lastX = e.clientX;
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastX;
        cameraAngle.current -= deltaX * 0.005;
        lastX = e.clientX;
      }
    };

    const handleMouseUp = (e) => {
      if (e.button === 2) {
        isDragging = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gl.domElement.addEventListener('click', handleClick);
    gl.domElement.addEventListener('wheel', handleWheel, { passive: false });
    gl.domElement.addEventListener('contextmenu', handleContextMenu);
    gl.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      gl.domElement.removeEventListener('click', handleClick);
      gl.domElement.removeEventListener('wheel', handleWheel);
      gl.domElement.removeEventListener('contextmenu', handleContextMenu);
      gl.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera, gl]);

  useFrame(() => {
    if (!playerRef.current) return;

    const moveSpeed = 0.05;
    velocity.current.set(0, 0, 0);

    // WASD movement
    if (keys.current.w) velocity.current.z -= moveSpeed;
    if (keys.current.s) velocity.current.z += moveSpeed;
    if (keys.current.a) velocity.current.x -= moveSpeed;
    if (keys.current.d) velocity.current.x += moveSpeed;

    // Click-to-move
    if (targetPosition.current && velocity.current.length() === 0) {
      const direction = new THREE.Vector3()
        .subVectors(targetPosition.current, playerRef.current.position)
        .setY(0);
      
      const distance = direction.length();
      
      if (distance > 0.1) {
        direction.normalize().multiplyScalar(moveSpeed * 1.2);
        velocity.current.copy(direction);
      } else {
        targetPosition.current = null;
      }
    }

    // Apply movement with boundaries
    const newX = playerRef.current.position.x + velocity.current.x;
    const newZ = playerRef.current.position.z + velocity.current.z;
    
    const minX = -2.5, maxX = 2.5;
    const minZ = -2.5, maxZ = 2.5;
    
    playerRef.current.position.x = THREE.MathUtils.clamp(newX, minX, maxX);
    playerRef.current.position.z = THREE.MathUtils.clamp(newZ, minZ, maxZ);

    // Rotate player toward movement
    if (velocity.current.length() > 0) {
      const angle = Math.atan2(velocity.current.x, velocity.current.z);
      playerRef.current.rotation.y = angle;
    }

    // Camera follow
    const cameraX = playerRef.current.position.x + Math.sin(cameraAngle.current) * cameraDistance.current;
    const cameraY = playerRef.current.position.y + cameraDistance.current * cameraPitch.current;
    const cameraZ = playerRef.current.position.z + Math.cos(cameraAngle.current) * cameraDistance.current;

    camera.position.lerp(new THREE.Vector3(cameraX, cameraY, cameraZ), 0.1);
    camera.lookAt(
      playerRef.current.position.x,
      playerRef.current.position.y + 0.5,
      playerRef.current.position.z
    );
  });

  return (
    <group ref={playerRef} position={[0, 0, 2]}>
      {/* Player character - Arius (yellow capsule with face) */}
      <group position={[0, 0, 0]} scale={0.625}>
        {/* Body */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 1.7, 0]} castShadow>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#FFE44D" />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.12, 1.75, 0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.12, 1.75, 0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Smile */}
        <mesh position={[0, 1.6, 0.3]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Shadow blob */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.4, 16]} />
          <meshBasicMaterial color="#000000" opacity={0.3} transparent />
        </mesh>
      </group>
    </group>
  );
}
