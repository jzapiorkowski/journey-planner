import React, { useState, useEffect } from 'react';
import Map from '../map/Map';
import AddressNames from '../addressNames/AddressNames';
import { useLocation, useNavigate } from 'react-router-dom';
import ReverseGeocode from '../../utils/ReverseGeocode';
import generatePDF from '../../utils/GeneratePDF';
import './foundRouteSummary.scss';
import calculateCost from '../../utils/CalculateCost';

function FoundRouteSummary() {
  const [originPlaceName, setOriginPlaceName] = useState([]);
  const [destinationPlaceName, setDestinationPlaceName] = useState([]);

  const [totalDistance, setTotalDistance] = useState(0);
  const [routeInstructions, setRouteInstructions] = useState([]);

  const [kilomererCost, setKilomererCost] = useState(0);

  const location = useLocation();
  const { originGeolocation, destinationGeolocation } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (originGeolocation && destinationGeolocation) {
      ReverseGeocode(originGeolocation)
        .then((response) => {
          const tmp = response.split(', ');
          setOriginPlaceName(tmp);
        })
        .catch(() => {
          navigate('/route-not-found');
        });

      ReverseGeocode(destinationGeolocation)
        .then((response) => {
          const tmp = response.split(', ');
          setDestinationPlaceName(tmp);
        })
        .catch(() => {
          navigate('/route-not-found');
        });
    } else {
      navigate('/route-not-found');
    }
  }, []);

  const getPDF = () => {
    generatePDF(
      originPlaceName,
      destinationPlaceName,
      totalDistance,
      routeInstructions,
      calculateCost(totalDistance, kilomererCost)
    );
  };

  const handleKilometerCostChange = (event) => {
    setKilomererCost(event.target.value);
  };

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
        originAddressCoordinates={originGeolocation}
        destinationAddressCoordinates={destinationGeolocation}
        setTotalDistance={setTotalDistance}
        setRouteInstructions={setRouteInstructions}
      ></Map>
    </div>
  );
}

export default FoundRouteSummary;
