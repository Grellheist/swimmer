import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "whisker-67c7d.firebaseapp.com",
    projectId: "whisker-67c7d",
    storageBucket: "whisker-67c7d.appspot.com",
    messagingSenderId: "251803151312",
    appId: "1:251803151312:web:61bbc24a802f5512ada7d5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export {app, db, storage}
