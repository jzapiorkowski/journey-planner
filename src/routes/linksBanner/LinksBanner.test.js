import { render, screen } from '@testing-library/react';
import LinksBanner from './LinksBanner';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('test if renders properly', () => {
  const history = createMemoryHistory();

  render(
    <Router location={history.location} navigator={history}>
      <LinksBanner />
    </Router>
  );

  expect(screen.getByText('FIND NEW ROUTE')).toHaveAttribute(
    'href',
    '/find-addresses'
  );
  expect(screen.getByText('CHECK MY ROUTES')).toHaveAttribute(
    'href',
    '/my-routes'
  );
});
