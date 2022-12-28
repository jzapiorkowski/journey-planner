# JOURNEY PLANNER

Journey planner is a website where a user can search for a route by providing origin and destination address. \
User is given info with a route, distance, and estimated cost of chosen trip. All the routes searched by the user are saved in the app.

## You can check the demo [here](https://jzapiorkowski.github.io/journey-planner/)

Website is based on [mapbox geolocation api](https://docs.mapbox.com/help/getting-started/geocoding/) so in order to work properly you need to run the app on your computer and provide your [mapbox](https://mapbox.com) personal access token in

**src/utils/ForwardGocode.js** and **src/utils/ReverseGeocode.js**

```javascript
const personalToken = ''; // put your mapbox personal access token here
```

Then use one of the following commands to run the app:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
