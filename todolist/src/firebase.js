// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASkYXiXrksJ_RnbPO5M-urk31mhZom19I",
  authDomain: "todolist-ed6a3.firebaseapp.com",
  projectId: "todolist-ed6a3",
  storageBucket: "todolist-ed6a3.firebasestorage.app",
  messagingSenderId: "852082671043",
  appId: "1:852082671043:web:20f5e1316d70879acc9176",
  measurementId: "G-5SFBHMKHF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth};