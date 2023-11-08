// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-app-f2652.firebaseapp.com",
  projectId: "auth-app-f2652",
  storageBucket: "auth-app-f2652.appspot.com",
  messagingSenderId: "550213552150",
  appId: "1:550213552150:web:96dbfeffadfbc732f80d37"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);