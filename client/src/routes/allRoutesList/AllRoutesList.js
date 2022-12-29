import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './allRoutesList.scss';
import routeCard from '../../assets/images/route-card.jpg';
import axios from 'axios';

function AllRoutesList() {
  const [allJourneysIDs, setAllJourneysIDs] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const {
          data: { journeys },
        } = await axios.get('http://localhost:3001/journeys');

        const IDs = journeys.map((journey) => journey.id);

        setAllJourneysIDs(IDs);
      } catch (error) {
        setFetchError(error.response.data || 'something went wrong');
      }
    };

    fetchJourneys();
  }, []);

  const routeCards = useMemo(
    () =>
      allJourneysIDs.map((journeyID, index) => {
        return (
          <Link
            to={`/route/${journeyID}`}
            key={journeyID}
            className='route-card'
          >
            <img src={routeCard} alt=''></img>
            <h4>Trip {index + 1}</h4>
          </Link>
        );
      }),
    [allJourneysIDs]
  );

  if (fetchError) {
    return (
      <div className='route-summary'>
        <h1>{fetchError}</h1>
      </div>
    );
  }

  return (
    <div className='all-routes-list'>
      <h3>My Trips</h3>
      {!allJourneysIDs.length && (
        <p className='no-routes-info'>
          Seems like journeys haven't been searched yet. Try finding some!
          <Link to='/find-addresses'>here!</Link>
        </p>
      )}
      <div className='route-cards'>{routeCards}</div>
    </div>
  );
}

export default AllRoutesList;
