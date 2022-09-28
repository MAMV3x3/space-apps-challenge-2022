import React from 'react'

const Sphere = ({ color, position }) => {
  return (
    <mesh position={position}>
        <sphereBufferGeometry />
        <meshStandardMaterial color={color} wireframe/>
    </mesh>
  )
}

export default Sphere