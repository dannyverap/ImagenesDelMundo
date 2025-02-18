import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
