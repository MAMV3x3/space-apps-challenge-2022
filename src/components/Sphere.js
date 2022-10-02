import React from 'react'

const Sphere = ({ color, position }) => {
  return (
    <mesh position={position}>
        <sphereGeometry args={[0.02, 50, 50]}/>
        <meshStandardMaterial color={color}/>
    </mesh>
  )
}

export default Sphere