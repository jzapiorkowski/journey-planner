import React from 'react';
import './addressNames.scss';

function AddressNames({ originPlaceName, destinationPlaceName }) {
  return (
    <div className='addresses'>
      <div className='address' id='origin-address'>
        <h2>Origin Address</h2>
        <p>{originPlaceName.country}</p>
        <p>{originPlaceName.city}</p>
        <p>{originPlaceName.street}</p>
        <p>{originPlaceName.streetNumber}</p>
      </div>
      <div className='address' id='destination-address'>
        <h2>Destination Address</h2>
        <p>{destinationPlaceName.country}</p>
        <p>{destinationPlaceName.city}</p>
        <p>{destinationPlaceName.street}</p>
        <p>{destinationPlaceName.streetNumber}</p>
      </div>
    </div>
  );
}

export default AddressNames;
