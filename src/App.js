import React, {Suspense, useState, useEffect} from 'react'
import './styles/App.css';
import ThreeScene from './components/ThreeScene';
//Import Sphere from './components/Sphere';
import Earth from './components/Earth';
import Atmosphere from './components/Atmosphere';
import ISSModel from './components/ISS_Model';
import Icon_Pin from './components/Icon_Pin';
import axios from 'axios';
import SunCalc from 'suncalc';
import Geo_Locate_User from './components/Geo_Locate_User';
import Orbit_Points from './components/Orbit_Points';
//Import Track_Line from './components/Track_Line';
//Satellite.js
import { twoline2satrec, propagate, gstime, eciToGeodetic } from 'satellite.js';
//Threejs 
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three'
import Satellite_Location_Points from './components/Satellite_Location_Points';

import MainPage from './components/MainPage'

//API URL
const apiURL = "http://api.open-notify.org/iss-now.json";
const celestrakAPI = "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle";

//Constants for earth and iss orbit
const r = 5;
const h = r + 0.5;
const points = [];
const vector = [];
const satellites = [];

//List of data for satellite coordinates
let satrecList = [];
let apiCalled = false;
let dataprinted = false;
let MainPageRender = false;

const sat = ()=> {
  if(satellites.length === 0){
  //Iterate on the list of tracked satellites
  console.log(satrecList);
  for (let i = 0; i < satrecList.length; i++) {
  //Get current time
  let date = new Date()
  //Get position and velocity of the satellite
  try{
  const positionAndVelocity = propagate(satrecList[i], date);
  const gmst = gstime(date);
  //Transform from eci to geodetic coordinates (latitude, longitude and altitude)
  const position = eciToGeodetic(positionAndVelocity.position, gmst);
  //Print the geodesic coordinates
  //console.log(position.height + " " + position.latitude + " " + position.longitude);
  let x = (position.height/1000 + h) * Math.cos(position.longitude) * Math.cos(position.latitude);
  let y = (position.height/1000 + h) * Math.sin(position.longitude) * Math.cos(position.latitude);
  let z = (position.height/1000 + h) * Math.sin(position.latitude);
  satellites.push([x, y, z]);
  console.log(satellites);
  }
  catch(e){
    //console.log(e);
  }
  }
}
}

/*function Child({handleClick}){
  return(
    <div className="MainPage">
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}*/


//MAIN APP
function App() {
  //const [count, setCount] = useState(0);

  const handleClick = () => {
    MainPageRender = true;
    console.log(MainPageRender);
  }

  //State
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

  //Api call to get the current position of the ISS / Satellites
  const [userData, setUserData] = useState({});
  const [satelliteData, setSatelliteData] = useState({});

  //Get the current position of the ISS
  const getCoordinates = async () => {
    const response = await axios({
      method: 'get',
      url: apiURL,
  })
    setUserData(response.data);
  };

  //Get the data from the last position for the satellites upgraded
  const getCoordinatesStellites = async () => {
    const response = await axios({
      method: 'get',
      url: celestrakAPI
  })
  setSatelliteData(response.data);
  };
  
  //Get the current position of the ISS for the first time
  useEffect(() => {
    getCoordinates();
    getCoordinatesStellites();
  }, []);

  //console.log(satelliteData);

  //Check if the api call has returned a value
  if(satrecList.length===0){
    let recordSatellite = satelliteData;
    //Split the data in lines
    recordSatellite = recordSatellite.toString().split('\r\n');
    //Iterate on the lines
    for (let i = 0; i < recordSatellite.length-3; i+=3){
      //Get the info of the satellite
      const satrec = twoline2satrec(
        //Line 1
        recordSatellite[i+1].trim(), 
        //Line 2
        recordSatellite[i+2].trim()
      );
      //Add the satellite to the list
      satrecList.push(satrec);
      console.log(satrecList);
    }
  }
  sat();
  //Update the position of the ISS in real time and update the position of the satellites respect time
  getCoordinates();
  if(!apiCalled && satelliteData != null){
    //sat();
    apiCalled = true;
    console.log("done")
  }

  if(!dataprinted && apiCalled){
    console.log(satellites);
    dataprinted = true;
  }


  //let vector = [];

  //for(i = 0; i < sat.length; i++){
  //   sat[i].latitude
  //   sat[i].longitude
  //   x = r * Math.cos(sat[i].latitude) * Math.cos(sat[i].longitude);
  //   y = r * Math.cos(sat[i].latitude) * Math.sin(sat[i].longitude);
  //   z = r * Math.sin(sat[i].latitude);
  //   vector.push(new THREE.Vector3(x, y, z)); 
  // }

  // => component(vector)
  // const pointGeom = new THREE.SphereBufferGeometry( 5, 32, 32 ),
  // pointMat = new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  // pointGroup = new THREE.Group();
  // for (var i = coordData.length - 1; i >= 0; i--) {
  // const coord = coordData[i],
  // point = new THREE.Mesh( pointGeom, pointMat );
  // point.position.set( coord.x, coord.y, coord.z );
  // pointGroup.add(point);
  //}


  //Check if the user has allowed the browser to get their location and the api call has returned a value
  if(MainPageRender){
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
      let times = SunCalc.getPosition(date, userLocation.lon, userLocation.lat);
      //console.log(times.azimuth, times.altitude);
      azimuth = times.azimuth + 23*Math.PI/180;
      distance = times.altitude + 23*Math.PI/180;
      //let dist = (100) * Math.cos(distance)
  
      //Convert the longitude and latitude of the Sun to cartesian coordinates
      x_S = (1000) * Math.cos(azimuth) * Math.cos(distance);
      y_S = (1000) * Math.sin(azimuth) * Math.cos(distance);
      z_S = (1000) * Math.sin(distance);
      //console.log(x_S, y_S, z_S);
  
      //Check if the sun already set
      /*if(x_S < 0 && y_S > 0){
        x_S = x_S * -1;
        y_S = y_S * -1;
      } 
      else if(x_S > 0 && y_S > 0){
        x_S = x_S * -1;
        y_S = y_S * -1;
      }*/
      //console.log('NEW:', x_S, y_S, z_S);
  
      return (
        <div style={{ height: '100vh', overflow: 'hidden'}}>
            <ThreeScene cameraPos={[x, y, z]}>
              <color attach="background" args={['#000']}/>
              <Suspense fallback={null}>
                <Atmosphere radius={r}/>
                <Earth radius={r}/>
                <ISSModel sun_coords={[-x_S, -y_S, z_S]} position={[x, y, z]}/>
                <Icon_Pin position={[x_U, y_U, z_U]}/>
                <Satellite_Location_Points points={satellites}/>
              </Suspense>
              <Orbit_Points points={points}/>
              {/*<Track_Line points={vector}/>*/}
              <ambientLight intensity={0.1} />
              <pointLight color="white" intensity={0.8} position={[-x_S, -y_S, -z_S]} />
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
  } else{
    return (
      <MainPage state={handleClick}/>
    );
  }

}

export default App;
