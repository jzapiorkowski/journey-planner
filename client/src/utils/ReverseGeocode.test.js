import ReverseGeocode from './ReverseGeocode';

test('tests if function given address returns proper geolocation', async () => {
  const getAddressName = await ReverseGeocode([52.239416, 21.045672]);
  expect(getAddressName).toBe(
    'Aleja Księcia Józefa Poniatowskiego 1, 03-901 Warsaw, Masovian Voivodeship, Poland'
  );
});
