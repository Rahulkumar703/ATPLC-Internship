import { GithubAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBj-cRPNaC7vexPFInSMEGHtGJEj8cgG3c",
    authDomain: "github-login-280ae.firebaseapp.com",
    projectId: "github-login-280ae",
    storageBucket: "github-login-280ae.appspot.com",
    messagingSenderId: "1028172837145",
    appId: "1:1028172837145:web:e9dca87a2401aefd929588"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GithubAuthProvider();
provider.addScope('user', 'repo');
export { auth, provider, signInWithPopup };