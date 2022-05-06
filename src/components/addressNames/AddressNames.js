import React from 'react';
import './addressNames.scss';

function AddressNames({ originPlaceName, destinationPlaceName }) {
  return (
    <div className='addresses'>
      <div className='address' id='origin-address'>
        <h2>Origin Address</h2>
        {originPlaceName.map((element, index) => {
          return <p key={index}>{element}</p>;
        })}
      </div>
      <div className='address' id='destination-address'>
        <h2>Destination Address</h2>
        {destinationPlaceName.map((element, index) => {
          return <p key={index}>{element}</p>;
        })}
      </div>
    </div>
  );
}

export default AddressNames;
