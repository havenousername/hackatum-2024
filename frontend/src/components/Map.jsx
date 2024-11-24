import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import LeafletListeners from './LeafletListeners';
import carWithPersonIconSource from "../assets/car-light-with-person.svg"
import carIconSource from "../assets/car-light.svg"
import destinationIconSource from "../assets/destination-light.svg"
import customerIconSource from '../assets/person-light.svg'
import { Icon } from 'leaflet';
import '../assets/overlay.css';
import {useRealTimeSimulation} from "../api/useBackendConnection";

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


const useRealTimeSimilationData = () => {
  const realTimeSimulation = useRealTimeSimulation();

  useEffect(() => {
    realTimeSimulation.createScenario(5, 11);
    realTimeSimulation.createSubscription('customerPosition');
    realTimeSimulation.createSubscription('carPosition')
  }, []);

  const firstLoad = realTimeSimulation.messageHistory.at(-2) && realTimeSimulation.messageHistory.at(-2) === null;

  return [realTimeSimulation.lastJsonMessage,  ];
}

const findCentralPoint = (customers, cars) => {

  const customerPoints = customers.map(c => c.position);
  const customerDest = customers.map(c => c.destination);
  const carsPoints = cars.map(c => c.position);
  const carsDestinations = cars.map(c => c.destination);


  const allPoints = [...customerPoints, ...customerDest, ...carsPoints, ...carsDestinations]
  const sum = allPoints
      .reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);

  return [sum[0] / allPoints.length, sum[1] / allPoints.length];
}

const BOOKED_TAXI = 'TAXI_DRIVING_WITH_CUSTOMER'


const MapComponent = ({ onClickCar }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState([48.137154, 11.576124]);
  const [carPositions, setCarPositions] = useState([]);
  const [customersPositions, setCustomersPositions] = useState([]);
  const [customerWithCarsPositions, setCustomerWithCarsPositions] = useState([]);
  const [customerDestinationPositions] = useState([])

  const [realTimeData, firstLoad] = useRealTimeSimilationData();
  useEffect(() => {
    if (!realTimeData || !realTimeData.carsPosition) {
      return;
    }
  
    const { carsPosition, customerPosition } = realTimeData;
  
    let bookedTaxis = [];
    const freeTaxis = [];
    
    carsPosition.forEach(c => {
      if (c.type === BOOKED_TAXI) {
        bookedTaxis.push(c);
      } else {
        freeTaxis.push(c);
      }
    });

  
    setCarPositions(freeTaxis.map(c => c.position));
    setCustomerWithCarsPositions(bookedTaxis.map(c => c.position));
  
    if (customerPosition) {
      setCustomersPositions(customerPosition.map(cp => cp.position));
    }
  }, [realTimeData]);



  // useEffect(() => {
  //   if (firstLoad) {
  //     setCenter(findCentralPoint());
  //   }
  // }, [firstLoad]);

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
      { customersPositions.map((position, key) => <Marker alt={`customer_${key}`} key={key} position={position} icon={customerIcon} />)}
      { customerWithCarsPositions.map((position, key) => <Marker alt={`car-with-customer_${key}`} key={key} position={position} icon={carWithPersonIcon} />)}
      { customerDestinationPositions.map((position, key) => <Marker alt={`destination_${key}`} key={key} position={position} icon={customerDestinationIcon} />)} 
    </MapContainer>
  );
};

  
export default MapComponent;