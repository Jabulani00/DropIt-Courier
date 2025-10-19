import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC5ywnbFocmReAsJgi_x5Vv-2bnS_APDc4",
  authDomain: "dropit-courier.firebaseapp.com",
  projectId: "dropit-courier",
  storageBucket: "dropit-courier.firebasestorage.app",
  messagingSenderId: "830658417393",
  appId: "1:830658417393:web:b52748a1e0ec663acd0f50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;