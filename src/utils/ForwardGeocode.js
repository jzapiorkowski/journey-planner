import geolocationClient from '../api/GeolocationClient';

function ForwardGeocode(address) {
  let coordinates;

  const personalToken = ''; // put your mapbox personal access token here

  const formattedAddress = Object.values(address)
    .filter((notEmpty) => notEmpty)
    .join('+');

  geolocationClient
    .get(`/${formattedAddress}.json?limit=1&access_token=${personalToken}`)
    .then((response) => {
      coordinates = response.data.features[0].geometry.coordinates.reverse();
    })
    .catch((error) => {
      console.log(error);
    });

  return coordinates;
}

export default ForwardGeocode;
