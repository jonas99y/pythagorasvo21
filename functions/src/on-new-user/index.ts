import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onNewUser = functions.auth.user().onCreate(event => {
    let firstname = event.data.displayName;
    let lastname = "not set";
    let uid =event.data.uid;
    const snapshot = admin.database().ref('users').push({
        firstname: firstname,
        lastname: lastname,
        uid: uid
    });
    const key = snapshot.key;
    const updates = {};
    updates[uid] = key;
    admin.database().ref('userUIDs').update(updates);
});