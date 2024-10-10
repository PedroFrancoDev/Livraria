import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0ulW5F07K1QC3Vt9T2MzJaVzHxduzu_M",
  authDomain: "livraria-com-firebase.firebaseapp.com",
  projectId: "livraria-com-firebase",
  storageBucket: "livraria-com-firebase.appspot.com",
  messagingSenderId: "205409768420",
  appId: "1:205409768420:web:5fa02f451cbc9f0d75edf1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);