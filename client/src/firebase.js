import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "sharing-video-mern.firebaseapp.com",
  projectId: "sharing-video-mern",
  storageBucket: "sharing-video-mern.appspot.com",
  messagingSenderId: "269077571841",
  appId: "1:269077571841:web:84f3be45deda24c75e9300",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
