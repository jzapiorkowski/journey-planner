import React, { useContext, useState, useEffect } from 'react';
import Map from '../map/Map';
import { currentRouteContext } from './../../contexts/CurrentRouteContext';
import AddressNames from '../addressNames/AddressNames';
import { useLocation } from 'react-router-dom';
import ReverseGeocode from '../../utils/ReverseGeocode';
import generatePDF from '../../utils/GeneratePDF';
import './foundRouteSummary.scss';

function FoundRouteSummary() {
  const routeCoordinates = useContext(currentRouteContext);

  const [originPlaceName, setOriginPlaceName] = useState([]);
  const [destinationPlaceName, setDestinationPlaceName] = useState([]);

  const [totalDistance, setTotalDistance] = useState(0);
  const [routeInstructions, setRouteInstructions] = useState([]);

  const location = useLocation();
  const { originGeolocation, destinationGeolocation } = location.state || {};

  useEffect(() => {
    ReverseGeocode(originGeolocation || routeCoordinates[0]).then(
      (response) => {
        const tmp = response.split(', ');
        setOriginPlaceName(tmp);
      }
    );

    ReverseGeocode(destinationGeolocation || routeCoordinates[1]).then(
      (response) => {
        const tmp = response.split(', ');
        setDestinationPlaceName(tmp);
      }
    );
  }, []);

  const getPDF = () => {
    generatePDF(
      originPlaceName,
      destinationPlaceName,
      totalDistance,
      routeInstructions
    );
  };

  return (
    <div className='route-summary'>
      <h1>Route Summary</h1>
      <AddressNames
        originPlaceName={originPlaceName}
        destinationPlaceName={destinationPlaceName}
      />
      <p className='distance'>Your route is {totalDistance} kilometers long</p>
      <button onClick={getPDF}>GENERATE PDF</button>
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
