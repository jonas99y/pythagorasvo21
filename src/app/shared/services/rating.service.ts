import { Injectable } from '@angular/core';
import { AngularFireDatabase,  FirebaseObjectObservable } from 'angularfire2/database';
import { Rating, Image, User } from '../models/';
import { DBHelperService } from './db-helper.service';
@Injectable()
export class RatingService {

  public ratingChars: Array<string> = ['👍', '👎', '😐', '😍', '💩'];
  constructor(private afDb: AngularFireDatabase, private dbHelperService: DBHelperService) { }



  findRatingAfterKey(key: string): FirebaseObjectObservable<Rating> {
    return this.dbHelperService.findInNodeAfterKey("ratings",key);
  }

  addRatingToImage(image: FirebaseObjectObservable<Image>, user: FirebaseObjectObservable<User>, ratingChar: string)
    : Promise<FirebaseObjectObservable<Rating>> {
    const promise = new Promise<FirebaseObjectObservable<Rating>>((resolve, reject) => {
      image.subscribe(imageSnapshot => {
        const ratingKey = imageSnapshot.rating ? imageSnapshot.rating : null;
        this.addRating(user, ratingChar, ratingChar).then(x => resolve(x)).catch(error => reject(error));
      });
    });
    return promise;
  }

  addRating(user: FirebaseObjectObservable<User>, ratingChar: string, ratingKey: string): Promise<FirebaseObjectObservable<Rating>> {
    const that = this;
    ratingKey = ratingKey ? ratingKey : that.initRating().$ref.key;
    const promise = new Promise<FirebaseObjectObservable<Rating>>((resolve, reject) => {
      const updates = {};
      updates[user.$ref.key] = ratingChar;
      this.afDb.object('ratings/' + ratingKey + '/ratings').update(updates);
    });
    return promise;
  }

  initRating(): FirebaseObjectObservable<Rating> {
    return this.findRatingAfterKey(this.afDb.list('/ratings/').push(new Rating(0, {}, {})).key);
  }



}
