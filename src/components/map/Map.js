import React, { useContext, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RoutingMachine from '../routingMachine/RoutingMachine';
import 'leaflet/dist/images/marker-shadow.png';

function Map({
  originAddressCoordinates,
  destinationAddressCoordinates,
  setTotalDistance,
  setRouteInstructions,
}) {
  return (
    <div>
      <MapContainer
        center={[52.239345, 21.045834]}
        zoom={12}
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
