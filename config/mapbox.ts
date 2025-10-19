export const mapboxConfig = {
  accessToken: "pk.eyJ1IjoianRlY2hub2xvZ2llczg3IiwiYSI6ImNtZ2V4dTdoeDAyOXMyam9pMzU1cnFnMzQifQ.cC0nzHiEXKXRzY1eyZO7uw",
  styleURL: 'mapbox://styles/mapbox/streets-v12',
  defaultCenter: [-27.56, 31.03], // Durban coordinates
  defaultZoom: 12,
  maxBounds: [
    [28.0, 30.0], // Southwest
    [33.0, -26.0]  // Northeast (South Africa)
  ]
};

// Mapbox API endpoints
export const MAPBOX_API = {
  GEOCODING: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  DIRECTIONS: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  PLACES: 'https://api.mapbox.com/geocoding/v5/mapbox.places'
};

// Delivery pricing configuration
export const PRICING = {
  BASE_FARES: {
    bike: 10,
    sedan: 15,
    van: 25,
    truck: 40
  },
  PER_KM_RATES: {
    bike: 2.5,
    sedan: 3.0,
    van: 4.5,
    truck: 6.0
  },
  VEHICLE_MULTIPLIERS: {
    bike: 1.0,
    sedan: 1.2,
    van: 1.5,
    truck: 2.0
  },
  TYPE_MULTIPLIERS: {
    parcel: 1.0,
    furniture: 1.3,
    food: 1.1,
    butchery: 1.2,
    hardware: 1.25,
    documents: 0.9,
    custom: 1.0
  }
};
