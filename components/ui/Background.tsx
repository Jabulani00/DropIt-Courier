import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../config/theme';

interface BackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Background: React.FC<BackgroundProps> = ({
  children,
  style,
}) => {
  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
};
