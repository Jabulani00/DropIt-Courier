// DropIt Spacing System
export const spacing = {
  // Base spacing units (in pixels)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80,
  '8xl': 96,
  
  // Semantic spacing
  padding: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  margin: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  // Component-specific spacing
  component: {
    buttonPadding: 12,
    inputPadding: 16,
    cardPadding: 20,
    screenPadding: 24,
    sectionSpacing: 32,
  },
} as const;

export type SpacingKey = keyof typeof spacing;
