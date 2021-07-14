import firebase from "firebase";

// Optionally import the services that you want to use
// import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpuBlv3l4uT8HetFOGEOoZZS7dWRkDPLQ",
  authDomain: "gracemethodist-decbe.firebaseapp.com",
  projectId: "gracemethodist-decbe",
  storageBucket: "gracemethodist-decbe.appspot.com",
  messagingSenderId: "124732096356",
  appId: "1:124732096356:web:5e1667e9641add2d75c471",
  measurementId: "G-9YV41NDMJL",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
