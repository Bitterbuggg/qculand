import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function PlayerUI({ nearbyBuilding, onInteractWithBuilding }) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
      {/* Movement controls hint */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm text-center backdrop-blur-sm"
      >
        <div className="font-semibold mb-1">Controls</div>
        <div className="flex gap-4 justify-center text-xs">
          <span>🖱️ Click to move</span>
          <span>⌨️ WASD to walk</span>
        </div>
      </motion.div>

      {/* Building interaction prompt */}
      <AnimatePresence>
        {nearbyBuilding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 60 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="bg-white rounded-2xl shadow-xl p-4 text-center pointer-events-auto"
          >
            <div className="text-3xl mb-2">{nearbyBuilding.icon}</div>
            <div className="font-bold text-gray-800 mb-1">{nearbyBuilding.name}</div>
            <motion.button
              onClick={onInteractWithBuilding}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition text-sm font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Enter Building
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
