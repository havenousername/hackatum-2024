import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from "react-router";
import { Chart } from 'react-charts'
import { GridStack } from 'gridstack';
import MapComponent from './map';
import Parameters from './components/Parameters';
import 'leaflet/dist/leaflet.css';


function App() {
  const [count, setCount] = useState(0)

  const position = [51.505, -0.09];

  return (
    <>
      <MapComponent />
      <p className='text-3xl font-bold'>OmarAshour</p>
    </>

  )
}

export default App
