import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../config/theme';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  padding?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  pressable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  onPress,
  padding = 'md',
  style,
  pressable = false,
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.background,
      borderRadius: borderRadius.xl,
      ...shadows.md,
    };

    const paddingStyles = {
      sm: { padding: spacing.sm },
      md: { padding: spacing.md },
      lg: { padding: spacing.lg },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
    };
  };

  const getTitleStyle = (): TextStyle => ({
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  });

  const getSubtitleStyle = (): TextStyle => ({
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    marginBottom: spacing.md,
  });

  const CardContent = () => (
    <View style={getCardStyle()}>
      {title && <Text style={getTitleStyle()}>{title}</Text>}
      {subtitle && <Text style={getSubtitleStyle()}>{subtitle}</Text>}
      {children}
    </View>
  );

  if (pressable && onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={style}>
      <CardContent />
    </View>
  );
};