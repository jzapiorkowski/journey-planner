import React from 'react';
import { Link } from 'react-router-dom';
import './linksBanner.scss';

function LinksBanner() {
  return (
    <div className='links-banner'>
      <Link to='/find-addresses'>FIND NEW ROUTE</Link>
      <Link to='/my-routes'> CHECK MY ROUTES</Link>
    </div>
  );
}

export default LinksBanner;
