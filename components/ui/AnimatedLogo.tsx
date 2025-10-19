import React from 'react';
import { View, Image, ViewStyle } from 'react-native';
import { colors } from '../../config/theme';

interface AnimatedLogoProps {
  size?: number;
  style?: ViewStyle;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 100,
  style,
}) => {
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.backgroundLight,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: colors.secondary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: size * 0.7,
            height: size * 0.7,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
