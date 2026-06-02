import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA9Xipv613YwBTkr-ValCqZqvuhIRrG4hY",
  authDomain: "solarsync-cb31a.firebaseapp.com",
  projectId: "solarsync-cb31a",
  storageBucket: "solarsync-cb31a.firebasestorage.app",
  messagingSenderId: "775206059585",
  appId: "1:775206059585:web:5dbc4817b5c481736ad0c0",
  measurementId: "G-YYH7W0KX8W"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)