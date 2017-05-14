import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const listener = functions.https.onRequest((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const uid = req.body.uid;
    const snapshot = admin.database().ref('users').push({ firstname: firstname, lastname: lastname, uid: uid });
    const key = snapshot.key;
    const updates = {};
    updates[uid] = key;
    admin.database().ref('userUIDs').update(updates);
    res.send("200");

});
