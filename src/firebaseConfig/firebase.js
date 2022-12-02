import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCXNe0QqHCskCJf8icT6vlVWrEk1VkGGG8",
  authDomain: "crud-react-fire-e0674.firebaseapp.com",
  projectId: "crud-react-fire-e0674",
  storageBucket: "crud-react-fire-e0674.appspot.com",
  messagingSenderId: "475519500138",
  appId: "1:475519500138:web:cf751387dad2c50b36af13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
