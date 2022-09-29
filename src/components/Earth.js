import React from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'

import map_texture from '../assets/map_texture.jpg'

const Earth = ({radius}) => {
    const colorMap = useLoader(TextureLoader, map_texture)
  return (
    <group rotation={[Math.PI/2, 0, 0]}>
      <mesh scale={1}>
        <sphereGeometry args={[radius, 60, 60]} />
        <meshStandardMaterial map={colorMap}/>
      </mesh>
    </group>
  )
}

export default Earth