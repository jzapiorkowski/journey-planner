import { Route, Routes, Link } from 'react-router-dom';
import './app.scss';
import AddressForm from './components/addressForm/AddressForm';
import AllRoutesList from './components/allRoutesList/AllRoutesList';
import FoundRouteSummary from './components/foundRouteSummary/FoundRouteSummary';
import LinksBanner from './components/linksBanner/LinksBanner';
import RouteNotFound from './components/routeNotFound/RouteNotFound';
import AllRoutesContextProvider from './contexts/AllRoutesContext';

function App() {
  return (
    <div className='App'>
      <header>
        <Link to='/'>JOURNEY COST CALCULATOR</Link>
      </header>
      <AllRoutesContextProvider>
        <Routes>
          <Route path='/' element={<LinksBanner />} />
          <Route path='find-addresses' element={<AddressForm />} />
          <Route path='my-route' element={<FoundRouteSummary />} />
          <Route path='my-routes' element={<AllRoutesList />} />
          <Route path='/route/:routeId' element={<FoundRouteSummary />} />
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
      </AllRoutesContextProvider>
    </div>
  );
}

export default App;
