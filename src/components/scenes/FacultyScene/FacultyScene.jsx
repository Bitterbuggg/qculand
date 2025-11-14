import React, { Suspense, lazy, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import LoadingFallback from '../../LoadingFallback';
import ErrorBoundary from '../../ErrorBoundary';
import FacultyPlayer from './FacultyPlayer';
import FacultyPlayerUI from './FacultyPlayerUI';
import { useStore } from '../../../hooks/useStore';

const FacultyEnvironment = lazy(() => import('./FacultyEnvironment'));
import FacultyUI from './FacultyUI';

export default function FacultyScene({ onExit }) {
	const { setReturningFromBuilding } = useStore();
	const [showScenarios, setShowScenarios] = useState(false);
	
	const handleScenarioComplete = useCallback(() => {
		// Handle scenario completion
	}, []);

	const handleFeedback = useCallback((feedback) => {
		// Handle feedback display
	}, []);

	const handleExitFaculty = useCallback(() => {
		setShowScenarios(false);
		setReturningFromBuilding(true);
		if (onExit) onExit();
	}, [onExit, setReturningFromBuilding]);
	
	return (
		<div className="w-full h-full fixed top-0 left-0">
			<ErrorBoundary>
				<Canvas shadows camera={{ position: [0, 3, 5], fov: 60 }}>
					<color attach="background" args={["#b8a890"]} />
					<ambientLight intensity={1.8} />
					<directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
					<pointLight position={[0, 2.5, -1.5]} intensity={2.5} color="#ffdd88" distance={10} />

					<Suspense fallback={<LoadingFallback />}>
						<FacultyEnvironment />
						
						{/* Player with movement */}
						<FacultyPlayer />
					</Suspense>
				</Canvas>
			</ErrorBoundary>

			{/* Scenario UI */}
			{showScenarios && (
				<FacultyUI 
					onScenarioComplete={handleScenarioComplete}
					onFeedback={handleFeedback}
					onExitFaculty={handleExitFaculty}
				/>
			)}

			{/* Back button */}
			{!showScenarios && (
				<div className="absolute top-6 left-6 z-50">
					<button 
						onClick={() => {
							setReturningFromBuilding(true);
							onExit?.();
						}} 
						className="px-4 py-2 bg-white/90 rounded shadow hover:bg-white transition-colors"
					>
						← Back
					</button>
				</div>
			)}
		</div>
	);
}
