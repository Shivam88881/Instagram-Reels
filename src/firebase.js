import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA55besixjCSO-XDXrItrwm9nBXy9Ticr4",
  authDomain: "instagram-reels-da18a.firebaseapp.com",
  projectId: "instagram-reels-da18a",
  storageBucket: "instagram-reels-da18a.appspot.com",
  messagingSenderId: "128514372729",
  appId: "1:128514372729:web:29e9a87767fa68de4c50a8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();
const firestore=firebase.firestore();
export const database= {
  users: firestore.collection('users'),
  posts:firestore.collection('posts'),
  comments:firestore.collection('comments'),
  getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage=firebase.storage()
