import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useMemo, memo } from 'react';
import { facultyScenarios } from './scenarios';

// Memoize choice button component
const ChoiceButton = memo(({ choice, onChoice }) => (
  <motion.button
    onClick={() => onChoice(choice)}
    className="w-full py-3 px-4 rounded-lg bg-linear-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 text-amber-50 transition text-left border border-amber-700/50 shadow-lg"
    whileTap={{ scale: 0.98 }}
  >
    {choice.text}
  </motion.button>
));

ChoiceButton.displayName = 'ChoiceButton';

export default function FacultyUI({ onScenarioComplete, onFeedback, onExitFaculty }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const scenario = useMemo(() => facultyScenarios[index], [index]);

  const handleChoice = useCallback((choice) => {
    setFeedback(choice.feedback);
    if (onFeedback) onFeedback(choice.feedback);
  }, [onFeedback]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    if (index < facultyScenarios.length - 1) {
      setIndex(prev => prev + 1);
      if (onScenarioComplete) onScenarioComplete();
    } else {
      setIsCompleted(true);
      if (onScenarioComplete) onScenarioComplete();
    }
  }, [index, onScenarioComplete]);

  const handleExit = useCallback(() => {
    if (onExitFaculty) onExitFaculty();
  }, [onExitFaculty]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center p-6 pointer-events-none">
      
      {/* Completion Screen */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            key="completion-screen"
            className="absolute inset-0 flex justify-center items-center bg-black/60 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-linear-to-br from-amber-950 to-yellow-900 rounded-3xl shadow-2xl p-8 max-w-lg text-center border-2 border-amber-700"
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
                🎓
              </motion.div>
              <h2 className="text-3xl font-bold text-amber-50 mb-3">Investigation Complete!</h2>
              <p className="text-amber-100 text-lg mb-4">
                You've mastered sensitive data protection and administrative security!
              </p>
              <div className="bg-amber-950/50 rounded-2xl p-4 mb-6 border border-amber-800/50">
                <p className="text-amber-200 font-semibold mb-2">💼 Skills Learned:</p>
                <ul className="text-left text-sm text-amber-100 space-y-1">
                  <li>✓ Email domain verification</li>
                  <li>✓ Physical security awareness</li>
                  <li>✓ Shared folder permissions</li>
                  <li>✓ Privacy and data protection</li>
                  <li>✓ Social engineering defense</li>
                  <li>✓ Document authenticity verification</li>
                </ul>
              </div>
              <motion.button
                onClick={handleExit}
                className="w-full py-3 px-6 bg-linear-to-r from-amber-700 to-amber-800 text-amber-50 rounded-full font-semibold shadow-lg hover:shadow-xl transition border border-amber-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Exploring
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenario Display */}
      <AnimatePresence mode="wait">
        {!feedback && !isCompleted && (
          <motion.div
            key={`scenario-${index}`}
            className="bg-linear-to-br from-amber-950 to-yellow-900 backdrop-blur-md rounded-3xl shadow-2xl p-6 max-w-2xl w-full pointer-events-auto border-2 border-amber-700/50"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 180, damping: 15 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="text-4xl">🕵️</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-amber-50">{scenario.title}</h3>
                <p className="text-sm text-amber-200">Scenario {index + 1} of {facultyScenarios.length}</p>
              </div>
            </div>
            
            <p className="text-amber-100 mb-6 leading-relaxed">{scenario.text}</p>
            
            <div className="space-y-3">
              {scenario.choices.map((choice, i) => (
                <ChoiceButton key={i} choice={choice} onChoice={handleChoice} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {feedback && !isCompleted && (
          <motion.div
            key="feedback"
            className="bg-linear-to-br from-amber-950 to-yellow-900 backdrop-blur-md rounded-3xl shadow-2xl p-6 max-w-2xl w-full pointer-events-auto border-2 border-amber-700/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="text-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="text-6xl mb-3"
              >
                {feedback.includes('Great') || feedback.includes('Smart') || feedback.includes('Excellent') || feedback.includes('Perfect') ? '✅' : '⚠️'}
              </motion.div>
              <p className="text-amber-50 text-lg leading-relaxed">{feedback}</p>
            </div>
            
            <motion.button
              onClick={handleNext}
              className="w-full py-3 px-6 bg-linear-to-r from-amber-700 to-amber-800 text-amber-50 rounded-full font-semibold shadow-lg hover:shadow-xl transition border border-amber-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {index < facultyScenarios.length - 1 ? 'Next Scenario' : 'Complete'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
