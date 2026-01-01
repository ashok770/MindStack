import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXzIoTEW1pM2joUSJHptdqEeWXG7ceIwc",
  authDomain: "mindstack-2bad4.firebaseapp.com",
  projectId: "mindstack-2bad4",
  storageBucket: "mindstack-2bad4.firebasestorage.app",
  messagingSenderId: "64465390574",
  appId: "1:64465390574:web:c06fb084c34d423ffe1cff",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
