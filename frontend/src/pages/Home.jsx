import { useState } from 'react'
import Parameters from '../components/Parameters';
import MapComponent from '../components/Map';
import NavBar from '../components/NavBar';
import 'leaflet/dist/leaflet.css';


function Home() {

  const [parametersPosition] = useState({bottom: '5%', left: '5%'});

  return (
    <div className='w-full h-screen relative'>
      <Parameters position={parametersPosition} />
      <MapComponent/>
    </div>
  )
}

export default Home
