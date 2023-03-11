// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "workfynder-c9074.firebaseapp.com",
  projectId: "workfynder-c9074",
  storageBucket: "workfynder-c9074.appspot.com",
  messagingSenderId: "710283405007",
  appId: "1:710283405007:web:3c17d492de458e0df9f9ba",
  measurementId: "G-44XHHTMT2V"
};
 
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;