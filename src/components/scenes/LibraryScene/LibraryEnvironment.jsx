import React from 'react';

export default function LibraryEnvironment() {
	return (
		<group>
			{/* Floor - darker, ominous library floor */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
				<planeGeometry args={[5, 5]} />
				<meshStandardMaterial color="#5a5a5a" />
			</mesh>

			{/* Walls - dark, corrupted library walls */}
			{/* Back wall */}
			<mesh position={[0, 1.25, -2.5]}>
				<boxGeometry args={[5, 2.5, 0.08]} />
				<meshStandardMaterial color="#4a4a6e" transparent opacity={0.95} />
			</mesh>
			{/* Left wall */}
			<mesh position={[-2.5, 1.25, 0]}>
				<boxGeometry args={[0.08, 2.5, 5]} />
				<meshStandardMaterial color="#4a4a6e" transparent opacity={0.95} />
			</mesh>
			{/* Right wall */}
			<mesh position={[2.5, 1.25, 0]}>
				<boxGeometry args={[0.08, 2.5, 5]} />
				<meshStandardMaterial color="#4a4a6e" transparent opacity={0.95} />
			</mesh>

			{/* Bookshelves along back corners - darker, more ominous */}
			{/* Left back shelf */}
			<group position={[-1.8, 0, -1.5]}>
				<mesh position={[0, 0.8, 0]} castShadow>
					<boxGeometry args={[0.4, 1.6, 1.5]} />
					<meshStandardMaterial color="#6a4a3a" />
				</mesh>
				{/* Books on left shelf - darker colors */}
				{Array.from({ length: 8 }).map((_, i) => (
					<mesh key={`left-${i}`} position={[0.15, 0.4 + (i % 4) * 0.35, -0.6 + i * 0.18]} castShadow>
						<boxGeometry args={[0.12, 0.28, 0.12]} />
						<meshStandardMaterial color={['#9a3e3e', '#4a4a7e', '#3e6b5f', '#7e5a3e'][i % 4]} />
					</mesh>
				))}
			</group>

			{/* Right back shelf */}
			<group position={[1.8, 0, -1.5]}>
				<mesh position={[0, 0.8, 0]} castShadow>
					<boxGeometry args={[0.4, 1.6, 1.5]} />
					<meshStandardMaterial color="#6a4a3a" />
				</mesh>
				{/* Books on right shelf - darker colors */}
				{Array.from({ length: 8 }).map((_, i) => (
					<mesh key={`right-${i}`} position={[-0.15, 0.4 + (i % 4) * 0.35, -0.6 + i * 0.18]} castShadow>
						<boxGeometry args={[0.12, 0.28, 0.12]} />
						<meshStandardMaterial color={['#9a3e3e', '#4a4a7e', '#3e6b5f', '#7e5a3e'][i % 4]} />
					</mesh>
				))}
			</group>

			{/* Table in front of Cipher - darker, corrupted */}
			<group position={[0, 0, -1.0]}>
				{/* Table top */}
				<mesh position={[0, 0.4, 0]} castShadow receiveShadow>
					<boxGeometry args={[1.2, 0.06, 0.6]} />
					<meshStandardMaterial color="#8d5837" />
				</mesh>
				{/* Table legs */}
				<mesh position={[-0.5, 0.2, -0.25]} castShadow>
					<boxGeometry args={[0.06, 0.4, 0.06]} />
					<meshStandardMaterial color="#6a3a2d" />
				</mesh>
				<mesh position={[0.5, 0.2, -0.25]} castShadow>
					<boxGeometry args={[0.06, 0.4, 0.06]} />
					<meshStandardMaterial color="#6a3a2d" />
				</mesh>
				<mesh position={[-0.5, 0.2, 0.25]} castShadow>
					<boxGeometry args={[0.06, 0.4, 0.06]} />
					<meshStandardMaterial color="#6a3a2d" />
				</mesh>
				<mesh position={[0.5, 0.2, 0.25]} castShadow>
					<boxGeometry args={[0.06, 0.4, 0.06]} />
					<meshStandardMaterial color="#6a3a2d" />
				</mesh>
			</group>
		</group>
	);
}
