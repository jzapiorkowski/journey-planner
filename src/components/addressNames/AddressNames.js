import React from 'react';

function AddressNames({ originPlaceName, destinationPlaceName }) {
  return (
    <div>
      <div className='address' id='origin-address'>
        <h3>Origin Address</h3>
        {originPlaceName.map((element, index) => {
          return <p key={index}>{element}</p>;
        })}
      </div>
      <div className='address' id='destination-address'>
        <h3>Destination Address</h3>
        {destinationPlaceName.map((element, index) => {
          return <p key={index}>{element}</p>;
        })}
      </div>
    </div>
  );
}

export default AddressNames;
