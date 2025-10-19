import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, shadows, borderRadius } from '../../config/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.glass,
          borderRadius: borderRadius.xl,
          padding: 24,
          borderWidth: 1,
          borderColor: colors.glassBorder,
          ...shadows.glass,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
