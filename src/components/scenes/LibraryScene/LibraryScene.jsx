import React, { Suspense, lazy, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import LoadingFallback from '../../LoadingFallback';
import ErrorBoundary from '../../ErrorBoundary';
import LibraryPlayer from './LibraryPlayer';
import LibraryPlayerUI from './LibraryPlayerUI';
import { useStore } from '../../../hooks/useStore';

const LibraryEnvironment = lazy(() => import('./LibraryEnvironment'));
import CipherModel from '../LandingScene/Models/Cipher';
import LibraryUI from './LibraryUI';

export default function LibraryScene({ onExit }) {
	const { setReturningFromBuilding } = useStore();
	const [showScenarios, setShowScenarios] = useState(false);
	const [showCipherName, setShowCipherName] = useState(false);
	
	const handleCipherClick = useCallback(() => {
		setShowScenarios(true);
	}, []);

	const handleScenarioComplete = useCallback(() => {
		// Handle scenario completion
	}, []);

	const handleFeedback = useCallback((feedback) => {
		// Handle feedback display
	}, []);

	const handleExitLibrary = useCallback(() => {
		setShowScenarios(false);
		setReturningFromBuilding(true);
		if (onExit) onExit();
	}, [onExit, setReturningFromBuilding]);
	
	return (
		<div className="w-full h-full fixed top-0 left-0">
			<ErrorBoundary>
				<Canvas shadows camera={{ position: [0, 2, 4], fov: 60 }}>
					<color attach="background" args={["#2a2a4e"]} />
					<ambientLight intensity={1.5} />
					<directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
					<pointLight position={[0, 2, -1.6]} intensity={2.0} color="#ff8888" distance={8} />

					<Suspense fallback={<LoadingFallback />}>
						<LibraryEnvironment />
						
						{/* Cipher behind the table */}
						<group 
							position={[0, 0, -5]} 
							rotation={[0, 0, 0]}
							onPointerOver={(e) => { 
								e.stopPropagation(); 
								document.body.style.cursor = 'pointer';
								setShowCipherName(true);
							}}
							onPointerOut={(e) => { 
								e.stopPropagation(); 
								document.body.style.cursor = 'default';
								setShowCipherName(false);
							}}
							onClick={(e) => { e.stopPropagation(); handleCipherClick(); }}
						>
							<CipherModel scale={0.7} />
							
							{/* Cipher name hover indicator - positioned above Cipher's head */}
							{showCipherName && !showScenarios && (
								<Html position={[0, 2.5, 0]} center distanceFactor={10}>
									<div className="pointer-events-none">
										<div className="bg-red-900/90 text-red-100 px-6 py-3 rounded-lg shadow-2xl border-2 border-red-700 backdrop-blur-sm whitespace-nowrap">
											<div className="text-2xl font-bold text-center mb-1">🕵️ CIPHER</div>
											<div className="text-xs text-red-300 text-center">Click to interact</div>
										</div>
									</div>
								</Html>
							)}
						</group>
						
						{/* Player with movement */}
						<LibraryPlayer />
					</Suspense>
				</Canvas>
			</ErrorBoundary>

			{/* Player movement controls UI */}
			{!showScenarios && <LibraryPlayerUI />}
			
			{/* Scenario UI */}
			{showScenarios && (
				<LibraryUI 
					onScenarioComplete={handleScenarioComplete}
					onFeedback={handleFeedback}
					onExitLibrary={handleExitLibrary}
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
