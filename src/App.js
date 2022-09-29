import React, {Suspense, useState, useEffect} from 'react'
import './styles/App.css';
import ThreeScene from './components/ThreeScene';
//import Sphere from './components/Sphere';
import Earth from './components/Earth';
import Atmosphere from './components/Atmosphere';
import ISSModel from './components/ISS_Model';
import axios from "axios";
//threejs 
import { OrbitControls, Stars } from '@react-three/drei';

const apiURL = "http://api.open-notify.org/iss-now.json";
const r = 5;
const h = r + 0.5;

function App() {
  let longitude = 0;
  let latitude = 0;
  let x = 0;
  let y = 0;
  let z = h;
  const [userData, setUserData] = useState({});

  const getCoordinates = async () => {
    const response = await axios.get(apiURL);
    setUserData(response.data);
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  if(userData.iss_position != null){
    longitude = userData.iss_position.longitude;
    latitude = userData.iss_position.latitude;
    console.log(userData.iss_position.longitude, userData.iss_position.latitude);
    x = h * Math.cos(longitude * Math.PI/180) * Math.cos(latitude * Math.PI/180);
    y = h * Math.sin(longitude * Math.PI/180) * Math.cos(latitude * Math.PI/180);
    z = h * Math.sin(latitude * Math.PI/180);
    console.log(r, x, y, z);
    return (
      <div style={{ height: '100vh', overflow: 'hidden'}}>
          <ThreeScene cameraPos={[x, y , z]}>
            <color attach="background" args={['#000']}/>
            <Suspense fallback={null}>
              <Atmosphere radius={r}/>
              <Earth radius={r}/>
              <ISSModel position={[x, y, z]}/>
            </Suspense>
            <ambientLight intensity={0.1} />
            <pointLight color="white" intensity={1} position={[20, 0, 20]} />
            <OrbitControls minDistance={7} maxDistance={50} enablePan={false}/>
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
