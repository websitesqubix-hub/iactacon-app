import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFYBkO6F1z3-jbnQCxfAEliDbnTUxHSeA",
  authDomain: "iactacon-app.firebaseapp.com",
  projectId: "iactacon-app",
  storageBucket: "iactacon-app.firebasestorage.app",
  messagingSenderId: "93907446511",
  appId: "1:93907446511:web:03e1a926df3e47a46d091a",
};

const app = initializeApp(firebaseConfig);

// 🔥 THIS IS IMPORTANT
export const db = getFirestore(app);