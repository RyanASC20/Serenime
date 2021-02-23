import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import { auth } from "../../config/firebase";

admin.initializeApp();
// const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

// export const pushData = functions.firestore
//     .document(`users/${ auth.currentUser?.uid }/{yearMonth}/{day}`)
//     .onWrite((change, context) => {
//         const newData = change.after.data();
//         if (newData) {
//             console.log(newData);
//         }
//     });