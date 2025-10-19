import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  style?: ViewStyle;
}

export default function Card({
  children,
  variant = 'default',
  style,
}: CardProps) {
  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: colors.background.secondary,
      borderRadius: radius.card,
      padding: 20,
    };

    const variantStyles = {
      default: {
        ...shadows.card,
      },
      elevated: {
        ...shadows.lg,
      },
      outlined: {
        borderWidth: 1,
        borderColor: colors.border.accent,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
}
