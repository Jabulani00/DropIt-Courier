export interface Vehicle {
  type: 'bike' | 'sedan' | 'van' | 'truck';
  name: string;
  description: string;
  baseFare: number;
  perKmRate: number;
  multiplier: number;
  maxWeight: number; // kg
  maxDimensions: {
    length: number; // cm
    width: number; // cm
    height: number; // cm
  };
  compatibleDeliveryTypes: ('parcel' | 'furniture' | 'food' | 'butchery' | 'hardware' | 'documents' | 'custom')[];
}

export const VEHICLE_TYPES: Record<string, Vehicle> = {
  bike: {
    type: 'bike',
    name: 'Motorcycle',
    description: 'Fast delivery for small packages',
    baseFare: 10,
    perKmRate: 2.5,
    multiplier: 1.0,
    maxWeight: 5,
    maxDimensions: { length: 40, width: 30, height: 20 },
    compatibleDeliveryTypes: ['parcel', 'documents', 'food']
  },
  sedan: {
    type: 'sedan',
    name: 'Car',
    description: 'Reliable delivery for medium packages',
    baseFare: 15,
    perKmRate: 3.0,
    multiplier: 1.2,
    maxWeight: 20,
    maxDimensions: { length: 100, width: 50, height: 40 },
    compatibleDeliveryTypes: ['parcel', 'food', 'butchery', 'documents']
  },
  van: {
    type: 'van',
    name: 'Van',
    description: 'Spacious delivery for large items',
    baseFare: 25,
    perKmRate: 4.5,
    multiplier: 1.5,
    maxWeight: 100,
    maxDimensions: { length: 200, width: 100, height: 80 },
    compatibleDeliveryTypes: ['parcel', 'furniture', 'hardware', 'butchery']
  },
  truck: {
    type: 'truck',
    name: 'Truck',
    description: 'Heavy-duty delivery for bulky items',
    baseFare: 40,
    perKmRate: 6.0,
    multiplier: 2.0,
    maxWeight: 500,
    maxDimensions: { length: 300, width: 150, height: 120 },
    compatibleDeliveryTypes: ['furniture', 'hardware', 'custom']
  }
};
