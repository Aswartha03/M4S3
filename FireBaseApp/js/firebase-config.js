
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js" ; 
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyC6aOh7FIjdYANLKn21fThVTQxX_oW2Lvo",
  authDomain: "collaborative-study-notes-web.firebaseapp.com",
  databaseURL: "https://collaborative-study-notes-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "collaborative-study-notes-web",
  storageBucket: "collaborative-study-notes-web.firebasestorage.app",
  messagingSenderId: "332960424755",
  appId: "1:332960424755:web:c51286d82f5a5697599446",
  measurementId: "G-MWWG70N4QX"
};


const app = initializeApp(firebaseConfig);
export  let auth = getAuth(app) ;
export let db = getFirestore(app) ; 
