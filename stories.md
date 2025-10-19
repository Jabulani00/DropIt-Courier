# 🚚 DropIt - Complete User Stories & Technical Specification

**Version:** 1.0  
**Sprint Duration:** 2 weeks  
**Team Size:** 6 developers  
**Last Updated:** October 19, 2025

---

## 📋 Table of Contents

1. [Project Setup & Configuration](#1-project-setup--configuration)
2. [File Structure](#2-file-structure)
3. [Data Models & Schema](#3-data-models--schema)
4. [Frontend User Stories](#4-frontend-user-stories)
5. [Backend User Stories](#5-backend-user-stories)
6. [Service Layer Specifications](#6-service-layer-specifications)
7. [API Integration Guidelines](#7-api-integration-guidelines)
8. [Design System Implementation](#8-design-system-implementation)

---

## 1. Project Setup & Configuration

### 1.1 Environment Variables Setup

**Story ID:** SETUP-001  
**Priority:** Critical  
**Estimated Hours:** 2h

**Instructions:**
- Create `.env` file in project root
- Add Firebase configuration with provided credentials:
  - API_KEY: `AIzaSyC5ywnbFocmReAsJgi_x5Vv-2bnS_APDc4`
  - AUTH_DOMAIN: `dropit-courier.firebaseapp.com`
  - PROJECT_ID: `dropit-courier`
  - STORAGE_BUCKET: `dropit-courier.firebasestorage.app`
  - MESSAGING_SENDER_ID: `830658417393`
  - APP_ID: `1:830658417393:web:b52748a1e0ec663acd0f50`
- Add Mapbox token: `pk.eyJ1IjoianRlY2hub2xvZ2llczg3IiwiYSI6ImNtZ2V4dTdoeDAyOXMyam9pMzU1cnFnMzQifQ.cC0nzHiEXKXRzY1eyZO7uw`
- Create separate `.env.development` and `.env.production` files
- Add `.env` to `.gitignore`
- Document all environment variables in `README.md`

**Acceptance Criteria:**
- Environment variables load correctly on app startup
- No hardcoded credentials in source code
- Team members can run app with their own `.env` file

---

### 1.2 Expo Project Initialization

**Story ID:** SETUP-002  
**Priority:** Critical  
**Estimated Hours:** 3h

**Instructions:**
- Initialize Expo project with TypeScript template
- Configure `app.json` with DropIt branding:
  - App name: "DropIt"
  - Slug: "dropit-courier"
  - Icon: `assets/icon.png` (512x512px, burnt orange theme)
  - Splash screen: `assets/splash.png` (earthy gradient background)
  - Primary color: `#D35400` (Burnt Orange)
- Install core dependencies:
  - `expo-router` for navigation
  - `nativewind` for styling
  - `react-native-reanimated` for animations
  - `lucide-react-native` for icons
- Configure TypeScript with strict mode enabled
- Setup ESLint and Prettier with team formatting rules
- Create `tsconfig.json` with path aliases

**Acceptance Criteria:**
- App launches with branded splash screen
- TypeScript compilation works without errors
- Navigation structure is functional
- Linting and formatting rules are enforced

---

## 2. File Structure

### 2.1 Project Directory Structure

**Story ID:** ARCH-001  
**Priority:** Critical  
**Estimated Hours:** 2h

**Instructions:**

Create the following directory structure:

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
│   │   ├── select-vehicle.tsx
│   │   ├── confirm-order.tsx
│   │   ├── active-delivery.tsx
│   │   ├── delivery-history.tsx
│   │   └── rate-driver.tsx
│   ├── (driver)/                 # Driver screens
│   │   ├── dashboard.tsx
│   │   ├── incoming-request.tsx
│   │   ├── navigation.tsx
│   │   ├── delivery-proof.tsx
│   │   └── earnings.tsx
│   ├── (admin)/                  # Admin screens
│   │   ├── dashboard.tsx
│   │   ├── driver-review.tsx
│   │   ├── live-map.tsx
│   │   └── reports.tsx
│   └── _layout.tsx               # Root layout
├── components/                   # Reusable UI components
│   ├── ui/                       # Base components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   ├── delivery/                 # Delivery-specific
│   │   ├── DeliveryCard.tsx
│   │   ├── VehicleSelector.tsx
│   │   ├── PriceEstimator.tsx
│   │   └── StatusBadge.tsx
│   ├── map/                      # Map components
│   │   ├── MapView.tsx
│   │   ├── LocationPicker.tsx
│   │   ├── RoutePolyline.tsx
│   │   └── DriverMarker.tsx
│   └── shared/                   # Shared components
│       ├── Header.tsx
│       ├── Avatar.tsx
│       └── RatingStars.tsx
├── services/                     # Business logic layer
│   ├── auth.service.ts
│   ├── delivery.service.ts
│   ├── driver.service.ts
│   ├── location.service.ts
│   ├── payment.service.ts
│   ├── notification.service.ts
│   └── storage.service.ts
├── models/                       # TypeScript interfaces
│   ├── User.ts
│   ├── Delivery.ts
│   ├── Driver.ts
│   ├── Review.ts
│   ├── Location.ts
│   └── Vehicle.ts
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useDelivery.ts
│   ├── useLocation.ts
│   ├── useDriverMatching.ts
│   └── useRealtime.ts
├── utils/                        # Utility functions
│   ├── validation.ts
│   ├── formatting.ts
│   ├── calculations.ts
│   └── constants.ts
├── config/                       # Configuration files
│   ├── firebase.ts
│   ├── mapbox.ts
│   └── theme.ts
├── assets/                       # Static assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   │   ├── Raleway-Bold.ttf
│   │   ├── Raleway-Regular.ttf
│   │   ├── Lora-Regular.ttf
│   │   └── Lora-Italic.ttf
│   ├── logo.png
│   └── icon.png
└── types/                        # Global type definitions
    ├── navigation.d.ts
    └── environment.d.ts
```

**Acceptance Criteria:**
- All directories exist and are properly organized
- README.md in each major directory explaining its purpose
- TypeScript path aliases configured for clean imports
- Consistent naming conventions across all files

---

## 3. Data Models & Schema

### 3.1 User Model Definition

**Story ID:** MODEL-001  
**Priority:** Critical  
**Estimated Hours:** 2h

**Instructions:**

Create `models/User.ts` with the following TypeScript interface:

**Properties:**
- `uid`: string (Firebase Auth UID)
- `email`: string
- `phone`: string (E.164 format)
- `name`: string
- `role`: enum ('customer' | 'driver' | 'admin')
- `profileUrl`: string | null (Firebase Storage URL)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- `isActive`: boolean
- `deviceToken`: string | null (for push notifications)

**Firestore Collection:** `users`  
**Indexing:** Create composite index on `role` + `isActive`

**Validation Rules:**
- Email must be valid format
- Phone must match international format
- Name minimum 2 characters, maximum 50
- ProfileUrl must be valid HTTPS URL or null

**Acceptance Criteria:**
- Interface exports successfully
- Firestore security rules enforce schema
- Validation functions exist in `utils/validation.ts`

---

### 3.2 Driver Model Definition

**Story ID:** MODEL-002  
**Priority:** Critical  
**Estimated Hours:** 3h

**Instructions:**

Create `models/Driver.ts` extending User model:

**Additional Properties:**
- `vehicleType`: enum ('bike' | 'sedan' | 'van' | 'truck')
- `vehiclePlate`: string
- `licenseNumber`: string
- `licenseUrl`: string (Firebase Storage)
- `vehiclePhotoUrl`: string (Firebase Storage)
- `idPhotoUrl`: string (Firebase Storage)
- `registrationUrl`: string | null (Firebase Storage)
- `status`: enum ('pending' | 'verified' | 'suspended' | 'inactive')
- `rating`: number (0-5, decimal)
- `totalTrips`: number
- `totalEarnings`: number
- `isOnline`: boolean
- `currentLocation`: GeoPoint | null
- `lastLocationUpdate`: Timestamp | null

**Firestore Collection:** `drivers`  
**GeoFirestore:** Enable for location-based queries

**Document Upload Guidelines:**
- Store in Firebase Storage under `drivers/{uid}/documents/`
- Accept only JPG, PNG, PDF formats
- Maximum file size: 5MB per document
- Compress images before upload

**Acceptance Criteria:**
- Driver interface includes all required fields
- GeoFirestore index configured
- Storage rules prevent unauthorized access
- Document validation prevents invalid uploads

---

### 3.3 Delivery Model Definition

**Story ID:** MODEL-003  
**Priority:** Critical  
**Estimated Hours:** 3h

**Instructions:**

Create `models/Delivery.ts`:

**Properties:**
- `id`: string (auto-generated)
- `customerId`: string (User UID)
- `driverId`: string | null (Driver UID)
- `deliveryType`: enum ('parcel' | 'furniture' | 'food' | 'butchery' | 'hardware' | 'documents' | 'custom')
- `vehicleType`: enum ('bike' | 'sedan' | 'van' | 'truck')
- `pickup`: Location object
- `dropoff`: Location object
- `distance`: number (kilometers, 2 decimal places)
- `estimatedDuration`: number (minutes)
- `baseFare`: number (Rands)
- `distanceFare`: number (Rands)
- `totalCost`: number (Rands)
- `status`: enum ('pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled')
- `parcelDescription`: string
- `parcelWeight`: number | null (kg)
- `isFragile`: boolean
- `scheduledTime`: Timestamp | null
- `createdAt`: Timestamp
- `acceptedAt`: Timestamp | null
- `pickedUpAt`: Timestamp | null
- `deliveredAt`: Timestamp | null
- `cancelledAt`: Timestamp | null
- `cancellationReason`: string | null
- `proofOfDeliveryUrl`: string | null (signature/photo)
- `driverNotes`: string | null
- `customerNotes`: string | null

**Location Interface:**
```
{
  address: string,
  coordinates: {
    latitude: number,
    longitude: number
  },
  placeId: string (Mapbox)
}
```

**Firestore Collection:** `deliveries`  
**Composite Indexes:**
- `customerId` + `status` + `createdAt`
- `driverId` + `status` + `createdAt`
- `status` + `createdAt`

**Acceptance Criteria:**
- All delivery states properly defined
- Timestamps track complete delivery lifecycle
- Location data includes full address and coordinates
- Cost calculation fields are separate for transparency

---

### 3.4 Review Model Definition

**Story ID:** MODEL-004  
**Priority:** High  
**Estimated Hours:** 2h

**Instructions:**

Create `models/Review.ts`:

**Properties:**
- `id`: string
- `deliveryId`: string
- `customerId`: string
- `driverId`: string
- `rating`: number (1-5, integer only)
- `comment`: string | null
- `createdAt`: Timestamp
- `isVisible`: boolean (admin can hide inappropriate reviews)

**Firestore Collection:** `reviews`  
**Index:** `driverId` + `createdAt` (for driver profile)

**Business Rules:**
- One review per delivery
- Customer can only review after delivery completion
- Rating must trigger driver rating recalculation
- Comment maximum 500 characters
- Profanity filter required

**Acceptance Criteria:**
- Review submission updates driver's aggregate rating
- Duplicate reviews prevented at database level
- Comments are sanitized before storage

---

### 3.5 Notification Model Definition

**Story ID:** MODEL-005  
**Priority:** Medium  
**Estimated Hours:** 2h

**Instructions:**

Create `models/Notification.ts`:

**Properties:**
- `id`: string
- `userId`: string
- `type`: enum ('delivery_request' | 'delivery_accepted' | 'delivery_picked_up' | 'delivery_in_transit' | 'delivery_delivered' | 'delivery_cancelled' | 'payment_received' | 'driver_verified' | 'system_announcement')
- `title`: string
- `body`: string
- `data`: object (delivery ID, amount, etc.)
- `isRead`: boolean
- `createdAt`: Timestamp
- `expiresAt`: Timestamp | null

**Firestore Collection:** `notifications`  
**Index:** `userId` + `isRead` + `createdAt`

**Push Notification Integration:**
- Use Expo Push Notifications
- Store device tokens in User model
- Handle notification permissions on first launch
- Support notification tapping to navigate to relevant screen

**Acceptance Criteria:**
- Notifications appear in-app and as push
- Tapping notification navigates correctly
- Old notifications auto-expire after 30 days
- Unread count displays in app header

---

## 4. Frontend User Stories

### 4.1 Authentication & Onboarding

#### 4.1.1 Login Screen

**Story ID:** FE-AUTH-001  
**Priority:** Critical  
**Estimated Hours:** 4h  
**Assigned To:** Frontend Dev 1

**User Story:**  
As a user, I want to log in using my email/phone or Google account so that I can access the app securely.

**Design Instructions:**
- Full-screen layout with earthy gradient background (Burnt Orange #D35400 to Deep Brown #4E2A1E)
- DropIt logo centered at top (80px height)
- Slogan "Move Smart. Deliver Fast." in Lora italic, Cream White #F5E6CA
- Two input fields with rounded corners (12px radius):
  - Email/Phone input with envelope icon from Lucide
  - Password input with lock icon, eye toggle for visibility
- "Login" button: Full width, Burnt Orange background, Cream White text, Raleway Bold
- "Forgot Password?" link below (Cream White, underlined on press)
- Divider text "OR" in Cream White
- Google Sign-In button: White background, Google logo, "Continue with Google" text
- "Don't have an account? Sign Up" link at bottom
- Loading spinner during authentication (Burnt Orange color)

**Technical Requirements:**
- Import Firebase Auth from `config/firebase.ts`
- Use `useAuth` hook from `hooks/useAuth.ts`
- Implement email/password and Google OAuth flows
- Show error messages in toast/alert (red accent on Cream background)
- Navigate to role selection if first login, home if returning user
- Handle "Remember Me" with AsyncStorage
- Validate email format before submission
- Password minimum 8 characters

**Error Handling:**
- Invalid credentials: "Email or password incorrect"
- Network error: "Connection failed. Please try again"
- Account disabled: "Your account has been suspended. Contact support"
- Too many attempts: "Too many login attempts. Try again later"

**Acceptance Criteria:**
- User can log in with valid credentials
- Google Sign-In opens native flow
- Errors display clearly with retry option
- Loading state prevents duplicate submissions
- Navigation works after successful login

---

#### 4.1.2 Signup Screen

**Story ID:** FE-AUTH-002  
**Priority:** Critical  
**Estimated Hours:** 5h  
**Assigned To:** Frontend Dev 1

**User Story:**  
As a new user, I want to create an account with my personal details so that I can start using DropIt.

**Design Instructions:**
- Similar layout to Login Screen (consistent branding)
- Form fields with icons (all with 12px rounded corners):
  - Full Name (user icon)
  - Email (envelope icon)
  - Phone Number (phone icon with country code picker)
  - Password (lock icon with strength indicator)
  - Confirm Password (lock icon)
- Password strength indicator: Weak (red), Medium (orange), Strong (green)
- Checkbox for Terms & Conditions (Cream White text with Deep Brown link)
- "Create Account" button (Burnt Orange, disabled until all valid)
- "Already have an account? Login" link at bottom

**Technical Requirements:**
- Use `auth.service.ts` for registration
- Implement real-time validation for each field
- Phone number: Use libphonenumber-js for validation
- Password strength: Check length, uppercase, number, special char
- Email verification: Send Firebase verification email after signup
- Store user data in Firestore `users` collection after successful signup
- Hash password before storage (Firebase handles this)
- Show inline errors below each field (red text)

**Validation Rules:**
- Name: 2-50 characters, letters and spaces only
- Email: Valid format, unique in database
- Phone: Valid international format, unique in database
- Password: Min 8 chars, 1 uppercase, 1 number, 1 special
- Confirm Password: Must match password field
- Terms: Must be checked to proceed

**Acceptance Criteria:**
- All fields validate in real-time
- Duplicate email/phone shows clear error
- Success navigates to role selection screen
- User receives verification email
- Profile created in Firestore

---

#### 4.1.3 Role Selection Screen

**Story ID:** FE-AUTH-003  
**Priority:** Critical  
**Estimated Hours:** 3h  
**Assigned To:** Frontend Dev 1

**User Story:**  
As a new user, I want to select my role (Customer or Driver) so that I see the appropriate interface.

**Design Instructions:**
- Header: "Choose Your Role" in Raleway Bold, Deep Brown
- Two large cards (50% screen width each, side by side on tablet, stacked on phone):
  - **Customer Card:**
    - Package icon (Lucide) in Burnt Orange
    - "I want to send items" subtitle in Lora
    - Cream White background, Deep Brown border on select
  - **Driver Card:**
    - Truck icon (Lucide) in Burnt Orange
    - "I want to deliver items" subtitle in Lora
    - Cream White background, Deep Brown border on select
- Selected card gets Deep Brown 2px border with subtle shadow
- "Continue" button at bottom (Burnt Orange, only enabled when role selected)
- "Switch role later in settings" info text (small, gray)

**Technical Requirements:**
- Update user document in Firestore with selected role
- Store role in `useAuth` context/hook
- If Driver selected, navigate to Driver Verification screen
- If Customer selected, navigate to Customer Home
- Use React state to track selection
- Animate card selection with scale transform (react-native-reanimated)

**Business Rules:**
- Role can be changed later by admin only (prevents abuse)
- Drivers must complete verification before accessing driver features
- Customers have immediate access after selection

**Acceptance Criteria:**
- Cards are clearly distinguishable
- Selection persists after app restart
- Correct navigation based on role
- Role stored in Firestore and Auth context

---

#### 4.1.4 Driver Verification Screen

**Story ID:** FE-AUTH-004  
**Priority:** Critical  
**Estimated Hours:** 6h  
**Assigned To:** Frontend Dev 1

**User Story:**  
As a new driver, I want to upload my verification documents so that I can be approved to accept deliveries.

**Design Instructions:**
- Multi-step form with progress indicator (4 steps)
- Step 1: Vehicle Type Selection
  - Radio buttons for Bike, Sedan, Van, Truck
  - Vehicle icons from Lucide
  - Base fare info displayed per vehicle type
- Step 2: Document Upload
  - ID/License upload (camera or gallery)
  - Vehicle Registration upload
  - Vehicle Photo upload
  - Each with preview thumbnail and "Retake" option
- Step 3: Vehicle Details
  - License Plate input (uppercase, alphanumeric)
  - License Number input
  - Vehicle Color dropdown
  - Vehicle Make/Model input
- Step 4: Review & Submit
  - All entered info displayed for confirmation
  - "Submit for Review" button
  - "Pending Verification" status screen after submission

**Technical Requirements:**
- Use `expo-image-picker` for document capture
- Upload to Firebase Storage under `drivers/{uid}/documents/`
- Compress images before upload (max 2MB per file)
- Store document URLs in driver profile
- Set driver status to 'pending' in Firestore
- Send notification to admin for review
- Create CloudFunction trigger for admin notification
- Show upload progress bar (0-100%)

**Upload Validation:**
- Accept only JPG, PNG, PDF formats
- Minimum image resolution: 800x600px
- File size: Max 5MB before compression, 2MB after
- Reject blurry images (use basic quality check)

**Acceptance Criteria:**
- Driver can complete all 4 steps
- Documents upload successfully to Storage
- Driver status updates to 'pending'
- Admin receives notification
- Driver sees "Under Review" status screen
- Driver cannot access driver features until verified

---

### 4.2 Customer Journey

#### 4.2.1 Customer Home Screen

**Story ID:** FE-CUST-001  
**Priority:** Critical  
**Estimated Hours:** 5h  
**Assigned To:** Frontend Dev 2

**User Story:**  
As a customer, I want to see my active deliveries and quickly create a new one from the home screen.

**Design Instructions:**
- Header with user avatar (top-right), notification bell icon (top-right)
- Greeting text: "Hello, {Name}" in Raleway Bold, Deep Brown
- Large "Create Delivery" button (Burnt Orange, centered, icon: plus sign)
- Active Deliveries section (if any):
  - Card per active delivery showing:
    - Delivery type icon
    - Pickup → Dropoff addresses (truncated)
    - Status badge (colored: Pending=orange, Accepted=blue, In Transit=green)
    - "Track" button
- Recent Deliveries preview (last 3):
  - Smaller cards with delivery date, dropoff address, cost
  - "View All" button linking to history
- Quick Actions row:
  - Schedule Delivery icon
  - Delivery History icon
  - Support icon

**Technical Requirements:**
- Fetch active deliveries from Firestore where `customerId == currentUser.uid` and `status != 'delivered'`
- Real-time listener for active delivery status updates
- Pull-to-refresh to reload data
- Navigate to tracking screen on "Track" tap
- Navigate to create delivery on main button tap
- Use FlatList for active deliveries (optimized rendering)
- Cache recent deliveries for offline viewing

**Performance Optimization:**
- Lazy load recent deliveries (show skeleton loaders first)
- Debounce Firestore listeners
- Use memo for delivery cards to prevent unnecessary re-renders

**Acceptance Criteria:**
- Active deliveries update in real-time
- Empty state shows "No active deliveries" with illustration
- Navigation works for all buttons
- Pull-to-refresh reloads data successfully
- Notification badge shows unread count

---

#### 4.2.2 Create Delivery Screen

**Story ID:** FE-CUST-002  
**Priority:** Critical  
**Estimated Hours:** 8h  
**Assigned To:** Frontend Dev 2

**User Story:**  
As a customer, I want to enter pickup and dropoff locations, select delivery type, and see an estimated price.

**Design Instructions:**
- Multi-step form wizard (3 steps with progress bar)
- **Step 1: Delivery Type**
  - Grid of delivery type cards (2 columns):
    - Small Parcel, Furniture, Food, Butchery, Hardware, Documents, Custom
    - Each card has icon, title, subtitle (e.g., "Fits in bike/sedan")
    - Burnt Orange border on selection
  - Brief description expands below selected type
- **Step 2: Locations**
  - Mapbox map view covering top 50% of screen
  - Pickup location input with autocomplete (Mapbox Places API)
  - "Use Current Location" button for pickup
  - Dropoff location input with autocomplete
  - Route polyline drawn on map when both locations set
  - Distance and ETA displayed below map
- **Step 3: Details**
  - Parcel description input (multiline, max 200 chars)
  - Weight input (optional, kg)
  - "Is Fragile?" checkbox
  - Vehicle type selector (filtered based on delivery type):
    - Show only compatible vehicles
    - Display base fare + per km rate
  - Price estimator card:
    - Base Fare: R{amount}
    - Distance ({km}km): R{amount}
    - **Total: R{total}** (bold, large)
  - Customer notes input (optional, max 200 chars)
  - "Schedule for Later" toggle (shows date/time picker if enabled)
  - "Confirm & Request Driver" button (Burnt Orange)

**Technical Requirements:**
- Integrate Mapbox GL JS/Native for map rendering
- Use Mapbox Geocoding API for autocomplete
- Use Mapbox Directions API for route and distance calculation
- Calculate price using formula from requirements doc
- Store delivery request in Firestore with status 'pending'
- Trigger driver matching CloudFunction on submission
- Get user's current location using Expo Location API
- Validate all required fields before allowing next step
- Show loading state during price calculation

**Price Calculation Formula:**
```
Total = BaseFare + (RatePerKm × Distance) + (VehicleMultiplier × DeliveryTypeMultiplier)

Example:
- Van delivery
- 10km distance
- Furniture type
Total = 25 + (4.50 × 10) + (1.5 × 1.2) = 25 + 45 + 1.8 = R71.80
```

**Acceptance Criteria:**
- User can complete all 3 steps
- Map displays route and distance accurately
- Price updates in real-time as selections change
- Delivery request saves to Firestore successfully
- Driver matching begins immediately after submission
- User navigates to "Finding Driver" screen

---

#### 4.2.3 Finding Driver Screen

**Story ID:** FE-CUST-003  
**Priority:** High  
**Estimated Hours:** 4h  
**Assigned To:** Frontend Dev 2

**User Story:**  
As a customer, I want to see that the system is searching for a driver so that I know my request is being processed.

**Design Instructions:**
- Animated spinner (Burnt Orange color, Lottie animation of delivery truck)
- Text: "Finding the best driver for you..." (Raleway, Deep Brown)
- Subtext: "This usually takes 10-30 seconds" (Lora, gray)
- Circular avatar placeholders animating in a wave pattern
- Cancel button at bottom (red outline, "Cancel Request")
- Progress ring around logo showing search time (max 2 minutes)

**Technical Requirements:**
- Listen to delivery document for `driverId` field update
- CloudFunction handles driver matching in background
- Timeout after 2 minutes with "No drivers available" message
- Real-time listener on delivery status
- When driver accepts, navigate to Active Delivery screen
- Show driver info immediately after acceptance (name, rating, vehicle, ETA)
- Store search start time to calculate duration

**Driver Matching Logic (Backend):**
- CloudFunction queries GeoFirestore for online drivers within 5km radius
- Filter by compatible vehicle type
- Sort by distance and rating
- Send push notification to top 3 drivers
- First to accept gets assigned
- Update delivery document with driverId and status 'accepted'

**Acceptance Criteria:**
- Spinner animates smoothly
- Customer can cancel before driver accepts
- Navigation happens automatically when driver found
- Timeout shows helpful message with option to retry or schedule
- Error handling for network issues

---

#### 4.2.4 Active Delivery Tracking Screen

**Story ID:** FE-CUST-004  
**Priority:** Critical  
**Estimated Hours:** 8h  
**Assigned To:** Frontend Dev 2

**User Story:**  
As a customer, I want to track my driver's live location on a map so that I know when my delivery will arrive.

**Design Instructions:**
- Full-screen Mapbox map showing:
  - Pickup marker (green pin)
  - Dropoff marker (red pin)
  - Driver's live location (animated car/bike icon)
  - Route polyline (Burnt Orange color)
- Bottom sheet (swipeable) with delivery details:
  - Driver avatar, name, rating (stars), vehicle type
  - Status badge (Accepted, Picked Up, In Transit, Delivered)
  - ETA: "{X} minutes away" (updates in real-time)
  - "Call Driver" button (phone icon)
  - "Message Driver" button (chat icon)
  - Delivery details (expandable section):
    - Pickup address
    - Dropoff address
    - Parcel description
    - Total cost
- Top bar with "Cancel Delivery" button (only if not picked up yet)
- Animation when status changes (confetti on delivery completion)

**Technical Requirements:**
- Real-time Firestore listener on delivery document
- Listen to driver's location updates (every 3-5 seconds)
- Update driver marker position with smooth animation
- Recalculate ETA using Mapbox Directions API
- Auto-zoom map to fit all markers
- Use react-native-maps or Mapbox Native SDK
- Implement bottom sheet with react-native-reanimated
- Phone call uses native dialer (Linking.openURL)
- Chat opens in-app messaging screen (future feature, show "Coming Soon" for now)

**Status Flow:**
1. Accepted → Driver on way to pickup
2. Picked Up → Driver has the package
3. In Transit → Driver heading to dropoff
4. Delivered → Package delivered (show rating modal)

**Real-time Updates:**
- Driver location updates every 5 seconds
- ETA recalculates every 30 seconds
- Status changes trigger immediate UI update

**Acceptance Criteria:**
- Map renders correctly with all markers
- Driver location updates smoothly in real-time
- ETA is accurate within ±5 minutes
- Status changes reflect immediately
- Call and message buttons work
- Cancel button shows confirmation dialog
- Delivery completion shows rating modal

---

#### 4.2.5 Rate Driver Screen

**Story ID:** FE-CUST-005  
**Priority:** High  
**Estimated Hours:** 3h  
**Assigned To:** Frontend Dev 2

**User Story:**  
As a customer, I want to rate my driver after delivery so that I can help maintain quality service.

**Design Instructions:**
- Modal overlay with rounded top corners
- Title: "How was your delivery?" (Raleway Bold, Deep Brown)
- Driver info card:
  - Avatar, name, vehicle type
  - Delivery details (pickup → dropoff)
- Star rating selector (1-5 stars, large, Burnt Orange when selected)
- Text input for optional comment (placeholder: "Tell us more about your experience...")
  - Multiline, max 500 characters
  - Character counter at bottom-right
- "Submit Rating" button (Burnt Orange, full width)
- "Skip" text button (gray, top-right corner)
- Thank you animation after submission (checkmark with confetti)

**Technical Requirements:**
- Show modal automatically after delivery status changes to 'delivered'
- Store review in Firestore `reviews` collection
- Update driver's aggregate rating in `drivers` document
- Calculate new rating: `(currentRating × totalReviews + newRating) / (totalReviews + 1)`
- Increment driver's `totalTrips` counter
- Validate rating (1-5 required, comment optional)
- Filter profanity in comments using bad-words library
- Send thank you notification to customer
- Close modal and return to home screen after submission
- Allow skip, but remind user later (show again on next app open)

**Rating Calculation Example:**
```
Driver has 4.5 rating from 20 reviews
Customer gives 5 stars
New rating = (4.5 × 20 + 5) / 21 = 95 / 21 = 4.52
```

**Acceptance Criteria:**
- Modal appears automatically after delivery
- Star selection is responsive and clear
- Comment is optional but encouraged
- Submission updates driver rating in real-time
- Profanity is filtered from comments
- Thank you message displays before closing
- Skip option available but tracked for future prompt

---

#### 4.2.6 Delivery History Screen

**Story ID:** FE-CUST-006  
**Priority:** Medium  
**Estimated Hours:** 4h  
**Assigned To:** Frontend Dev 2

**User Story:**  
As a customer, I want to view my past deliveries so that I can track my spending and repeat orders.

**Design Instructions:**
- Header: "Delivery History" (Raleway Bold)
- Filter tabs at top: All, Completed, Cancelled
- Search bar for address or delivery ID
- List of delivery cards (FlatList):
  - Delivery date and time (Lora, gray)
  - Delivery type icon
  - Pickup → Dropoff (truncated addresses)
  - Total cost (Raleway Bold, Burnt Orange)
  - Status badge
  - "Repeat Order" button (outline, Burnt Orange)
  - "View Details" chevron icon
- Pull-to-refresh functionality
- Infinite scroll (load 20 at a time)
- Empty state: "No deliveries yet" with illustration

**Technical Requirements:**
- Query Firestore `deliveries` collection where `customerId == currentUser.uid`
- Order by `createdAt` descending
- Filter by status based on selected tab
- Implement search by address or delivery ID
- Use FlatList with pagination (startAfter for Firestore)
- Cache results for offline viewing
- "Repeat Order" pre-fills Create Delivery form with same details
- "View Details" navigates to read-only delivery detail screen
- Show loading skeleton while fetching

**Firestore Query:**
```
deliveries
  .where('customerId', '==', currentUserId)
  .where('status', 'in', ['delivered', 'cancelled']) // based on filter
  .orderBy('createdAt', 'desc')
  .limit(20)
```

**Acceptance Criteria:**
- History loads within 3 seconds
- Filters work correctly
- Search returns accurate results
- Pagination loads smoothly
- Repeat order functionality works
- Offline cached data displays when no connection

---

### 4.3 Driver Journey

#### 4.3.1 Driver Dashboard Screen

**Story ID:** FE-DRV-001  
**Priority:** Critical  
**Estimated Hours:** 6h  
**Assigned To:** Mobile Dev (Driver)

**User Story:**  
As a driver, I want to see my online status and today's earnings so that I can track my performance.

**Design Instructions:**
- Header with online/offline toggle (large, prominent)
  - Online: Green background with "You're Online" text
  - Offline: Gray background with "You're Offline" text
  - Toggle animation slides smoothly
- Today's stats cards (2x2 grid):
  - **Trips Today:** Count with truck icon
  - **Earnings Today:** Amount with money icon
  - **Distance Covered:** Kilometers with map icon
  - **Average Rating:** Stars with rating number
- Active delivery card (if any):
  - Customer name and avatar
  - Pickup → Dropoff
  - "Navigate" button (Burnt Orange)
  - Estimated earnings
- Pending requests badge (red dot) on dashboard if any
- Bottom navigation: Dashboard, Earnings, Profile
- "Go to Pickup" FAB (Floating Action Button) if delivery accepted

**Technical Requirements:**
- Toggle updates driver's `isOnline` status in Firestore
- Update driver's `currentLocation` in GeoFirestore when online
- Real-time listener for incoming delivery requests
- Calculate today's stats using Firestore aggregation
- Show push notification permission prompt if not granted
- Location permission required to go online
- Background location tracking when online (use expo-location)
- Update location every 5 seconds when online
- Stop location updates when offline to save battery

**Business Rules:**
- Driver cannot go online if status is not 'verified'
- Driver cannot go online without location permission
- Going offline while on active delivery shows warning
- Location updates pause when app is backgrounded (resume on foreground)

**Acceptance Criteria:**
- Toggle changes status in Firestore
- Stats display accurate data for current day
- Location updates work in foreground
- Pending requests show notification badge
- Cannot go online without verification
- Warning displays before going offline with active delivery

---

#### 4.3.2 Incoming Delivery Request Modal

**Story ID:** FE-DRV-002  
**Priority:** Critical  
**Estimated Hours:** 5h  
**Assigned To:** Mobile Dev (Driver)

**User Story:**  
As a driver, I want to receive delivery requests with all relevant details so that I can decide whether to accept.

**Design Instructions:**
- Full-screen modal overlay (semi-transparent black background)
- White card with rounded corners (16px)
- Countdown timer at top (30 seconds, circular progress ring)
- "New Delivery Request" title (Raleway Bold, Burnt Orange)
- Delivery details section:
  - Delivery type with icon
  - Parcel description
  - Weight and fragile indicator
- Route preview (small map showing pickup → dropoff)
- Distance and estimated duration
- Earnings display (large, Burnt Orange, Raleway Bold)
- Customer rating (stars)
- Two buttons (side by side):
  - "Decline" (gray outline)
  - "Accept" (Burnt Orange, solid)
- Auto-decline after 30 seconds with sound alert

**Technical Requirements:**
- Show modal immediately when Firestore listener detects new request
- Play notification sound (use expo-av)
- Vibrate device on request arrival
- Prefetch map route data for quick display
- Accept button updates delivery document with `driverId` and status 'accepted'
- Decline button triggers backend to offer to next driver
- CloudFunction handles timeout logic
- Store response time for analytics
- Show loading state after accept (prevent double tap)

**Request Matching Flow:**
1. CloudFunction finds nearby drivers
2. Sends push notification to top 3 drivers
3. Creates temporary request record in Firestore
4. Driver app listens for requests matching driver ID
5. First to accept gets delivery
6. Others receive "Delivery taken" notification

**Acceptance Criteria:**
- Modal appears within 2 seconds of request
- Countdown timer is accurate
- Sound and vibration work
- Accept updates database successfully
- Decline offers to next driver
- Auto-decline works at timeout
- Navigation to pickup screen after acceptance

---

#### 4.3.3 Navigation Screen

**Story ID:** FE-DRV-003  
**Priority:** Critical  
**Estimated Hours:** 8h  
**Assigned To:** Mobile Dev (Driver)

**User Story:**  
As a driver, I want turn-by-turn navigation to pickup and dropoff locations so that I can complete deliveries efficiently.

**Design Instructions:**
- Full-screen Mapbox map with navigation view
- Route polyline (Burnt Orange, thick line)
- Current location marker (animated blue dot)
- Destination marker (pickup or dropoff based on status)
- Top info card (floating):
  - Next turn instruction with icon
  - Distance to turn
  - ETA to destination
  - Customer name (for pickup) or "Delivery" (for dropoff)
- Bottom action sheet:
  - "Open in Google Maps" button
  - "Call Customer" button
  - "Mark as Picked Up" button (only at pickup location)
  - "Mark as Delivered" button (only at dropoff location)
  - Parcel details (expandable)
- Voice navigation instructions (text-to-speech)
- Speed limit indicator (if available from Mapbox)

**Technical Requirements:**
- Use Mapbox Navigation SDK for turn-by-turn directions
- Detect arrival at pickup (within 50m radius)
- Enable "Mark as Picked Up" button only when at pickup
- Update delivery status in Firestore on button press
- Detect arrival at dropoff (within 50m radius)
- Show proof of delivery screen before marking as delivered
- Implement voice instructions using expo-speech
- Track route deviations and recalculate
- Update customer's tracking view in real-time
- Calculate earnings based on actual distance traveled

**Status Flow:**
1. Accepted → Navigate to Pickup
2. At Pickup → Mark as Picked Up → Navigate to Dropoff
3. At Dropoff → Proof of Delivery → Mark as Delivered

**Location Tracking:**
- Update Firestore every 5 seconds with current location
- Use high accuracy mode
- Calculate actual distance for earnings
- Store route points for dispute resolution

**Acceptance Criteria:**
- Navigation starts automatically after acceptance
- Turn instructions are clear and timely
- Voice guidance works without screen interaction
- Status updates work at correct locations
- External maps link opens correctly
- Real-time location updates to customer

---

#### 4.3.4 Proof of Delivery Screen

**Story ID:** FE-DRV-004  
**Priority:** High  
**Estimated Hours:** 4h  
**Assigned To:** Mobile Dev (Driver)

**User Story:**  
As a driver, I want to collect proof of delivery so that I can confirm successful completion.

**Design Instructions:**
- Modal with two options:
  - **Signature Capture:**
    - Recipient name input
    - Canvas for signature (white background, black ink)
    - "Clear" button to reset signature
  - **Photo Upload:**
    - Camera preview
    - "Take Photo" button (Burnt Orange)
    - Preview thumbnail after capture
    - "Retake" option
- Customer notes input (optional, e.g., "Left at door")
- OTP verification option (4-digit code customer provides)
- "Confirm Delivery" button (Burnt Orange, disabled until proof captured)

**Technical Requirements:**
- Use react-native-signature-canvas for signature
- Use expo-camera for photo capture
- Compress photo before upload (max 1MB)
- Upload to Firebase Storage under `deliveries/{deliveryId}/proof/`
- Store proof URL in delivery document
- Update delivery status to 'delivered'
- Update driver's earnings and stats
- Send completion notification to customer
- Trigger rating modal for customer

**Business Rules:**
- Proof is required to mark delivery as complete
- Signature or photo (choose one, both not required)
- Customer notes are optional but encouraged
- OTP verification optional (for high-value deliveries)

**Acceptance Criteria:**
- Signature captures smoothly
- Photo quality is adequate for proof
- Upload completes successfully
- Delivery status updates
- Customer receives notification
- Driver earnings update immediately

---

#### 4.3.5 Earnings Screen

**Story ID:** FE-DRV-005  
**Priority:** Medium  
**Estimated Hours:** 5h  
**Assigned To:** Mobile Dev (Driver)

**User Story:**  
As a driver, I want to view my earnings breakdown so that I can track my income.

**Design Instructions:**
- Header with total balance (large, Raleway Bold, Burnt Orange)
  - "Available Balance: R{amount}"
  - "Withdraw" button (outline, Burnt Orange)
- Filter tabs: Today, This Week, This Month, All Time
- Earnings chart (line graph showing daily earnings)
  - Use recharts or victory-native
  - Burnt Orange line color
  - Cream background
- Stats cards:
  - Total Trips
  - Total Distance
  - Average Trip Earnings
  - Highest Single Trip
- Trip breakdown list:
  - Date and time
  - Route (pickup → dropoff abbreviated)
  - Distance
  - Earnings (Raleway Bold)
  - "View Receipt" link
- Export button (top-right) for CSV download

**Technical Requirements:**
- Query Firestore for driver's completed deliveries
- Aggregate earnings by date range
- Calculate statistics (average, total, highest)
- Chart library: Use react-native-chart-kit or victory-native
- Format currency to 2 decimal places
- CSV export generates file with all trip data
- Share CSV using expo-sharing
- Cache data for offline viewing

**Withdrawal Flow (Future Feature):**
- Show "Coming Soon" modal for now
- Plan: Integrate with payment gateway
- Minimum withdrawal: R100
- Processing time: 1-3 business days

**Acceptance Criteria:**
- Earnings display accurate data
- Filters work correctly
- Chart renders properly
- Trip breakdown matches Firestore data
- Export generates valid CSV
- Withdrawal shows coming soon message

---

### 4.4 Admin Portal

#### 4.4.1 Admin Dashboard

**Story ID:** FE-ADMIN-001  
**Priority:** High  
**Estimated Hours:** 6h  
**Assigned To:** Backend Dev (also handles admin frontend)

**User Story:**  
As an admin, I want an overview of platform activity so that I can monitor operations.

**Design Instructions:**
- Web-based dashboard (React web app or admin panel)
- Header with DropIt logo and admin name
- Stats cards grid (4 columns):
  - Active Deliveries (count with live icon)
  - Total Drivers Online (count with truck icon)
  - Today's Revenue (amount with money icon)
  - Pending Verifications (count with alert icon)
- Live map section showing:
  - All active deliveries (polylines)
  - Online drivers (markers)
  - Clickable markers for details
- Recent activity feed:
  - New registrations
  - Completed deliveries
  - Cancelled deliveries
  - Driver status changes
- Quick action buttons:
  - Review Drivers
  - Generate Reports
  - Send Announcement
  - View All Deliveries

**Technical Requirements:**
- Build with React + TypeScript (web)
- Use Firebase Admin SDK for data access
- Firestore queries with real-time listeners
- Mapbox GL JS for live map
- Stats auto-refresh every 30 seconds
- Filter live map by delivery status
- Activity feed shows last 50 events
- Admin authentication required (Firebase Auth)
- Role-based access control (only role 'admin' can access)

**Security:**
- Admin routes protected with AuthGuard
- Firestore security rules restrict admin operations
- Audit log for all admin actions

**Acceptance Criteria:**
- Dashboard loads within 5 seconds
- Stats are accurate and real-time
- Map displays all active elements
- Activity feed updates automatically
- Quick actions navigate correctly
- Only admins can access dashboard

---

#### 4.4.2 Driver Verification Review

**Story ID:** FE-ADMIN-002  
**Priority:** High  
**Estimated Hours:** 5h  
**Assigned To:** Backend Dev

**User Story:**  
As an admin, I want to review driver applications and documents so that I can approve qualified drivers.

**Design Instructions:**
- List of pending drivers (cards with status badges)
- Each card shows:
  - Driver name and photo
  - Registration date
  - Vehicle type
  - "Review" button
- Detail modal when clicking review:
  - All uploaded documents (ID, license, vehicle, registration)
  - Image viewer with zoom capability
  - Driver details form (name, phone, email, vehicle info)
  - Document status checkboxes:
    - ID Verified
    - License Verified
    - Vehicle Verified
    - Registration Verified
  - Rejection reason textarea (if rejecting)
  - Two buttons:
    - "Approve" (green)
    - "Reject" (red)
- Approval confirmation dialog
- Success message after action

**Technical Requirements:**
- Query Firestore for drivers with status 'pending'
- Display documents from Firebase Storage
- Update driver status to 'verified' or 'rejected' on action
- Send push notification to driver about status
- Store rejection reason in driver document
- Log admin action in audit trail
- Email notification to driver about verification result

**Business Rules:**
- All documents must be checked before approval
- Rejection requires a reason (minimum 20 characters)
- Approved drivers can immediately go online
- Rejected drivers can resubmit after addressing issues

**Acceptance Criteria:**
- Pending drivers list loads correctly
- Documents display clearly with zoom
- Approval updates driver status immediately
- Driver receives notification
- Rejection reason is stored
- Audit log records admin action

---

#### 4.4.3 Live Delivery Map

**Story ID:** FE-ADMIN-003  
**Priority:** Medium  
**Estimated Hours:** 6h  
**Assigned To:** Backend Dev

**User Story:**  
As an admin, I want to see all active deliveries on a map so that I can monitor real-time operations.

**Design Instructions:**
- Full-screen Mapbox map
- Delivery markers showing status color:
  - Pending: Orange
  - Accepted: Blue
  - Picked Up: Yellow
  - In Transit: Green
- Driver markers (moving in real-time)
- Route polylines for each active delivery
- Sidebar with delivery list:
  - Filterable by status
  - Searchable by delivery ID or customer name
  - Click to focus map on delivery
- Marker popup on click showing:
  - Delivery ID
  - Customer and driver names
  - Status and ETA
  - "View Details" button
- Auto-refresh every 5 seconds
- Heatmap layer showing delivery density

**Technical Requirements:**
- Query Firestore for all deliveries with active statuses
- Real-time listeners for driver locations
- Use Mapbox GL JS clustering for many markers
- Implement map filters by status
- Store map state (zoom, center) in URL params
- Export current view as PNG (mapbox-gl export)
- WebSocket connection for real-time updates
- Optimize for 100+ concurrent deliveries

**Performance Optimization:**
- Use marker clustering to reduce render load
- Lazy load delivery details on marker click
- Debounce real-time updates to max 1 per second per marker
- Use memo for sidebar list items

**Acceptance Criteria:**
- Map renders all active deliveries
- Markers update in real-time
- Filters work correctly
- Sidebar search is accurate
- Map performance is smooth with 100+ markers
- Popup details are correct

---

#### 4.4.4 Reports Generation

**Story ID:** FE-ADMIN-004  
**Priority:** Medium  
**Estimated Hours:** 5h  
**Assigned To:** Backend Dev

**User Story:**  
As an admin, I want to generate reports on deliveries and earnings so that I can analyze platform performance.

**Design Instructions:**
- Report type selector dropdown:
  - Deliveries Report
  - Earnings Report
  - Driver Performance Report
  - Customer Activity Report
- Date range picker (start and end date)
- Filter options:
  - By status
  - By driver
  - By customer
  - By delivery type
- "Generate Report" button (Burnt Orange)
- Report preview section:
  - Summary stats cards
  - Data table with sortable columns
  - Charts (bar, line, pie based on report type)
- Export options:
  - Download as PDF
  - Download as CSV
  - Email to address
- Scheduled reports option (future feature)

**Technical Requirements:**
- Query Firestore with complex filters
- Aggregate data using Cloud Functions
- Generate PDF using jsPDF or puppeteer
- Generate CSV from JSON data
- Send email using SendGrid or Firebase Extensions
- Cache generated reports for 24 hours
- Store reports in Firebase Storage
- Pagination for large datasets (1000+ rows)

**Report Types:**
1. **Deliveries Report:**
   - Total deliveries
   - By status breakdown
   - Average delivery time
   - Cancellation rate
2. **Earnings Report:**
   - Total revenue
   - By driver breakdown
   - By delivery type breakdown
   - Average earnings per delivery
3. **Driver Performance:**
   - Trips completed
   - Average rating
   - Earnings
   - Acceptance rate
4. **Customer Activity:**
   - Total customers
   - Active customers
   - Average deliveries per customer
   - Top customers by spending

**Acceptance Criteria:**
- Report generates within 10 seconds for 1000 records
- Filters work correctly
- Data is accurate
- PDF export is formatted well
- CSV export includes all columns
- Charts display correctly

---

## 5. Backend User Stories

### 5.1 Firebase Configuration

#### 5.1.1 Firebase Project Setup

**Story ID:** BE-SETUP-001  
**Priority:** Critical  
**Estimated Hours:** 3h  
**Assigned To:** Backend Dev

**Instructions:**
- Initialize Firebase project using provided credentials
- Create `config/firebase.ts` file
- Export initialized Firebase app instance
- Export Firestore, Auth, Storage, and Functions instances
- Configure Firebase Admin SDK for Cloud Functions
- Set up service account credentials securely
- Enable required Firebase services:
  - Authentication (Email, Google)
  - Firestore Database
  - Cloud Storage
  - Cloud Functions
  - Cloud Messaging
- Configure CORS for Storage bucket
- Set up Firebase local emulator suite for development

**Environment Configuration:**
```typescript
// config/firebase.ts structure
- initializeApp with provided config
- export auth instance
- export firestore instance with settings
- export storage instance
- export functions instance (if using callable functions)
```

**Security Setup:**
- Enable App Check for production
- Configure OAuth consent screen for Google Sign-In
- Set up API key restrictions (Android, iOS, Web)
- Enable Firestore security rules
- Enable Storage security rules

**Acceptance Criteria:**
- Firebase initializes without errors
- All services are accessible
- Admin SDK works in Cloud Functions
- Local emulator suite runs successfully
- Security rules are active

---

#### 5.1.2 Firestore Security Rules

**Story ID:** BE-SETUP-002  
**Priority:** Critical  
**Estimated Hours:** 4h  
**Assigned To:** Backend Dev

**Instructions:**

Create comprehensive Firestore security rules:

**Users Collection Rules:**
- Users can read their own document
- Users can update their own profile (name, phone, profileUrl)
- Users cannot change their role
- Admins can read and write all user documents
- New user creation only allowed during signup

**Drivers Collection Rules:**
- Drivers can read and update their own document
- Drivers cannot change their status or rating
- Admins can read and write all driver documents
- Customers can read driver documents (for viewing assigned driver)

**Deliveries Collection Rules:**
- Customers can create deliveries
- Customers can read their own deliveries
- Drivers can read deliveries assigned to them
- Drivers can update status and proof fields only
- Admins can read and write all deliveries
- Customers can cancel only before pickup

**Reviews Collection Rules:**
- Customers can create reviews for their completed deliveries
- One review per delivery (prevent duplicates)
- Users can read reviews for drivers
- Reviews cannot be edited after creation
- Admins can mark reviews as hidden

**Notifications Collection Rules:**
- Users can read their own notifications
- Users can mark notifications as read
- System (Cloud Functions) can create notifications
- Users cannot create notifications manually

**Security Rule Template:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions for role checking
    // Rules for each collection
    // Validation functions for data
  }
}
```

**Testing:**
- Write unit tests for security rules
- Test all read/write scenarios
- Test unauthorized access attempts
- Use Firebase Emulator for rule testing

**Acceptance Criteria:**
- All collections have proper access control
- Rules prevent unauthorized access
- Role-based permissions work correctly
- Validation prevents invalid data
- Tests pass for all scenarios

---

### 5.2 Authentication Services

#### 5.2.1 Auth Service Implementation

**Story ID:** BE-AUTH-001  
**Priority:** Critical  
**Estimated Hours:** 6h  
**Assigned To:** Backend Dev

**Instructions:**

Create `services/auth.service.ts` with the following methods:

**Methods to Implement:**
1. `signUpWithEmail(email, password, name, phone)`:
   - Create Firebase Auth user
   - Send email verification
   - Create user document in Firestore
   - Return user object with token

2. `signInWithEmail(email, password)`:
   - Authenticate with Firebase
   - Check if email is verified
   - Fetch user document from Firestore
   - Return user object with token

3. `signInWithGoogle()`:
   - Trigger Google OAuth flow
   - Create/update user document
   - Return user object with token

4. `signOut()`:
   - Sign out from Firebase Auth
   - Clear local storage/async storage
   - Clear auth context

5. `sendPasswordResetEmail(email)`:
   - Send Firebase password reset email
   - Return success/error message

6. `updateProfile(userId, data)`:
   - Update user document in Firestore
   - Update Firebase Auth profile
   - Validate data before update

7. `deleteAccount(userId)`:
   - Delete user document
   - Delete Firebase Auth account
   - Delete associated data (deliveries, reviews)

**Error Handling:**
- Catch Firebase Auth errors
- Return user-friendly error messages
- Log errors for monitoring
- Implement retry logic for network errors

**Validation:**
- Email format validation
- Phone number format validation (international)
- Password strength validation
- Name validation (no special characters except spaces)

**Acceptance Criteria:**
- All methods work correctly
- Errors are handled gracefully
- User documents create successfully
- Email verification required before full access
- Google Sign-In works on all platforms

---

### 5.3 Delivery Management

#### 5.3.1 Delivery Service Implementation

**Story ID:** BE-DELIV-001  
**Priority:** Critical  
**Estimated Hours:** 8h  
**Assigned To:** Backend Dev

**Instructions:**

Create `services/delivery.service.ts` with methods:

**Methods to Implement:**
1. `createDelivery(deliveryData)`:
   - Validate all required fields
   - Calculate price using pricing formula
   - Create delivery document in Firestore
   - Trigger driver matching Cloud Function
   - Return delivery ID

2. `updateDeliveryStatus(deliveryId, status, updateData)`:
   - Validate status transition
   - Update delivery document
   - Send notification to relevant parties
   - Update driver stats if completed

3. `cancelDelivery(deliveryId, reason)`:
   - Check if cancellation is allowed
   - Update status to cancelled
   - Store cancellation reason
   - Notify driver if assigned
   - Return success/error

4. `getDeliveryById(deliveryId)`:
   - Fetch delivery document
   - Include customer and driver details
   - Return formatted delivery object

5. `getCustomerDeliveries(customerId, filters)`:
   - Query deliveries for customer
   - Apply status filters
   - Paginate results
   - Return delivery list

6. `getDriverDeliveries(driverId, filters)`:
   - Query deliveries for driver
   - Apply status and date filters
   - Calculate earnings
   - Return delivery list

7. `calculatePrice(distance, vehicleType, deliveryType)`:
   - Apply pricing formula
   - Include base fare, distance fare, multipliers
   - Round to 2 decimal places
   - Return price breakdown object

**Pricing Formula Implementation:**
```
const baseFares = { bike: 10, sedan: 15, van: 25, truck: 40 };
const perKmRates = { bike: 2.5, sedan: 3.0, van: 4.5, truck: 6.0 };
const vehicleMultipliers = { bike: 1.0, sedan: 1.2, van: 1.5, truck: 2.0 };
const typeMultipliers = { parcel: 1.0, furniture: 1.3, food: 1.1, ... };

total = baseFare + (perKmRate × distance) + (vehicleMultiplier × typeMultiplier)
```

**Status Transition Validation:**
- Pending → Accepted only
- Accepted → Picked Up only
- Picked Up → In Transit only
- In Transit → Delivered only
- Any status except Delivered → Cancelled

**Acceptance Criteria:**
- Delivery creation works correctly
- Price calculation is accurate
- Status updates follow valid transitions
- Notifications send on status change
- Cancellation works with proper checks

---

#### 5.3.2 Driver Matching Cloud Function

**Story ID:** BE-DELIV-002  
**Priority:** Critical  
**Estimated Hours:** 8h  
**Assigned To:** Backend Dev

**Instructions:**

Create Cloud Function `functions/src/matchDriver.ts`:

**Trigger:** Firestore onCreate for `deliveries` collection

**Matching Algorithm:**
1. Query GeoFirestore for drivers within 5km radius of pickup location
2. Filter by:
   - `isOnline == true`
   - `status == 'verified'`
   - Compatible vehicle type for delivery type
3. Sort by:
   - Distance (primary)
   - Rating (secondary)
4. Select top 3 drivers
5. Send push notification to each
6. Wait for first acceptance (with 30s timeout)
7. Assign delivery to accepting driver
8. Notify other drivers that delivery is taken
9. If no acceptance within 30s, expand radius to 10km and retry
10. If still no driver, mark delivery as "no drivers available"

**Push Notification Payload:**
```json
{
  "title": "New Delivery Request",
  "body": "Pickup in {distance}km - Earn R{amount}",
  "data": {
    "deliveryId": "...",
    "type": "delivery_request",
    "expiresAt": "..."
  }
}
```

**GeoFirestore Query:**
- Use geofirestore library
- Query by location and radius
- Return drivers with distance calculation

**Edge Cases:**
- No drivers online: Notify customer to schedule later
- All drivers decline: Expand search radius
- Delivery cancelled during matching: Stop matching process
- Driver goes offline after notification: Skip to next driver

**Performance:**
- Function should complete within 10 seconds
- Use Promise.race for timeout handling
- Batch notifications for efficiency

**Acceptance Criteria:**
- Function triggers on new delivery
- Nearest drivers receive notifications
- First to accept gets assigned
- Timeout handling works correctly
- Customer notified of matching status

---

### 5.4 Location Services

#### 5.4.1 Location Service Implementation

**Story ID:** BE-LOC-001  
**Priority:** Critical  
**Estimated Hours:** 6h  
**Assigned To:** Backend Dev

**Instructions:**

Create `services/location.service.ts` integrating Mapbox APIs:

**Methods to Implement:**
1. `geocodeAddress(address)`:
   - Call Mapbox Geocoding API
   - Return coordinates and formatted address
   - Handle multiple results (return top match)

2. `reverseGeocode(latitude, longitude)`:
   - Call Mapbox Reverse Geocoding API
   - Return formatted address
   - Include place details (street, city, postal)

3. `autocompleteSearch(query, proximity)`:
   - Call Mapbox Places API
   - Use proximity bias for better results
   - Return list of suggestions with place IDs

4. `getRoute(pickup, dropoff)`:
   - Call Mapbox Directions API
   - Request driving profile
   - Return polyline, distance, duration
   - Include turn-by-turn instructions

5. `calculateDistance(point1, point2)`:
   - Use haversine formula for accurate distance
   - Return distance in kilometers
   - Round to 2 decimal places

6. `updateDriverLocation(driverId, location)`:
   - Update driver document in Firestore
   - Update GeoFirestore index
   - Throttle updates to max 1 per 3 seconds
   - Update timestamp

7. `getNearbyDrivers(location, radius, filters)`:
   - Query GeoFirestore within radius
   - Apply vehicle type filter
   - Return sorted by distance
   - Include driver details and ratings

**Mapbox API Configuration:**
```typescript
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const BASE_URL = 'https://api.mapbox.com';

// Geocoding endpoint
const GEOCODING_URL = `${BASE_URL}/geocoding/v5/mapbox.places`;

// Directions endpoint
const DIRECTIONS_URL = `${BASE_URL}/directions/v5/mapbox/driving`;
```

**Error Handling:**
- Handle API rate limits (429 errors)
- Implement retry with exponential backoff
- Cache geocoding results for 24 hours
- Fallback to cached data on API failure
- Log API errors for monitoring

**Performance Optimization:**
- Cache frequent address searches
- Batch geocoding requests when possible
- Use Mapbox SDK where available instead of REST API
- Debounce autocomplete searches (300ms delay)

**Acceptance Criteria:**
- All Mapbox API calls work correctly
- Geocoding returns accurate results
- Route calculation includes all needed data
- Distance calculation is accurate
- Driver location updates work smoothly
- Nearby driver queries are fast (<2 seconds)

---

### 5.5 Notification Services

#### 5.5.1 Notification Service Implementation

**Story ID:** BE-NOTIF-001  
**Priority:** High  
**Estimated Hours:** 6h  
**Assigned To:** Backend Dev

**Instructions:**

Create `services/notification.service.ts` for push and in-app notifications:

**Methods to Implement:**
1. `sendPushNotification(userId, notification)`:
   - Fetch user's device token
   - Format notification payload for Expo Push
   - Send via Expo Push API
   - Log delivery status
   - Handle failed deliveries

2. `createInAppNotification(userId, notificationData)`:
   - Create notification document in Firestore
   - Set unread status
   - Set expiration date (30 days)
   - Return notification ID

3. `markAsRead(notificationId)`:
   - Update notification document
   - Set isRead to true
   - Return success status

4. `getUnreadCount(userId)`:
   - Query unread notifications for user
   - Return count
   - Use Firestore count aggregation

5. `getUserNotifications(userId, limit)`:
   - Query user's notifications
   - Order by createdAt descending
   - Paginate results
   - Return notification list

6. `sendBulkNotification(userIds, notification)`:
   - Batch send to multiple users
   - Use Expo's batch push API
   - Rate limit to 100 notifications per second
   - Return success/failure counts

7. `scheduleNotification(userId, notification, scheduledTime)`:
   - Store scheduled notification in Firestore
   - Cloud Function triggers at scheduled time
   - Send notification at specified time

**Notification Types and Templates:**
```typescript
const notificationTemplates = {
  delivery_request: {
    title: "New Delivery Request",
    body: "You have a new delivery request {distance}km away"
  },
  delivery_accepted: {
    title: "Driver Found!",
    body: "{driverName} is on the way to pickup"
  },
  delivery_picked_up: {
    title: "Package Picked Up",
    body: "Your package is on the way to {dropoffAddress}"
  },
  delivery_in_transit: {
    title: "Out for Delivery",
    body: "Your package will arrive in approximately {eta} minutes"
  },
  delivery_delivered: {
    title: "Delivery Complete",
    body: "Your package has been delivered"
  },
  delivery_cancelled: {
    title: "Delivery Cancelled",
    body: "Your delivery has been cancelled: {reason}"
  },
  driver_verified: {
    title: "Account Verified!",
    body: "You can now start accepting deliveries"
  },
  payment_received: {
    title: "Payment Received",
    body: "You earned R{amount} from your recent delivery"
  }
};
```

**Expo Push Notification Configuration:**
```typescript
// Send notification
POST https://exp.host/--/api/v2/push/send
Headers: {
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate'
}
Body: {
  to: deviceToken,
  sound: 'default',
  title: title,
  body: body,
  data: { deliveryId, type }
}
```

**Error Handling:**
- Handle invalid device tokens (remove from user)
- Retry failed notifications (max 3 attempts)
- Log all notification events
- Handle expired tokens gracefully

**Acceptance Criteria:**
- Push notifications send successfully
- In-app notifications create correctly
- Templates format data properly
- Bulk send works efficiently
- Users receive timely notifications
- Notification badges update correctly

---

### 5.6 Storage Services

#### 5.6.1 Storage Service Implementation

**Story ID:** BE-STOR-001  
**Priority:** High  
**Estimated Hours:** 5h  
**Assigned To:** Backend Dev

**Instructions:**

Create `services/storage.service.ts` for Firebase Storage operations:

**Methods to Implement:**
1. `uploadDocument(file, path, metadata)`:
   - Validate file type and size
   - Compress image if needed
   - Upload to Firebase Storage
   - Generate public URL
   - Return download URL

2. `uploadProfilePhoto(userId, file)`:
   - Resize to 200x200px
   - Compress to <500KB
   - Upload to `users/{userId}/profile.jpg`
   - Update user document with URL
   - Return download URL

3. `uploadDriverDocument(driverId, docType, file)`:
   - Validate document type (ID, license, vehicle, registration)
   - Upload to `drivers/{driverId}/documents/{docType}.jpg`
   - Store URL in driver document
   - Return download URL

4. `uploadProofOfDelivery(deliveryId, file)`:
   - Compress image to <1MB
   - Upload to `deliveries/{deliveryId}/proof.jpg`
   - Update delivery document with URL
   - Return download URL

5. `deleteFile(filePath)`:
   - Delete from Firebase Storage
   - Remove URL from associated document
   - Handle non-existent files gracefully

6. `getSignedUrl(filePath, expirationMinutes)`:
   - Generate temporary signed URL
   - Set expiration time
   - Return signed URL

7. `compressImage(file, maxSizeMB)`:
   - Use react-native-image-compressor
   - Reduce quality while maintaining readability
   - Return compressed file

**File Validation:**
- Accepted image formats: JPG, PNG
- Accepted document formats: PDF
- Maximum size before compression: 5MB
- Minimum image resolution: 800x600px
- Check for corrupt files

**Storage Structure:**
```
dropit-storage/
├── users/
│   └── {userId}/
│       └── profile.jpg
├── drivers/
│   └── {driverId}/
│       └── documents/
│           ├── id.jpg
│           ├── license.jpg
│           ├── vehicle.jpg
│           └── registration.jpg
└── deliveries/
    └── {deliveryId}/
        └── proof.jpg
```

**Security Rules for Storage:**
- Users can upload to their own paths only
- Drivers can upload documents during verification
- Drivers can upload proof of delivery
- Public read access only with signed URLs
- Size limits enforced at storage level

**Acceptance Criteria:**
- Files upload successfully
- Compression reduces file sizes appropriately
- URLs generate correctly
- Security rules prevent unauthorized uploads
- Image quality remains acceptable after compression
- Delete operations work correctly

---

### 5.7 Analytics and Reporting

#### 5.7.1 Analytics Service Implementation

**Story ID:** BE-ANALYTICS-001  
**Priority:** Medium  
**Estimated Hours:** 6h  
**Assigned To:** Backend Dev

**Instructions:**

Create `services/analytics.service.ts` for data aggregation:

**Methods to Implement:**
1. `getDashboardStats(dateRange)`:
   - Query deliveries for date range
   - Calculate total deliveries by status
   - Calculate total revenue
   - Count active drivers
   - Count active customers
   - Return stats object

2. `getDriverStats(driverId, dateRange)`:
   - Query driver's completed deliveries
   - Calculate total trips
   - Calculate total earnings
   - Calculate average rating
   - Calculate acceptance rate
   - Return driver stats object

3. `getCustomerStats(customerId, dateRange)`:
   - Query customer's deliveries
   - Calculate total spent
   - Count total deliveries
   - Calculate average delivery cost
   - Identify most used delivery types
   - Return customer stats object

4. `generateDeliveriesReport(filters, dateRange)`:
   - Query deliveries with filters
   - Group by status, type, date
   - Calculate totals and averages
   - Format for export
   - Return report data

5. `generateEarningsReport(filters, dateRange)`:
   - Query completed deliveries
   - Calculate earnings by driver
   - Calculate earnings by delivery type
   - Calculate platform commission (if applicable)
   - Return earnings breakdown

6. `trackEvent(eventName, eventData)`:
   - Log event to Firestore analytics collection
   - Include timestamp, user ID, event details
   - Use for custom analytics tracking

7. `calculateAggregates(collection, field, groupBy)`:
   - Perform aggregation queries
   - Support sum, average, count operations
   - Group by specified field
   - Return aggregated results

**Analytics Events to Track:**
- User registration (by role)
- Delivery creation
- Delivery completion
- Delivery cancellation
- Driver acceptance rate
- Average response time
- Peak usage hours
- Geographic delivery density

**Data Aggregation Strategy:**
- Use Cloud Functions scheduled tasks for daily aggregation
- Store aggregated data in separate collection
- Real-time queries for current day only
- Historical data from pre-aggregated collections

**Report Format:**
```typescript
interface DeliveriesReport {
  dateRange: { start: Date; end: Date };
  summary: {
    total: number;
    completed: number;
    cancelled: number;
    pending: number;
  };
  byType: { [key: string]: number };
  byDriver: { driverId: string; count: number; earnings: number }[];
  dailyTrend: { date: string; count: number }[];
}
```

**Acceptance Criteria:**
- Stats calculations are accurate
- Reports generate within 10 seconds
- Aggregations handle large datasets efficiently
- Events log successfully
- Reports export in correct format

---

### 5.8 Cloud Functions

#### 5.8.1 Scheduled Functions

**Story ID:** BE-FUNC-001  
**Priority:** Medium  
**Estimated Hours:** 5h  
**Assigned To:** Backend Dev

**Instructions:**

Create Cloud Functions for scheduled tasks:

**Functions to Implement:**

1. **Daily Stats Aggregation** (`functions/src/aggregateStats.ts`):
   - Trigger: Every day at midnight (cron: `0 0 * * *`)
   - Aggregate previous day's deliveries
   - Calculate platform-wide stats
   - Store in `analytics/daily/{date}` document
   - Send summary email to admin

2. **Driver Rating Recalculation** (`functions/src/updateDriverRatings.ts`):
   - Trigger: Firestore onCreate for `reviews` collection
   - Fetch driver's current rating and total reviews
   - Calculate new average rating
   - Update driver document
   - Update rating timestamp

3. **Expired Notification Cleanup** (`functions/src/cleanupNotifications.ts`):
   - Trigger: Every week (cron: `0 2 * * 0`)
   - Query notifications older than 30 days
   - Batch delete old notifications
   - Log deletion count

4. **Scheduled Delivery Processor** (`functions/src/processScheduledDeliveries.ts`):
   - Trigger: Every 5 minutes (cron: `*/5 * * * *`)
   - Query deliveries with scheduledTime in next 10 minutes
   - Trigger driver matching for each
   - Update status to pending

5. **Inactive Driver Cleanup** (`functions/src/deactivateInactiveDrivers.ts`):
   - Trigger: Every day at 3 AM (cron: `0 3 * * *`)
   - Query drivers online for >12 hours
   - Set to offline if no activity
   - Send notification to driver

6. **Delivery Timeout Handler** (`functions/src/handleDeliveryTimeouts.ts`):
   - Trigger: Every minute (cron: `* * * * *`)
   - Query deliveries pending for >30 minutes
   - Mark as "driver not found"
   - Notify customer with option to schedule

**Function Configuration:**
```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const aggregateStats = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Africa/Johannesburg')
  .onRun(async (context) => {
    // Implementation
  });
```

**Error Handling:**
- Wrap all operations in try-catch
- Log errors to Cloud Logging
- Send alert to admin on critical failures
- Implement retry logic for failed operations

**Performance:**
- Process in batches of 500 documents
- Use Promise.all for parallel operations
- Set reasonable timeouts (max 540 seconds)
- Optimize queries with proper indexes

**Acceptance Criteria:**
- Functions deploy successfully
- Scheduled triggers fire at correct times
- Aggregations complete successfully
- Errors are logged and handled
- Functions complete within timeout limits

---

#### 5.8.2 HTTP Callable Functions

**Story ID:** BE-FUNC-002  
**Priority:** Medium  
**Estimated Hours:** 5h  
**Assigned To:** Backend Dev

**Instructions:**

Create HTTP callable functions for client operations:

**Functions to Implement:**

1. **Calculate Delivery Price** (`functions/src/calculatePrice.ts`):
   - Input: pickup, dropoff, vehicleType, deliveryType
   - Validate inputs
   - Call Mapbox for distance
   - Apply pricing formula
   - Return price breakdown
   - Callable from client app

2. **Process Delivery Cancellation** (`functions/src/cancelDelivery.ts`):
   - Input: deliveryId, reason
   - Validate user permissions
   - Check cancellation eligibility
   - Update delivery status
   - Refund if payment made (future)
   - Notify driver if assigned
   - Return success status

3. **Admin Verify Driver** (`functions/src/verifyDriver.ts`):
   - Input: driverId, status (verified/rejected), reason
   - Validate admin permissions
   - Update driver status
   - Send notification to driver
   - Send email notification
   - Log admin action
   - Return success status

4. **Generate Report** (`functions/src/generateReport.ts`):
   - Input: reportType, filters, dateRange
   - Validate admin permissions
   - Query data based on filters
   - Aggregate and format data
   - Generate PDF or CSV
   - Upload to Storage
   - Return download URL

5. **Send Bulk Notification** (`functions/src/sendBulkNotification.ts`):
   - Input: targetRole, title, body, data
   - Validate admin permissions
   - Query users by role
   - Batch send notifications
   - Rate limit to prevent spam
   - Return delivery report

**Function Security:**
```typescript
export const calculatePrice = functions.https.onCall(async (data, context) => {
  // Check authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }
  
  // Check authorization
  if (data.requiresAdmin && !isAdmin(context.auth.uid)) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Admin access required'
    );
  }
  
  // Validate input
  if (!data.pickup || !data.dropoff) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Pickup and dropoff required'
    );
  }
  
  // Implementation
});
```

**Rate Limiting:**
- Implement per-user rate limits
- Store request counts in Firestore
- Reject requests exceeding limits
- Reset counts daily

**Acceptance Criteria:**
- Functions deploy successfully
- Authentication checks work
- Input validation prevents invalid calls
- Rate limiting prevents abuse
- Errors return meaningful messages
- Functions complete within 60 seconds

---

## 6. Service Layer Specifications

### 6.1 Service Architecture Guidelines

**Story ID:** ARCH-002  
**Priority:** High  
**Estimated Hours:** 2h  
**Assigned To:** Backend Dev

**Instructions:**

Establish service layer architecture patterns:

**Service Layer Structure:**
```typescript
// services/base.service.ts
// Base class with common functionality

export abstract class BaseService {
  protected db: Firestore;
  protected auth: Auth;
  protected storage: Storage;
  
  constructor() {
    this.db = getFirestore();
    this.auth = getAuth();
    this.storage = getStorage();
  }
  
  protected handleError(error: any, context: string): never {
    // Centralized error handling
  }
  
  protected validateInput(data: any, rules: any): boolean {
    // Centralized validation
  }
}
```

**Service Implementation Pattern:**
- Each service extends BaseService
- Use dependency injection where needed
- Implement singleton pattern for services
- Use TypeScript for type safety
- Write JSDoc comments for all methods
- Include error handling in all methods
- Log important operations

**Error Handling Strategy:**
```typescript
class ServiceError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
  }
}

// Usage
throw new ServiceError(
  'DRIVER_NOT_FOUND',
  'No drivers available in your area',
  404,
  { radius: 5, location: pickup }
);
```

**Service Testing:**
- Write unit tests for each method
- Mock Firestore calls
- Test error scenarios
- Test edge cases
- Achieve >80% code coverage

**Acceptance Criteria:**
- All services follow consistent pattern
- Error handling is comprehensive
- Documentation is complete
- Tests pass successfully
- Code is maintainable and readable

---

## 7. API Integration Guidelines

### 7.1 Mapbox Integration

**Story ID:** API-001  
**Priority:** Critical  
**Estimated Hours:** 4h  
**Assigned To:** Frontend Dev 2 & Backend Dev

**Instructions:**

Implement Mapbox SDK integration across the app:

**Installation:**
- Install `@rnmapbox/maps` for React Native
- Install `mapbox-gl` for web admin panel
- Configure Mapbox token in environment variables
- Set up Mapbox SDK on app initialization

**Map Configuration:**
```typescript
// config/mapbox.ts
export const mapboxConfig = {
  accessToken: process.env.MAPBOX_TOKEN,
  styleURL: 'mapbox://styles/mapbox/streets-v12',
  defaultCenter: [-27.56, 31.03], // Durban coordinates
  defaultZoom: 12,
  maxBounds: [
    [28.0, 30.0], // Southwest
    [33.0, -26.0]  // Northeast (South Africa)
  ]
};
```

**Common Map Operations:**

1. **Initialize Map:**
   - Set access token
   - Configure style (streets, satellite, dark)
   - Set initial center and zoom
   - Enable user location

2. **Add Markers:**
   - Custom marker icons for pickup, dropoff, drivers
   - Marker clustering for many drivers
   - Marker popups with delivery info
   - Animated marker movement for driver tracking

3. **Draw Routes:**
   - Fetch route from Directions API
   - Decode polyline
   - Draw on map with custom styling
   - Update route in real-time

4. **Geocoding:**
   - Search places with autocomplete
   - Reverse geocode coordinates to addresses
   - Handle multiple results
   - Cache frequent searches

**Map Styling:**
- Use Burnt Orange (#D35400) for routes
- Use custom markers matching app theme
- Apply dark mode for night driving
- Optimize for mobile performance

**Performance Optimization:**
- Lazy load map component
- Debounce location updates
- Use marker clustering above 50 markers
- Cache map tiles for offline use
- Minimize API calls

**Acceptance Criteria:**
- Maps render smoothly on all devices
- Custom styling matches app theme
- Routes display accurately
- Geocoding works reliably
- Performance is acceptable (<3s load time)

---

### 7.2 Firebase Integration

**Story ID:** API-002  
**Priority:** Critical  
**Estimated Hours:** 3h  
**Assigned To:** Backend Dev

**Instructions:**

Implement Firebase SDK integration and best practices:

**SDK Installation:**
- Install Firebase JS SDK v10+
- Configure for React Native (use react-native-firebase if needed)
- Set up Firebase Admin SDK for Cloud Functions
- Initialize with provided credentials

**Firestore Best Practices:**

1. **Query Optimization:**
   - Create composite indexes for common queries
   - Use `limit()` to prevent over-fetching
   - Implement cursor-based pagination
   - Cache queries with `enablePersistence()`

2. **Real-time Listeners:**
   - Unsubscribe when component unmounts
   - Use `onSnapshot` for real-time updates
   - Handle listener errors gracefully
   - Throttle high-frequency updates

3. **Batch Operations:**
   - Use batched writes for multiple updates
   - Max 500 operations per batch
   - Use transactions for read-modify-write operations
   - Handle batch failures

4. **Data Structure:**
   - Denormalize data for read performance
   - Avoid deep nesting (max 3 levels)
   - Use subcollections for one-to-many relationships
   - Store frequently accessed data at document root

**Authentication Best Practices:**
- Check auth state on app startup
- Refresh tokens automatically
- Handle token expiration
- Implement "remember me" with persistence
- Log out on security-sensitive operations

**Storage Best Practices:**
- Generate unique filenames with UUID
- Implement upload progress tracking
- Handle upload failures with retry
- Delete old files when updating
- Use signed URLs for temporary access

**Cloud Functions Best Practices:**
- Keep functions small and focused
- Use async/await for readability
- Implement proper error handling
- Set appropriate timeouts
- Monitor function performance

**Acceptance Criteria:**
- Firebase initializes correctly
- Queries are optimized with indexes
- Real-time updates work smoothly
- Batch operations succeed
- Auth flows work reliably
- Storage operations complete successfully

---

## 8. Design System Implementation

### 8.1 Theme Configuration

**Story ID:** DESIGN-001  
**Priority:** High  
**Estimated Hours:** 4h  
**Assigned To:** Frontend Dev 1

**Instructions:**

Create comprehensive theme configuration following DropIt's earthy design:

**Theme File Structure:**
Create `config/theme.ts`:

**Color Palette:**
```typescript
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
```

**Typography:**
```typescript
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
```

**Spacing Scale:**
```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};
```

**Border Radius:**
```typescript
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999
};
```

**Shadows:**
```typescript
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
```

**Acceptance Criteria:**
- Theme exports all required values
- Colors match brand guidelines exactly
- Typography scales are consistent
- Spacing follows 4px/8px grid
- Shadows work on both iOS and Android

---

### 8.2 Component Library

**Story ID:** DESIGN-002  
**Priority:** High  
**Estimated Hours:** 8h  
**Assigned To:** Frontend Dev 1

**Instructions:**

Build reusable UI component library:

**Components to Create:**

1. **Button Component** (`components/ui/Button.tsx`):
   - Variants: primary, secondary, outline, ghost
   - Sizes: small, medium, large
   - States: default, hover, pressed, disabled, loading
   - Support for icons (left/right)
   - Burnt Orange primary color
   - Raleway font for text
   - Rounded corners (12px)
   - Press animation scale(0.95)

2. **Input Component** (`components/ui/Input.tsx`):
   - Variants: default, error, success
   - Support for icons (left/right)
   - Labels and helper text
   - Error message display
   - Cream background with brown border
   - Focus state with orange border
   - Lora font for input text

3. **Card Component** (`components/ui/Card.tsx`):
   - Elevated with shadow
   - Cream background
   - Rounded corners (16px)
   - Padding options (sm, md, lg)
   - Optional header and footer
   - Pressable variant for interactive cards

4. **Modal Component** (`components/ui/Modal.tsx`):
   - Full-screen or centered overlay
   - Animated slide-up entrance
   - Semi-transparent dark background
   - Close button (X icon)
   - Swipe-to-dismiss for bottom sheets
   - Cream background card

5. **Loading Spinner** (`components/ui/LoadingSpinner.tsx`):
   - Burnt Orange color
   - Sizes: small, medium, large
   - Optional text below spinner
   - Lottie animation for premium feel

6. **Status Badge** (`components/ui/StatusBadge.tsx`):
   - Color-coded by status
   - Rounded pill shape
   - Small text with icon
   - Used for delivery status

7. **Rating Stars** (`components/shared/RatingStars.tsx`):
   - 1-5 star display
   - Interactive for rating input
   - Read-only for display
   - Burnt Orange filled stars
   - Gray outline for empty stars

8. **Avatar Component** (`components/shared/Avatar.tsx`):
   - Circular image
   - Fallback to initials
   - Sizes: xs, sm, md, lg, xl
   - Online status indicator (green dot)
   - Brown border

**Component Guidelines:**
- Use TypeScript for props
- Document props with JSDoc
- Include usage examples in comments
- Use theme values (no hardcoded colors)
- Implement accessibility features
- Add press feedback animations
- Support dark mode (future-ready)

**Example Component Structure:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  // Implementation with theme values
};
```

**Acceptance Criteria:**
- All components render correctly
- Props validation works
- Animations are smooth
- Components follow theme
- Accessibility features work
- Components are reusable across screens

---

### 8.3 Icon System

**Story ID:** DESIGN-003  
**Priority:** Medium  
**Estimated Hours:** 2h  
**Assigned To:** Frontend Dev 1

**Instructions:**

Implement icon system using Lucide React Native:

**Icon Configuration:**
- Install `lucide-react-native`
- Create icon wrapper component
- Set default size and color from theme
- Map icon names to components

**Common Icons to Use:**
- Package: Small parcels
- Truck: Deliveries, drivers
- MapPin: Locations
- Navigation: Routes
- Phone: Call actions
- MessageSquare: Chat
- Star: Ratings
- User: Profile
- Bell: Notifications
- Calendar: Scheduling
- DollarSign: Payments
- CheckCircle: Success states
- XCircle: Error states
- AlertCircle: Warnings
- Clock: Time, ETA
- Camera: Photo upload
- Upload: Document upload
- ChevronRight: Navigation arrows
- Menu: Hamburger menu
- Settings: Settings gear

**Icon Component Wrapper:**
```typescript
// components/ui/Icon.tsx
interface IconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.primary,
  ...props
}) => {
  const IconComponent = icons[name];
  return <IconComponent size={size} color={color} {...props} />;
};
```

**Icon Sizing Scale:**
- xs: 16px
- sm: 20px
- md: 24px (default)
- lg: 32px
- xl: 48px

**Acceptance Criteria:**
- Icons render correctly on all platforms
- Icon wrapper simplifies usage
- Colors from theme apply correctly
- Icon sizes are consistent
- All needed icons are available

---

## 9. Testing Strategy

### 9.1 Unit Testing

**Story ID:** TEST-001  
**Priority:** Medium  
**Estimated Hours:** 8h  
**Assigned To:** QA/