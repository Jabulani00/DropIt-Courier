import { Timestamp } from 'firebase/firestore';
import { Location } from './Location';

export interface Delivery {
  id: string; // auto-generated
  customerId: string; // User UID
  driverId?: string | null; // Driver UID
  deliveryType: 'parcel' | 'furniture' | 'food' | 'butchery' | 'hardware' | 'documents' | 'custom';
  vehicleType: 'bike' | 'sedan' | 'van' | 'truck';
  pickup: Location;
  dropoff: Location;
  distance: number; // kilometers, 2 decimal places
  estimatedDuration: number; // minutes
  baseFare: number; // Rands
  distanceFare: number; // Rands
  totalCost: number; // Rands
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  parcelDescription: string;
  parcelWeight?: number | null; // kg
  isFragile: boolean;
  scheduledTime?: Timestamp | null;
  createdAt: Timestamp;
  acceptedAt?: Timestamp | null;
  pickedUpAt?: Timestamp | null;
  deliveredAt?: Timestamp | null;
  cancelledAt?: Timestamp | null;
  cancellationReason?: string | null;
  proofOfDeliveryUrl?: string | null; // signature/photo
  driverNotes?: string | null;
  customerNotes?: string | null;
}

export interface CreateDeliveryData {
  deliveryType: 'parcel' | 'furniture' | 'food' | 'butchery' | 'hardware' | 'documents' | 'custom';
  vehicleType: 'bike' | 'sedan' | 'van' | 'truck';
  pickup: Location;
  dropoff: Location;
  distance: number;
  estimatedDuration: number;
  baseFare: number;
  distanceFare: number;
  totalCost: number;
  parcelDescription: string;
  parcelWeight?: number | null;
  isFragile: boolean;
  scheduledTime?: Timestamp | null;
  customerNotes?: string | null;
}

export interface UpdateDeliveryData {
  driverId?: string | null;
  status?: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  acceptedAt?: Timestamp | null;
  pickedUpAt?: Timestamp | null;
  deliveredAt?: Timestamp | null;
  cancelledAt?: Timestamp | null;
  cancellationReason?: string | null;
  proofOfDeliveryUrl?: string | null;
  driverNotes?: string | null;
}
