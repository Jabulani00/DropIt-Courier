export const colors = {
  // Primary Colors - Burnt Orange
  primary: '#D35400',      // Burnt Orange - Energy
  primaryLight: '#E67E22',
  primaryDark: '#BA4A00',
  primaryGradient: ['#D35400', '#E67E22'],
  
  // Secondary Colors - Deep Brown
  secondary: '#4E2A1E',    // Deep Brown - Reliability
  secondaryLight: '#6E3A2E',
  secondaryDark: '#2E1A0E',
  
  // Background Colors - Cream White
  background: '#F5E6CA',   // Cream White - Warmth
  backgroundDark: '#E5D6BA',
  backgroundLight: '#FDF8F0',
  backgroundGradient: ['#F5E6CA', '#4E2A1E'],
  
  // Glass/Card Colors
  glass: 'rgba(245, 230, 202, 0.95)',
  glassDark: 'rgba(245, 230, 202, 0.85)',
  glassBorder: 'rgba(78, 42, 30, 0.1)',
  
  // Text Colors
  text: {
    primary: '#4E2A1E',
    secondary: '#6E3A2E',
    light: '#8E6A5E',
    inverse: '#F5E6CA',
    muted: '#A68B7A',
    onGlass: '#4E2A1E'
  },
  
  // Status Colors
  status: {
    success: '#27AE60',
    warning: '#F39C12',
    error: '#C0392B',
    info: '#3498DB'
  },
  
  // Delivery Status Colors
  delivery: {
    pending: '#F39C12',
    accepted: '#3498DB',
    pickedUp: '#F1C40F',
    inTransit: '#27AE60',
    delivered: '#16A085',
    cancelled: '#C0392B'
  }
};

export const typography = {
  fonts: {
    heading: 'Raleway-Bold',      // Bold, modern headers
    headingLight: 'Raleway-Regular',
    body: 'Lora-Regular',         // Elegant, readable body text
    bodyItalic: 'Lora-Italic',
    button: 'Raleway-SemiBold',
    caption: 'Lora-Regular',
    placeholder: 'Raleway-Medium'  // For input placeholders
  },
  
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    xxxxl: 40
  },
  
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  // Glass card shadows
  glass: {
    shadowColor: '#4E2A1E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8
  },
  // Floating card shadows
  floating: {
    shadowColor: '#4E2A1E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 12
  }
};