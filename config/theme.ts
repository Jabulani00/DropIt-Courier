export const colors = {
  primary: '#D35400',      // Burnt Orange
  primaryLight: '#E67E22',
  primaryDark: '#BA4A00',
  
  secondary: '#4E2A1E',    // Deep Brown
  secondaryLight: '#6E3A2E',
  secondaryDark: '#2E1A0E',
  
  background: '#F5E6CA',   // Cream White
  backgroundDark: '#E5D6BA',
  
  text: {
    primary: '#4E2A1E',
    secondary: '#6E3A2E',
    light: '#8E6A5E',
    inverse: '#F5E6CA'
  },
  
  status: {
    success: '#27AE60',
    warning: '#F39C12',
    error: '#C0392B',
    info: '#3498DB'
  },
  
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
    heading: 'Raleway-Bold',
    body: 'Lora-Regular',
    bodyItalic: 'Lora-Italic',
    button: 'Raleway-Regular'
  },
  
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32
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
  }
};