import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './allRoutesList.scss';
import routeCard from '../../assets/images/route-card.jpg';
import axios from 'axios';

function AllRoutesList() {
  const [allJourneys, setAllJourneys] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        setIsLoading(true);
        const {
          data: { journeys },
        } = await axios.get('http://localhost:3001/journeys');

        const places = journeys.map((journey) => ({
          id: journey.id,
          origin_place_name: `${journey.origin.place_name.substring(0, 30)}...`,
          destination_place_name: `${journey.destination.place_name.substring(
            0,
            30
          )}...`,
        }));

        setAllJourneys(places);
        setIsLoading(false);
      } catch (error) {
        setFetchError(error?.response?.data || 'something went wrong');
      }
    };

    fetchJourneys();
  }, []);

  const routeCards = useMemo(
    () =>
      allJourneys.map(({ id, origin_place_name, destination_place_name }) => {
        return (
          <Link to={`/route/${id}`} key={id} className='route-card'>
            <img src={routeCard} alt=''></img>
            <h4>
              {origin_place_name} {'->'} {destination_place_name}
            </h4>
          </Link>
        );
      }),
    [allJourneys]
  );

  if (fetchError) {
    return (
      <div className='route-summary'>
        <h1>{fetchError}</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='route-summary'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='all-routes-list'>
      <h3>My Trips</h3>
      {!allJourneys.length ? (
        <p className='no-routes-info'>
          Seems like journeys haven't been searched yet. Try finding some!
          <Link to='/find-addresses'>here!</Link>
        </p>
      ) : (
        <div className='route-cards'>{routeCards}</div>
      )}
    </div>
  );
}

export default AllRoutesList;
