import React from 'react';
import { Canvas } from '@react-three/fiber';
import LandingScene from './components/scenes/LandingScene/LandingScene';
import './styles/index.css';

export default function App() {
  return (
    <div className="w-full h-screen relative bg-black">
        <LandingScene />
    </div>
  );
}
