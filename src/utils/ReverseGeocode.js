import geolocationClient from '../api/GeolocationClient';

function ReverseGeocode(address) {
  const personalToken = ''; // put your mapbox personal access token here

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
