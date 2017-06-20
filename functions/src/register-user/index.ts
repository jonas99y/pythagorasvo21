import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as shared from '../shared';

/* HTTP Function to register a user */
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

    shared.registerNewUser(uid, firstname, lastname);

    res.send('Wheeee it works! User adjusted');
  }
});
