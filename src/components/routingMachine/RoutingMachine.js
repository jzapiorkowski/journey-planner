import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = ({
  originAddressCoordinates,
  destinationAddressCoordinates,
}) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng([...originAddressCoordinates]),
      L.latLng([...destinationAddressCoordinates]),
    ],
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }],
    },
    pointMarkerStyle: {
      radius: 5,
      color: '#03f',
      fillColor: 'white',
      opacity: 1,
      fillOpacity: 0.7,
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
