import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DormCamera from './DormCamera';
import DormUI from './DormUI';
import LoadingFallback from '../../LoadingFallback';
import ErrorBoundary from '../../ErrorBoundary';
import { useState, Suspense, lazy, useCallback } from 'react';
import { useStore } from '../../../hooks/useStore';

// Lazy load heavy 3D components
const DormEnvironment = lazy(() => import('./DormEnvironment'));
const DormStudent = lazy(() => import('./DormStudent'));

export default function DormScene({ onExitDorm }) {
  const { setReturningFromBuilding } = useStore();
  const [stage, setStage] = useState(0);
  const [studentAction, setStudentAction] = useState('typing');
  const [retryCount, setRetryCount] = useState(0);

  // Memoize handlers to prevent unnecessary re-renders
  const handleScenarioComplete = useCallback(() => {
    setStage(prev => prev + 1);
  }, []);

  const handleFeedback = useCallback((feedback) => {
    const feedbackLower = feedback.toLowerCase();
    const isPositive = feedbackLower.includes('good') || 
                       feedbackLower.includes('excellent') || 
                       feedbackLower.includes('smart') || 
                       feedbackLower.includes('great');
    
    setStudentAction(isPositive ? 'success' : 'fail');
    setTimeout(() => setStudentAction('typing'), 2000);
  }, []);

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    window.location.reload(); // Simple retry by reloading
  }, []);

  return (
    <div className="w-full h-full fixed top-0 left-0">
      <ErrorBoundary onRetry={handleRetry}>
        <Canvas shadows camera={{ position: [0, 1.35, 1.95], fov: 55 }}>
          <color attach="background" args={["#bcd5ff"]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          
          <Suspense fallback={<LoadingFallback />}>
            <DormEnvironment />
            <DormStudent action={studentAction} />
          </Suspense>
          
          <DormCamera stage={stage} />
          <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        </Canvas>
      </ErrorBoundary>

      <DormUI 
        onScenarioComplete={handleScenarioComplete} 
        onFeedback={handleFeedback}
        onExitDorm={onExitDorm}
      />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-50">
        <button 
          onClick={() => {
            setReturningFromBuilding(true);
            onExitDorm?.();
          }} 
          className="px-4 py-2 bg-white/90 rounded shadow hover:bg-white transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
