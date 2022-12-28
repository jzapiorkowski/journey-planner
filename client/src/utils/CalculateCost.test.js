import calculateCost from './CalculateCost';

test('tests if function properly calculates route cost', () => {
  expect(calculateCost(1470.89, 5)).toBe('17444.35');
});
