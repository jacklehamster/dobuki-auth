// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp9B9YR9akSojL9WGjSvFef48oXvqzoB0",
  authDomain: "dobuki-net.firebaseapp.com",
  databaseURL: "https://dobuki-net.firebaseio.com",
  projectId: "dobuki-net",
  storageBucket: "dobuki-net.firebasestorage.app",
  messagingSenderId: "128543948866",
  appId: "1:128543948866:web:5dd8f0de8286c3de116ddb",
  measurementId: "G-BWFWSBQ8T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, EmailAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";


export async function signup() {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, "vincentlequang@gmail.com", "password")
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export async function signin() {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, "vincentlequang@gmail.com", "password")
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}


import firebaseui from "firebaseui";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export function loginUI() {
  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      }
    ]
  });

  // ui.start('#firebaseui-auth-container', {
  //   signInOptions: [
  //     {
  //       // Google provider must be enabled in Firebase Console to support one-tap
  //       // sign-up.
  //       provider: GoogleAuthProvider.PROVIDER_ID,
  //       // Required to enable ID token credentials for this provider.
  //       // This can be obtained from the Credentials page of the Google APIs
  //       // console. Use the same OAuth client ID used for the Google provider
  //       // configured with GCIP or Firebase Auth.
  //       clientId: 'xxxxxxxxxxxxxxxxx.apps.googleusercontent.com'
  //     },
  //     FacebookAuthProvider.PROVIDER_ID,
  //     TwitterAuthProvider.PROVIDER_ID,
  //     GithubAuthProvider.PROVIDER_ID,
  //     EmailAuthProvider.PROVIDER_ID,
  //   ],
  //   // Required to enable one-tap sign-up credential helper.
  //   credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  // });
  // ui.start('#firebaseui-auth-container', {
  //   signInOptions: [
  //     EmailAuthProvider.PROVIDER_ID
  //   ],
  //   // Other config options...
  // });
}
