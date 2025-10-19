import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { colors, typography, spacing } from '../../config/theme';

interface Delivery {
  id: string;
  type: string;
  pickup: string;
  dropoff: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  cost: number;
  createdAt: string;
}

export default function CustomerHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeDeliveries, setActiveDeliveries] = useState<Delivery[]>([]);
  const [recentDeliveries, setRecentDeliveries] = useState<Delivery[]>([]);

  // Mock data - replace with real data from Firestore
  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    // Mock data
    setActiveDeliveries([
      {
        id: '1',
        type: 'Parcel',
        pickup: '123 Main St, Durban',
        dropoff: '456 Oak Ave, Durban',
        status: 'in_transit',
        cost: 45.50,
        createdAt: '2024-01-15T10:30:00Z',
      },
    ]);

    setRecentDeliveries([
      {
        id: '2',
        type: 'Furniture',
        pickup: '789 Pine St, Durban',
        dropoff: '321 Elm St, Durban',
        status: 'delivered',
        cost: 120.00,
        createdAt: '2024-01-14T15:45:00Z',
      },
      {
        id: '3',
        type: 'Food',
        pickup: '555 Food Court, Durban',
        dropoff: '777 Office Building, Durban',
        status: 'delivered',
        cost: 25.00,
        createdAt: '2024-01-13T12:20:00Z',
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeliveries();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      pending: colors.delivery.pending,
      accepted: colors.delivery.accepted,
      picked_up: colors.delivery.pickedUp,
      in_transit: colors.delivery.inTransit,
      delivered: colors.delivery.delivered,
      cancelled: colors.delivery.cancelled,
    };
    return statusColors[status as keyof typeof statusColors] || colors.text.light;
  };

  const getStatusText = (status: string) => {
    const statusTexts = {
      pending: 'Pending',
      accepted: 'Driver Found',
      picked_up: 'Picked Up',
      in_transit: 'In Transit',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return statusTexts[status as keyof typeof statusTexts] || status;
  };

  const renderActiveDelivery = ({ item }: { item: Delivery }) => (
    <Card
      key={item.id}
      style={styles.deliveryCard}
      onPress={() => console.log('Track delivery', item.id)}
    >
      <View style={styles.deliveryHeader}>
        <View style={styles.deliveryTypeContainer}>
          <Icon name="package" size={20} color={colors.primary} />
          <Text style={styles.deliveryType}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <View style={styles.deliveryRoute}>
        <View style={styles.routePoint}>
          <View style={styles.pickupDot} />
          <Text style={styles.routeText} numberOfLines={1}>{item.pickup}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={styles.dropoffDot} />
          <Text style={styles.routeText} numberOfLines={1}>{item.dropoff}</Text>
        </View>
      </View>

      <View style={styles.deliveryFooter}>
        <Text style={styles.deliveryCost}>R{item.cost.toFixed(2)}</Text>
        <Button
          variant="outline"
          size="sm"
          onPress={() => console.log('Track delivery', item.id)}
        >
          Track
        </Button>
      </View>
    </Card>
  );

  const renderRecentDelivery = ({ item }: { item: Delivery }) => (
    <Card key={item.id} style={styles.recentDeliveryCard}>
      <View style={styles.recentDeliveryHeader}>
        <View style={styles.recentDeliveryInfo}>
          <Text style={styles.recentDeliveryDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.recentDeliveryRoute} numberOfLines={1}>
            {item.pickup} → {item.dropoff}
          </Text>
        </View>
        <View style={styles.recentDeliveryCost}>
          <Text style={styles.recentCostText}>R{item.cost.toFixed(2)}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hello, John!</Text>
              <Text style={styles.subGreeting}>Ready to send something?</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.notificationButton}>
                <Icon name="bell" size={24} color={colors.text.inverse} />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.avatarButton}>
                <Icon name="user" size={24} color={colors.text.inverse} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Create Delivery Button */}
        <View style={styles.createDeliveryContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={() => console.log('Create delivery')}
            icon={<Icon name="plus" size={24} color={colors.text.inverse} />}
            style={styles.createDeliveryButton}
          >
            Create Delivery
          </Button>
        </View>

        {/* Active Deliveries */}
        {activeDeliveries.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Deliveries</Text>
            <FlatList
              data={activeDeliveries}
              renderItem={renderActiveDelivery}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Recent Deliveries */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Deliveries</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentDeliveries}
            renderItem={renderRecentDelivery}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Icon name="calendar" size={24} color={colors.primary} />
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Icon name="clock" size={24} color={colors.primary} />
              <Text style={styles.quickActionText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Icon name="helpCircle" size={24} color={colors.primary} />
              <Text style={styles.quickActionText}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingBottom: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  greeting: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xxl,
    color: colors.text.inverse,
    fontWeight: typography.weights.bold,
  },
  subGreeting: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.inverse,
    opacity: 0.9,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.status.error,
  },
  avatarButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  createDeliveryContainer: {
    marginVertical: spacing.lg,
  },
  createDeliveryButton: {
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
  },
  viewAllText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  deliveryCard: {
    marginBottom: spacing.md,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  deliveryTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  deliveryType: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.inverse,
    fontWeight: typography.weights.medium,
  },
  deliveryRoute: {
    marginBottom: spacing.md,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.status.success,
  },
  dropoffDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.status.error,
  },
  routeText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: colors.text.light,
    marginLeft: 3,
    marginVertical: spacing.xs,
  },
  deliveryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryCost: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  recentDeliveryCard: {
    marginBottom: spacing.sm,
  },
  recentDeliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentDeliveryInfo: {
    flex: 1,
  },
  recentDeliveryDate: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    marginBottom: spacing.xs,
  },
  recentDeliveryRoute: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },
  recentDeliveryCost: {
    alignItems: 'flex-end',
  },
  recentCostText: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.lg,
  },
  quickAction: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  quickActionText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
  },
});