// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add this import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEzTtMGR3QlCHRRu-S7kNfeSC1TJrfeHI",
  authDomain: "password-tool-1a3cb.firebaseapp.com",
  projectId: "password-tool-1a3cb",
  storageBucket: "password-tool-1a3cb.firebasestorage.app",
  messagingSenderId: "635874125067",
  appId: "1:635874125067:web:46d1edf1205d046f246e0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Export db for Firestore usage