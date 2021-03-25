import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGc-fWNTFD4RUERYshWvb_od0jVZgIaR4",
  authDomain: "frontend-hub.firebaseapp.com",
  databaseURL: "https://frontend-hub-default-rtdb.firebaseio.com",
  projectId: "frontend-hub",
  storageBucket: "frontend-hub.appspot.com",
  messagingSenderId: "467286848",
  appId: "1:467286848:web:43f768543ef8ab55ce58a5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
