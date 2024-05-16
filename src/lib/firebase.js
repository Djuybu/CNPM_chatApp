import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "flexichatdb.firebaseapp.com",
  projectId: "flexichatdb",
  storageBucket: "flexichatdb.appspot.com",
  messagingSenderId: "530636374885",
  appId: "1:530636374885:web:1639fc8687b9551340178c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()