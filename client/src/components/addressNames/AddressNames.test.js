import AddressNames from './AddressNames';
import { render, screen } from '@testing-library/react';

describe('AddressNames', () => {
  test('check if renders properly', () => {
    render(
      <AddressNames
        originPlaceName={['12 Passage Des Arts', '75014 Paris', 'France']}
        destinationPlaceName={['8121', 'Tác', 'Fejér', 'Hungary']}
      />
    );

    expect(screen.getByText('Origin Address')).toBeInTheDocument();
    expect(screen.getByText('12 Passage Des Arts')).toBeInTheDocument();
    expect(screen.getByText('75014 Paris')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();

    expect(screen.getByText('Destination Address')).toBeInTheDocument();
    expect(screen.getByText('8121')).toBeInTheDocument();
    expect(screen.getByText('Tác')).toBeInTheDocument();
    expect(screen.getByText('Fejér')).toBeInTheDocument();
    expect(screen.getByText('Hungary')).toBeInTheDocument();
  });
});
