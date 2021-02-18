import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const app = firebase.app();
const auth = firebase.auth()
const firestore = firebase.firestore();

export { auth, firestore }