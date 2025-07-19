// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgd-NFijLjvgTeZca-BS46aHIYZyADfmM",
  authDomain: "gighive-269a6.firebaseapp.com",
  projectId: "gighive-269a6",
  storageBucket: "gighive-269a6.appspot.com",
  messagingSenderId: "846267615431",
  appId: "1:846267615431:web:648ddbd2d4681558db16e2",
  measurementId: "G-S2DVHFGEXB"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
