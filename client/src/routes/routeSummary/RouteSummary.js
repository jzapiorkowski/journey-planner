import React, { useState, useContext, useCallback } from 'react';
import Map from '../../components/map/Map';
import AddressNames from '../../components/addressNames/AddressNames';
import { useParams } from 'react-router-dom';
import generatePDF from '../../utils/GeneratePDF';
import './routeSummary.scss';
import calculateCost from '../../utils/CalculateCost';
import { allRoutesGeolocationsContext } from '../../contexts/AllRoutesContext';

function RouteSummary() {
  const allRoutes = useContext(allRoutesGeolocationsContext);
  const params = useParams();
  const id = params.routeId;

  const originPlaceName = allRoutes[id].origin.address;
  const destinationPlaceName = allRoutes[id].destination.address;

  const originGeolocation = allRoutes[id].origin.coordinates;
  const destinationGeolocation = allRoutes[id].destination.coordinates;

  const [totalDistance, setTotalDistance] = useState(0);
  const [routeInstructions, setRouteInstructions] = useState([]);
  const [kilomererCost, setKilomererCost] = useState(0);

  const getPDF = useCallback(() => {
    generatePDF(
      originPlaceName,
      destinationPlaceName,
      totalDistance,
      routeInstructions,
      calculateCost(totalDistance, kilomererCost)
    );
  }, [
    destinationPlaceName,
    kilomererCost,
    originPlaceName,
    routeInstructions,
    totalDistance,
  ]);

  const handleKilometerCostChange = useCallback((event) => {
    setKilomererCost(event.target.value);
  }, []);

  return (
    <div className='route-summary'>
      <h1>Route Summary</h1>
      <AddressNames
        originPlaceName={originPlaceName}
        destinationPlaceName={destinationPlaceName}
      />
      <p className='distance'>Your route is {totalDistance} kilometers long</p>
      <div className='cost'>
        <div className='calculate'>
          <input
            type='number'
            onChange={handleKilometerCostChange}
            value={kilomererCost}
            min='0'
          ></input>
          <label>$ per kilometer</label>
        </div>
        <p>
          This trip will cost you about{' '}
          {calculateCost(totalDistance, kilomererCost)}$
        </p>
      </div>
      <button onClick={getPDF}>GENERATE PDF</button>
      <Map
        originAddressCoordinates={[
          originGeolocation.longtitude,
          originGeolocation.latitude,
        ]}
        destinationAddressCoordinates={[
          destinationGeolocation.longtitude,
          destinationGeolocation.latitude,
        ]}
        setTotalDistance={setTotalDistance}
        setRouteInstructions={setRouteInstructions}
      />
    </div>
  );
}

export default RouteSummary;
