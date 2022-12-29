export interface Address {
  country: string;
  city: string;
  street: string;
  streetNumber: string;
}

interface Place {
  place_name: string;
  address: Address;
  coordinates: {
    longtitude: number;
    latitude: number;
  };
}

export interface Journey {
  userLogin: string;
  id: string;
  origin: Place;
  destination: Place;
}
