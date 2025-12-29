// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "propify-d7d3a.firebaseapp.com",
  projectId: "propify-d7d3a",
  storageBucket: "propify-d7d3a.firebasestorage.app",
  messagingSenderId: "322366454236",
  appId: "1:322366454236:web:5e8b304db3f745def87719"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);