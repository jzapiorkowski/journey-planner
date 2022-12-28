import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RoutingMachine from '../routingMachine/RoutingMachine';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

function Map({
  originAddressCoordinates,
  destinationAddressCoordinates,
  setTotalDistance,
  setRouteInstructions,
}) {
  return (
    <div>
      <MapContainer
        scrollWheelZoom={false}
        style={{ height: '1000px', width: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <RoutingMachine
          originAddressCoordinates={originAddressCoordinates}
          destinationAddressCoordinates={destinationAddressCoordinates}
          setRouteInstructions={setRouteInstructions}
          setTotalDistance={setTotalDistance}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
