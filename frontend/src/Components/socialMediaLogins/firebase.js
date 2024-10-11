// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEqcu3CsBQq3AZQfstAla49m6wn_XnLvM",
  authDomain: "habitura-d174c.firebaseapp.com",
  projectId: "habitura-d174c",
  storageBucket: "habitura-d174c.appspot.com",
  messagingSenderId: "282229381031",
  appId: "1:282229381031:web:0fdbffc6b544a1f67f4882",
  measurementId: "G-TF65LT3Y9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export { auth, provider };

