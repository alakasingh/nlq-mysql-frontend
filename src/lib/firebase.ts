import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxbX32r02TD6r-V8-ePeKaqnLZ1VzpIpw",
  authDomain: "opendb-a9f2f.firebaseapp.com",
  projectId: "opendb-a9f2f",
  storageBucket: "opendb-a9f2f.firebasestorage.app",
  messagingSenderId: "81197125343",
  appId: "1:81197125343:web:8a17e26d29d76ebed3a36a"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
