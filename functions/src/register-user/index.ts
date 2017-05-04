import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const listener = functions.https.onRequest((req, res) => {
    const username = req.body.username;
    const uid = req.body.uid;
    const snapshot = admin.database().ref('users').push({ username: username, uid: uid });
    res.send("User added!");
});
