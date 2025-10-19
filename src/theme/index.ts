// DropIt Theme System - Main Export
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

// Export individual modules
export { colors, typography, spacing, radius, shadows };

// Theme type for TypeScript
export type Theme = typeof theme;

// Default theme object for React Context
export const defaultTheme = theme;
