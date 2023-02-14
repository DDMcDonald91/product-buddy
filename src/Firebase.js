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
  apiKey: "AIzaSyDD_u_BSOtjx2nQf6FXf6bnQ2BIhq4X_5w",
  authDomain: "product-buddy-ai.firebaseapp.com",
  projectId: "product-buddy-ai",
  storageBucket: "product-buddy-ai.appspot.com",
  messagingSenderId: "20655315663",
  appId: "1:20655315663:web:81b3429e96c8987aa435ba",
  measurementId: "G-L4ND042Z4G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);