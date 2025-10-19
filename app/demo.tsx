import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Icon } from '../components/ui/Icon';
import { colors, typography, spacing } from '../config/theme';

export default function DemoScreen() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const demoScreens = [
    {
      id: 'login',
      title: 'Login Screen',
      description: 'Authentication with email/password and Google Sign-In',
      icon: 'lock',
      route: '/(auth)/login',
    },
    {
      id: 'signup',
      title: 'Signup Screen',
      description: 'User registration with validation and password strength',
      icon: 'user',
      route: '/(auth)/signup',
    },
    {
      id: 'role-selection',
      title: 'Role Selection',
      description: 'Choose between Customer or Driver role',
      icon: 'settings',
      route: '/(auth)/role-selection',
    },
    {
      id: 'customer-home',
      title: 'Customer Home',
      description: 'Customer dashboard with active deliveries and quick actions',
      icon: 'home',
      route: '/(customer)/home',
    },
    {
      id: 'create-delivery',
      title: 'Create Delivery',
      description: 'Multi-step delivery creation with pricing calculator',
      icon: 'plus',
      route: '/(customer)/create-delivery',
    },
    {
      id: 'driver-dashboard',
      title: 'Driver Dashboard',
      description: 'Driver dashboard with online toggle and earnings',
      icon: 'truck',
      route: '/(driver)/dashboard',
    },
  ];

  const handleDemoPress = (demo: any) => {
    Alert.alert(
      'Demo Navigation',
      `Navigate to ${demo.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Navigate', 
          onPress: () => {
            setSelectedDemo(demo.id);
            // In a real app, you would use router.push(demo.route)
            console.log(`Navigating to: ${demo.route}`);
          }
        },
      ]
    );
  };

  const renderDemoCard = (demo: any) => (
    <Card
      key={demo.id}
      style={styles.demoCard}
      onPress={() => handleDemoPress(demo)}
      pressable
    >
      <View style={styles.demoCardContent}>
        <View style={styles.demoIcon}>
          <Icon name={demo.icon as any} size={32} color={colors.primary} />
        </View>
        <View style={styles.demoText}>
          <Text style={styles.demoTitle}>{demo.title}</Text>
          <Text style={styles.demoDescription}>{demo.description}</Text>
        </View>
        <Icon name="chevronRight" size={20} color={colors.text.light} />
      </View>
    </Card>
  );

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="truck" size={60} color={colors.text.inverse} />
          </View>
          <Text style={styles.appName}>DropIt</Text>
          <Text style={styles.slogan}>Move Smart. Deliver Fast.</Text>
          <Text style={styles.demoTitle}>Interactive Demo</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Screens</Text>
            <Text style={styles.sectionDescription}>
              Tap on any screen below to see the DropIt app in action. 
              This demo showcases the complete user journey from authentication 
              to delivery creation and driver management.
            </Text>
          </View>

          <View style={styles.demosContainer}>
            {demoScreens.map(renderDemoCard)}
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featuresGrid}>
              <View style={styles.featureItem}>
                <Icon name="shield" size={24} color={colors.primary} />
                <Text style={styles.featureText}>Secure Authentication</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="map" size={24} color={colors.primary} />
                <Text style={styles.featureText}>Real-time Tracking</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="dollarSign" size={24} color={colors.primary} />
                <Text style={styles.featureText}>Transparent Pricing</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="star" size={24} color={colors.primary} />
                <Text style={styles.featureText}>Rating System</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="bell" size={24} color={colors.primary} />
                <Text style={styles.featureText}>Push Notifications</Text>
              </View>
              <View style={styles.featureItem}>
                <Icon name="navigation" size={24} color={colors.primary} />
                <Text style={styles.featureText}>Turn-by-turn Navigation</Text>
              </View>
            </View>
          </View>

          <View style={styles.techStackSection}>
            <Text style={styles.sectionTitle}>Technology Stack</Text>
            <View style={styles.techStack}>
              <View style={styles.techItem}>
                <Text style={styles.techName}>React Native</Text>
                <Text style={styles.techDescription}>Cross-platform mobile development</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techName}>Expo Router</Text>
                <Text style={styles.techDescription}>File-based navigation</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techName}>Firebase</Text>
                <Text style={styles.techDescription}>Backend services and real-time database</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techName}>Mapbox</Text>
                <Text style={styles.techDescription}>Maps and navigation services</Text>
              </View>
              <View style={styles.techItem}>
                <Text style={styles.techName}>TypeScript</Text>
                <Text style={styles.techDescription}>Type-safe development</Text>
              </View>
            </View>
          </View>

          <View style={styles.ctaSection}>
            <Card style={styles.ctaCard}>
              <Text style={styles.ctaTitle}>Ready to Build?</Text>
              <Text style={styles.ctaDescription}>
                This demo showcases the complete DropIt application with all the features 
                specified in the user stories. Each screen is fully functional and follows 
                the design system guidelines.
              </Text>
              <Button
                variant="primary"
                size="lg"
                onPress={() => Alert.alert('Demo', 'Start building your delivery app!')}
                style={styles.ctaButton}
              >
                Get Started
              </Button>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  appName: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xxxl * 1.2,
    color: colors.text.inverse,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  slogan: {
    fontFamily: typography.fonts.bodyItalic,
    fontSize: typography.sizes.lg,
    color: colors.text.inverse,
    opacity: 0.9,
    marginBottom: spacing.lg,
  },
  demoTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    color: colors.text.inverse,
    fontWeight: typography.weights.bold,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  sectionDescription: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  demosContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  demoCard: {
    marginBottom: spacing.md,
  },
  demoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  demoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  demoText: {
    flex: 1,
  },
  demoTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  demoDescription: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    lineHeight: 18,
  },
  featuresSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.backgroundDark,
  },
  featureText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
    marginLeft: spacing.sm,
  },
  techStackSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  techStack: {
    gap: spacing.md,
  },
  techItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.backgroundDark,
  },
  techName: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  techDescription: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
  },
  ctaSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  ctaCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ctaTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    color: colors.text.inverse,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  ctaDescription: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.inverse,
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  ctaButton: {
    backgroundColor: colors.text.inverse,
  },
});
