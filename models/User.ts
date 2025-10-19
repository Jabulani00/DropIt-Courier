import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string; // Firebase Auth UID
  email: string;
  phone: string; // E.164 format
  name: string;
  role: 'customer' | 'driver' | 'admin';
  profileUrl?: string | null; // Firebase Storage URL
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
  deviceToken?: string | null; // for push notifications
}

export interface CreateUserData {
  email: string;
  phone: string;
  name: string;
  role: 'customer' | 'driver' | 'admin';
  profileUrl?: string | null;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  profileUrl?: string | null;
  deviceToken?: string | null;
}
