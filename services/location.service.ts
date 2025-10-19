import { BaseService, ServiceError } from './base.service';
import { MAPBOX_API } from '../config/mapbox';

export interface GeocodeResult {
  coordinates: { latitude: number; longitude: number };
  formattedAddress: string;
  placeId: string;
}

export interface AutocompleteResult {
  id: string;
  text: string;
  placeId: string;
  coordinates: { latitude: number; longitude: number };
}

export interface RouteResult {
  distance: number; // km
  duration: number; // minutes
  polyline: string;
  instructions: Array<{
    instruction: string;
    distance: number;
    duration: number;
  }>;
}

export class LocationService extends BaseService {
  private readonly apiToken = "pk.eyJ1IjoianRlY2hub2xvZ2llczg3IiwiYSI6ImNtZ2V4dTdoeDAyOXMyam9pMzU1cnFnMzQifQ.cC0nzHiEXKXRzY1eyZO7uw";

  async geocodeAddress(address: string): Promise<GeocodeResult> {
    try {
      this.validateInput({ address }, {
        address: { required: true, type: 'string', minLength: 1 }
      });

      const encodedAddress = encodeURIComponent(address);
      const url = `${MAPBOX_API.GEOCODING}/${encodedAddress}.json?access_token=${this.apiToken}&limit=1`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new ServiceError('GEOCODING_FAILED', 'Failed to geocode address', response.status);
      }

      const data = await response.json();
      
      if (!data.features || data.features.length === 0) {
        throw new ServiceError('ADDRESS_NOT_FOUND', 'Address not found', 404);
      }

      const feature = data.features[0];
      
      return {
        coordinates: {
          longitude: feature.center[0],
          latitude: feature.center[1]
        },
        formattedAddress: feature.place_name,
        placeId: feature.id
      };
    } catch (error) {
      this.handleError(error, 'geocodeAddress');
    }
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    try {
      this.validateInput({ latitude, longitude }, {
        latitude: { required: true, type: 'number' },
        longitude: { required: true, type: 'number' }
      });

      const url = `${MAPBOX_API.GEOCODING}/${longitude},${latitude}.json?access_token=${this.apiToken}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new ServiceError('REVERSE_GEOCODING_FAILED', 'Failed to reverse geocode', response.status);
      }

      const data = await response.json();
      
      if (!data.features || data.features.length === 0) {
        throw new ServiceError('LOCATION_NOT_FOUND', 'Location not found', 404);
      }

      return data.features[0].place_name;
    } catch (error) {
      this.handleError(error, 'reverseGeocode');
    }
  }

  async autocompleteSearch(query: string, proximity?: { latitude: number; longitude: number }): Promise<AutocompleteResult[]> {
    try {
      this.validateInput({ query }, {
        query: { required: true, type: 'string', minLength: 1 }
      });

      const encodedQuery = encodeURIComponent(query);
      let url = `${MAPBOX_API.PLACES}/${encodedQuery}.json?access_token=${this.apiToken}&limit=5`;
      
      if (proximity) {
        url += `&proximity=${proximity.longitude},${proximity.latitude}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new ServiceError('AUTOCOMPLETE_FAILED', 'Failed to search addresses', response.status);
      }

      const data = await response.json();
      
      return data.features.map((feature: any) => ({
        id: feature.id,
        text: feature.place_name,
        placeId: feature.id,
        coordinates: {
          longitude: feature.center[0],
          latitude: feature.center[1]
        }
      }));
    } catch (error) {
      this.handleError(error, 'autocompleteSearch');
    }
  }

  async getRoute(
    pickup: { latitude: number; longitude: number },
    dropoff: { latitude: number; longitude: number }
  ): Promise<RouteResult> {
    try {
      this.validateInput({ pickup, dropoff }, {
        pickup: { required: true, type: 'object' },
        dropoff: { required: true, type: 'object' }
      });

      const coordinates = `${pickup.longitude},${pickup.latitude};${dropoff.longitude},${dropoff.latitude}`;
      const url = `${MAPBOX_API.DIRECTIONS}/${coordinates}?access_token=${this.apiToken}&geometries=polyline&steps=true`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new ServiceError('ROUTE_FAILED', 'Failed to calculate route', response.status);
      }

      const data = await response.json();
      
      if (!data.routes || data.routes.length === 0) {
        throw new ServiceError('NO_ROUTE_FOUND', 'No route found between locations', 404);
      }

      const route = data.routes[0];
      
      return {
        distance: route.distance / 1000, // Convert to km
        duration: Math.round(route.duration / 60), // Convert to minutes
        polyline: route.geometry,
        instructions: route.legs[0].steps.map((step: any) => ({
          instruction: step.maneuver.instruction,
          distance: step.distance / 1000,
          duration: step.duration / 60
        }))
      };
    } catch (error) {
      this.handleError(error, 'getRoute');
    }
  }

  calculateDistance(
    point1: { latitude: number; longitude: number },
    point2: { latitude: number; longitude: number }
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(point2.latitude - point1.latitude);
    const dLon = this.toRadians(point2.longitude - point1.longitude);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.latitude)) * 
      Math.cos(this.toRadians(point2.latitude)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
