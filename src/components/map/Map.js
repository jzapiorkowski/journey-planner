import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';

function Map() {
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
      </MapContainer>
    </div>
  );
}

export default Map;
