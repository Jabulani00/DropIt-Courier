// DropIt Color Palette - Earthy & Sleek Theme
export const colors = {
  // Primary Brand Colors
  primary: {
    burntOrange: '#D35400',
    deepBrown: '#4E2A1E',
    creamWhite: '#F5E6CA',
  },
  
  // Extended Palette
  secondary: {
    warmOrange: '#E67E22',
    lightBrown: '#6B3E2A',
    softCream: '#FDF5E6',
    darkCream: '#F0D9A3',
  },
  
  // Neutral Colors
  neutral: {
    black: '#1A1A1A',
    darkGray: '#2C2C2C',
    mediumGray: '#666666',
    lightGray: '#999999',
    white: '#FFFFFF',
  },
  
  // Status Colors
  status: {
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',
  },
  
  // Background Colors
  background: {
    primary: '#F5E6CA', // Cream White
    secondary: '#FFFFFF',
    tertiary: '#FDF5E6', // Soft Cream
    overlay: 'rgba(78, 42, 30, 0.8)', // Deep Brown with opacity
  },
  
  // Text Colors
  text: {
    primary: '#4E2A1E', // Deep Brown
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#F5E6CA', // Cream White
    accent: '#D35400', // Burnt Orange
  },
  
  // Border Colors
  border: {
    primary: '#D35400',
    secondary: '#E0E0E0',
    accent: '#F0D9A3',
  },
} as const;

export type ColorKey = keyof typeof colors;
