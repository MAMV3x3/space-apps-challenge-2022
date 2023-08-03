import React from 'react'
import * as THREE from 'three'

function TrackLine({points}) {
  const ISSOrbitGeom = new THREE.BufferGeometry().setFromPoints(points);
  const ISSOrbitMat = new THREE.LineDashedMaterial( {
	color: 0x0000ff,
	linewidth: 1,
	scale: 1,
	dashSize: 3,
	gapSize: 5,
} );
  const ISSOrbit = new THREE.Line(ISSOrbitGeom, ISSOrbitMat);
  return (
    <primitive object={ISSOrbit} />
  )
}

export default TrackLine