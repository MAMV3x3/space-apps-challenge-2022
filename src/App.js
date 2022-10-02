import React, {Suspense, useState, useEffect} from 'react'
import * as THREE from 'three'
import './styles/App.css';
import ThreeScene from './components/ThreeScene';
//import Sphere from './components/Sphere';
import Earth from './components/Earth';
import Atmosphere from './components/Atmosphere';
import ISSModel from './components/ISS_Model';
import Icon_Pin from './components/Icon_Pin';
import axios from 'axios';
import SunCalc from 'suncalc';
import Geo_Locate_User from './components/Geo_Locate_User';
import Orbit_Points from './components/Orbit_Points';
//import Track_Line from './components/Track_Line';
//threejs 
import { Line, OrbitControls, Stars } from '@react-three/drei';
import { BufferGeometry } from 'three';

//constants
const apiURL = "http://api.open-notify.org/iss-now.json";
const r = 5;
const h = r + 0.5;
const points = [];
const vector = [];

function App() {
  //state
  const userLocation = Geo_Locate_User();
  let longitude = 0;
  let latitude = 0;
  let azimuth = 0;
  let distance = 0;
  let x = 0;
  let y = 0;
  let z = h;
  let x_U = 0;
  let y_U = 0;
  let z_U = h;
  let x_S = 0;
  let y_S = 0;
  let z_S = h;

  //Api call to get the current position of the ISS
  const [userData, setUserData] = useState({});

  //Get the current position of the ISS
  const getCoordinates = async () => {
    const response = await axios({
      method: 'get',
      url: apiURL,
  })
    setUserData(response.data);
  };
  
  //Get the current position of the ISS first time
  useEffect(() => {
    getCoordinates();
  }, []);

  //Update the position of the ISS in real time
  getCoordinates();

  //Check if the user has allowed the browser to get their location and the api call has returned a value
  if(userData.iss_position != null && userLocation != null){

    //Get the current position of the ISS
    longitude = userData.iss_position.longitude;
    latitude = userData.iss_position.latitude;

    //Convert the longitude and latitude of the ISS to cartesian coordinates
    x = h * Math.cos(longitude * Math.PI/180) * Math.cos(latitude * Math.PI/180);
    y = h * Math.sin(longitude * Math.PI/180) * Math.cos(latitude * Math.PI/180);
    z = h * Math.sin(latitude * Math.PI/180);
    
    //Project the ISS position on the orbit
    points.push(new THREE.Vector3( x, y, z));

    //Convert the longitude and latitude of the User to cartesian coordinates
    x_U = (r + 0.04) * Math.cos(userLocation.lon * Math.PI/180) * Math.cos(userLocation.lat * Math.PI/180);
    y_U = (r + 0.04) * Math.sin(userLocation.lon * Math.PI/180) * Math.cos(userLocation.lat * Math.PI/180);
    z_U = (r + 0.04) * Math.sin(userLocation.lat * Math.PI/180);
    vector[0] = new THREE.Vector3(x_U, y_U, z_U);
    vector[1] = new THREE.Vector3(x, y, z);

    //Get the current position of the Sun
    let date = new Date();
    let times = SunCalc.getPosition(date, 90, 0);
    azimuth = (h + 85) * times.azimuth;
    distance = (h + 85) * times.altitude;
    let dist = (h + 85) * Math.cos(distance * (Math.PI / 180))

    //Convert the longitude and latitude of the Sun to cartesian coordinates
    x_S = -dist * Math.sin(azimuth * Math.PI/180); 
    y_S = -dist * Math.cos(azimuth * Math.PI/180);
    z_S = (h + 85) * Math.sin(distance * Math.PI/180);
    //console.log(x_S, y_S, z_S);

    //Check if the sun already set
    if(x_S < 0 && y_S > 0){
      x_S = x_S * -1;
      y_S = y_S * -1;
    }
    //console.log('NEW:', x_S, y_S, z_S);

    return (
      <div style={{ height: '100vh', overflow: 'hidden'}}>
          <ThreeScene cameraPos={[x, y, z]}>
            <color attach="background" args={['#000']}/>
            <Suspense fallback={null}>
              <Atmosphere radius={r}/>
              <Earth radius={r}/>
              <ISSModel sun_coords={[x_S, y_S, -z_S]} position={[x, y, z]}/>
              <Icon_Pin position={[x_U, y_U, z_U]}/>
            </Suspense>
            <Orbit_Points points={points}/>
            {/*<Track_Line points={vector}/>*/}
            <ambientLight intensity={0.1} />
            <pointLight color="white" intensity={1} position={[-x_S, -y_S, z_S]} />
            <OrbitControls autorotate autoRotateSpeed={0.1} minDistance={7} maxDistance={50} enablePan={false}/>
            <Stars count={20000} factor={2}/>
          </ThreeScene>
      </div>
    );
  } else{
    return (
      <div id="loader"></div>
    );
  }

}

export default App;
