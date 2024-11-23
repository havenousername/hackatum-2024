import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const MapComponent = () => (
    <MapContainer center={[51.505, -0.09]} zoom={13} className='h-screen'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
    </MapContainer>
  );

  
export default MapComponent;