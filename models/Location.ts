export interface Location {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  placeId: string; // Mapbox place ID
}

export interface CreateLocationData {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  placeId: string;
}
