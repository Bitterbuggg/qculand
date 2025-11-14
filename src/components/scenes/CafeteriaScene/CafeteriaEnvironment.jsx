import React from 'react';

export default function CafeteriaEnvironment() {
	return (
		<group>
			{/* Floor - cafeteria tile floor */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
				<planeGeometry args={[8, 8]} />
				<meshStandardMaterial color="#d4d4d4" />
			</mesh>

			{/* Walls - light cafeteria walls */}
			{/* Back wall */}
			<mesh position={[0, 2, -4]}>
				<boxGeometry args={[8, 4, 0.08]} />
				<meshStandardMaterial color="#e8e8e8" transparent opacity={0.95} />
			</mesh>
			{/* Left wall */}
			<mesh position={[-4, 2, 0]}>
				<boxGeometry args={[0.08, 4, 8]} />
				<meshStandardMaterial color="#e8e8e8" transparent opacity={0.95} />
			</mesh>
			{/* Right wall */}
			<mesh position={[4, 2, 0]}>
				<boxGeometry args={[0.08, 4, 8]} />
				<meshStandardMaterial color="#e8e8e8" transparent opacity={0.95} />
			</mesh>

			{/* Cafeteria counter - left side */}
			<group position={[-2.5, 0, -2.5]}>
				{/* Counter base */}
				<mesh position={[0, 0.5, 0]} castShadow>
					<boxGeometry args={[2, 1, 1.2]} />
					<meshStandardMaterial color="#8b7355" />
				</mesh>
				{/* Counter top */}
				<mesh position={[0, 1.02, 0]} castShadow>
					<boxGeometry args={[2.1, 0.08, 1.3]} />
					<meshStandardMaterial color="#a0826d" />
				</mesh>
			</group>

			{/* Food display case */}
			<group position={[-2.5, 1.1, -2.5]}>
				<mesh castShadow>
					<boxGeometry args={[1.8, 0.6, 1]} />
					<meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
				</mesh>
			</group>

			{/* Tables - multiple dining tables */}
			{/* Table 1 - center left */}
			<group position={[-1.5, 0, 0.5]}>
				<mesh position={[0, 0.4, 0]} castShadow receiveShadow>
					<boxGeometry args={[1.2, 0.05, 0.8]} />
					<meshStandardMaterial color="#7d5a3d" />
				</mesh>
				{/* Table legs */}
				{[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.2, z]} castShadow>
						<boxGeometry args={[0.06, 0.4, 0.06]} />
						<meshStandardMaterial color="#5a4029" />
					</mesh>
				))}
			</group>

			{/* Table 2 - center right */}
			<group position={[1.5, 0, 0.5]}>
				<mesh position={[0, 0.4, 0]} castShadow receiveShadow>
					<boxGeometry args={[1.2, 0.05, 0.8]} />
					<meshStandardMaterial color="#7d5a3d" />
				</mesh>
				{/* Table legs */}
				{[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.2, z]} castShadow>
						<boxGeometry args={[0.06, 0.4, 0.06]} />
						<meshStandardMaterial color="#5a4029" />
					</mesh>
				))}
			</group>

			{/* Table 3 - back center */}
			<group position={[0, 0, -1.5]}>
				<mesh position={[0, 0.4, 0]} castShadow receiveShadow>
					<boxGeometry args={[1.2, 0.05, 0.8]} />
					<meshStandardMaterial color="#7d5a3d" />
				</mesh>
				{/* Table legs */}
				{[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.2, z]} castShadow>
						<boxGeometry args={[0.06, 0.4, 0.06]} />
						<meshStandardMaterial color="#5a4029" />
					</mesh>
				))}
			</group>

			{/* Chairs around tables */}
			{/* Chairs for table 1 (left table at [-1.5, 0, 0.5]) */}
			{/* Left side chair facing right toward table */}
			<group position={[-2.1, 0, 0.5]} rotation={[0, Math.PI / 2, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Right side chair facing left toward table */}
			<group position={[-0.9, 0, 0.5]} rotation={[0, -Math.PI / 2, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
					</mesh>
				))}
			</group>

			{/* Front side chair facing back toward table */}
			<group position={[-1.5, 0, 1.05]} rotation={[0, Math.PI, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Back side chair facing forward toward table */}
			<group position={[-1.5, 0, -0.05]} rotation={[0, 0, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Chairs for table 2 (right table at [1.5, 0, 0.5]) */}
			{/* Left side chair facing right toward table */}
			<group position={[0.9, 0, 0.5]} rotation={[0, Math.PI / 2, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Right side chair facing left toward table */}
			<group position={[2.1, 0, 0.5]} rotation={[0, -Math.PI / 2, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Front side chair facing back toward table */}
			<group position={[1.5, 0, 1.05]} rotation={[0, Math.PI, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Back side chair facing forward toward table */}
			<group position={[1.5, 0, -0.05]} rotation={[0, 0, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Chairs for table 3 (back center) - 4 chairs facing the table */}
			{/* Left side chair */}
			<group position={[-0.7, 0, -1.5]} rotation={[0, Math.PI / 2, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Right side chair */}
			<group position={[0.7, 0, -1.5]} rotation={[0, -Math.PI / 2, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Front chair (facing counter) */}
			<group position={[0, 0, -1.0]} rotation={[0, Math.PI, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Back chair (facing entrance) */}
			<group position={[0, 0, -2.0]} rotation={[0, 0, 0]}>
				<mesh position={[0, 0.25, 0]} castShadow>
					<boxGeometry args={[0.4, 0.05, 0.4]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				<mesh position={[0, 0.45, -0.15]} castShadow>
					<boxGeometry args={[0.4, 0.4, 0.05]} />
					<meshStandardMaterial color="#c41e3a" />
				</mesh>
				{[[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]].map(([x, z], i) => (
					<mesh key={i} position={[x, 0.12, z]} castShadow>
						<boxGeometry args={[0.03, 0.24, 0.03]} />
						<meshStandardMaterial color="#8b1a2c" />
					</mesh>
				))}
			</group>

			{/* Vending machine - right wall */}
			<group position={[3.5, 0, 1]}>
				<mesh position={[0, 1, 0]} castShadow>
					<boxGeometry args={[0.6, 2, 0.8]} />
					<meshStandardMaterial color="#e74c3c" />
				</mesh>
				{/* Vending machine screen */}
				<mesh position={[-0.31, 1.3, 0]} castShadow>
					<boxGeometry args={[0.02, 0.5, 0.4]} />
					<meshStandardMaterial color="#1a1a1a" emissive="#0a4d6e" emissiveIntensity={0.5} />
				</mesh>
			</group>

			{/* Trash bins */}
			<group position={[3, 0, -2]}>
				<mesh position={[0, 0.3, 0]} castShadow>
					<cylinderGeometry args={[0.2, 0.25, 0.6, 8]} />
					<meshStandardMaterial color="#2c3e50" />
				</mesh>
			</group>

			{/* Menu board on back wall */}
			<mesh position={[0, 2.5, -3.95]} castShadow>
				<boxGeometry args={[2, 1, 0.05]} />
				<meshStandardMaterial color="#34495e" />
			</mesh>

			{/* Hanging lights */}
			{[
				[-1.5, 3.2, 0],
				[1.5, 3.2, 0],
				[0, 3.2, -1.5],
			].map((pos, idx) => (
				<group key={`light-${idx}`} position={pos}>
					<mesh castShadow>
						<cylinderGeometry args={[0.2, 0.25, 0.3, 8]} />
						<meshStandardMaterial color="#f39c12" emissive="#ff9900" emissiveIntensity={0.3} />
					</mesh>
					<pointLight position={[0, -0.2, 0]} intensity={0.5} distance={3} color="#ffcc88" />
				</group>
			))}

			{/* Potted plants for ambiance */}
			<group position={[-3.5, 0, 2]}>
				<mesh position={[0, 0.2, 0]} castShadow>
					<cylinderGeometry args={[0.15, 0.18, 0.4, 8]} />
					<meshStandardMaterial color="#8b4513" />
				</mesh>
				<mesh position={[0, 0.5, 0]} castShadow>
					<sphereGeometry args={[0.2, 8, 8]} />
					<meshStandardMaterial color="#2d5016" />
				</mesh>
			</group>
		</group>
	);
}
