// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1jp6eQ9ESl3g3d2Gszp0OUJPRc55nWjo",
  authDomain: "next-firebase-todo-f7a83.firebaseapp.com",
  projectId: "next-firebase-todo-f7a83",
  storageBucket: "next-firebase-todo-f7a83.appspot.com",
  messagingSenderId: "143961298239",
  appId: "1:143961298239:web:425140103195aeba36af8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }