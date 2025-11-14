import { motion } from 'framer-motion';

export default function CafeteriaPlayerUI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-40"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-3">
        <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">🍽️ Cafeteria Controls</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <div>🖱️ <span className="font-semibold">Click</span> to move around</div>
          <div>⌨️ <span className="font-semibold">WASD</span> to walk</div>
          <div>🖱️ <span className="font-semibold">Right-click drag</span> to rotate camera</div>
          <div>🖱️ <span className="font-semibold">Scroll</span> to zoom</div>
          <div className="pt-2 border-t border-gray-300">
            <span className="font-semibold">📶 Click Cipher to start scenarios</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
