import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Campus from "./Campus";
import CameraRig from "./CameraRig";
import Pixelation from "./Pixelation";
import { Sky, Clouds, Cloud } from "@react-three/drei";

export default function LandingExperience({ entered, targetIndex }) {
  const focusPoints = [
    // Dorm
    { 
      position: new THREE.Vector3(1.2, 0, -2.5), 
      lookAt: new THREE.Vector3(-5.5, 1.5, -2.5) 
    }, 

    // Library 
    { 
      position: new THREE.Vector3(-1.2, 0, 0.5), 
      lookAt: new THREE.Vector3(5.5, 1.5, 0.5) 
    },  

    // Admin 
    { 
      position: new THREE.Vector3(1.2, 0, 0.5), 
      lookAt: new THREE.Vector3(-5.5, 1.5, 0.5) 
    }, 

    // Cafeteria 
    { 
      position: new THREE.Vector3(0, 0.25, -1.8), 
      lookAt: new THREE.Vector3(0, 0.75, -5) 
    },  

    // CompLabs
    { 
      position: new THREE.Vector3(-1.2, 0, -2.75), 
      lookAt: new THREE.Vector3(5.5, 1.5, -2.75) 
    }, 
  ];

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={8} />
      <CameraRig entered={entered} target={focusPoints[targetIndex]} />
      <Campus />

      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0.49} azimuth={0.25} />
      <Clouds material={THREE.MeshLambertMaterial}>
        <Cloud seed={1} scale={[2, 2, 2]} position={[0, 10, -15]} color="#ffffff" speed={0.4} opacity={0.07} />
        <Cloud seed={2} scale={[1, 2, 4]} position={[-10, 9, -10]} color="#f7f7f7" speed={0.8} opacity={0.6} />
      </Clouds>

      {!entered && <OrbitControls enableZoom={false} />}
      <Pixelation />
    </>
  );
}
