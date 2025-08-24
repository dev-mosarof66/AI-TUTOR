import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: `AIzaSyC0fZYiitpbXdzGzZjdoMvSu7mmB4PgR0Y`,
  authDomain: "neura---ai.firebaseapp.com",
  projectId: "neura---ai",
  storageBucket: "neura---ai.firebasestorage.app",
  messagingSenderId: "181248442588",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-HDXHTR3068",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

