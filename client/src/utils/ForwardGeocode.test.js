import ForwardGeocode from './ForwardGeocode';

test('tests if function given address returns proper geolocation', async () => {
  const geolocationOfAddress = await ForwardGeocode({
    country: 'poland',
    city: 'warszawa',
    street: 'Księcia Józefa Poniatowskiego',
    streetNumber: '1',
  });

  expect(geolocationOfAddress).toStrictEqual([52.239416, 21.045672]);
});
