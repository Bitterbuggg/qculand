import React from 'react';
import { useGLTF } from '@react-three/drei';
import Bldg1 from "./Models/Bldg1";
import QcuBee from './Models/QcuBee';
import Cipher from './Models/Cipher';

export default function LandingModels({ onBuildingClick }) {
  const campus = useGLTF('./models/clickright_map.glb');

  return (
    <>
      <primitive object={campus.scene} scale={0.9} position={[0, 0, 0]} />
      <Bldg1 
        buildingId="center-quad" 
        position={[0, 0, -4.35]} 
        rotation={[0, 0, 0]} 
        isInteractable 
        onClick={() => onBuildingClick("center-quad")}
      />
      <Bldg1 
        buildingId="west-quad-1" 
        position={[-2, 0, -2.5]} 
        rotation={[0, Math.PI / 2, 0]} 
        isInteractable 
        onClick={() => onBuildingClick("west-quad-1")}
      />
      <Bldg1 
        buildingId="east-quad-1" 
        position={[2, 0, -2.5]} 
        rotation={[0, -Math.PI /2, 0]} 
        isInteractable 
        onClick={() => onBuildingClick("east-quad-1")}
      />
      {/* West quad 2 (Front-left) - Dorm Building (Interactable) */}
      <Bldg1 
        buildingId="dorm"
        position={[-2, 0, 0]} 
        rotation={[0, Math.PI /2, 0]} 
        isInteractable 
        onClick={() => onBuildingClick("dorm")}
      />
      <Bldg1 
        buildingId="east-quad-2" 
        position={[2, 0, 0]} 
        rotation={[0, -Math.PI /2, 0]} 
        isInteractable 
        onClick={() => onBuildingClick("east-quad-2")}
      />
      <QcuBee scale={0.025} position={[0, 0, 3.75]} />
      <Cipher scale={0.125} position={[-0.075, 0.05, 3.25]} rotation={[0.275, 0.25, 0.15]} />
    </>
  );
}
