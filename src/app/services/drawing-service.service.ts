import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Topic, Drawing, User } from '../model';
import * as firebase from 'firebase';
@Injectable()
export class DrawingService {

  private storageRef: firebase.storage.Reference;
  // private drawingRef: firebase.database.Reference;
  constructor(private afDb: AngularFireDatabase) {
    this.storageRef = afDb.app.storage().ref();
  }

  findDrawingAfterKey(key: string): FirebaseObjectObservable<Drawing> {
    const foundDrawing: FirebaseObjectObservable<Drawing> = <FirebaseObjectObservable<Drawing>>this.afDb.object('drawings/' + key);
    return foundDrawing;
  }

  findDrawingsFromUser(user: User): Array<FirebaseObjectObservable<Drawing>> {
    let drawings: Array<FirebaseObjectObservable<Drawing>> = new Array<FirebaseObjectObservable<Drawing>>();
    let drawingKey;
    for (drawingKey in user.drawings) {
      drawings.push(this.findDrawingAfterKey(drawingKey));
    }
    return drawings;
  }

  submitNewDrawing(canvas: HTMLCanvasElement, topic: FirebaseObjectObservable<Topic>, user: firebase.User) {
    const key = this.afDb.list("drawings").$ref.ref.push().key;
    const path = 'user-images/' + key;
    const url = this.uploadImage(canvas, path);
    console.log(url);
    let drawing = new Drawing(topic.$ref.key, "someUser", url);
    let updates = {};
    updates["/" + key] = drawing;
    console.log(updates);
    this.afDb.list("drawings").$ref.ref.update(updates);


  }


  uploadImage(canvas: HTMLCanvasElement, path: string) {
    const that = this;
    canvas.toBlob(function (blob){
       that.storageRef.child(path).put(blob);
    });
    return "";
  }
}