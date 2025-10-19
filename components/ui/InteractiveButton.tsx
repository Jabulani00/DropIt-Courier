import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius } from '../../config/theme';

// Optional haptics import with fallback
let Haptics: any = null;
try {
  Haptics = require('expo-haptics');
} catch (error) {
  // Haptics not available, will use fallback
}

interface InteractiveButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'gradient' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  hapticFeedback?: boolean;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  hapticFeedback = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled || loading) return;
    
    if (hapticFeedback && Haptics) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        // Haptics not available, continue without feedback
      }
    }
    
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (disabled || loading) return;
    
    if (hapticFeedback && Haptics) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        // Haptics not available, continue without feedback
      }
    }
    
    onPress();
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.lg,
      borderWidth: variant === 'outline' ? 1 : 0,
    };

    const sizeStyles = {
      sm: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, minHeight: 36 },
      md: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, minHeight: 48 },
      lg: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg, minHeight: 56 },
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      },
      gradient: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      glass: {
        backgroundColor: colors.glass,
        borderColor: colors.glassBorder,
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: colors.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled || loading ? 0.6 : opacityAnim,
      transform: [{ scale: scaleAnim }],
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: typography.fonts.button,
      fontWeight: typography.weights.semibold,
    };

    const sizeStyles = {
      sm: { fontSize: typography.sizes.sm },
      md: { fontSize: typography.sizes.base },
      lg: { fontSize: typography.sizes.lg },
    };

    const variantStyles = {
      primary: { color: colors.text.inverse },
      gradient: { color: colors.text.inverse },
      glass: { color: colors.text.onGlass },
      outline: { color: colors.primary },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const renderButton = () => {
    if (variant === 'gradient') {
      return (
        <LinearGradient
          colors={colors.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[getButtonStyle(), style]}
        >
          <TouchableOpacity
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={getTextStyle()}>{children}</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    }

    return (
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
      >
        <Text style={getTextStyle()}>{children}</Text>
      </TouchableOpacity>
    );
  };

  return renderButton();
};
