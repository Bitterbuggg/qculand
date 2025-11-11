import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Player({ onNearBuilding }) {
  const playerRef = useRef();
  const { camera, raycaster } = useThree();
  
  // Movement state
  const [position, setPosition] = useState([0, 0.5, 5]);
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

  // Camera offset
  const cameraOffset = useRef(new THREE.Vector3(0, 2.5, 4));
  const cameraLookAt = useRef(new THREE.Vector3());
  
  // Track last nearby building to avoid spam
  const lastNearbyBuilding = useRef(null);

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

  // Handle mouse click for movement
  useEffect(() => {
    const handleClick = (event) => {
      // Ignore clicks on UI elements
      if (event.target.tagName !== 'CANVAS') return;

      // Convert mouse position to normalized device coordinates
      const rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast to find ground position
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      
      // Find ground plane (y = 0)
      const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(groundPlane, intersectPoint);

      if (intersectPoint) {
        targetPosition.current = intersectPoint.clone();
        targetPosition.current.y = 0.5; // Keep player slightly above ground
      }
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('click', handleClick);
      return () => canvas.removeEventListener('click', handleClick);
    }
  }, [camera, raycaster]);

  // Update player position and camera every frame
  useFrame(() => {
    if (!playerRef.current) return;

    const player = playerRef.current;
    const currentPos = new THREE.Vector3(
      player.position.x,
      player.position.y,
      player.position.z
    );

    // Reset velocity
    velocity.current.set(0, 0, 0);

    // Handle WASD movement
    const hasKeyboardInput = keys.current.w || keys.current.s || keys.current.a || keys.current.d;
    
    if (keys.current.w) velocity.current.z -= moveSpeed;
    if (keys.current.s) velocity.current.z += moveSpeed;
    if (keys.current.a) velocity.current.x -= moveSpeed;
    if (keys.current.d) velocity.current.x += moveSpeed;

    // If WASD is being used, cancel click-to-move
    if (hasKeyboardInput) {
      targetPosition.current = null;
      velocity.current.normalize().multiplyScalar(moveSpeed);
    }
    // Handle click-to-move (only if no keyboard input)
    else if (targetPosition.current) {
      const direction = new THREE.Vector3()
        .subVectors(targetPosition.current, currentPos);
      
      const distance = currentPos.distanceTo(targetPosition.current);
      
      // Stop when close enough to target
      if (distance > 0.1) {
        velocity.current.copy(direction).normalize().multiplyScalar(clickMoveSpeed);
      } else {
        // Reached destination, stop moving
        targetPosition.current = null;
        velocity.current.set(0, 0, 0);
      }
    }

    // Apply velocity with boundaries
    const newX = THREE.MathUtils.clamp(
      player.position.x + velocity.current.x,
      -8,
      8
    );
    const newZ = THREE.MathUtils.clamp(
      player.position.z + velocity.current.z,
      -6,
      6
    );

    player.position.x = newX;
    player.position.z = newZ;

    // Rotate player to face movement direction
    if (velocity.current.length() > 0.01) {
      const angle = Math.atan2(velocity.current.x, velocity.current.z);
      player.rotation.y = angle;
    }

    // Smooth camera follow
    const idealCameraPosition = new THREE.Vector3(
      player.position.x + cameraOffset.current.x,
      player.position.y + cameraOffset.current.y,
      player.position.z + cameraOffset.current.z
    );

    camera.position.lerp(idealCameraPosition, 0.1);

    // Camera look at player
    cameraLookAt.current.set(
      player.position.x,
      player.position.y + 0.2, // Adjusted for smaller player
      player.position.z
    );
    camera.lookAt(cameraLookAt.current);

    // Check for nearby buildings for interaction
    checkBuildingProximity(player.position);
  });

  // Check if player is near any interactable building
  const checkBuildingProximity = (playerPos) => {
    const buildingPositions = [
      { name: 'Dormitory', pos: new THREE.Vector3(-2, 0, 0), id: 'dorm', icon: '🏠' },
      // Add more buildings here as they become interactable
    ];

    let nearestBuilding = null;
    let minDistance = 2.5; // Interaction radius

    buildingPositions.forEach(building => {
      const distance = playerPos.distanceTo(building.pos);
      if (distance < minDistance) {
        minDistance = distance;
        nearestBuilding = building;
      }
    });

    // Only notify if the nearby building changed
    if (nearestBuilding?.id !== lastNearbyBuilding.current?.id) {
      lastNearbyBuilding.current = nearestBuilding;
      onNearBuilding?.(nearestBuilding);
    }
  };

  return (
    <group ref={playerRef} position={position}>
      {/* Simple placeholder character - yellow capsule with face */}
      {/* Scaled down to match QcuBee height (scale 0.025) */}
      <group position={[0, 0, 0]} scale={0.25}>
        {/* Body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#FFE44D" />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.12, 1.35, 0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.12, 1.35, 0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Smile */}
        <mesh position={[0, 1.2, 0.3]} rotation={[0, 0, 0]}>
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
