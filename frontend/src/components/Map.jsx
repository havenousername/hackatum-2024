import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import LeafletListeners from './LeafletListeners';
import carWithPersonIconSource from "../assets/car-light-with-person.svg"
import carIconSource from "../assets/car-light.svg"
import destinationIconSource from "../assets/destination-light.svg"
import customerIconSource from '../assets/person-light.svg'
import { Icon } from 'leaflet';
import '../assets/overlay.css';

const customerIcon = new Icon({
  iconUrl: customerIconSource, 
  iconSize: [32, 32]
});

const carIcon = new Icon({
  iconUrl: carIconSource,
  iconSize: [32, 32]
})

const carWithPersonIcon = new Icon({
  iconUrl: carWithPersonIconSource, 
  iconSize: [32, 32]
});


const customerDestinationIcon = new Icon({
  iconUrl: destinationIconSource, 
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

const ONE_KM = 1000;

const MapComponent = ({ onClickCar }) => {
  const [map, setMap] = useState(null);
  const [center] = useState([51.505, -0.09]);
  const [carPositions] = useState(Array.from({ length: 10 }).fill([]).map(_ => generateRandomPoint(center, ONE_KM)));
  const [customerPositions] = useState(Array.from({ length: 10 }).fill([]).map(_ => generateRandomPoint(center, ONE_KM)));
  const [customerWithCarsPositions] = useState(Array.from({ length: 10 }).fill([]).map(_ => generateRandomPoint(center, ONE_KM)));
  const [customerDestinationPositions] = useState(Array.from({ length: 10 }).fill([]).map(_ => generateRandomPoint(center, ONE_KM)));

  useEffect(() => {
      if (!map) {
        return;
      }
      map.eachLayer(layer => {
        if (layer.options?.alt?.includes('car_')) {
          layer.on({
            click: (event) => onClickCar(event, layer.options.alt),
          })
        }
      })
  }, [map]);

  return (
    <MapContainer ref={setMap} id={'map'} center={center} zoom={13} className='h-screen'>
      <TileLayer
        url="https://cdn.lima-labs.com/{z}/{x}/{y}.png?api=demo"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      />
      <LeafletListeners />
      { carPositions.map((position, key) => <Marker alt={`car_${key}`} key={key} position={position} id={`car-positions-${key}`} icon={carIcon} />) }
      { customerPositions.map((position, key) => <Marker alt={`customer_${key}`} key={key} position={position} icon={customerIcon} />)}
      { customerWithCarsPositions.map((position, key) => <Marker alt={`car-with-customer_${key}`} key={key} position={position} icon={carWithPersonIcon} />)}
      { customerDestinationPositions.map((position, key) => <Marker alt={`destination_${key}`} key={key} position={position} icon={customerDestinationIcon} />)} 
    </MapContainer>
  );
};

  
export default MapComponent;