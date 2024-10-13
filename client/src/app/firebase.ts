// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLvLu_RTH9Oc06TvneOltIhY0fe11_FPQ",
  authDomain: "coursepailot.firebaseapp.com",
  projectId: "coursepailot",
  storageBucket: "coursepailot.appspot.com",
  messagingSenderId: "539731068356",
  appId: "1:539731068356:web:0157c5df5d4753c5425091"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth , db};