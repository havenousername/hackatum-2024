import { useEffect, useState } from 'react'
import Parameters from '../components/Parameters';
import MapComponent from '../components/Map';
import CarTooltip from '../components/CarTooltip';
import 'leaflet/dist/leaflet.css';
import Logo from '../assets/logo.svg?react'
import {useRealTimeSimulation} from "../api/useBackendConnection";


function Home() {
  const [parametersPosition] = useState({ bottom: '5%', left: '5%' });
  const [isOpen, setIsOpen] = useState(true);
  const realTimeSimulation = useRealTimeSimulation();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    realTimeSimulation.createScenario(5, 11);
    realTimeSimulation.createSubscription('customerPosition');
  }, []);

  useEffect(() => {
    console.log(realTimeSimulation.lastJsonMessage);
  }, [realTimeSimulation.lastJsonMessage]);

  const onMapClickCar = () => {
    setIsOpen(true);
  }

  return (
    <div className='w-full h-screen relative'>
      <span onClick={() => { setIsExpanded(true) }}>
        <Logo className={`absolute z-[99999] bottom-8 left-8 cursor-pointer ${isExpanded ? "hidden" : ""}`} width={"5rem"} height={"5rem"} />
      </span>
      <Parameters isExpanded={isExpanded} setIsExpanded={setIsExpanded} position={parametersPosition} />
      <CarTooltip isOpen={isOpen} setIsOpen={(isOpen) => setIsOpen(isOpen)} />
      <MapComponent onClickCar={onMapClickCar} />
    </div>
  )
}

export default Home
