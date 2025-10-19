import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { colors, typography, spacing } from '../../config/theme';

const { width } = Dimensions.get('window');

interface DeliveryType {
  id: string;
  name: string;
  description: string;
  icon: string;
  compatibleVehicles: string[];
}

interface VehicleType {
  id: string;
  name: string;
  baseFare: number;
  perKmRate: number;
  icon: string;
}

export default function CreateDeliveryScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<string | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [parcelDescription, setParcelDescription] = useState('');
  const [parcelWeight, setParcelWeight] = useState('');
  const [isFragile, setIsFragile] = useState(false);
  const [customerNotes, setCustomerNotes] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const deliveryTypes: DeliveryType[] = [
    {
      id: 'parcel',
      name: 'Small Parcel',
      description: 'Fits in bike/sedan',
      icon: 'package',
      compatibleVehicles: ['bike', 'sedan', 'van'],
    },
    {
      id: 'furniture',
      name: 'Furniture',
      description: 'Requires van/truck',
      icon: 'truck',
      compatibleVehicles: ['van', 'truck'],
    },
    {
      id: 'food',
      name: 'Food',
      description: 'Quick delivery',
      icon: 'clock',
      compatibleVehicles: ['bike', 'sedan'],
    },
    {
      id: 'butchery',
      name: 'Butchery',
      description: 'Cold chain required',
      icon: 'shield',
      compatibleVehicles: ['sedan', 'van'],
    },
    {
      id: 'hardware',
      name: 'Hardware',
      description: 'Heavy items',
      icon: 'package',
      compatibleVehicles: ['van', 'truck'],
    },
    {
      id: 'documents',
      name: 'Documents',
      description: 'Secure delivery',
      icon: 'shield',
      compatibleVehicles: ['bike', 'sedan'],
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Special requirements',
      icon: 'settings',
      compatibleVehicles: ['bike', 'sedan', 'van', 'truck'],
    },
  ];

  const vehicleTypes: VehicleType[] = [
    {
      id: 'bike',
      name: 'Bike',
      baseFare: 10,
      perKmRate: 2.5,
      icon: 'navigation',
    },
    {
      id: 'sedan',
      name: 'Sedan',
      baseFare: 15,
      perKmRate: 3.0,
      icon: 'truck',
    },
    {
      id: 'van',
      name: 'Van',
      baseFare: 25,
      perKmRate: 4.5,
      icon: 'truck',
    },
    {
      id: 'truck',
      name: 'Truck',
      baseFare: 40,
      perKmRate: 6.0,
      icon: 'truck',
    },
  ];

  const getCompatibleVehicles = () => {
    if (!selectedDeliveryType) return vehicleTypes;
    const deliveryType = deliveryTypes.find(dt => dt.id === selectedDeliveryType);
    return vehicleTypes.filter(vt => deliveryType?.compatibleVehicles.includes(vt.id));
  };

  const calculatePrice = () => {
    if (!selectedVehicleType) return 0;
    const vehicle = vehicleTypes.find(vt => vt.id === selectedVehicleType);
    if (!vehicle) return 0;
    
    // Mock distance calculation (replace with real Mapbox API)
    const mockDistance = 5; // km
    const baseFare = vehicle.baseFare;
    const distanceFare = vehicle.perKmRate * mockDistance;
    const total = baseFare + distanceFare;
    
    setEstimatedPrice(total);
    return total;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Creating delivery:', {
      deliveryType: selectedDeliveryType,
      vehicleType: selectedVehicleType,
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      description: parcelDescription,
      weight: parcelWeight,
      fragile: isFragile,
      notes: customerNotes,
      price: estimatedPrice,
    });
    // TODO: Implement delivery creation
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step && styles.activeStepCircle,
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step && styles.activeStepNumber,
            ]}>
              {step}
            </Text>
          </View>
          {step < 3 && (
            <View style={[
              styles.stepLine,
              currentStep > step && styles.activeStepLine,
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Select Delivery Type</Text>
      <View style={styles.deliveryTypesGrid}>
        {deliveryTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.deliveryTypeCard,
              selectedDeliveryType === type.id && styles.selectedDeliveryTypeCard,
            ]}
            onPress={() => setSelectedDeliveryType(type.id)}
          >
            <Icon
              name={type.icon as any}
              size={32}
              color={selectedDeliveryType === type.id ? colors.text.inverse : colors.primary}
            />
            <Text style={[
              styles.deliveryTypeName,
              selectedDeliveryType === type.id && styles.selectedDeliveryTypeName,
            ]}>
              {type.name}
            </Text>
            <Text style={[
              styles.deliveryTypeDescription,
              selectedDeliveryType === type.id && styles.selectedDeliveryTypeDescription,
            ]}>
              {type.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Pickup & Dropoff Locations</Text>
      
      <Input
        label="Pickup Location"
        placeholder="Enter pickup address"
        value={pickupLocation}
        onChangeText={setPickupLocation}
        leftIcon={<Icon name="mapPin" size={20} color={colors.text.light} />}
      />

      <TouchableOpacity style={styles.currentLocationButton}>
        <Icon name="navigation" size={20} color={colors.primary} />
        <Text style={styles.currentLocationText}>Use Current Location</Text>
      </TouchableOpacity>

      <Input
        label="Dropoff Location"
        placeholder="Enter dropoff address"
        value={dropoffLocation}
        onChangeText={setDropoffLocation}
        leftIcon={<Icon name="mapPin" size={20} color={colors.text.light} />}
      />

      {/* Mock Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Icon name="map" size={48} color={colors.text.light} />
        <Text style={styles.mapPlaceholderText}>Map will show route here</Text>
      </View>

      <View style={styles.routeInfo}>
        <Text style={styles.routeInfoText}>Distance: 5.2 km</Text>
        <Text style={styles.routeInfoText}>ETA: 15 minutes</Text>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Delivery Details</Text>

      <Input
        label="Parcel Description"
        placeholder="Describe what you're sending"
        value={parcelDescription}
        onChangeText={setParcelDescription}
        multiline
        numberOfLines={3}
      />

      <Input
        label="Weight (kg)"
        placeholder="Enter weight (optional)"
        value={parcelWeight}
        onChangeText={setParcelWeight}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setIsFragile(!isFragile)}
      >
        <View style={styles.checkbox}>
          {isFragile && <Icon name="check" size={16} color={colors.text.inverse} />}
        </View>
        <Text style={styles.checkboxText}>Is this item fragile?</Text>
      </TouchableOpacity>

      <Text style={styles.vehicleTypeTitle}>Vehicle Type</Text>
      <View style={styles.vehicleTypesContainer}>
        {getCompatibleVehicles().map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleTypeCard,
              selectedVehicleType === vehicle.id && styles.selectedVehicleTypeCard,
            ]}
            onPress={() => {
              setSelectedVehicleType(vehicle.id);
              calculatePrice();
            }}
          >
            <Icon
              name={vehicle.icon as any}
              size={24}
              color={selectedVehicleType === vehicle.id ? colors.text.inverse : colors.primary}
            />
            <Text style={[
              styles.vehicleTypeName,
              selectedVehicleType === vehicle.id && styles.selectedVehicleTypeName,
            ]}>
              {vehicle.name}
            </Text>
            <Text style={[
              styles.vehicleTypeRate,
              selectedVehicleType === vehicle.id && styles.selectedVehicleTypeRate,
            ]}>
              R{vehicle.baseFare} + R{vehicle.perKmRate}/km
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Input
        label="Special Instructions (Optional)"
        placeholder="Any special notes for the driver"
        value={customerNotes}
        onChangeText={setCustomerNotes}
        multiline
        numberOfLines={2}
      />

      {/* Price Estimate */}
      <Card style={styles.priceCard}>
        <Text style={styles.priceTitle}>Price Estimate</Text>
        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base Fare:</Text>
            <Text style={styles.priceValue}>R{selectedVehicleType ? vehicleTypes.find(vt => vt.id === selectedVehicleType)?.baseFare : 0}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Distance (5.2km):</Text>
            <Text style={styles.priceValue}>R{selectedVehicleType ? (vehicleTypes.find(vt => vt.id === selectedVehicleType)?.perKmRate || 0) * 5.2 : 0}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalPriceRow]}>
            <Text style={styles.totalPriceLabel}>Total:</Text>
            <Text style={styles.totalPriceValue}>R{estimatedPrice.toFixed(2)}</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Go back')}>
          <Icon name="arrowLeft" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Delivery</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {renderStepIndicator()}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <View style={styles.navigationButtons}>
          {currentStep > 1 && (
            <Button
              variant="outline"
              size="lg"
              onPress={handlePrevious}
              style={styles.previousButton}
            >
              Previous
            </Button>
          )}
          
          <Button
            variant="primary"
            size="lg"
            onPress={currentStep < 3 ? handleNext : handleSubmit}
            disabled={
              (currentStep === 1 && !selectedDeliveryType) ||
              (currentStep === 2 && (!pickupLocation || !dropoffLocation)) ||
              (currentStep === 3 && !selectedVehicleType)
            }
            style={styles.nextButton}
          >
            {currentStep < 3 ? 'Next' : 'Confirm & Request Driver'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundDark,
  },
  headerTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepCircle: {
    backgroundColor: colors.primary,
  },
  stepNumber: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    color: colors.text.light,
    fontWeight: typography.weights.bold,
  },
  activeStepNumber: {
    color: colors.text.inverse,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: colors.backgroundDark,
    marginHorizontal: spacing.sm,
  },
  activeStepLine: {
    backgroundColor: colors.primary,
  },
  stepContent: {
    marginBottom: spacing.xl,
  },
  stepTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.lg,
  },
  deliveryTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  deliveryTypeCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDeliveryTypeCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  deliveryTypeName: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  selectedDeliveryTypeName: {
    color: colors.text.inverse,
  },
  deliveryTypeDescription: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  selectedDeliveryTypeDescription: {
    color: colors.text.inverse,
    opacity: 0.9,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
  },
  currentLocationText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: colors.backgroundDark,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  mapPlaceholderText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    marginTop: spacing.sm,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  routeInfoText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  checkboxText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },
  vehicleTypeTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
  vehicleTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  vehicleTypeCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedVehicleTypeCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  vehicleTypeName: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginTop: spacing.sm,
  },
  selectedVehicleTypeName: {
    color: colors.text.inverse,
  },
  vehicleTypeRate: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  selectedVehicleTypeRate: {
    color: colors.text.inverse,
    opacity: 0.9,
  },
  priceCard: {
    marginTop: spacing.md,
  },
  priceTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
  priceBreakdown: {
    gap: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceRow: {
    borderTopWidth: 1,
    borderTopColor: colors.backgroundDark,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
  priceLabel: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
  },
  priceValue: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
  },
  totalPriceLabel: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
  },
  totalPriceValue: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  previousButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});