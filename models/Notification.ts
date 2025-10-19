import { Timestamp } from 'firebase/firestore';

export interface Notification {
  id: string;
  userId: string;
  type: 'delivery_request' | 'delivery_accepted' | 'delivery_picked_up' | 'delivery_in_transit' | 'delivery_delivered' | 'delivery_cancelled' | 'payment_received' | 'driver_verified' | 'system_announcement';
  title: string;
  body: string;
  data: Record<string, any>; // delivery ID, amount, etc.
  isRead: boolean;
  createdAt: Timestamp;
  expiresAt?: Timestamp | null;
}

export interface CreateNotificationData {
  userId: string;
  type: 'delivery_request' | 'delivery_accepted' | 'delivery_picked_up' | 'delivery_in_transit' | 'delivery_delivered' | 'delivery_cancelled' | 'payment_received' | 'driver_verified' | 'system_announcement';
  title: string;
  body: string;
  data: Record<string, any>;
  expiresAt?: Timestamp | null;
}

export interface UpdateNotificationData {
  isRead?: boolean;
}
