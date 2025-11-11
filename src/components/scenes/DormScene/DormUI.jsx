import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useMemo, memo } from 'react';
import { dormScenarios } from './scenarios';

// Memoize choice button component to prevent unnecessary re-renders
const ChoiceButton = memo(({ choice, onChoice, index }) => (
  <motion.button
    onClick={() => onChoice(choice)}
    className="w-full py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
    whileTap={{ scale: 0.95 }}
  >
    {choice.text}
  </motion.button>
));

ChoiceButton.displayName = 'ChoiceButton';

function DormUI({ onScenarioComplete, onFeedback, onExitDorm }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Memoize current scenario to prevent unnecessary recalculations
  const scenario = useMemo(() => dormScenarios[index], [index]);

  const handleChoice = useCallback((choice) => {
    setFeedback(choice.feedback);
    if (onFeedback) onFeedback(choice.feedback);
  }, [onFeedback]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    if (index < dormScenarios.length - 1) {
      setIndex(prev => prev + 1);
      if (onScenarioComplete) onScenarioComplete();
    } else {
      // All scenarios completed - show congratulations
      setIsCompleted(true);
      if (onScenarioComplete) onScenarioComplete();
    }
  }, [index, onScenarioComplete]);

  // Memoize animation variants to prevent recreation
  const containerVariants = useMemo(() => ({
    initial: { y: 50, opacity: 0, scale: 0.9 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: 50, opacity: 0, scale: 0.9 },
  }), []);

  const transitionConfig = useMemo(() => ({
    type: 'spring',
    stiffness: 180,
    damping: 15,
  }), []);

  const feedbackVariants = useMemo(() => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  }), []);

  const feedbackTransition = useMemo(() => ({
    type: 'spring',
    stiffness: 200,
    damping: 15,
  }), []);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center p-6 pointer-events-none">
      
      {/* Congratulations Screen */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            key="completion-screen"
            className="absolute inset-0 flex justify-center items-center bg-black/30 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg text-center"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-7xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Congratulations!</h2>
              <p className="text-gray-700 text-lg mb-4">
                You've completed all cybersecurity scenarios in the dormitory!
              </p>
              <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                <p className="text-blue-800 font-semibold mb-2">🔒 Skills Mastered:</p>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>✓ Device Security Setup</li>
                  <li>✓ Network Configuration</li>
                  <li>✓ USB Device Safety</li>
                  <li>✓ Physical Security</li>
                  <li>✓ Privacy Protection</li>
                  <li>✓ Phishing Detection</li>
                </ul>
              </div>
              <p className="text-gray-600 mb-6">
                You're now ready to explore more areas of the campus and continue your cybersecurity journey!
              </p>
              <motion.button
                onClick={() => onExitDorm?.()}
                className="w-full px-8 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition shadow-lg"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                Return to Campus
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Regular Scenario UI */}
      <AnimatePresence>
        {!feedback && !isCompleted && (
          <motion.div
            key={scenario.id}
            className="bg-white rounded-3xl p-5 max-w-md text-center shadow-lg pointer-events-auto relative"
            initial={containerVariants.initial}
            animate={containerVariants.animate}
            exit={containerVariants.exit}
            transition={transitionConfig}
          >
            <div className="absolute -top-3 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {index + 1} / {dormScenarios.length}
            </div>
            <h2 className="text-xl text-[#1e1e1e] font-semibold mb-2">{scenario.title}</h2>
            <p className="text-gray-700 mb-4">{scenario.text}</p>

            <div className="space-y-2">
              {scenario.choices.map((choice, i) => (
                <ChoiceButton
                  key={i}
                  choice={choice}
                  onChoice={handleChoice}
                  index={i}
                />
              ))}
            </div>

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {feedback && !isCompleted && (
          <motion.div
            key="feedback-modal"
            className="absolute inset-0 flex justify-center items-center bg-black/20 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 max-w-sm text-center"
              initial={feedbackVariants.initial}
              animate={feedbackVariants.animate}
              exit={feedbackVariants.exit}
              transition={feedbackTransition}
            >
              <p className="text-gray-800 text-lg mb-4">{feedback}</p>
              <motion.button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                whileTap={{ scale: 0.95 }}
              >
                {index < dormScenarios.length - 1 ? 'Continue' : 'Finish'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(DormUI);
