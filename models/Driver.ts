import { Timestamp, GeoPoint } from 'firebase/firestore';
import { User } from './User';

export interface Driver extends User {
  vehicleType: 'bike' | 'sedan' | 'van' | 'truck';
  vehiclePlate: string;
  licenseNumber: string;
  licenseUrl: string; // Firebase Storage
  vehiclePhotoUrl: string; // Firebase Storage
  idPhotoUrl: string; // Firebase Storage
  registrationUrl?: string | null; // Firebase Storage
  status: 'pending' | 'verified' | 'suspended' | 'inactive';
  rating: number; // 0-5, decimal
  totalTrips: number;
  totalEarnings: number;
  isOnline: boolean;
  currentLocation?: GeoPoint | null;
  lastLocationUpdate?: Timestamp | null;
}

export interface CreateDriverData {
  vehicleType: 'bike' | 'sedan' | 'van' | 'truck';
  vehiclePlate: string;
  licenseNumber: string;
  licenseUrl: string;
  vehiclePhotoUrl: string;
  idPhotoUrl: string;
  registrationUrl?: string | null;
}

export interface UpdateDriverData {
  vehicleType?: 'bike' | 'sedan' | 'van' | 'truck';
  vehiclePlate?: string;
  licenseNumber?: string;
  licenseUrl?: string;
  vehiclePhotoUrl?: string;
  idPhotoUrl?: string;
  registrationUrl?: string | null;
  isOnline?: boolean;
  currentLocation?: GeoPoint | null;
  lastLocationUpdate?: Timestamp | null;
}
