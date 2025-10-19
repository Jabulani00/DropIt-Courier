import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  onAnimationComplete?: () => void;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  style,
  delay = 0,
  duration = 600,
  animation = 'fadeIn',
  onAnimationComplete,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start(() => {
        onAnimationComplete?.();
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration, onAnimationComplete]);

  const getAnimatedStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      opacity: animatedValue,
    };

    switch (animation) {
      case 'fadeIn':
        return baseStyle;
      
      case 'slideUp':
        return {
          ...baseStyle,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        };
      
      case 'scaleIn':
        return {
          ...baseStyle,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        };
      
      case 'slideInLeft':
        return {
          ...baseStyle,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
        };
      
      case 'slideInRight':
        return {
          ...baseStyle,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        };
      
      default:
        return baseStyle;
    }
  };

  return (
    <Animated.View style={[getAnimatedStyle(), style]}>
      {children}
    </Animated.View>
  );
};
