import RouteNotFound from './RouteNotFound';
import { render, screen } from '@testing-library/react';

describe('RouteNotFound', () => {
  test('test if renders properly', () => {
    render(<RouteNotFound />);

    expect(
      screen.getByText(
        "Sorry, but we could't find the route you were looking for"
      )
    ).toBeInTheDocument();
  });
});
