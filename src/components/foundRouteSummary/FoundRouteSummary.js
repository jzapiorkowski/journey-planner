import React, { useContext, useState } from 'react';
import Map from '../map/Map';
import { currentRouteContext } from './../../contexts/CurrentRouteContext';
import ViewRoute from '../viewRoute/ViewRoute';

function FoundRouteSummary() {
  const routeCoordinates = useContext(currentRouteContext);

  const [totalDistance, setTotalDistance] = useState(0);
  const [routeInstructions, setRouteInstructions] = useState([]);

  return (
    <div>
      <h1>Route Summary</h1>
      <ViewRoute></ViewRoute>
      <p>Your route is {totalDistance} meters long</p>
      <ul>
        {routeInstructions.map((instruction, index) => {
          return <li key={index}>{instruction}</li>;
        })}
      </ul>
      <Map
        originAddressCoordinates={routeCoordinates[0]}
        destinationAddressCoordinates={routeCoordinates[1]}
        setTotalDistance={setTotalDistance}
        setRouteInstructions={setRouteInstructions}
      ></Map>
    </div>
  );
}

export default FoundRouteSummary;
