import { Route, Routes } from 'react-router-dom';
import './App.css';
import FindRoute from './components/findRoute/FindRoute';
import LinksBanner from './components/linksBanner/LinksBanner';
import Map from './components/map/Map';

function App() {
  return (
    <div className='App'>
      <header>JOURNEY COST CALCULATOR</header>
      <Routes>
        <Route path='/' element={<LinksBanner />} />
        <Route path='find-addresses' element={<FindRoute />} />
        <Route path='my-route' element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
