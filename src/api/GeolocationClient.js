const axios = require('axios').default;

const geolocationClient = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
});

export default geolocationClient;
