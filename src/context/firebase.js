import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHKtwqIRm_YyJVl0lwx_rUJQutYpn54X4",
  authDomain: "foursquare-fdda4.firebaseapp.com",
  projectId: "foursquare-fdda4",
  storageBucket: "foursquare-fdda4.appspot.com",
  messagingSenderId: "24427042224",
  appId: "1:24427042224:web:2c8e0345241eb7fe987275"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
