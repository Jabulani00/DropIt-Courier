import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  Timestamp 
} from 'firebase/firestore';
import { BaseService, ServiceError } from './base.service';
import { Delivery, CreateDeliveryData, UpdateDeliveryData } from '../models/Delivery';
import { PRICING } from '../config/mapbox';

export class DeliveryService extends BaseService {
  
  async createDelivery(deliveryData: CreateDeliveryData): Promise<string> {
    try {
      this.validateInput(deliveryData, {
        deliveryType: { required: true, type: 'string' },
        vehicleType: { required: true, type: 'string' },
        pickup: { required: true, type: 'object' },
        dropoff: { required: true, type: 'object' },
        parcelDescription: { required: true, type: 'string', minLength: 1 }
      });

      // Calculate price using pricing formula
      const priceBreakdown = this.calculatePrice(
        deliveryData.distance,
        deliveryData.vehicleType,
        deliveryData.deliveryType
      );

      const delivery: Omit<Delivery, 'id'> = {
        ...deliveryData,
        baseFare: priceBreakdown.baseFare,
        distanceFare: priceBreakdown.distanceFare,
        totalCost: priceBreakdown.total,
        status: 'pending',
        createdAt: Timestamp.now(),
        acceptedAt: null,
        pickedUpAt: null,
        deliveredAt: null,
        cancelledAt: null,
        cancellationReason: null,
        proofOfDeliveryUrl: null,
        driverNotes: null
      };

      const docRef = await addDoc(collection(this.db, 'deliveries'), delivery);
      
      // Trigger driver matching Cloud Function would be called here
      // await this.triggerDriverMatching(docRef.id);
      
      return docRef.id;
    } catch (error) {
      this.handleError(error, 'createDelivery');
    }
  }

  async updateDeliveryStatus(
    deliveryId: string, 
    status: Delivery['status'], 
    updateData: UpdateDeliveryData = {}
  ): Promise<void> {
    try {
      const updateFields: any = {
        status,
        updatedAt: Timestamp.now()
      };

      // Add timestamp fields based on status
      switch (status) {
        case 'accepted':
          updateFields.acceptedAt = Timestamp.now();
          break;
        case 'picked_up':
          updateFields.pickedUpAt = Timestamp.now();
          break;
        case 'delivered':
          updateFields.deliveredAt = Timestamp.now();
          break;
        case 'cancelled':
          updateFields.cancelledAt = Timestamp.now();
          break;
      }

      // Merge with additional update data
      Object.assign(updateFields, updateData);

      await updateDoc(doc(this.db, 'deliveries', deliveryId), updateFields);

      // Send notifications based on status change
      // await this.sendStatusNotification(deliveryId, status);
    } catch (error) {
      this.handleError(error, 'updateDeliveryStatus');
    }
  }

  async cancelDelivery(deliveryId: string, reason: string): Promise<void> {
    try {
      const deliveryDoc = await getDoc(doc(this.db, 'deliveries', deliveryId));
      
      if (!deliveryDoc.exists()) {
        throw new ServiceError('DELIVERY_NOT_FOUND', 'Delivery not found', 404);
      }

      const delivery = deliveryDoc.data() as Delivery;
      
      // Check if cancellation is allowed
      if (delivery.status === 'delivered') {
        throw new ServiceError('CANNOT_CANCEL', 'Cannot cancel delivered delivery', 400);
      }

      await this.updateDeliveryStatus(deliveryId, 'cancelled', {
        cancellationReason: reason
      });
    } catch (error) {
      this.handleError(error, 'cancelDelivery');
    }
  }

  async getDeliveryById(deliveryId: string): Promise<Delivery> {
    try {
      const deliveryDoc = await getDoc(doc(this.db, 'deliveries', deliveryId));
      
      if (!deliveryDoc.exists()) {
        throw new ServiceError('DELIVERY_NOT_FOUND', 'Delivery not found', 404);
      }

      return {
        id: deliveryDoc.id,
        ...deliveryDoc.data()
      } as Delivery;
    } catch (error) {
      this.handleError(error, 'getDeliveryById');
    }
  }

  async getCustomerDeliveries(
    customerId: string, 
    filters: { status?: string[], limit?: number } = {}
  ): Promise<Delivery[]> {
    try {
      let q = query(
        collection(this.db, 'deliveries'),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );

      if (filters.status && filters.status.length > 0) {
        q = query(q, where('status', 'in', filters.status));
      }

      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Delivery[];
    } catch (error) {
      this.handleError(error, 'getCustomerDeliveries');
    }
  }

  async getDriverDeliveries(
    driverId: string, 
    filters: { status?: string[], limit?: number } = {}
  ): Promise<Delivery[]> {
    try {
      let q = query(
        collection(this.db, 'deliveries'),
        where('driverId', '==', driverId),
        orderBy('createdAt', 'desc')
      );

      if (filters.status && filters.status.length > 0) {
        q = query(q, where('status', 'in', filters.status));
      }

      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Delivery[];
    } catch (error) {
      this.handleError(error, 'getDriverDeliveries');
    }
  }

  calculatePrice(
    distance: number, 
    vehicleType: Delivery['vehicleType'], 
    deliveryType: Delivery['deliveryType']
  ): { baseFare: number; distanceFare: number; total: number } {
    const baseFare = PRICING.BASE_FARES[vehicleType];
    const perKmRate = PRICING.PER_KM_RATES[vehicleType];
    const vehicleMultiplier = PRICING.VEHICLE_MULTIPLIERS[vehicleType];
    const typeMultiplier = PRICING.TYPE_MULTIPLIERS[deliveryType];

    const distanceFare = perKmRate * distance;
    const total = baseFare + distanceFare + (vehicleMultiplier * typeMultiplier);

    return {
      baseFare: Math.round(baseFare * 100) / 100,
      distanceFare: Math.round(distanceFare * 100) / 100,
      total: Math.round(total * 100) / 100
    };
  }
}
