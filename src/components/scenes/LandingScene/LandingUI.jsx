import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoteBook from "../../NoteBook";
import { useStore } from "../../../hooks/useStore";

export default function LandingUI({ onEnterCampus }) {
  const [showTitle, setShowTitle] = useState(false);
  const [campusEntered, setCampusEntered] = useState(false);

  const { player } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 4500); 
    return () => clearTimeout(timer);
  }, []);

  const handleEnterCampus = () => {
    setCampusEntered(true);
    setShowTitle(false);
    if (onEnterCampus) onEnterCampus();
  };

  return (
    <>
      <AnimatePresence>
        {showTitle && !campusEntered && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 mt-96 pointer-events-auto"
          >
            <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
              QCU Land
            </h1>
            <button
              onClick={handleEnterCampus}
              className="px-6 py-3 bg-white text-[#1e1e1e] font-bold rounded-xs border-2 border-[#1e1e1e] shadow-xl hover:bg-[#fafafa] transition"
            >
              Enter Campus
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {campusEntered && <NoteBook />}
    </>
  );
}
