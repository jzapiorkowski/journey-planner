import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { allRoutesGeolocationsContext } from '../../contexts/AllRoutesContext';
import './allRoutesList.scss';
import routeCard from '../../assets/images/route-card.jpg';

function AllRoutesList() {
  const allRoutes = useContext(allRoutesGeolocationsContext);

  const routeCards = allRoutes.map((trip, index) => {
    return (
      <Link to={`/route/${index}`} key={index} className='route-card'>
        <img src={routeCard} alt=''></img>
        <h4>Trip {index + 1}</h4>
      </Link>
    );
  });

  return (
    <div className='all-routes-list'>
      <h3>My Trips</h3>
      {!allRoutes.length && (
        <p className='no-routes-info'>
          Seems like you haven't searched for routes yet. Try finding some{' '}
          <Link to='/find-addresses'>here!</Link>
        </p>
      )}
      <div className='route-cards'>{routeCards}</div>
    </div>
  );
}

export default AllRoutesList;
