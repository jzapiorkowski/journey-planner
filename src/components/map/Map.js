import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RoutingMachine from '../routingMachine/RoutingMachine';
import 'leaflet/dist/images/marker-shadow.png';
import { currentRouteContext } from './../../contexts/CurrentRouteContext';

function Map() {
  const routeCoordinates = useContext(currentRouteContext);

  return (
    <div>
      <MapContainer
        center={[52.239345, 21.045834]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: '60vh', width: '80vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <RoutingMachine
          originAddressCoordinates={routeCoordinates[0]}
          destinationAddressCoordinates={routeCoordinates[1]}
        />
      </MapContainer>
    </div>
  );
}

export default Map;