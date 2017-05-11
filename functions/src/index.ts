import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as RegisterUser from './register-user';
import * as Image from './image';

admin.initializeApp(functions.config().firebase);

export const registerUser = RegisterUser.listener;
export const onNewDrawing = Image.onNewImage;