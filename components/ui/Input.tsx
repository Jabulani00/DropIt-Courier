import React, { useState } from 'react';
import { View, TextInput, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../config/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  disabled = false,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (): ViewStyle => ({
    marginBottom: spacing.md,
  });

  const getInputContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: error ? colors.status.error : isFocused ? colors.primary : colors.glassBorder,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 56,
    shadowColor: isFocused ? colors.primary : colors.secondary,
    shadowOffset: { width: 0, height: isFocused ? 4 : 2 },
    shadowOpacity: isFocused ? 0.2 : 0.1,
    shadowRadius: isFocused ? 8 : 4,
    elevation: isFocused ? 4 : 2,
  });

  const getInputStyle = (): TextStyle => ({
    flex: 1,
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.text.onGlass,
    textAlignVertical: multiline ? 'top' : 'center',
  });

  const getLabelStyle = (): TextStyle => ({
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: typography.weights.medium,
  });

  const getErrorStyle = (): TextStyle => ({
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.status.error,
    marginTop: spacing.xs,
  });

  const getHelperStyle = (): TextStyle => ({
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    marginTop: spacing.xs,
  });

  return (
    <View style={[getContainerStyle(), style]}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <View style={{ marginRight: spacing.sm }}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {rightIcon && (
          <View style={{ marginLeft: spacing.sm }}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && <Text style={getErrorStyle()}>{error}</Text>}
      {helperText && !error && <Text style={getHelperStyle()}>{helperText}</Text>}
    </View>
  );
};