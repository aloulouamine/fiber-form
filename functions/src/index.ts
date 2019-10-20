import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


admin.initializeApp();


export const syncUser = functions.auth.user().onCreate(user => {
    return admin
        .firestore()
        .collection('users')
        .doc(`${user.email}`)
        .set({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            disabled: user.disabled,
            roles: [],
        })
        .then(() => console.log(`new user sync ${user.email}`))
        .catch(err => console.error('failed user sync ', err));
});


export const deleteUser = functions.auth.user().onDelete(user => {
    return admin
        .firestore()
        .collection('users')
        .doc(`${user.email}`)
        .delete()
        .then(() => console.log(`user ${user.email} deleted.`))
        .catch(err => console.error('error deleting user ', err))
});

/**
 * TODO : Archiving here. 
 */
export const cleanUpMissions = functions.firestore
    .document('sites/{siteId}')
    .onDelete((snapshot: DocumentSnapshot) => snapshot.ref
        .collection('missions')
        .listDocuments()
        .then(doc => doc.forEach(d => d.delete()))
    );