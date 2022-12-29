import React, { useState, useCallback, useEffect } from 'react';
import Map from '../../components/map/Map';
import AddressNames from '../../components/addressNames/AddressNames';
import { useParams, useNavigate } from 'react-router-dom';
import generatePDF from '../../utils/GeneratePDF';
import './routeSummary.scss';
import axios from 'axios';

function RouteSummary() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.routeId;
  const [journeyData, setJourneyData] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

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

  const getPDF = useCallback(() => {
    generatePDF(
      originPlaceName,
      destinationPlaceName,
      totalDistance,
      routeInstructions
    );
  }, [destinationPlaceName, originPlaceName, routeInstructions, totalDistance]);

  const onClickToEdit = useCallback(() => {
    navigate(`/route/${id}/edit`);
  }, [id, navigate]);

  const onDeleteJourney = useCallback(async () => {
    try {
      await axios.delete(`http://localhost:3001/journey/${id}`);

      navigate('/');
    } catch (error) {
      setDeleteError(error.response.data || 'something went wrong');
    }
  }, [id, navigate]);

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

      <button onClick={getPDF}>GENERATE PDF</button>
      <button onClick={onClickToEdit}>Edit this journey</button>
      <button onClick={onDeleteJourney} class='delete'>
        Delete this journey
      </button>
      {deleteError && <p className='delete'>{deleteError}</p>}
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
