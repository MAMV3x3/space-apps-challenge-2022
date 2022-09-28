import React from 'react'
import * as THREE from 'three'
import vertexShader from '../shaders/vertexShader'
import fragmentShader from '../shaders/fragmentShader'

const Atmosphere = () => {
  return (
        <mesh scale={1}>
            <sphereGeometry args={[5, 50, 50]} />
            <shaderMaterial 
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide}
            />
        </mesh>
  )
}

export default Atmosphere