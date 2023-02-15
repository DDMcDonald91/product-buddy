// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CLIENT_API_KEY,
  authDomain: "product-buddy-ai.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_CLIENT_PROJECT_ID,
  storageBucket: "product-buddy-ai.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_CLIENT_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_CLIENT_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_CLIENT_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);