// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Using hardcoded values as per implicit user intent from previous requests.
// IMPORTANT: It's generally recommended to use environment variables for this.
const firebaseConfig = {
  apiKey: "AIzaSyBq4-c7Lj5bYScSdL9CYYWDQrHegGBAvSU", // From user's previous request / login.js
  authDomain: "drzenbot.firebaseapp.com",         // From login.js
  projectId: "drzenbot",                          // From login.js
  storageBucket: "drzenbot.firebasestorage.app",  // From login.js
  messagingSenderId: "596381454371",              // From login.js
  appId: "1:596381454371:web:66e5937b9285da8bd22196", // From login.js
  // measurementId can be added if available and needed, e.g. from your Firebase console
  // measurementId: "G-XXXXXXXXXX" 
};

// Check if essential Firebase config values are present (they are hardcoded now, so this is more of a sanity check)
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error("CRITICAL: Firebase configuration is missing or incomplete in src/lib/firebase/config.ts. This indicates a typo in the hardcoded values above.");
  // This would stop the app from initializing Firebase correctly.
}

let app: FirebaseApp;
// Ensure Firebase is initialized only if config is valid
if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} else {
  // This block should ideally not be reached if hardcoded config is correct.
  // Log an error and leave 'app' undefined. Firebase services will fail.
  console.error("Firebase app could not be initialized due to missing or invalid hardcoded configuration. Please check src/lib/firebase/config.ts.");
  // Assign a placeholder or throw to prevent execution with uninitialized app
  // For simplicity, app remains undefined here, and downstream Firebase calls will fail.
  app = undefined as any as FirebaseApp; // Explicitly mark as possibly uninitialized for clarity
}

// Conditionally initialize auth and db only if 'app' was successfully initialized.
// Using a more explicit check for 'app' being defined.
const auth: Auth = app ? getAuth(app) : (undefined as any as Auth); 
const db: Firestore = app ? getFirestore(app) : (undefined as any as Firestore);

export { app, auth, db };