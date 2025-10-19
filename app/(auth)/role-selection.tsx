import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { colors, typography, spacing } from '../../config/theme';

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
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Choose Your Role</Text>
            <Text style={styles.subtitle}>How would you like to use DropIt?</Text>
          </View>

          {/* Role Cards */}
          <View style={styles.cardsContainer}>
            <RoleCard
              role="customer"
              title="I want to send items"
              subtitle="Create deliveries and track your packages"
              icon="package"
              isSelected={selectedRole === 'customer'}
            />

            <RoleCard
              role="driver"
              title="I want to deliver items"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xxxl,
    color: colors.text.inverse,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.lg,
    color: colors.text.inverse,
    opacity: 0.9,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  roleCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 200,
    justifyContent: 'center',
  },
  selectedCard: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondary,
    transform: [{ scale: 1.02 }],
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  selectedIconContainer: {
    backgroundColor: colors.primary,
  },
  cardTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
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
    fontSize: typography.sizes.base,
    color: colors.text.light,
    textAlign: 'center',
    lineHeight: 22,
  },
  selectedCardSubtitle: {
    color: colors.text.inverse,
    opacity: 0.9,
  },
  continueButton: {
    marginBottom: spacing.lg,
  },
  infoText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.inverse,
    opacity: 0.8,
    textAlign: 'center',
  },
});