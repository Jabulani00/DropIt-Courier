// DropIt Design Tokens - Component Styles
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

export const designTokens = {
  // Button Styles
  button: {
    primary: {
      backgroundColor: colors.primary.burntOrange,
      color: colors.text.inverse,
      borderRadius: radius.button,
      paddingVertical: spacing.component.buttonPadding,
      paddingHorizontal: spacing.lg,
      ...typography.styles.button,
      ...shadows.button,
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.primary.burntOrange,
      borderWidth: 2,
      borderColor: colors.primary.burntOrange,
      borderRadius: radius.button,
      paddingVertical: spacing.component.buttonPadding,
      paddingHorizontal: spacing.lg,
      ...typography.styles.button,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.text.primary,
      borderRadius: radius.button,
      paddingVertical: spacing.component.buttonPadding,
      paddingHorizontal: spacing.lg,
      ...typography.styles.button,
    },
  },
  
  // Input Styles
  input: {
    default: {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.border.secondary,
      borderRadius: radius.input,
      paddingHorizontal: spacing.component.inputPadding,
      paddingVertical: spacing.md,
      ...typography.styles.body,
      color: colors.text.primary,
    },
    focused: {
      borderColor: colors.primary.burntOrange,
      backgroundColor: colors.background.tertiary,
    },
    error: {
      borderColor: colors.status.error,
      backgroundColor: colors.background.secondary,
    },
  },
  
  // Card Styles
  card: {
    default: {
      backgroundColor: colors.background.secondary,
      borderRadius: radius.card,
      padding: spacing.component.cardPadding,
      ...shadows.card,
    },
    elevated: {
      backgroundColor: colors.background.secondary,
      borderRadius: radius.card,
      padding: spacing.component.cardPadding,
      ...shadows.lg,
    },
    outlined: {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.border.accent,
      borderRadius: radius.card,
      padding: spacing.component.cardPadding,
    },
  },
  
  // Text Styles
  text: {
    heading: {
      ...typography.styles.h3,
      color: colors.text.primary,
    },
    body: {
      ...typography.styles.body,
      color: colors.text.primary,
    },
    caption: {
      ...typography.styles.caption,
      color: colors.text.secondary,
    },
    accent: {
      ...typography.styles.body,
      color: colors.text.accent,
    },
  },
  
  // Layout Styles
  layout: {
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    screen: {
      flex: 1,
      backgroundColor: colors.background.primary,
      paddingHorizontal: spacing.component.screenPadding,
    },
    section: {
      marginVertical: spacing.component.sectionSpacing,
    },
  },
  
  // Navigation Styles
  navigation: {
    header: {
      backgroundColor: colors.background.secondary,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.accent,
      ...shadows.sm,
    },
    tabBar: {
      backgroundColor: colors.background.secondary,
      borderTopWidth: 1,
      borderTopColor: colors.border.accent,
      ...shadows.sm,
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
