import React from 'react'
import * as THREE from 'three'

const SatelliteLocationPoints = ({points}) => {
    /*var dotGeometry = new THREE.BufferGeometry();
    var dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );*/
    const pointGeom = new THREE.SphereGeometry( 0.008, 32, 32 ),
      pointMat = new THREE.MeshBasicMaterial({ color: 0x44ff33 }),
      pointGroup = new THREE.Group();
    for (var i = points.length - 1; i >= 0; i--) {
        const coord = new THREE.Vector3(points[i][0], points[i][1], points[i][2]),
        point = new THREE.Mesh( pointGeom, pointMat );

        point.position.set( coord.x, coord.y, coord.z );
        pointGroup.add(point);
    }
  return (
    <primitive object={pointGroup} />
  )
}

export default SatelliteLocationPoints