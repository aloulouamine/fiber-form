import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


admin.initializeApp();

/**
 * Insert Raw Json into database or throw a 500 error
 */
export const dbInsertFunction = functions.https.onRequest((request, response) => {
    admin
        .firestore()
        .collection("inputs")
        .add(
            request.body
        )
        .then(
            () => response.send(request.body + 'inserted')
        )
        .catch(
            () => response.sendStatus(500)
        );
});
