import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyAr0maTBPJ9nC9IDKSFnI10ofbTK0OdgN8",
  authDomain: "fir-97898.firebaseapp.com",
  databaseURL: "https://fir-97898-default-rtdb.asia-southeast1.firebasedatabase.app", // Realtime Database URL
  projectId: "fir-97898",
  storageBucket: "fir-97898.firebasestorage.app",
  messagingSenderId: "20173388722",
  appId: "1:20173388722:web:3657ba162866d655d882ab",
  measurementId: "G-TYGYN51KDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app); // Initialize Realtime Database

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error", error);
  }
};

const getUserId = () => {
  const user = auth.currentUser;
  return user ? user.uid : null; // Returns UID if user is signed in, otherwise null
};

const logout = async () => {
  await signOut(auth);
};

export { auth, database, signInWithGoogle, getUserId, logout }; // Export Realtime Database instance