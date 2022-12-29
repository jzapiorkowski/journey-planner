import React, { useState, useCallback, useEffect } from 'react';
import Map from '../../components/map/Map';
import AddressNames from '../../components/addressNames/AddressNames';
import { useParams } from 'react-router-dom';
import generatePDF from '../../utils/GeneratePDF';
import './routeSummary.scss';
import calculateCost from '../../utils/CalculateCost';
import axios from 'axios';

function RouteSummary() {
  const params = useParams();
  const id = params.routeId;
  const [journeyData, setJourneyData] = useState({});
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getJourney = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/journey/${id}`);
        setJourneyData(data);
      } catch (error) {
        setFetchError(error.response.data || 'something went wrong');
      }
    };

    getJourney();
  }, [id]);

  const originPlaceName = journeyData?.origin?.address || '';
  const destinationPlaceName = journeyData?.destination?.address || '';

  const originGeolocation = journeyData?.origin?.coordinates || [];
  const destinationGeolocation = journeyData?.destination?.coordinates || [];

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

  if (fetchError) {
    return (
      <div className='route-summary'>
        <h1>{fetchError}</h1>
      </div>
    );
  }

  if (Object.keys(journeyData).length === 0) {
    return (
      <div className='route-summary'>
        <h1>Loading...</h1>
      </div>
    );
  }

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
