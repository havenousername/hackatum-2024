import { useState } from 'react'
import Parameters from '../components/Parameters';
import MapComponent from '../components/Map';
import CarTooltip from '../components/CarTooltip';
import Simulation from '../components/Simulation';
import 'leaflet/dist/leaflet.css';
import Logo from '../assets/logo.svg?react';


function Home() {
  const [parametersPosition] = useState({ bottom: '5%', left: '5%' });
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  const onMapClickCar = (car) => {
    console.log(car);
    setIsOpen(true);
    setSelectedCar(car)
  }

  return (
    <div className='w-full h-screen relative'>
      <span onClick={() => { setIsExpanded(true) }}>
        <Logo className={`absolute z-[99999] bottom-8 left-8 cursor-pointer ${isExpanded ? "hidden" : ""}`} width={"5rem"} height={"5rem"} />
      </span>
      <div className='absolute z-[99999] right-6 bottom-14 bg-[#2E2E2E] p-5 rounded-xl'>
        <Simulation />
      </div>
      <Parameters isExpanded={isExpanded} setIsExpanded={setIsExpanded} position={parametersPosition} />
      <CarTooltip selectedCar={selectedCar} isOpen={isOpen} setIsOpen={(isOpen) => setIsOpen(isOpen)} />
      <MapComponent onClickCar={onMapClickCar} />
    </div>
  )
}

export default Home