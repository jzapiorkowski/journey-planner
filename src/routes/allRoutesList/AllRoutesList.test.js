import AllRoutesList from './AllRoutesList';
import { render, screen } from '@testing-library/react';
import { allRoutesGeolocationsContext } from '../../contexts/AllRoutesContext';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('AllRoutesList', () => {
  test('check if renders properly with no routes found', () => {
    const history = createMemoryHistory();

    render(
      <allRoutesGeolocationsContext.Provider value={[]}>
        <Router location={history.location} navigator={history}>
          <AllRoutesList />
        </Router>
      </allRoutesGeolocationsContext.Provider>
    );

    expect(screen.getByText('My Trips')).toBeInTheDocument();
  });

  test('check if renders properly with routes found', () => {
    const history = createMemoryHistory();

    render(
      <allRoutesGeolocationsContext.Provider
        value={[[50.432248, 16.651331], [50.430717, 16.645012], 2]}
      >
        <Router location={history.location} navigator={history}>
          <AllRoutesList />
        </Router>
      </allRoutesGeolocationsContext.Provider>
    );

    expect(screen.getByText('My Trips')).toBeInTheDocument();

    expect(screen.getByText('Trip 1')).toBeInTheDocument();
  });
});
