import { useState } from 'react'
import Parameters from '../components/Parameters';
import MapComponent from '../components/Map';
import CarTooltip from '../components/CarTooltip';
import 'leaflet/dist/leaflet.css';


function Home() {
  const [parametersPosition] = useState({bottom: '5%', left: '5%'});
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='w-full h-screen relative'>
      <Parameters position={parametersPosition} />
      <CarTooltip isOpen={isOpen} setIsOpen={(isOpen) => setIsOpen(isOpen)} />
      <MapComponent/>
    </div>
  )
}

export default Home
