import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../config/theme';

interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  style,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          color: colors.delivery.pending,
          text: 'Pending',
          backgroundColor: `${colors.delivery.pending}20`,
        };
      case 'accepted':
        return {
          color: colors.delivery.accepted,
          text: 'Accepted',
          backgroundColor: `${colors.delivery.accepted}20`,
        };
      case 'picked_up':
        return {
          color: colors.delivery.pickedUp,
          text: 'Picked Up',
          backgroundColor: `${colors.delivery.pickedUp}20`,
        };
      case 'in_transit':
        return {
          color: colors.delivery.inTransit,
          text: 'In Transit',
          backgroundColor: `${colors.delivery.inTransit}20`,
        };
      case 'delivered':
        return {
          color: colors.delivery.delivered,
          text: 'Delivered',
          backgroundColor: `${colors.delivery.delivered}20`,
        };
      case 'cancelled':
        return {
          color: colors.delivery.cancelled,
          text: 'Cancelled',
          backgroundColor: `${colors.delivery.cancelled}20`,
        };
      default:
        return {
          color: colors.text.secondary,
          text: 'Unknown',
          backgroundColor: `${colors.text.secondary}20`,
        };
    }
  };

  const config = getStatusConfig();

  const badgeStyle = [
    styles.badge,
    styles[size],
    { backgroundColor: config.backgroundColor },
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${size}Text`],
    { color: config.color },
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{config.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  
  // Sizes
  sm: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  lg: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  
  // Text
  text: {
    fontFamily: typography.fonts.body,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
  smText: {
    fontSize: typography.sizes.xs,
  },
  mdText: {
    fontSize: typography.sizes.sm,
  },
  lgText: {
    fontSize: typography.sizes.base,
  },
});
