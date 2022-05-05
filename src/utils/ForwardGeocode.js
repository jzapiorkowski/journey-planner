import geolocationClient from '../api/GeolocationClient';

function ForwardGeocode(address) {
  let coordinates;

  const personalToken = ''; // put your mapbox personal access token here

  const formattedAddress = Object.values(address)
    .filter((notEmpty) => notEmpty)
    .join('+');

  return geolocationClient
    .get(`/${formattedAddress}.json?limit=1&access_token=${personalToken}`)
    .then((response) => {
      coordinates = response.data.features[0].geometry.coordinates.reverse();
      return coordinates;
    })
    .catch((error) => {
      console.log(error);
    });
}

export default ForwardGeocode;
