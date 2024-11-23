import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from "react-router";
import { Chart } from 'react-charts'
import { GridStack } from 'gridstack';
import { useEffect } from 'react';
import MapComponent from './map';
import 'leaflet/dist/leaflet.css';




function App() {
  const [count, setCount] = useState(0)

  const position = [51.505, -0.09]

  return (
    <>
      <MapComponent />
      <p className='text-3xl font-bold'>OmarAshour</p>
    </>

  )
}

export default App
