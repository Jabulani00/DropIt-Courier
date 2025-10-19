import { useState, useEffect } from 'react';
import { Delivery } from '../models/Delivery';
import { DeliveryService } from '../services/delivery.service';

export function useDeliveries(customerId?: string, driverId?: string) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const deliveryService = new DeliveryService();

  useEffect(() => {
    if (customerId || driverId) {
      loadDeliveries();
    }
  }, [customerId, driverId]);

  const loadDeliveries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let fetchedDeliveries: Delivery[];
      
      if (customerId) {
        fetchedDeliveries = await deliveryService.getCustomerDeliveries(customerId);
      } else if (driverId) {
        fetchedDeliveries = await deliveryService.getDriverDeliveries(driverId);
      } else {
        throw new Error('Either customerId or driverId must be provided');
      }
      
      setDeliveries(fetchedDeliveries);
    } catch (err: any) {
      setError(err.message || 'Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  const createDelivery = async (deliveryData: any) => {
    try {
      setLoading(true);
      const deliveryId = await deliveryService.createDelivery(deliveryData);
      await loadDeliveries(); // Refresh the list
      return deliveryId;
    } catch (err: any) {
      setError(err.message || 'Failed to create delivery');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryStatus = async (deliveryId: string, status: any, updateData?: any) => {
    try {
      await deliveryService.updateDeliveryStatus(deliveryId, status, updateData);
      await loadDeliveries(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Failed to update delivery');
      throw err;
    }
  };

  const cancelDelivery = async (deliveryId: string, reason: string) => {
    try {
      await deliveryService.cancelDelivery(deliveryId, reason);
      await loadDeliveries(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Failed to cancel delivery');
      throw err;
    }
  };

  return {
    deliveries,
    loading,
    error,
    loadDeliveries,
    createDelivery,
    updateDeliveryStatus,
    cancelDelivery,
  };
}

export function useActiveDelivery(deliveryId: string) {
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const deliveryService = new DeliveryService();

  useEffect(() => {
    if (deliveryId) {
      loadDelivery();
    }
  }, [deliveryId]);

  const loadDelivery = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedDelivery = await deliveryService.getDeliveryById(deliveryId);
      setDelivery(fetchedDelivery);
    } catch (err: any) {
      setError(err.message || 'Failed to load delivery');
    } finally {
      setLoading(false);
    }
  };

  const updateDelivery = async (updateData: any) => {
    try {
      await deliveryService.updateDeliveryStatus(deliveryId, updateData.status, updateData);
      await loadDelivery(); // Refresh the delivery
    } catch (err: any) {
      setError(err.message || 'Failed to update delivery');
      throw err;
    }
  };

  return {
    delivery,
    loading,
    error,
    loadDelivery,
    updateDelivery,
  };
}
