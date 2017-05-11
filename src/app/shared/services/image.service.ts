import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Topic, Image, User } from '../models';
import * as firebase from 'firebase';
@Injectable()
export class ImageService {

  private storageRef: firebase.storage.Reference;
  constructor(private afDb: AngularFireDatabase) {
    this.storageRef = afDb.app.storage().ref();
  }

  findImageAfterKey(key: string): FirebaseObjectObservable<Image> {
    const foundImage: FirebaseObjectObservable<Image> = <FirebaseObjectObservable<Image>>this.afDb.object('images/' + key);
    return foundImage;
  }

  findImagesFromUser(user: User): Array<FirebaseObjectObservable<Image>> {
    let images: Array<FirebaseObjectObservable<Image>> = [];
    for (let imageKey in user.images) {
      images.push(this.findImageAfterKey(imageKey));
    }
    return images;
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
    const key = this.afDb.list("images").$ref.ref.push().key;
    const path = 'user-images/' + key;
    let url: string;
    const that = this;
    const promise = new Promise((resolve, reject) => {
      that.uploadImage(canvas, path)
        .then(x => {
          url = x.downloadURL;
          console.log(url);
          let drawing = new Image(topic.$ref.key, "someUser", url);
          let updates = {};
          updates["/" + key] = drawing;
          console.log(updates);
          this.afDb.list("images").$ref.ref.update(updates);
          resolve("test");
        }).catch(x => reject(new Error("falsch oder so")));
    });
    return promise;
  }



}
