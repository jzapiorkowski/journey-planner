import React, { useContext, useState } from 'react';
import Map from '../map/Map';
import { currentRouteContext } from './../../contexts/CurrentRouteContext';
import ViewRoute from '../viewRoute/ViewRoute';
import { useLocation } from 'react-router-dom';

function FoundRouteSummary() {
  const routeCoordinates = useContext(currentRouteContext);

  const [totalDistance, setTotalDistance] = useState(0);
  const [routeInstructions, setRouteInstructions] = useState([]);

  const location = useLocation();
  const { originGeolocation, destinationGeolocation } = location.state || {};

  return (
    <div>
      <h1>Route Summary</h1>
      <ViewRoute
        originAddressCoordinates={originGeolocation || routeCoordinates[0]}
        destinationAddressCoordinates={
          destinationGeolocation || routeCoordinates[1]
        }
      />
      <p>Your route is {totalDistance} meters long</p>
      <ul>
        {routeInstructions.map((instruction, index) => {
          return <li key={index}>{instruction}</li>;
        })}
      </ul>
      <Map
        originAddressCoordinates={originGeolocation || routeCoordinates[0]}
        destinationAddressCoordinates={
          destinationGeolocation || routeCoordinates[1]
        }
        setTotalDistance={setTotalDistance}
        setRouteInstructions={setRouteInstructions}
      ></Map>
    </div>
  );
}

export default FoundRouteSummary;
