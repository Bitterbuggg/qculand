import { Canvas } from "@react-three/fiber";
import LandingExperience from "../components/LandingExperience";
import UIOverlay from "../components/UIOverlay";
import { useState } from "react";

export default function LandingScene() {
  const [entered, setEntered] = useState(false);
  const [targetIndex, setTargetIndex] = useState(0); // <-- moved here

  return (
    <div className="w-full h-screen bg-[#a8d0e6] relative">
      <Canvas camera={{ position: [0, 10, 8], fov: 45 }} gl={{ toneMappingExposure: 1.5 }}>
        <color attach="background" args={["#a8d0e6"]} />
        <LandingExperience entered={entered} targetIndex={targetIndex} />
      </Canvas>

      <UIOverlay
        entered={entered}
        onEnter={() => setEntered(true)}
        focusIndex={targetIndex}
        onChangeFocus={setTargetIndex} 
      />
    </div>
  );
}
