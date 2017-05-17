import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as RegisterUser from './register-user';
import * as Image from './image';
import * as Rating from './rating';
import * as newUser from './on-new-user';

admin.initializeApp(functions.config().firebase);

export const registerUser = RegisterUser.listener;
//export const onNewDrawing = Image.onNewImage;    is done on client; was to slow
export const onNewRating = Rating.onNewRating;
export const onNewUser = newUser.onNewUser;