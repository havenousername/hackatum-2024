import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { BrowserRouter } from "react-router";
import { Chart } from 'react-charts'
import { GridStack } from 'gridstack';

function App() {
  const [count, setCount] = useState(0)

  const position = [51.505, -0.09];

  return (
    <div>

      <MapContainer center={position} height={160} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      <p className='text-3xl font-bold'>OmarAshour</p>

    </div>

  )
}

export default App
