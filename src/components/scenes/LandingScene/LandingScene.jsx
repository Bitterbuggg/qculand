import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import LandingCamera from "./LandingCamera";
import LandingModels from "./LandingModels";
import LandingUI from "./LandingUI";
import Player from "./Player";
import PlayerUI from "./PlayerUI";

export default function LandingScene({ onEnterCampus, onEnterDorm }) { 
  const [campusEntered, setCampusEntered] = useState(false);
  const [showDormModal, setShowDormModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const buildingPositions = [
    { position: [1, 0, -4] },
    { position: [-1, 0, -2] },
    { position: [0, 0, -4.05] },
  ];

  const handleDormClick = () => {
    setShowDormModal(true);
  };

  const handleEnterDorm = () => {
    setShowDormModal(false);
    onEnterDorm?.();
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

        <LandingModels onDormClick={handleDormClick} />
        
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

      {/* Dorm Entry Modal */}
      <AnimatePresence>
        {showDormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-auto"
            onClick={() => setShowDormModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🏠</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Dormitory</h2>
              <p className="text-gray-600 mb-6">
                Welcome to the student dormitory. Learn essential cybersecurity habits to protect your personal devices and data.
              </p>
              <div className="space-y-3">
                <motion.button
                  onClick={handleEnterDorm}
                  className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition shadow-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  Enter Dorm
                </motion.button>
                <motion.button
                  onClick={() => setShowDormModal(false)}
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
