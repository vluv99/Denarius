import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //databaseURL: ..env.local.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);

export const USER_COLLECTION_NAME = process.env.REACT_APP_FIREBASE_COLLECTION_USER || "user";
export const CATEGORY_COLLECTION_NAME = process.env.REACT_APP_FIREBASE_COLLECTION_CATEGORY || "category";
export const TRANSACTION_COLLECTION_NAME = process.env.REACT_APP_FIREBASE_COLLECTION_TRANSACTION || "transaction";
export const CARD_COLLECTION_NAME = process.env.REACT_APP_FIREBASE_COLLECTION_PAYMENT || "paymentMethod";
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();

// Create an instance of the Google provider object
export const provider = new GoogleAuthProvider();
