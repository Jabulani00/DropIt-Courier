import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../theme';

const { width: screenWidth } = Dimensions.get('window');

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderRadius: radius.button,
      minHeight: 48, // Ensure minimum touch target
      ...shadows.button,
    };

    const sizeStyles = {
      small: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        minHeight: 40,
      },
      medium: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        minHeight: 48,
      },
      large: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        minHeight: 56,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary.burntOrange,
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary.burntOrange,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    };

    const textColor = {
      primary: colors.text.inverse,
      secondary: colors.primary.burntOrange,
      ghost: colors.text.primary,
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.6 : 1,
    };
  };

  const getTextStyle = () => {
    const responsiveFontSize = Math.max(14, screenWidth * 0.04); // Responsive font size
    
    const sizeStyles = {
      small: {
        fontSize: Math.max(12, responsiveFontSize - 2),
        lineHeight: Math.max(16, (responsiveFontSize - 2) * 1.4),
      },
      medium: {
        fontSize: responsiveFontSize,
        lineHeight: responsiveFontSize * 1.4,
      },
      large: {
        fontSize: Math.max(16, responsiveFontSize + 2),
        lineHeight: Math.max(20, (responsiveFontSize + 2) * 1.4),
      },
    };

    const variantStyles = {
      primary: { color: colors.text.inverse },
      secondary: { color: colors.primary.burntOrange },
      ghost: { color: colors.text.primary },
    };

    return {
      ...sizeStyles[size],
      ...variantStyles[variant],
      fontWeight: '600' as const,
      textAlign: 'center' as const,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.text.inverse : colors.primary.burntOrange}
        />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: spacing.sm,
  },
});
