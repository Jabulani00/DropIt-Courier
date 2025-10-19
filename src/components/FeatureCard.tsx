import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from '../theme';
import Card from './Card';

const { width: screenWidth } = Dimensions.get('window');

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth < 400 ? '100%' : '48%', // Full width on small screens
    alignItems: 'center',
    padding: Math.max(spacing.lg, screenWidth * 0.04),
    marginBottom: spacing.md,
    minHeight: 120, // Ensure consistent card heights
  },
  iconContainer: {
    marginBottom: spacing.md,
    padding: Math.max(spacing.sm, screenWidth * 0.03),
    backgroundColor: colors.background.tertiary,
    borderRadius: 12,
  },
  title: {
    fontSize: Math.max(16, screenWidth * 0.045),
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontWeight: '600',
    lineHeight: Math.max(22, screenWidth * 0.045 * 1.4),
  },
  description: {
    fontSize: Math.max(12, screenWidth * 0.035),
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: Math.max(17, screenWidth * 0.035 * 1.4),
    fontWeight: '400',
  },
});
