// DropIt Border Radius System
export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
  
  // Semantic radius
  button: 8,
  input: 8,
  card: 12,
  modal: 16,
  avatar: 24,
} as const;

export type RadiusKey = keyof typeof radius;
