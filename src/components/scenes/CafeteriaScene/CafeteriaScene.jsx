import React, { Suspense, lazy, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import LoadingFallback from '../../LoadingFallback';
import ErrorBoundary from '../../ErrorBoundary';
import CafeteriaPlayer from './CafeteriaPlayer';
import { useStore } from '../../../hooks/useStore';

const CafeteriaEnvironment = lazy(() => import('./CafeteriaEnvironment'));
import CafeteriaUI from './CafeteriaUI';

export default function CafeteriaScene({ onExit }) {
	const { setReturningFromBuilding } = useStore();
	const [showScenarios, setShowScenarios] = useState(false);

	const handleScenarioComplete = useCallback(() => {
		// Handle scenario completion
	}, []);

	const handleFeedback = useCallback((feedback) => {
		// Handle feedback display
	}, []);

	const handleExitCafeteria = useCallback(() => {
		setShowScenarios(false);
		setReturningFromBuilding(true);
		if (onExit) onExit();
	}, [onExit, setReturningFromBuilding]);
	
	return (
		<div className="w-full h-full fixed top-0 left-0">
			<ErrorBoundary>
				<Canvas shadows camera={{ position: [0, 4, 6], fov: 60 }}>
					<color attach="background" args={["#f5e6d3"]} />
					<ambientLight intensity={2.0} />
					<directionalLight position={[5, 10, 5]} intensity={1.8} castShadow />
					<pointLight position={[0, 3, 0]} intensity={1.5} color="#ffeecc" distance={12} />

					<Suspense fallback={<LoadingFallback />}>
						<CafeteriaEnvironment />
						
						{/* Player with movement */}
						<CafeteriaPlayer />
					</Suspense>
				</Canvas>
			</ErrorBoundary>

			{/* Scenario UI */}
			{showScenarios && (
				<CafeteriaUI 
					onScenarioComplete={handleScenarioComplete}
					onFeedback={handleFeedback}
					onExitCafeteria={handleExitCafeteria}
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
