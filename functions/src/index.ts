import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
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
