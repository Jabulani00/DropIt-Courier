import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { colors, typography, spacing } from '../../config/theme';

interface DriverStats {
  tripsToday: number;
  earningsToday: number;
  distanceCovered: number;
  averageRating: number;
}

interface ActiveDelivery {
  id: string;
  customerName: string;
  pickup: string;
  dropoff: string;
  estimatedEarnings: number;
  status: string;
}

export default function DriverDashboardScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [stats, setStats] = useState<DriverStats>({
    tripsToday: 0,
    earningsToday: 0,
    distanceCovered: 0,
    averageRating: 0,
  });
  const [activeDelivery, setActiveDelivery] = useState<ActiveDelivery | null>(null);
  const [pendingRequests, setPendingRequests] = useState(0);

  useEffect(() => {
    loadDriverData();
  }, []);

  const loadDriverData = async () => {
    // Mock data - replace with real Firestore queries
    setStats({
      tripsToday: 3,
      earningsToday: 125.50,
      distanceCovered: 45.2,
      averageRating: 4.8,
    });

    setActiveDelivery({
      id: '1',
      customerName: 'John Smith',
      pickup: '123 Main St, Durban',
      dropoff: '456 Oak Ave, Durban',
      estimatedEarnings: 45.50,
      status: 'accepted',
    });

    setPendingRequests(2);
  };

  const handleToggleOnline = () => {
    if (isOnline) {
      Alert.alert(
        'Go Offline',
        'Are you sure you want to go offline? You will stop receiving delivery requests.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go Offline', onPress: () => setIsOnline(false) },
        ]
      );
    } else {
      setIsOnline(true);
      // TODO: Update driver status in Firestore
    }
  };

  const handleNavigateToPickup = () => {
    console.log('Navigate to pickup');
    // TODO: Open navigation screen
  };

  const renderStatsCard = (title: string, value: string | number, icon: string, color: string) => (
    <Card style={styles.statsCard}>
      <View style={styles.statsContent}>
        <View style={[styles.statsIcon, { backgroundColor: color }]}>
          <Icon name={icon as any} size={24} color={colors.text.inverse} />
        </View>
        <View style={styles.statsText}>
          <Text style={styles.statsValue}>{value}</Text>
          <Text style={styles.statsTitle}>{title}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good morning, Driver!</Text>
              <Text style={styles.subGreeting}>
                {isOnline ? 'You\'re online and ready to deliver' : 'Go online to start earning'}
              </Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Icon name="user" size={24} color={colors.text.inverse} />
            </TouchableOpacity>
          </View>

          {/* Online Toggle */}
          <View style={styles.onlineToggleContainer}>
            <View style={styles.onlineToggle}>
              <View style={styles.onlineToggleContent}>
                <View style={styles.onlineToggleText}>
                  <Text style={styles.onlineToggleTitle}>
                    {isOnline ? 'You\'re Online' : 'You\'re Offline'}
                  </Text>
                  <Text style={styles.onlineToggleSubtitle}>
                    {isOnline ? 'Receiving delivery requests' : 'Tap to go online'}
                  </Text>
                </View>
                <Switch
                  value={isOnline}
                  onValueChange={handleToggleOnline}
                  trackColor={{ false: colors.backgroundDark, true: colors.status.success }}
                  thumbColor={isOnline ? colors.text.inverse : colors.text.light}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Today's Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <View style={styles.statsGrid}>
            {renderStatsCard(
              'Trips Today',
              stats.tripsToday,
              'truck',
              colors.primary
            )}
            {renderStatsCard(
              'Earnings Today',
              `R${stats.earningsToday.toFixed(2)}`,
              'dollarSign',
              colors.status.success
            )}
            {renderStatsCard(
              'Distance Covered',
              `${stats.distanceCovered} km`,
              'map',
              colors.status.info
            )}
            {renderStatsCard(
              'Average Rating',
              `${stats.averageRating} ⭐`,
              'star',
              colors.status.warning
            )}
          </View>
        </View>

        {/* Active Delivery */}
        {activeDelivery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Delivery</Text>
            <Card style={styles.activeDeliveryCard}>
              <View style={styles.activeDeliveryHeader}>
                <View style={styles.customerInfo}>
                  <View style={styles.customerAvatar}>
                    <Icon name="user" size={20} color={colors.text.inverse} />
                  </View>
                  <View>
                    <Text style={styles.customerName}>{activeDelivery.customerName}</Text>
                    <Text style={styles.deliveryStatus}>Accepted</Text>
                  </View>
                </View>
                <Text style={styles.estimatedEarnings}>
                  R{activeDelivery.estimatedEarnings.toFixed(2)}
                </Text>
              </View>

              <View style={styles.deliveryRoute}>
                <View style={styles.routePoint}>
                  <View style={styles.pickupDot} />
                  <Text style={styles.routeText} numberOfLines={1}>
                    {activeDelivery.pickup}
                  </Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <View style={styles.dropoffDot} />
                  <Text style={styles.routeText} numberOfLines={1}>
                    {activeDelivery.dropoff}
                  </Text>
                </View>
              </View>

              <Button
                variant="primary"
                size="lg"
                onPress={handleNavigateToPickup}
                icon={<Icon name="navigation" size={20} color={colors.text.inverse} />}
                style={styles.navigateButton}
              >
                Navigate to Pickup
              </Button>
            </Card>
          </View>
        )}

        {/* Pending Requests */}
        {pendingRequests > 0 && (
          <View style={styles.section}>
            <Card style={styles.pendingRequestsCard}>
              <View style={styles.pendingRequestsContent}>
                <View style={styles.pendingRequestsIcon}>
                  <Icon name="bell" size={24} color={colors.status.warning} />
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingBadgeText}>{pendingRequests}</Text>
                  </View>
                </View>
                <View style={styles.pendingRequestsText}>
                  <Text style={styles.pendingRequestsTitle}>
                    {pendingRequests} New Request{pendingRequests > 1 ? 's' : ''}
                  </Text>
                  <Text style={styles.pendingRequestsSubtitle}>
                    Tap to view available deliveries
                  </Text>
                </View>
                <TouchableOpacity style={styles.pendingRequestsButton}>
                  <Icon name="chevronRight" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Icon name="dollarSign" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Earnings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Icon name="clock" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Icon name="user" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Icon name="helpCircle" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button for Active Delivery */}
      {activeDelivery && (
        <View style={styles.fabContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={handleNavigateToPickup}
            icon={<Icon name="navigation" size={20} color={colors.text.inverse} />}
            style={styles.fab}
          >
            Go to Pickup
          </Button>
        </View>
      )}
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
    marginBottom: spacing.lg,
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
  profileButton: {
    padding: spacing.sm,
  },
  onlineToggleContainer: {
    paddingHorizontal: spacing.lg,
  },
  onlineToggle: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.md,
  },
  onlineToggleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlineToggleText: {
    flex: 1,
  },
  onlineToggleTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  onlineToggleSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statsCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statsText: {
    flex: 1,
  },
  statsValue: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
  },
  statsTitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
  },
  activeDeliveryCard: {
    marginBottom: spacing.md,
  },
  activeDeliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  customerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  customerName: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
  },
  deliveryStatus: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.status.success,
    fontWeight: typography.weights.medium,
  },
  estimatedEarnings: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.primary,
    fontWeight: typography.weights.bold,
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
  navigateButton: {
    marginTop: spacing.sm,
  },
  pendingRequestsCard: {
    backgroundColor: colors.status.warning,
    borderColor: colors.status.warning,
  },
  pendingRequestsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingRequestsIcon: {
    position: 'relative',
    marginRight: spacing.md,
  },
  pendingBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.status.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingBadgeText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.text.inverse,
    fontWeight: typography.weights.bold,
  },
  pendingRequestsText: {
    flex: 1,
  },
  pendingRequestsTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    color: colors.text.inverse,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  pendingRequestsSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.inverse,
    opacity: 0.9,
  },
  pendingRequestsButton: {
    padding: spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickAction: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.backgroundDark,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
  },
  fab: {
    borderRadius: 25,
  },
});
