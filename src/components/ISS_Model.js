import React from 'react'
// threejs

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import model from '../assets/ISS.glb'

const ISS_Model = ({position}) => {
  const object = useLoader(GLTFLoader, model)
  return (
  <group scale={2} rotation={[-Math.PI/3, 0, 0]} position={position}>
    <primitive object={object.scene} />
  </group>
  );
};

export default ISS_Model