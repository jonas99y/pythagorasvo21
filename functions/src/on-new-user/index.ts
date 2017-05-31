import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onNewUser = functions.auth.user().onCreate(event => {
    if (event.data.displayName == undefined) {
        return;
    }
    let firstname = event.data.displayName.split(' ')[0];
    let lastname = event.data.displayName.split(' ')[1];
    let uid = event.data.uid;
    const snapshot = admin.database().ref('users').push({
        firstname: firstname,
        lastname: lastname,
        uid: uid,
        images: admin.database().ref().push().key
    });
    const key = snapshot.key;
    const updates = {};
    updates[uid] = key;
    admin.database().ref('userUIDs').update(updates);
});