import { Address } from './../Types/journey.type';
import axios from 'axios';

export interface Coordinates {
  longtitude: number;
  latitude: number;
  place_name: string;
}

export interface ErrorType {
  message: string;
  status: number;
}

async function ForwardGeocode(
  address: Address
): Promise<Coordinates | ErrorType> {
  const personalToken = process.env.MAPBOX_TOKEN;

  const formattedAddress = Object.values(address).join('+');

  try {
    const coordinates = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedAddress}.json?limit=1&access_token=${personalToken}`
    );

    if (coordinates.data.features.length === 0) {
      return { message: 'could not find', status: 404 };
    }

    const responseData = {
      longtitude: coordinates.data.features[0]?.geometry
        ?.coordinates[1] as number,
      latitude: coordinates.data.features[0]?.geometry
        ?.coordinates[0] as number,
      place_name: coordinates.data.features[0]?.place_name as string,
    };

    return responseData;
  } catch (error: any) {
    return {
      message: error.message as string,
      status: error.status as number,
    };
  }
}

export default ForwardGeocode;
