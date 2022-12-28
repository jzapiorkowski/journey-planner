import geolocationClient from '../api/GeolocationClient';

function ReverseGeocode(address) {
  const personalToken = 'pk.eyJ1IjoianphcGlvcmtvd3NraSIsImEiOiJjbDJ3Z2gwc3UwOXBpM2tsb3lsOWxmemFqIn0.kgPVpNPC19xu2imLPWSW3Q'; // put your mapbox personal access token here

  let formattedAddress = [...address];
  formattedAddress = formattedAddress.reverse().join(',');

  return geolocationClient
    .get(`/${formattedAddress}.json?access_token=${personalToken}`)
    .then((response) => {
      return response.data.features[0].place_name;
    })
    .catch((error) => {
      console.log(error);
    });
}

export default ReverseGeocode;
