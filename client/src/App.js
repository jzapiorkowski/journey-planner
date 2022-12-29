import { Route, Routes, Link } from 'react-router-dom';
import './app.scss';
import AddressForm from './routes/addressForm/AddressForm';
import AllRoutesList from './routes/allRoutesList/AllRoutesList';
import RouteSummary from './routes/routeSummary/RouteSummary';
import LinksBanner from './routes/linksBanner/LinksBanner';
import RouteNotFound from './routes/routeNotFound/RouteNotFound';

function App() {
  return (
    <div className='App'>
      <header>
        <Link to='/'>JOURNEY PLANNER</Link>
      </header>
      <Routes>
        <Route path='/' element={<LinksBanner />} />
        <Route path='find-addresses' element={<AddressForm />} />
        <Route path='my-routes' element={<AllRoutesList />} />
        <Route path='/route/:routeId' element={<RouteSummary />} />
        <Route path='/route/:routeId/edit' element={<AddressForm />} />
        <Route path='route-not-found' element={<RouteNotFound />} />
        <Route
          path='*'
          element={
            <p
              style={{
                textAlign: 'center',
                marginTop: '50px',
                fontSize: '30px',
              }}
            >
              Sorry, but we couldn't find the thing you were looking for
            </p>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
