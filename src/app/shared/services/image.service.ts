import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Topic, Image, User } from '../models';
import { Observable } from 'rxjs';
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

  findImagesFromUser(user: FirebaseObjectObservable<User>): Observable<Array<FirebaseObjectObservable<Image>>> {
    let images: Array<FirebaseObjectObservable<Image>> = [];

    return Observable.create(observer => {
      user.subscribe(User => {
        images.splice(0, images.length);
        console.log(images.length);
        for (let imageKey in User.images) {
          images.push(this.findImageAfterKey(imageKey));
        }
        observer.next(images);

      });
    });
  }

  uploadImage(canvas: HTMLCanvasElement, path: string): Promise<string> {
    const that = this;
    let promise = new Promise<string>((resolve, reject) => {
      canvas.toBlob(x => {
        that.storageRef.child(path).put(x).then(x => resolve(x.downloadURL)).catch(x => reject(x));
      });
    });
    return promise;

  }

  submitNewDrawing(
    canvas: HTMLCanvasElement,
    topic: FirebaseObjectObservable<Topic>,
    user: FirebaseObjectObservable<User>
  ): Promise<string> {

    const key = this.afDb.list("images").$ref.ref.push().key;
    const path = 'user-images/' + key;
    const that = this;
    const promise = new Promise((resolve, reject) => {
      that.uploadImage(canvas, path)
        .then(url => {
          const drawing = new Image(topic.$ref.key, user.$ref.key, url,null);
          const updates = {};
          updates["/" + key] = drawing;
          this.afDb.list("images").$ref.ref.update(updates);
          resolve("test");
        }).catch(x => reject(x));
    });
    return promise;
  }
}
