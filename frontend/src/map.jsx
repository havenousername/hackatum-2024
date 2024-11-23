import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import LeafletListeners from './components/LeafletListeners';
import carWithPersonIcon from "./assets/car-light-with-person.svg"
import { Icon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: carWithPersonIcon, 
  iconSize: [32, 32]
});


function generateRandomPoint([lat, lon], radius) {
  const radiusInDegrees = radius / 111320; 

  const randomDistance = Math.random() * radiusInDegrees;
  const randomAngle = Math.random() * 2 * Math.PI;

  const deltaLat = randomDistance * Math.cos(randomAngle);
  const deltaLon = randomDistance * Math.sin(randomAngle) / Math.cos(lat * (Math.PI / 180));

  const randomLat = lat + deltaLat;
  const randomLon = lon + deltaLon;

  return [randomLat, randomLon];
}

const MapComponent = () => {
  const [center] = useState([51.505, -0.09]);
  const [carPositions] = useState(Array.from({ length: 10 }).fill([]).map(_ => generateRandomPoint(center, 1000)));

  return (
    <MapContainer center={center} zoom={13} className='h-screen'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LeafletListeners />
      { carPositions.map((position, key) => <Marker key={key} position={position} icon={customIcon} />) }
    </MapContainer>
  );
};

  
export default MapComponent;