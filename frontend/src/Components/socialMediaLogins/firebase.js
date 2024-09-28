// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH7OnDiRnntlnKDrf7uL25Bq3p-c7z9K0",
  authDomain: "habitandhustle-4a086.firebaseapp.com",
  projectId: "habitandhustle-4a086",
  storageBucket: "habitandhustle-4a086.appspot.com",
  messagingSenderId: "913059332794",
  appId: "1:913059332794:web:2c6859036e54c84f983883",
  measurementId: "G-W82BVR5RGN"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export { auth, provider };