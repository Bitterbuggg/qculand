import React from 'react';
import { useGLTF } from '@react-three/drei';
import Bldg1 from "./Models/Bldg1";
import QcuBee from './Models/QcuBee';

export default function LandingModels() {
  const campus = useGLTF('./models/university_map.glb');

  return (
    <>
      <primitive object={campus.scene} scale={0.9} position={[0, 0, 0]} />
      <Bldg1 position={[0, 0, -4.35]} rotation={[0, 0, 0]} />
      <Bldg1 position={[-2, 0, -2.5]} rotation={[0, Math.PI / 2, 0]} />
      <Bldg1 position={[2, 0, -2.5]} rotation={[0, -Math.PI /2, 0]} />
      <Bldg1 position={[-2, 0, 0]} rotation={[0, Math.PI /2, 0]} />
      <Bldg1 position={[2, 0, 0]} rotation={[0, -Math.PI /2, 0]} />
      <QcuBee scale={0.025} position={[0, 0, 3.75]} />
    </>
  );
}
