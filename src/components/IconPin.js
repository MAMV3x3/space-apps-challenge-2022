import React from 'react'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import model from '../assets/Icon_Pin.glb'

const IconPin = ({position}) => {
  const object = useLoader(GLTFLoader, model)
  object.scene.lookAt(0, 0, 0);
  return (
  //hover event onPointerEnter={() => console.log("you hovered me")} 
  <group rotation={[Math.PI/2, 0, 0]} scale={0.1} position={position}>
    <primitive object={object.scene} />
  </group>
  );
};

export default IconPin