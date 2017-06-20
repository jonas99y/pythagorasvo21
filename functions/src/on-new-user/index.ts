import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as shared from '../shared';

/* Function that triggers everytime a new user gets registred */
export const onNewUser = functions.auth.user().onCreate(event => {
    if (event.data.displayName == undefined) {
        return;
    }
    const firstname = event.data.displayName.split(' ')[0];
    const lastname = event.data.displayName.split(' ')[1];
    const uid = event.data.uid;

    shared.registerNewUser(uid, firstname, lastname);
});
