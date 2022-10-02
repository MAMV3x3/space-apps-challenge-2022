import React from 'react'
import * as THREE from 'three'
// threejs

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import model from '../assets/ISS_90.glb'

const ISS_Model = ({position, sun_coords}) => {
  const object = useLoader(GLTFLoader, model)
  const vector = new THREE.Vector3(sun_coords[0], sun_coords[1], sun_coords[2]);
  //console.log(vector)
  object.scene.lookAt(vector);
  return (
  <group scale={2} position={position}>
    <primitive object={object.scene} />
  </group>
  );
};

export default ISS_Model