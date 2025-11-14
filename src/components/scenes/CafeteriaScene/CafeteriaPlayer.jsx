import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CafeteriaPlayer() {
  const playerRef = useRef();
  const { camera } = useThree();
  
  // Movement state - start near front center
  const [position, setPosition] = useState([0, 0, 2.5]);
  const velocity = useRef(new THREE.Vector3());
  const targetPosition = useRef(null);
  const moveSpeed = 0.03;
  const clickMoveSpeed = 0.04;
  
  // Keyboard state
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // Camera control
  const cameraAngle = useRef(Math.PI);
  const cameraPitch = useRef(0.4);
  const cameraDistance = useRef(3.5);
  
  // Mouse drag state
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  // Cafeteria room boundaries (8m x 8m room)
  const bounds = {
    minX: -3.5,
    maxX: 3.5,
    minZ: -3.5,
    maxZ: 3.5,
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) {
        keys.current[key] = true;
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) {
        keys.current[key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle mouse interactions
  useEffect(() => {
    const handleClick = (event) => {
      if (event.button !== 0) return;
      
      const dragDistance = Math.sqrt(
        Math.pow(event.clientX - dragStartPos.current.x, 2) +
        Math.pow(event.clientY - dragStartPos.current.y, 2)
      );
      
      if (dragDistance > 5) return;
      if (event.target.tagName !== 'CANVAS') return;

      const rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const mouse = new THREE.Vector2(x, y);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      
      const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const intersectPoint = new THREE.Vector3();
      const result = raycaster.ray.intersectPlane(groundPlane, intersectPoint);

      if (result && intersectPoint) {
        const clampedX = THREE.MathUtils.clamp(intersectPoint.x, bounds.minX, bounds.maxX);
        const clampedZ = THREE.MathUtils.clamp(intersectPoint.z, bounds.minZ, bounds.maxZ);
        targetPosition.current = new THREE.Vector3(clampedX, 0, clampedZ);
      }
    };

    const handleMouseDown = (event) => {
      dragStartPos.current = { x: event.clientX, y: event.clientY };
      
      if (event.button === 2 || event.button === 1) {
        event.preventDefault();
        isDragging.current = false;
        lastMouseX.current = event.clientX;
        lastMouseY.current = event.clientY;
      }
    };

    const handleMouseMove = (event) => {
      if (event.buttons === 2 || event.buttons === 4) {
        isDragging.current = true;
        const deltaX = event.clientX - lastMouseX.current;
        const deltaY = event.clientY - lastMouseY.current;
        
        cameraAngle.current -= deltaX * 0.005;
        cameraPitch.current = THREE.MathUtils.clamp(
          cameraPitch.current + deltaY * 0.003,
          0.1,
          1.2
        );
        
        lastMouseX.current = event.clientX;
        lastMouseY.current = event.clientY;
      }
    };

    const handleMouseUp = (event) => {
      if (event.button === 2 || event.button === 1) {
        setTimeout(() => {
          isDragging.current = false;
        }, 10);
      }
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const zoomSpeed = 0.001;
      const delta = event.deltaY * zoomSpeed;
      cameraDistance.current = THREE.MathUtils.clamp(
        cameraDistance.current + delta,
        2.0,
        6.0
      );
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('click', handleClick);
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('contextmenu', handleContextMenu);
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('contextmenu', handleContextMenu);
        canvas.removeEventListener('wheel', handleWheel);
      };
    }
  }, [camera, bounds]);

  // Update player and camera every frame
  useFrame(() => {
    if (!playerRef.current) return;

    const player = playerRef.current;
    const currentPos = new THREE.Vector3(
      player.position.x,
      player.position.y,
      player.position.z
    );

    velocity.current.set(0, 0, 0);

    // WASD movement
    const hasKeyboardInput = keys.current.w || keys.current.s || keys.current.a || keys.current.d;
    
    if (keys.current.w) velocity.current.z -= moveSpeed;
    if (keys.current.s) velocity.current.z += moveSpeed;
    if (keys.current.a) velocity.current.x -= moveSpeed;
    if (keys.current.d) velocity.current.x += moveSpeed;

    if (hasKeyboardInput) {
      targetPosition.current = null;
      velocity.current.normalize().multiplyScalar(moveSpeed);
    }
    // Click-to-move
    else if (targetPosition.current) {
      const direction = new THREE.Vector3()
        .subVectors(targetPosition.current, currentPos);
      
      const distance = currentPos.distanceTo(targetPosition.current);
      
      if (distance > 0.1) {
        velocity.current.copy(direction).normalize().multiplyScalar(clickMoveSpeed);
      } else {
        targetPosition.current = null;
        velocity.current.set(0, 0, 0);
      }
    }

    // Apply velocity with boundaries
    const newX = THREE.MathUtils.clamp(
      player.position.x + velocity.current.x,
      bounds.minX,
      bounds.maxX
    );
    const newZ = THREE.MathUtils.clamp(
      player.position.z + velocity.current.z,
      bounds.minZ,
      bounds.maxZ
    );

    player.position.x = newX;
    player.position.z = newZ;

    // Rotate player to face movement direction
    if (velocity.current.length() > 0.01) {
      const angle = Math.atan2(velocity.current.x, velocity.current.z);
      player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, angle, 0.1);
    }

    // Camera follow with orbital control
    const radius = cameraDistance.current;
    const offsetX = Math.sin(cameraAngle.current) * radius * Math.cos(cameraPitch.current);
    const offsetY = 1.5 + Math.sin(cameraPitch.current) * radius;
    const offsetZ = Math.cos(cameraAngle.current) * radius * Math.cos(cameraPitch.current);
    
    const idealCameraPosition = new THREE.Vector3(
      player.position.x + offsetX,
      player.position.y + offsetY,
      player.position.z + offsetZ
    );

    camera.position.lerp(idealCameraPosition, 0.2);
    camera.lookAt(player.position.x, player.position.y + 0.5, player.position.z);
  });

  return (
    <group ref={playerRef} position={position}>
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
