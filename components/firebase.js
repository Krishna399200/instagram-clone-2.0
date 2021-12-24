// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5ZU_PVC1EDmQ8Qu1xv9g36OvWPwcmKwU",
  authDomain: "insta-2-c514a.firebaseapp.com",
  projectId: "insta-2-c514a",
  storageBucket: "insta-2-c514a.appspot.com",
  messagingSenderId: "32927866889",
  appId: "1:32927866889:web:ab7e70933448bfbbac58d8"
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig) ;
const db = getFirestore();
const storage = getStorage();

export { app , db,storage};