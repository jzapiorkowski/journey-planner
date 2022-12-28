import geolocationClient from '../api/GeolocationClient';

function ForwardGeocode(address) {
  let coordinates;

  const personalToken = 'pk.eyJ1IjoianphcGlvcmtvd3NraSIsImEiOiJjbDJ3Z2gwc3UwOXBpM2tsb3lsOWxmemFqIn0.kgPVpNPC19xu2imLPWSW3Q'; // put your mapbox personal access token here

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
