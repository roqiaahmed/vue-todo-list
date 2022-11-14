import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBWP9VHv_zUFxfI2sNalmy4oKiIiRDtzdw",
  authDomain: "todo-list-a67ac.firebaseapp.com",
  projectId: "todo-list-a67ac",
  storageBucket: "todo-list-a67ac.appspot.com",
  messagingSenderId: "373993759681",
  appId: "1:373993759681:web:42efa0ed27c0c6b6bb4540",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
