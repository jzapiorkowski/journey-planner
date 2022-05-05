import React from 'react';
import { Link } from 'react-router-dom';

function LinksBanner() {
  return (
    <div>
      <Link to='/find-addresses'>Find new route</Link>
      <Link to='/my-routes'> Check my routes</Link>
    </div>
  );
}

export default LinksBanner;
