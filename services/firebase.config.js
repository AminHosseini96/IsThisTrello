import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBTNU-CZNvetfcLMjDRhxT69nuCmEbKy0w",
    authDomain: "isthistrello.firebaseapp.com",
    projectId: "isthistrello",
    storageBucket: "isthistrello.firebasestorage.app",
    messagingSenderId: "712648325900",
    appId: "1:712648325900:web:a7ac4189af1b0ebf472729",
    measurementId: "G-BE0VH6B2N4"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
