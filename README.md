<<<<<<< HEAD
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
=======


# 🚚 **DropIt – Courier Marketplace (Sprint 1 Functional Requirements)**

![DropIt Logo](attachment://dropit_logo.png)

**Slogan:** *Move Smart. Deliver Fast.*
**Theme:** Earthy & Sleek
**Tech Stack:** React Native (Expo + TypeScript) · Firebase · Mapbox APIs

---

## 🧭 **1. Project Overview**

DropIt is a **courier marketplace** that connects senders and drivers for any type of delivery — from small parcels and food to furniture and hardware materials.
The system calculates prices automatically based on **distance, delivery type, and vehicle**, and matches the sender with the **nearest available driver** in real-time.

---

## 🎯 **2. Sprint Objective**

Deliver the **DropIt MVP** with end-to-end delivery request flow, including:

* Authentication & role-based onboarding
* Delivery type selection
* Map-based location input
* Real-time driver matching and tracking
* Distance-based price estimation
* Delivery scheduling
* Basic trip history

---

## 👥 **3. User Roles & Permissions**

| Role                  | Description                               | Key Permissions                          |
| --------------------- | ----------------------------------------- | ---------------------------------------- |
| **Sender (Customer)** | Requests deliveries, tracks and pays      | Create, schedule, cancel deliveries      |
| **Driver (Courier)**  | Accepts and fulfills delivery requests    | Go online/offline, accept jobs, navigate |
| **Admin**             | Oversees marketplace and verifies drivers | Manage users, pricing rules, promos      |

---

## 📱 **4. Core Features & User Stories**

### **4.1. Authentication & Role Selection**

**User Story:**
As a new user, I want to register or log in using my phone or Google, so that I can start using the app.

**Requirements:**

* Firebase Authentication (Phone & Google)
* Role choice: `Sender` or `Driver`
* Drivers must upload:

  * ID or license photo
  * Vehicle photo & type (bike, bakkie, van, truck, etc.)
  * Proof of registration (optional)
* Driver status: `Pending`, `Verified`, or `Suspended`

**Acceptance Criteria:**

* User completes onboarding in <1 min
* Drivers cannot go online unless verified

**Error Handling:**

* Handle failed verification with clear error states
* Retry upload if network fails

---

### **4.2. Delivery Type & Category Selection**

**User Story:**
As a sender, I want to select a delivery type and vehicle, so that the correct driver and price are applied.

**Requirements:**

* Delivery categories (examples):

  * **Small Parcel**
  * **Furniture Move**
  * **Food / Perishables**
  * **Butchery Delivery (Cooler)**
  * **Hardware / Construction Materials**
  * **Documents**
  * **Custom / Other**
* Each type maps to supported vehicle classes:

  * *Parcel:* Bike, Sedan
  * *Furniture:* Van, Truck
  * *Cooler:* Refrigerated Van

**Acceptance Criteria:**

* UI shows icons & short descriptions
* Type selection updates vehicle filter automatically

---

### **4.3. Pickup & Drop-off via Mapbox**

**User Story:**
As a sender, I want to set pickup and drop-off points using a map, so that I can get accurate cost and ETA.

**Requirements:**

* Mapbox SDK integration
* Autocomplete search (pickup/drop)
* Manual pin drop option
* Real-time distance and ETA calculation

**Acceptance Criteria:**

* Location accuracy: ±50m
* Auto-fetch current location for pickup
* ETA visible before booking

---

### **4.4. Distance-Based Price Estimation**

**User Story:**
As a sender, I want to view an estimated cost before confirming delivery, so that I can decide confidently.

**Pricing Formula:**

```
Total = Base Fare + (RatePerKm × Distance) + (VehicleMultiplier × TypeMultiplier)
```

**Example Rates:**

| Vehicle | Base Fare | Rate/km | Multiplier |
| ------- | --------- | ------- | ---------- |
| Bike    | R10       | R2.50   | 1x         |
| Sedan   | R15       | R3.00   | 1.2x       |
| Van     | R25       | R4.50   | 1.5x       |
| Truck   | R40       | R6.00   | 2x         |

**Acceptance Criteria:**

* Distance updates in real-time
* Estimate displayed clearly
* Future-ready field for promo or referral code

---

### **4.5. Driver Availability & Matching**

**User Story:**
As a sender, I want the nearest available driver to be auto-assigned, so my delivery starts fast.

**Requirements:**

* Firestore + GeoFirestore for geo queries
* Drivers toggle “Online/Offline”
* Match logic:

  1. Search active drivers in radius (5km)
  2. Filter by delivery type compatibility
  3. Send delivery request notification
  4. Wait for accept/decline

**Acceptance Criteria:**

* Nearest driver matched within 10s
* If declined, system retries next driver
* Sender notified instantly

**Error Handling:**

* If no drivers found → show “No drivers nearby”
* Option to schedule instead

---

### **4.6. Real-Time Tracking**

**User Story:**
As a sender, I want to track the driver live on a map, so I can see where my parcel is.

**Requirements:**

* Mapbox live updates (driver → Firestore → sender view)
* Show pickup → drop route with ETA
* Trip status:

  * Pending
  * Accepted
  * Picked Up
  * In Transit
  * Delivered
  * Cancelled

**Acceptance Criteria:**

* Location updates every 3–5s
* ETA recalculates dynamically
* Map auto-focuses on driver

---

### **4.7. In-App Navigation (Driver)**

**User Story:**
As a driver, I want navigation to the pickup and drop locations.

**Requirements:**

* Mapbox Directions API for turn-by-turn routing
* Option to open Google Maps if preferred
* Start Trip → Pickup → Drop Flow

**Acceptance Criteria:**

* Route automatically loads after accepting
* Trip completion updates Firestore

---

### **4.8. Delivery Scheduling**

**User Story:**
As a sender, I want to schedule delivery for later, so I can plan pickups in advance.

**Requirements:**

* Date & time picker
* Store in Firestore as `scheduled`
* Cloud Function triggers matching near scheduled time

**Acceptance Criteria:**

* Trigger window ±10 minutes
* Notifications sent to available drivers

---

### **4.9. Delivery History & Receipts**

**User Story:**
As a user, I want to view past deliveries, so I can reference previous trips.

**Requirements:**

* Firestore storage of completed trips
* Display:

  * Pickup/Drop
  * Date/Time
  * Distance
  * Cost
  * Driver name
* Option to download receipt (PDF - future)

**Acceptance Criteria:**

* History loads <3s
* Data matches completed trip record

---

## ⚙️ **5. System Architecture Overview**

### **Frontend**

* React Native (Expo)
* TypeScript for typing and interface consistency
* Modular components: MapScreen, DriverScreen, AuthScreen, etc.

### **Backend**

* Firebase Authentication
* Firestore (Data)
* Cloud Functions (Matching + Scheduling Logic)
* Firebase Storage (Documents, IDs)
* Expo Push Notifications

### **Geolocation**

* Mapbox API (Geocoding, Navigation, Routes)
* GeoFirestore for nearby driver search

### **Data Models (Firestore)**

```json
Users: {
  uid,
  role,
  name,
  phone,
  vehicleType,
  status,
  location,
  rating
}

Deliveries: {
  id,
  senderId,
  driverId,
  pickup,
  dropoff,
  type,
  distance,
  cost,
  status,
  scheduledTime,
  createdAt
}
```

---

## 🧩 **6. Team Breakdown**

| Role                    | Responsibilities                                |
| ----------------------- | ----------------------------------------------- |
| **Frontend Dev 1**      | Authentication, Onboarding Flow, Role Selection |
| **Frontend Dev 2**      | Mapbox Integration, Price Estimation UI         |
| **Backend Dev**         | Firestore Schema, Cloud Functions, Geo Queries  |
| **Mobile Dev (Driver)** | Navigation, Trip Updates, Online/Offline Toggle |
| **UI/UX Designer**      | Layout, Icons, Branding, Earthy Theme           |
| **QA/Tester**           | End-to-End Flow Testing (Booking → Completion)  |

---

## 🎨 **7. Branding**

**Colors:**

* Burnt Orange `#D35400`
* Deep Brown `#4E2A1E`
* Cream White `#F5E6CA`

**Typography:**

* Raleway (Headers)
* Lora (Body Text)

**UI Style:**

* Clean, earthy gradients
* Motion-based transitions (React Native Reanimated)
* Emphasis on clarity and speed cues

---

## 📦 **8. MVP Deliverables**

✅ Authentication (Firebase)
✅ Role-Based Onboarding
✅ Delivery Type Selection
✅ Map & Location Picker (Mapbox)
✅ Distance-Based Pricing
✅ Real-Time Driver Matching
✅ Tracking & Trip Flow
✅ Schedule Delivery
✅ Delivery History

---

## 🚀 **9. Future Roadmap**

* In-app payments (Stripe/Paystack)
* Promo & referral system
* Driver ratings & feedback
* Chat between sender & driver
* Business portal for bulk deliveries
* Advanced dispatch optimization (AI-based routing)

---

## 🧾 **10. Non-Functional Requirements**

| Category            | Requirement                                |
| ------------------- | ------------------------------------------ |
| **Performance**     | App loads <3s, location updates every 5s   |
| **Scalability**     | Handle 10,000 concurrent users             |
| **Security**        | Firebase Auth, Firestore rules enforced    |
| **Reliability**     | Offline caching for delivery data          |
| **Maintainability** | Modular TypeScript structure               |
| **Usability**       | Simple UX with <4 steps to book a delivery |

---

## 🏁 **11. Conclusion**

This sprint establishes the **DropIt MVP foundation** — the complete operational flow from **delivery request → driver assignment → completion tracking.**
Future sprints will expand monetization, business integrations, and premium logistics tools.


>>>>>>> e0c6f8d43cf24b9c9f7346934909780c3ff91bdd
