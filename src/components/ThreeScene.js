import React from 'react'
//three.js
import { Canvas } from '@react-three/fiber';

const ThreeScene = ({ children }) => {
  return <Canvas gl={{ antialias: true}}>{children}</Canvas>;
}

export default ThreeScene