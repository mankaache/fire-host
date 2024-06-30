// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_HRpQJk6EJwZ0yqc3ivo6gVLSCjmUCkA",
  authDomain: "learn-firebase-abd90.firebaseapp.com",
  projectId: "learn-firebase-abd90",
  storageBucket: "learn-firebase-abd90.appspot.com",
  messagingSenderId: "311200514242",
  appId: "1:311200514242:web:df6c22dfeb8c7bee3efb5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)