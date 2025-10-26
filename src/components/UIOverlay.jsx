import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useAudio } from "../hooks/useAudio";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function UIOverlay({ entered, onEnter, focusIndex, onChangeFocus }) {
  const { playClick, playBgm } = useAudio();
  const bgmStarted = useRef(false);
  const bgmInstance = useRef(null);

  useEffect(() => {
    const startBgm = async () => {
      if (bgmStarted.current || bgmInstance.current) return;
      try {
        bgmInstance.current = await playBgm();
        bgmStarted.current = true;
      } catch {
        console.warn("Autoplay blocked. Will start after user interaction.");
      }
    };
    startBgm();
  }, [playBgm]);

  const handleEnter = async () => {
    playClick();

    if (!bgmStarted.current) {
      try {
        bgmInstance.current = await playBgm();
        bgmStarted.current = true;
      } catch (e) {
        console.warn("User interaction still blocked BGM:", e);
      }
    }

    onEnter();
  };

  const handleFocusChange = (dir) => {
    playClick();
    const newIndex = Math.min(4, Math.max(0, focusIndex + dir));
    onChangeFocus(newIndex);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
      {!entered && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-auto flex flex-col items-center translate-y-20"
        >
          <motion.h1 className="text-5xl font-bold drop-shadow-lg mb-8">
            QCULAND
          </motion.h1>
          <button
            onClick={handleEnter}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-800 rounded-lg shadow-md"
          >
            Enter Campus
          </button>
        </motion.div>
      )}

      {entered && (
        <div className="pointer-events-auto absolute bottom-10 flex gap-10">
          <button
            onClick={() => handleFocusChange(-1)}
            className="text-white text-3xl hover:text-blue-300"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => handleFocusChange(1)}
            className="text-white text-3xl hover:text-blue-300"
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
