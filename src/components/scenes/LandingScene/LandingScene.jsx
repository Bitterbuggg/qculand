import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import LandingCamera from "./LandingCamera";
import LandingModels from "./LandingModels";
import LandingUI from "./LandingUI";

export default function LandingScene() {
  const [campusEntered, setCampusEntered] = useState(false);

  const buildingPositions = [
    { position: [1, 0, -4] },
    { position: [-1, 0, -2] },
    { position: [0, 0, -4.05] },
  ];

  return (
    <div className="w-full h-full fixed top-0 left-0">
      <Canvas shadows camera={{ position: [0, 3, 8], fov: 55 }}>
        <color attach="background" args={["#a8d0ff"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <LandingCamera
          buildings={campusEntered ? buildingPositions : []}
          onAnimationEnd={() => console.log("Camera finished building traversal")}
        />
        <LandingModels />
        <OrbitControls
            enableZoom={!campusEntered} 
        />
      </Canvas>

      <LandingUI onEnterCampus={() => setCampusEntered(true)} />
    </div>
  );
}
