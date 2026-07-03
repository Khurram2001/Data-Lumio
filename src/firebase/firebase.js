import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Repo from "../Repo/Repo";

// Firebase configuration
const firebaseConfig = {
   apiKey: "YOUR_FIREBASE_API_KEY",
   authDomain: "your-project.firebaseapp.com",
   projectId: "your-project-id",
   storageBucket: "your-project-id.firebasestorage.app",
   messagingSenderId: "000000000000",
   appId: "1:000000000000:web:00000000000000000000",
   measurementId: "G-XXXXXXXXXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Function for Google sign-in
const signInWithGoogle = async (setLoading) => {
   try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In User:", result.user);
      localStorage.setItem("email", result.user.email);
      const payload = {
         email: result.user.email,
         google_login: true,
      };

      // Call Repo.getUser API
      setLoading(true);
      const response = await Repo.getUser(payload);
      console.log("GETAPI Google Response:", response);

      return result.user;
   } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw error;
   } finally {
      setLoading(false); // Stop loader after API response
   }
};

// Lazy-load Firebase Analytics (only in the browser)
let analytics;
if (typeof window !== "undefined") {
   import("firebase/analytics").then(({ getAnalytics }) => {
      analytics = getAnalytics(app);
   });
}

export { app, auth, googleProvider, signInWithGoogle, analytics };
