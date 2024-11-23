import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import { BrowserRouter } from "react-router";
import { Chart } from 'react-charts'
import { GridStack } from 'gridstack';
import Parameters from '../components/Parameters';
import MapComponent from '../map';
import NavBar from '../components/NavBar';
import 'leaflet/dist/leaflet.css';


function App() {
  const [count, setCount] = useState(0);

  const [parametersPosition] = useState({ bottom: '5%', left: '5%' });

  return (
    <div className='w-full h-screen relative'>
      <NavBar/>
      <Parameters position={parametersPosition} />
      <MapComponent />
    </div>
  )
}

export default App
