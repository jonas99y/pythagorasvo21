import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Topic, Drawing } from '../model';
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

  submitNewDrawing(canvas: HTMLCanvasElement, topic: FirebaseObjectObservable<Topic>, user: firebase.User) {
    const key = this.afDb.list("/drawings").push(new Drawing(topic.$ref.key,"someUser")).key;
    const path = 'user-images/' + key;
    this.uploadImage(canvas, path);
  }

  uploadImage(canvas: HTMLCanvasElement, path: string) {
    const that = this;
    canvas.toBlob(function (blob) {
      const image = new Image();
      console.log(canvas);
      that.storageRef.child(path).put(blob);
    });

  }
}