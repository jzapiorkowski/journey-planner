import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReverseGeocode from '../../utils/ReverseGeocode';

function ViewRoute() {
  const location = useLocation();
  const { originGeolocation, destinationGeolocation } = location.state;

  const [originPlaceName, setOriginPlaceName] = useState([]);
  const [destinationPlaceName, setDestinationPlaceName] = useState([]);

  useEffect(() => {
    ReverseGeocode(originGeolocation).then((response) => {
      const tmp = response.split(', ');
      setOriginPlaceName(tmp);
    });

    ReverseGeocode(destinationGeolocation).then((response) => {
      const tmp = response.split(', ');
      setDestinationPlaceName(tmp);
    });
  }, []);

  return (
    <div>
      <h1>Route summary</h1>
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

export default ViewRoute;
