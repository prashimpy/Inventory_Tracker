// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCedUwQ6EqhoWsv2j1dRpJ6dakK8fRiDcA",
  authDomain: "inventorymanagement-2ea66.firebaseapp.com",
  projectId: "inventorymanagement-2ea66",
  storageBucket: "inventorymanagement-2ea66.appspot.com",
  messagingSenderId: "669302989683",
  appId: "1:669302989683:web:33e22709c52e59bce61b06",
  measurementId: "G-SFBHPMGCV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { db }