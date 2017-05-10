import { Injectable, Inject } from '@angular/core';
 import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Topic, Drawing } from '../model';
import * as firebase from 'firebase/app';
@Injectable()
export class DrawingService {

  private storageRef: firebase.storage.Reference;
  // private drawingRef: firebase.database.Reference;
  constructor(private afDb:AngularFireDatabase) {
    let storage = afDb.app.storage();
    console.log(storage);
  }

  // findDrawingAfterKey(key: string): FirebaseObjectObservable<Drawing> {
  //   const foundDrawing: FirebaseObjectObservable<Drawing> = <FirebaseObjectObservable<Drawing>>this.db.object(this.drawingRef + '/' + key);
  //   return foundDrawing;
  // }

  // addDrawing(drawing: Drawing): FirebaseObjectObservable<Drawing> {
  //   const newPushKey: string = this.drawingRef.push().key;
  //   const updates = {};
  //   updates["/drawings/" + newPushKey] = drawing;

  //   this.ref.update(updates);
  //   return this.findDrawingAfterKey(newPushKey);
  // }

  uploadImage(canvas: HTMLCanvasElement, path: string) {
    const that = this;
    canvas.toBlob(function (blob) {
      const image = new Image();
      console.log(canvas);
      that.storageRef.child(path).put(blob);
    });

  }
}