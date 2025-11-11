import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScene from "./LandingScene/LandingScene";
import DormScene from "./DormScene/DormScene";

function LoadingScene() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-[#a8d0ff] text-white text-3xl font-bold z-50"
    >
      <motion.img src="./HandLoading.gif"/>
    </motion.div>
  );
}

function IntroScene({ onStart }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      key="intro"
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#a8d0ff] text-[#1e1e1e] z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-4xl sm:text-5xl font-bold mb-6 text-center"
      >
        Are you ready for adventure?
      </motion.h1>

      {showButton && (
        <motion.button
          onClick={onStart}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 shadow-lg"
        >
          Yes
        </motion.button>
      )}
    </motion.div>
  );
}

export default function SceneManager() {
  const [currentScene, setCurrentScene] = useState("intro"); 
  const [isLoading, setIsLoading] = useState(false);
  const bgAudioRef = useRef(null);

  const startGame = async () => {
    if (!bgAudioRef.current) {
      const audio = new Audio("./audio/gamebg.ogg");
      audio.loop = true;
      audio.volume = 0.6;
      bgAudioRef.current = audio;

      try {
        await audio.play();
        console.log("Background music playing!");
      } catch (err) {
        console.warn("Audio play blocked, waiting for next interaction...");
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setCurrentScene("landing");
      setIsLoading(false);
    }, 1000);
  };

  const handleSceneChange = (nextScene) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentScene(nextScene);
      setIsLoading(false);
    }, 1500);
  };

  const variants = {
    enter: { y: 0, opacity: 1 },
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      y: "-100vh",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScene key="loading" />}

        {currentScene === "intro" && !isLoading && (
          <IntroScene key="intro" onStart={startGame} />
        )}

        {currentScene === "landing" && !isLoading && (
          <motion.div
            key="landing"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full"
          >
            <LandingScene 
              onEnterCampus={() => handleSceneChange("dorm")}
              onEnterDorm={() => handleSceneChange("dorm")}
            />
          </motion.div>
        )}

        {currentScene === "dorm" && !isLoading && (
          <motion.div
            key="dorm"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full"
          >
            <DormScene onExitDorm={() => handleSceneChange("landing")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
