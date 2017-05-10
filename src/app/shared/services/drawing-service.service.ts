import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Topic, Drawing, User } from '../models';
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
    let drawings: Array<FirebaseObjectObservable<Drawing>> = [];
    for (let drawingKey in user.drawings) {
      drawings.push(this.findDrawingAfterKey(drawingKey));
    }
    return drawings;
  }

  uploadImage(canvas: HTMLCanvasElement, path: string): firebase.storage.UploadTask {
    const that = this;
    let blob;
    canvas.toBlob(x => {
      blob = x;
    });
    return that.storageRef.child(path).put(blob);
  }

  submitNewDrawing(canvas: HTMLCanvasElement, topic: FirebaseObjectObservable<Topic>, user: firebase.User): Promise<string> {
    const key = this.afDb.list("drawings").$ref.ref.push().key;
    const path = 'user-images/' + key;
    let url: string;
    const that = this;
    const promise = new Promise((resolve, reject) => {
      that.uploadImage(canvas, path)
        .then(x => {
          url = x.downloadURL;
          console.log(url);
          let drawing = new Drawing(topic.$ref.key, "someUser", url);
          let updates = {};
          updates["/" + key] = drawing;
          console.log(updates);
          this.afDb.list("drawings").$ref.ref.update(updates);
          resolve("test");
        }).catch(x => reject(new Error("falsch oder so")));
    });
    return promise;
  }



}
