

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


