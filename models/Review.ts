import { Timestamp } from 'firebase/firestore';

export interface Review {
  id: string;
  deliveryId: string;
  customerId: string;
  driverId: string;
  rating: number; // 1-5, integer only
  comment?: string | null;
  createdAt: Timestamp;
  isVisible: boolean; // admin can hide inappropriate reviews
}

export interface CreateReviewData {
  deliveryId: string;
  customerId: string;
  driverId: string;
  rating: number;
  comment?: string | null;
}

export interface UpdateReviewData {
  comment?: string | null;
  isVisible?: boolean;
}
