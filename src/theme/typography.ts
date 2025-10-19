// DropIt Typography System
export const typography = {
  // Font Families
  fonts: {
    heading: 'Raleway',
    body: 'Lora',
  },
  
  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Font Weights
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Text Styles with reliable system fonts
  styles: {
    h1: {
      fontSize: 48,
      fontWeight: '700',
      lineHeight: 58,
      color: '#4E2A1E',
    },
    h2: {
      fontSize: 36,
      fontWeight: '700',
      lineHeight: 43,
      color: '#4E2A1E',
    },
    h3: {
      fontSize: 30,
      fontWeight: '600',
      lineHeight: 39,
      color: '#4E2A1E',
    },
    h4: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 31,
      color: '#4E2A1E',
    },
    h5: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      color: '#4E2A1E',
    },
    h6: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 25,
      color: '#4E2A1E',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: '#4E2A1E',
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 27,
      color: '#4E2A1E',
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
      color: '#4E2A1E',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 17,
      color: '#666666',
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
      textAlign: 'center',
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
      textAlign: 'center',
    },
  },
} as const;

export type TypographyKey = keyof typeof typography.styles;
