import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz9B7GTWgIzUqAL1CX6eBFdQg1AyeHrNQ",
  authDomain: "ecoscrap-ca403.firebaseapp.com",
  projectId: "ecoscrap-ca403",
  storageBucket: "ecoscrap-ca403.appspot.com",
  messagingSenderId: "315575987355",
  appId: "1:315575987355:web:844abae94f36aa5824ea3e",
  measurementId: "G-VC1675MWGJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { analytics, storage, db, auth };
