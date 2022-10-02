import React from 'react'
import * as THREE from 'three'

function Orbit_Points({points}) {
  const ISSOrbitGeom = new THREE.BufferGeometry().setFromPoints(points);
  const ISSOrbitMat = new THREE.LineBasicMaterial( {
	color: 0xe00000,
	linewidth: 1,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
  } );
  const ISSOrbit = new THREE.Line(ISSOrbitGeom, ISSOrbitMat);
  return (
    <primitive object={ISSOrbit} />
  )
}

export default Orbit_Points