import * as admin from 'firebase-admin';

export function registerNewUser(uid:string, firstname:string, lastname:string) {

    const snapshot = admin.database().ref('users').push({
        firstname: firstname,
        lastname: lastname,
        uid: uid,
        images: admin.database().ref().push().key,
        feed: admin.database().ref().push().key
    });
    const key = snapshot.key;
    const updates = {};
    updates[uid] = key;
    admin.database().ref('userUIDs').update(updates);


};
