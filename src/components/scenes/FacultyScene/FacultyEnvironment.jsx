import React from 'react';

export default function FacultyEnvironment() {
	return (
		<group>
			{/* Floor - professional office floor */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
				<planeGeometry args={[6, 6]} />
				<meshStandardMaterial color="#8a7a6a" />
			</mesh>

			{/* Walls - warm office walls */}
			{/* Back wall */}
			<mesh position={[0, 1.5, -3]}>
				<boxGeometry args={[6, 3, 0.08]} />
				<meshStandardMaterial color="#c4b5a0" transparent opacity={0.95} />
			</mesh>
			{/* Left wall */}
			<mesh position={[-3, 1.5, 0]}>
				<boxGeometry args={[0.08, 3, 6]} />
				<meshStandardMaterial color="#c4b5a0" transparent opacity={0.95} />
			</mesh>
			{/* Right wall */}
			<mesh position={[3, 1.5, 0]}>
				<boxGeometry args={[0.08, 3, 6]} />
				<meshStandardMaterial color="#c4b5a0" transparent opacity={0.95} />
			</mesh>

			{/* Faculty Desk - large professional desk */}
			<group position={[0, 0, -1.5]}>
				{/* Desk top */}
				<mesh position={[0, 0.45, 0]} castShadow receiveShadow>
					<boxGeometry args={[1.8, 0.08, 0.9]} />
					<meshStandardMaterial color="#5d4037" />
				</mesh>
				{/* Desk front panel */}
				<mesh position={[0, 0.25, 0.4]} castShadow>
					<boxGeometry args={[1.8, 0.4, 0.08]} />
					<meshStandardMaterial color="#4e342e" />
				</mesh>
				{/* Desk legs */}
				<mesh position={[-0.8, 0.22, -0.35]} castShadow>
					<boxGeometry args={[0.08, 0.44, 0.08]} />
					<meshStandardMaterial color="#4e342e" />
				</mesh>
				<mesh position={[0.8, 0.22, -0.35]} castShadow>
					<boxGeometry args={[0.08, 0.44, 0.08]} />
					<meshStandardMaterial color="#4e342e" />
				</mesh>
			</group>

			{/* File Cabinets - left side */}
			<group position={[-2, 0, -2]}>
				<mesh position={[0, 0.5, 0]} castShadow>
					<boxGeometry args={[0.5, 1, 0.6]} />
					<meshStandardMaterial color="#666666" />
				</mesh>
				{/* Drawer handles */}
				<mesh position={[0.26, 0.7, 0]} castShadow>
					<boxGeometry args={[0.02, 0.08, 0.08]} />
					<meshStandardMaterial color="#333333" />
				</mesh>
				<mesh position={[0.26, 0.4, 0]} castShadow>
					<boxGeometry args={[0.02, 0.08, 0.08]} />
					<meshStandardMaterial color="#333333" />
				</mesh>
			</group>

			{/* Bookshelf - right side */}
			<group position={[2.2, 0, -1.5]}>
				{/* Shelf frame */}
				<mesh position={[0, 1, 0]} castShadow>
					<boxGeometry args={[0.4, 2, 1.2]} />
					<meshStandardMaterial color="#795548" />
				</mesh>
				{/* Books on shelves */}
				{Array.from({ length: 6 }).map((_, i) => (
					<mesh key={`book-${i}`} position={[0.15, 0.5 + Math.floor(i / 3) * 0.5, -0.4 + (i % 3) * 0.35]} castShadow>
						<boxGeometry args={[0.08, 0.25, 0.18]} />
						<meshStandardMaterial color={['#8b4513', '#654321', '#4a4a4a'][i % 3]} />
					</mesh>
				))}
			</group>

			{/* Computer monitor on desk */}
			<group position={[0, 0.53, -1.5]}>
				{/* Monitor screen */}
				<mesh position={[0, 0.25, -0.15]} castShadow>
					<boxGeometry args={[0.5, 0.35, 0.03]} />
					<meshStandardMaterial color="#1a1a1a" emissive="#0a4d6e" emissiveIntensity={0.3} />
				</mesh>
				{/* Monitor stand */}
				<mesh position={[0, 0.08, -0.1]} castShadow>
					<boxGeometry args={[0.06, 0.15, 0.06]} />
					<meshStandardMaterial color="#2a2a2a" />
				</mesh>
				{/* Monitor base */}
				<mesh position={[0, 0.01, -0.1]} castShadow>
					<boxGeometry args={[0.2, 0.02, 0.15]} />
					<meshStandardMaterial color="#2a2a2a" />
				</mesh>
			</group>

			{/* Bulletin board on back wall */}
			<mesh position={[-1.2, 1.5, -2.95]} castShadow>
				<boxGeometry args={[0.8, 0.6, 0.02]} />
				<meshStandardMaterial color="#cd853f" />
			</mesh>

			{/* Visitor chairs */}
			<group position={[-0.8, 0, 0.5]}>
				{/* Chair seat */}
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#4a4a4a" />
				</mesh>
				{/* Chair back */}
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#4a4a4a" />
				</mesh>
				{/* Chair legs */}
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#2a2a2a" />
					</mesh>
				))}
			</group>

			{/* Second visitor chair */}
			<group position={[0.8, 0, 0.5]}>
				{/* Chair seat */}
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#4a4a4a" />
				</mesh>
				{/* Chair back */}
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#4a4a4a" />
				</mesh>
				{/* Chair legs */}
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#2a2a2a" />
					</mesh>
				))}
			</group>

			{/* Potted plant for ambiance */}
			<group position={[2.5, 0, 1.5]}>
				{/* Pot */}
				<mesh position={[0, 0.15, 0]} castShadow>
					<cylinderGeometry args={[0.12, 0.15, 0.3, 8]} />
					<meshStandardMaterial color="#8b4513" />
				</mesh>
				{/* Plant leaves */}
				<mesh position={[0, 0.35, 0]} castShadow>
					<sphereGeometry args={[0.15, 8, 8]} />
					<meshStandardMaterial color="#2d5016" />
				</mesh>
			</group>
		</group>
	);
}
