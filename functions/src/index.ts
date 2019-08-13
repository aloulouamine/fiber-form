import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  admin.firestore().collection("messages").add({ hello: 'world' }).then(
    () => response.send("Hello from Firebase!")
  );
});
