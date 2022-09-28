import React, {Suspense} from 'react'
import ThreeScene from './components/ThreeScene';
//import Sphere from './components/Sphere';
import Earth from './components/Earth';
import Atmosphere from './components/Atmosphere';
import ISSModel from './components/ISS_Model';

//threejs 
import { OrbitControls, Stars } from '@react-three/drei';
import useFetch from './useFetch';


function App() {
  let data = useFetch("http://api.open-notify.org/iss-now.json")
  console.log(data)
  return (
    <div style={{ height: '100vh', overflow: 'hidden'}}>
      <ThreeScene>
        <color attach="background" args={['#161c24']}/>
        {/*<Sphere color="#00ff00" position={[-1, 0, 0]}/>
        <Sphere color="#ffff00" position={[1, 0, 0]}/>*/}
        <Suspense fallback={null}>
          <Atmosphere />
          <Earth position={[0, 0, 0]}/>
          <ISSModel position={[0, 0, 5.5]}/>
        </Suspense>
        <ambientLight intensity={0.1} />
        <pointLight color="white" intensity={1} position={[20, 20, 20]} />
        <OrbitControls minDistance={8} maxDistance={50} enablePan={false}/>
        <Stars count={20000} factor={2}/>
      </ThreeScene>
    </div>
  );
}

export default App;
