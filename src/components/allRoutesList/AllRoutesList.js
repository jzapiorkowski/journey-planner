import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { allRoutesGeolocationsContext } from '../../contexts/AllRoutesContext';

function AllRoutesList() {
  const allRoutes = useContext(allRoutesGeolocationsContext);

  const routeCards = allRoutes.map((trip, index) => {
    return (
      <Link
        to={`/route/${index}`}
        state={{ originGeolocation: trip[0], destinationGeolocation: trip[1] }}
      >
        <div key={index}>
          <h4>Trip {index + 1}</h4>
        </div>
      </Link>
    );
  });

  return (
    <div>
      <h3>My Trips</h3>
      {routeCards}
    </div>
  );
}

export default AllRoutesList;
