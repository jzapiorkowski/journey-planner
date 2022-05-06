import React, { useEffect, useState } from 'react';
import ReverseGeocode from '../../utils/ReverseGeocode';

function AddressNames({
  originAddressCoordinates,
  destinationAddressCoordinates,
}) {
  const [originPlaceName, setOriginPlaceName] = useState([]);
  const [destinationPlaceName, setDestinationPlaceName] = useState([]);

  useEffect(() => {
    ReverseGeocode(originAddressCoordinates).then((response) => {
      const tmp = response.split(', ');
      setOriginPlaceName(tmp);
    });

    ReverseGeocode(destinationAddressCoordinates).then((response) => {
      const tmp = response.split(', ');
      setDestinationPlaceName(tmp);
    });
  }, []);

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
