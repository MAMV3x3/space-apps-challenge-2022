import React from 'react'
//three.js
import { Canvas } from '@react-three/fiber';

const ThreeScene = ({ cameraPos, children }) => {
  return <Canvas camera={{position: cameraPos}} gl={{ antialias: true}}>{children}</Canvas>;
}

export default ThreeScene