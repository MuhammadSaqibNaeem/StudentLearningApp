/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBit1G7mq4R9D93Cvcfe3oIDkyv5cdGDJI",
  authDomain: "student-learning-app-3dcc0.firebaseapp.com",
  projectId: "student-learning-app-3dcc0",
  storageBucket: "student-learning-app-3dcc0.appspot.com",
  messagingSenderId: "238537276959",
  appId: "1:238537276959:web:3c07a30e97945ee7275f2a",
  measurementId: "G-2NNG01X30S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// npm install -g firebase-tools
//npm install firebase
