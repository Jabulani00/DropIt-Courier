import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Base dimensions (iPhone 12 Pro)
const baseWidth = 390;
const baseHeight = 844;

// Responsive scaling functions
export const scaleWidth = (size: number): number => {
  return (screenWidth / baseWidth) * size;
};

export const scaleHeight = (size: number): number => {
  return (screenHeight / baseHeight) * size;
};

export const scaleFont = (size: number): number => {
  const scale = Math.min(screenWidth / baseWidth, screenHeight / baseHeight);
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Screen size categories
export const isSmallScreen = (): boolean => screenWidth < 375;
export const isMediumScreen = (): boolean => screenWidth >= 375 && screenWidth < 414;
export const isLargeScreen = (): boolean => screenWidth >= 414;
export const isTablet = (): boolean => screenWidth >= 768;

// Responsive spacing
export const getResponsiveSpacing = (baseSpacing: number): number => {
  if (isSmallScreen()) return baseSpacing * 0.8;
  if (isTablet()) return baseSpacing * 1.2;
  return baseSpacing;
};

// Responsive font sizes
export const getResponsiveFontSize = (baseSize: number): number => {
  if (isSmallScreen()) return baseSize * 0.9;
  if (isTablet()) return baseSize * 1.1;
  return baseSize;
};

// Card dimensions based on screen size
export const getCardWidth = (): number => {
  if (isTablet()) return Math.min(screenWidth * 0.6, 400);
  return screenWidth - 32; // 16px margin on each side
};

export const getCardPadding = (): number => {
  if (isSmallScreen()) return 20;
  if (isTablet()) return 32;
  return 24;
};

// Logo size based on screen size
export const getLogoSize = (): number => {
  if (isSmallScreen()) return 80;
  if (isTablet()) return 140;
  return 120;
};
