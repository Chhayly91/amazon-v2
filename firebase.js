import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBhaFUScN8hbPswfU4f0lPM0diNTmDtRNE",
  authDomain: "amz-v2.firebaseapp.com",
  projectId: "amz-v2",
  storageBucket: "amz-v2.appspot.com",
  messagingSenderId: "707964662091",
  appId: "1:707964662091:web:2d1852695a1c648d8438ce",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
