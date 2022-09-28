import React from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'

import map_texture from '../assets/map_texture.jpg'

const Earth = ({position}) => {
    const colorMap = useLoader(TextureLoader, map_texture)
  return (
    <mesh position={position} scale={1}>
        <sphereGeometry args={[5, 60, 60]} />
        <meshStandardMaterial map={colorMap}/>
    </mesh>
  )
}

export default Earth