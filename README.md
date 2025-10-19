# 🚚 DropIt - Courier Delivery App

**Version:** 1.0  
**Platform:** React Native (Expo)  
**Backend:** Firebase  
**Maps:** Mapbox  

## 📋 Project Overview

DropIt is a comprehensive courier delivery app built with React Native and Expo, featuring real-time tracking, driver matching, and a complete delivery management system. The app serves customers, drivers, and administrators with role-based interfaces and seamless user experiences.

## 🏗️ Architecture

### Frontend Stack
- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety and better developer experience
- **Expo Router** for file-based navigation
- **Firebase SDK** for authentication and real-time data
- **Mapbox** for maps and location services
- **Lucide React Native** for consistent iconography

### Backend Services
- **Firebase Authentication** for user management
- **Firestore** for real-time database
- **Firebase Storage** for file uploads
- **Cloud Functions** for server-side logic
- **Firebase Cloud Messaging** for push notifications

## 📁 Project Structure

```
dropit-courier/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Authentication flow
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── role-selection.tsx
│   │   └── verification.tsx
│   ├── (customer)/               # Customer screens
│   │   ├── home.tsx
│   │   ├── create-delivery.tsx
│   │   └── ...
│   ├── (driver)/                 # Driver screens
│   │   ├── dashboard.tsx
│   │   └── ...
│   └── (admin)/                  # Admin screens
│       └── ...
├── components/                   # Reusable UI components
│   ├── ui/                       # Base components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   └── shared/                   # Shared components
├── services/                     # Business logic layer
│   ├── auth.service.ts
│   ├── delivery.service.ts
│   ├── location.service.ts
│   └── ...
├── models/                       # TypeScript interfaces
│   ├── User.ts
│   ├── Delivery.ts
│   ├── Driver.ts
│   └── ...
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useDelivery.ts
│   └── ...
├── utils/                        # Utility functions
│   ├── validation.ts
│   ├── formatting.ts
│   └── ...
├── config/                       # Configuration files
│   ├── firebase.ts
│   ├── mapbox.ts
│   └── theme.ts
└── assets/                       # Static assets
    ├── images/
    ├── icons/
    └── fonts/
```

## 🎨 Design System

### Color Palette
- **Primary:** Burnt Orange (#D35400)
- **Secondary:** Deep Brown (#4E2A1E)
- **Background:** Cream White (#F5E6CA)
- **Text:** Deep Brown (#4E2A1E)

### Typography
- **Headings:** Raleway Bold
- **Body:** Lora Regular
- **Buttons:** Raleway Regular

### Components
- Consistent spacing using 4px/8px grid
- Rounded corners (12px standard)
- Shadow system for depth
- Responsive design patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI
- Firebase project setup
- Mapbox account and token

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dropit-courier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase and Mapbox credentials
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

### Firebase Setup

1. Create a new Firebase project
2. Enable Authentication, Firestore, Storage, and Cloud Functions
3. Configure OAuth consent screen for Google Sign-In
4. Set up Firestore security rules
5. Deploy Cloud Functions for backend logic

### Mapbox Setup

1. Create a Mapbox account
2. Generate an access token
3. Configure map styles and restrictions
4. Set up geocoding and directions APIs

## 📱 Features Implemented

### ✅ Authentication System
- Email/password authentication
- Google OAuth integration
- Role-based access control
- User profile management
- Password reset functionality

### ✅ Customer Features
- User registration and onboarding
- Delivery creation with multi-step form
- Real-time delivery tracking
- Delivery history and management
- Driver rating system

### ✅ Driver Features
- Driver verification process
- Delivery request notifications
- Navigation and route optimization
- Proof of delivery capture
- Earnings tracking

### ✅ UI Components
- Comprehensive component library
- Consistent design system
- Responsive layouts
- Loading states and error handling
- Accessibility features

### ✅ Services Layer
- Authentication service
- Delivery management service
- Location and mapping service
- Notification service
- Storage service

## 🔧 Development

### Available Scripts
```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
```

### Code Style
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Consistent naming conventions
- Comprehensive error handling

### Testing
- Unit tests for services and utilities
- Component testing with React Native Testing Library
- Integration tests for critical user flows

## 📊 Data Models

### User Model
```typescript
interface User {
  uid: string;
  email: string;
  phone: string;
  name: string;
  role: 'customer' | 'driver' | 'admin';
  profileUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
  deviceToken?: string;
}
```

### Delivery Model
```typescript
interface Delivery {
  id: string;
  customerId: string;
  driverId?: string;
  deliveryType: string;
  vehicleType: string;
  pickup: Location;
  dropoff: Location;
  distance: number;
  totalCost: number;
  status: DeliveryStatus;
  // ... additional fields
}
```

## 🔐 Security

- Firebase security rules for data access control
- Input validation and sanitization
- Secure API key management
- Role-based permissions
- Data encryption in transit and at rest

## 📈 Performance

- Lazy loading of screens and components
- Image optimization and compression
- Efficient Firestore queries with pagination
- Real-time listeners with proper cleanup
- Offline support with cached data

## 🚀 Deployment

### Development
- Expo development builds
- Firebase emulator suite for local development
- Hot reloading and fast refresh

### Production
- Expo Application Services (EAS) for builds
- Firebase hosting for web admin panel
- App Store and Google Play Store distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ for efficient delivery management**
