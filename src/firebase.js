import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfnv64GcG6xBQG_qJKtMoBLYlqD_ydsZo",
  authDomain: "ismail-d34f9.firebaseapp.com",
  projectId: "ismail-d34f9",
  storageBucket: "ismail-d34f9.appspot.com",
  messagingSenderId: "871447278386",
  appId: "1:871447278386:web:39e4957a21b7cd1c405d2b",
  measurementId: "G-KD2MLPD8LM"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;