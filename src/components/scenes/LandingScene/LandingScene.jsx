import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import LandingCamera from "./LandingCamera";
import LandingModels from "./LandingModels";
import LandingUI from "./LandingUI";
import Player from "./Player";
import PlayerUI from "./PlayerUI";

export default function LandingScene({ onEnterCampus, onEnterDorm, onEnterLibrary }) { 
  const [campusEntered, setCampusEntered] = useState(false);
  const [showBuildingModal, setShowBuildingModal] = useState(null); // null or buildingId
  const [showPlayer, setShowPlayer] = useState(false);

  const buildingPositions = [
    { position: [1, 0, -4] },
    { position: [-1, 0, -2] },
    { position: [0, 0, -4.05] },
  ];

  // Building configurations
  const buildingConfigs = {
    "center-quad": {
      name: "Server Room",
      icon: "🔒",
      description: "The main server room. Currently locked for maintenance.",
      canEnter: false
    },
    "west-quad-1": {
      name: "Library",
      icon: "📚",
      description: "The campus library. A quiet place to study and research.",
      canEnter: true
    },
    "east-quad-1": {
      name: "Cafeteria",
      icon: "🍽️",
      description: "The student cafeteria. Grab a meal and socialize with friends.",
      canEnter: false
    },
    "dorm": {
      name: "Dormitory",
      icon: "🏠",
      description: "Welcome to the student dormitory. Learn essential cybersecurity habits to protect your personal devices and data.",
      canEnter: true
    },
    "east-quad-2": {
      name: "Faculty Office",
      icon: "👨‍🏫",
      description: "Faculty offices and administrative services.",
      canEnter: false
    }
  };

  const handleBuildingClick = (buildingId) => {
    setShowBuildingModal(buildingId);
  };

  const handleEnterBuilding = (buildingId) => {
    setShowBuildingModal(null);
    if (buildingId === "dorm") {
      onEnterDorm?.();
    } else if (buildingId === "west-quad-1") {
      onEnterLibrary?.();
    }
    // Other buildings will be handled later
  };

  const handleEnterCampus = () => {
    setCampusEntered(true);
    setShowPlayer(true); // Show player after entering campus
    // Don't call onEnterCampus - we want to stay on landing scene with player control
  };

  return (
    <div className="w-full h-full fixed top-0 left-0">
      <Canvas shadows camera={{ position: [0, 3, 8], fov: 55 }}>
        <color attach="background" args={["#a8d0ff"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        {!showPlayer && (
          <LandingCamera
            buildings={campusEntered ? buildingPositions : []}
            onAnimationEnd={() => console.log("Camera finished building traversal")}
          />
        )}

        <LandingModels onBuildingClick={handleBuildingClick} />
        
        {/* Show player after entering campus */}
        {showPlayer && <Player />}
        
        {/* Disable orbit controls when player is active */}
        <OrbitControls 
          enableZoom={false} 
          enableRotate={false} 
          enablePan={false}
          enabled={!showPlayer}
        />
      </Canvas>

      {!showPlayer && (
        <LandingUI onEnterCampus={handleEnterCampus} />
      )}

      {showPlayer && (
        <PlayerUI />
      )}

      {/* Building Entry Modal */}
      <AnimatePresence>
        {showBuildingModal && buildingConfigs[showBuildingModal] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-auto"
            onClick={() => setShowBuildingModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">{buildingConfigs[showBuildingModal].icon}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                {buildingConfigs[showBuildingModal].name}
              </h2>
              <p className="text-gray-600 mb-6">
                {buildingConfigs[showBuildingModal].description}
              </p>
              <div className="space-y-3">
                {buildingConfigs[showBuildingModal].canEnter ? (
                  <motion.button
                    onClick={() => handleEnterBuilding(showBuildingModal)}
                    className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition shadow-lg"
                    whileTap={{ scale: 0.95 }}
                  >
                    Enter {buildingConfigs[showBuildingModal].name}
                  </motion.button>
                ) : (
                  <div className="w-full px-6 py-3 bg-gray-300 text-gray-500 font-bold rounded-full cursor-not-allowed">
                    Coming Soon
                  </div>
                )}
                <motion.button
                  onClick={() => setShowBuildingModal(null)}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition"
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
