import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import { Package, MapPin, Clock, Star } from 'lucide-react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import FeatureCard from '../components/FeatureCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to DropIt</Text>
          <Text style={styles.subtitle}>
            Your premium courier service for reliable deliveries
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              title="Send Package"
              icon={<Package size={20} color={colors.text.inverse} />}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title="Track Delivery"
              icon={<MapPin size={20} color={colors.primary.burntOrange} />}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose DropIt?</Text>
          <View style={styles.featuresGrid}>
            <FeatureCard
              icon={<Clock size={24} color={colors.primary.burntOrange} />}
              title="Fast Delivery"
              description="Same-day and express delivery options"
            />
            <FeatureCard
              icon={<Star size={24} color={colors.primary.burntOrange} />}
              title="Premium Service"
              description="Professional handling and care"
            />
            <FeatureCard
              icon={<MapPin size={24} color={colors.primary.burntOrange} />}
              title="Real-time Tracking"
              description="Track your package every step of the way"
            />
            <FeatureCard
              icon={<Package size={24} color={colors.primary.burntOrange} />}
              title="Secure Packaging"
              description="Your items are safely protected"
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card style={styles.activityCard}>
            <Text style={styles.activityText}>
              No recent deliveries yet. Send your first package to get started!
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Math.max(spacing.component.screenPadding, screenWidth * 0.05),
  },
  header: {
    paddingVertical: Math.max(spacing.xl, screenHeight * 0.03),
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: Math.max(24, screenWidth * 0.08),
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '700',
    lineHeight: Math.max(29, screenWidth * 0.08 * 1.2),
  },
  subtitle: {
    fontSize: Math.max(16, screenWidth * 0.045),
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: screenWidth * 0.8,
    lineHeight: Math.max(24, screenWidth * 0.045 * 1.5),
    fontWeight: '400',
  },
  section: {
    marginBottom: Math.max(spacing.component.sectionSpacing, screenHeight * 0.025),
  },
  sectionTitle: {
    fontSize: Math.max(20, screenWidth * 0.06),
    color: colors.text.primary,
    marginBottom: spacing.lg,
    fontWeight: '600',
    lineHeight: Math.max(26, screenWidth * 0.06 * 1.3),
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: screenWidth < 400 ? spacing.sm : 0, // Extra padding for small screens
  },
  actionButton: {
    flex: 1,
    minHeight: 50, // Ensure buttons are touchable
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  activityCard: {
    padding: spacing.lg,
  },
  activityText: {
    fontSize: Math.max(16, screenWidth * 0.045),
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: Math.max(24, screenWidth * 0.045 * 1.5),
  },
});
