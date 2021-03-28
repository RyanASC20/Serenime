import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const FIREBASE_CONFIG_DEV = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

const FIREBASE_CONFIG_PROD = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY_PROD,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_PROD,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_PROD,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID_PROD,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_PROD,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_PROD,
    appId: process.env.NEXT_PUBLIC_APP_ID_PROD,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_PROD
}


if (process.env.NODE_ENV === 'production') {
    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG_PROD);
    }
    firebase.analytics();
} else {
    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG_DEV);
    }
}

const app = firebase.app();
const auth = firebase.auth()
const firestore = firebase.firestore();

export { auth, firestore }