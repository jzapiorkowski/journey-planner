import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddressForm from './components/addressForm/AddressForm';
import LinksBanner from './components/linksBanner/LinksBanner';
import Map from './components/map/Map';
import CurrentRouteContextProvider from './contexts/CurrentRouteContext';

function App() {
  return (
    <div className='App'>
      <header>JOURNEY COST CALCULATOR</header>
      <CurrentRouteContextProvider>
        <Routes>
          <Route path='/' element={<LinksBanner />} />
          <Route path='find-addresses' element={<AddressForm />} />
          <Route path='my-route' element={<Map />} />
        </Routes>
      </CurrentRouteContextProvider>
    </div>
  );
}

export default App;
