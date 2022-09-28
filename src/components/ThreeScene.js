import React from 'react'
//three.js
import { Canvas } from '@react-three/fiber';

const ThreeScene = ({ children }) => {
  return <Canvas camera={{ position: [0, 0, 10]}} gl={{ antialias: true}}>{children}</Canvas>;
}

export default ThreeScene