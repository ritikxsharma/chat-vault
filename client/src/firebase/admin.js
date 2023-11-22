import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiaZbbhY0eu9VtBQi4o_OYmqiOyUOzk3g",
  authDomain: "chat-application-fd84e.firebaseapp.com",
  projectId: "chat-application-fd84e",
  storageBucket: "chat-application-fd84e.appspot.com",
  messagingSenderId: "1033142262579",
  appId: "1:1033142262579:web:35d6e28703d8b4300dbc46",
  measurementId: "G-KNC316J033"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)

export default auth