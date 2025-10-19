import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { colors, typography, spacing, shadows } from '../../config/theme';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'driver' | null>(null);

  const handleRoleSelection = (role: 'customer' | 'driver') => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role to continue');
      return;
    }

    if (selectedRole === 'driver') {
      // Navigate to driver verification
      Alert.alert('Driver Verification', 'You will need to complete verification to become a driver');
    } else {
      // Navigate to customer home
      Alert.alert('Welcome!', 'Welcome to DropIt! You can now start creating deliveries.');
    }
  };

  const RoleCard = ({ 
    role, 
    title, 
    subtitle, 
    icon, 
    isSelected 
  }: {
    role: 'customer' | 'driver';
    title: string;
    subtitle: string;
    icon: string;
    isSelected: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.roleCard,
        isSelected && styles.selectedCard,
      ]}
      onPress={() => handleRoleSelection(role)}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={[
          styles.iconContainer,
          isSelected && styles.selectedIconContainer,
        ]}>
          <Icon 
            name={icon as any} 
            size={48} 
            color={isSelected ? colors.text.inverse : colors.primary} 
          />
        </View>
        <Text style={[
          styles.cardTitle,
          isSelected && styles.selectedCardTitle,
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.cardSubtitle,
          isSelected && styles.selectedCardSubtitle,
        ]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.backgroundLight, colors.background]}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Header with Logo */}
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../../assets/logo.png')} 
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>Choose Your Role</Text>
              <Text style={styles.subtitle}>How would you like to use DropIt?</Text>
            </View>

            {/* Role Cards */}
            <View style={styles.cardsContainer}>
              <RoleCard
                role="customer"
                title="Send Items"
                subtitle="Create deliveries and track your packages"
                icon="package"
                isSelected={selectedRole === 'customer'}
              />

              <RoleCard
                role="driver"
                title="Deliver Items"
                subtitle="Accept delivery requests and earn money"
                icon="truck"
                isSelected={selectedRole === 'driver'}
              />
            </View>

            {/* Continue Button */}
            <Button
              variant="primary"
              size="lg"
              onPress={handleContinue}
              disabled={!selectedRole}
              style={styles.continueButton}
            >
              Continue
            </Button>

            {/* Info Text */}
            <Text style={styles.infoText}>
              You can switch roles later in settings
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    paddingTop: spacing.xxl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    paddingTop: spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    marginBottom: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xxxl,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.light,
    opacity: 0.8,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  roleCard: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.backgroundDark,
    minHeight: 180,
    justifyContent: 'center',
    ...shadows.md,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    transform: [{ scale: 1.02 }],
    ...shadows.lg,
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.backgroundDark,
  },
  selectedIconContainer: {
    backgroundColor: colors.text.inverse,
    borderColor: colors.text.inverse,
  },
  cardTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  selectedCardTitle: {
    color: colors.text.inverse,
  },
  cardSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedCardSubtitle: {
    color: colors.text.inverse,
    opacity: 0.9,
  },
  continueButton: {
    marginBottom: spacing.lg,
    borderRadius: 12,
  },
  infoText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.muted,
    textAlign: 'center',
    opacity: 0.8,
  },
});