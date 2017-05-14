import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const listener = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET, POST')
    .status(200);
  if (req.method === `OPTIONS`) {
    res.send('options requested');
    return;
  } else {
    const bodyData = JSON.parse(req.body);
    const firstname = bodyData.firstname;
    const lastname = bodyData.lastname;
    const uid = bodyData.uid;
    const snapshot = admin.database().ref('users').push({
      firstname: firstname,
      lastname: lastname,
      uid: uid
    });
    const key = snapshot.key;
    const updates = {};
    updates[uid] = key;
    admin.database().ref('userUIDs').update(updates);
    res.send('Wheeee it works! User adjusted');
  }
});
