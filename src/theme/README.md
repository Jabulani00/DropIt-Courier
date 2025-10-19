# DropIt Design System

## Overview
The DropIt app uses an earthy and sleek theme built around premium colors and typography to create a trustworthy and energetic courier experience.

## Color Palette

### Primary Colors
- **Burnt Orange (#D35400)** - Energy, primary actions, accents
- **Deep Brown (#4E2A1E)** - Reliability, text, headers
- **Cream White (#F5E6CA)** - Warmth, backgrounds, inverse text

### Extended Palette
- **Warm Orange (#E67E22)** - Secondary actions
- **Light Brown (#6B3E2A)** - Secondary text
- **Soft Cream (#FDF5E6)** - Light backgrounds
- **Dark Cream (#F0D9A3)** - Borders, subtle accents

## Typography

### Font Families
- **Raleway** - Modern, bold headers and UI elements
- **Lora** - Elegant, readable body text

### Font Weights
- Light (300)
- Regular (400)
- Medium (500)
- SemiBold (600)
- Bold (700)
- ExtraBold (800)

## Components

### Button Variants
- **Primary** - Burnt orange background with white text
- **Secondary** - Transparent background with burnt orange border and text
- **Ghost** - Transparent background with primary text

### Card Variants
- **Default** - White background with subtle shadow
- **Elevated** - White background with prominent shadow
- **Outlined** - White background with cream border

## Usage

```typescript
import { theme, colors, typography } from './src/theme';

// Use theme colors
const primaryColor = colors.primary.burntOrange;

// Use typography styles
const headerStyle = typography.styles.h1;

// Use spacing
const margin = theme.spacing.lg;
```

## Design Principles
1. **Clean & Minimalist** - Uncluttered layouts with purposeful spacing
2. **Trustworthy** - Deep brown colors convey reliability
3. **Energetic** - Burnt orange adds vitality and urgency
4. **Premium** - High-quality typography and subtle shadows
5. **Warm** - Cream backgrounds create welcoming feel
