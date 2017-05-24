import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Topic, Image, User } from '../models';
import { Observable } from 'rxjs';
import { DBHelperService } from './db-helper.service';
import * as firebase from 'firebase';
@Injectable()
export class ImageService {

  private storageRef: firebase.storage.Reference;
  constructor(private afDb: AngularFireDatabase, private dbHelperService: DBHelperService) {
    this.storageRef = afDb.app.storage().ref();
  }

  findImageAfterKey(key: string): FirebaseObjectObservable<Image> {
    return this.dbHelperService.findInNodeAfterKey("images", key);
  }

  findImagesFromUser(user: FirebaseObjectObservable<User>): Observable<Array<FirebaseObjectObservable<Image>>> {
    if (user === undefined) {
      return undefined;
    }
    let images: Array<FirebaseObjectObservable<Image>> = [];
    return Observable.create(observer => {
      user.subscribe(User => {
        this.dbHelperService.findKeyList(User.images).subscribe(keys => {
          images.splice(0, images.length);
          keys.forEach(key => {
            images.push(this.findImageAfterKey(key.$key));
          });
        });
        observer.next(images);
      });
    });
  }

  findLatestImages(count: number): FirebaseListObservable<Image[]> {
    return this.afDb.list('images', {
      query: {
        orderByKey: true,
        limitToLast: count
      }
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

    const key = this.afDb.list('images').$ref.ref.push().key;
    const path = 'user-images/' + key;
    const that = this;
    const promise = new Promise((resolve, reject) => {
      that.uploadImage(canvas, path)
        .then(url => {
          const ratingKey = this.afDb.list('ratings').$ref.ref.push().key;
          const commentListKey = this.afDb.list('commentLists').$ref.ref.push().key;
          const drawing = new Image(topic.$ref.key, user.$ref.key, url, ratingKey, commentListKey);
          const updates = {};
          updates['/' + key] = drawing;
          this.afDb.list('images').$ref.ref.update(updates);
          user.subscribe(User => {
            this.dbHelperService.addKeyToList(User.images, key);
          });
          topic.subscribe(Topic => {
            if (Topic.images !== undefined) {
              this.dbHelperService.addKeyToList(Topic.images, key);
            }
          });
          resolve('test'); // TODO
        }).catch(x => reject(x));
    });
    return promise;
  }
}
