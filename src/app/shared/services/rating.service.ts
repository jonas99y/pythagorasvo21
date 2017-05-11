import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Rating, Image, User } from '../models/';
@Injectable()
export class RatingService {

  constructor(private afDb: AngularFireDatabase) { }


  findRatingAfterKey(key: string): FirebaseObjectObservable<Rating> {
    return this.afDb.object("/ratings/" + key);
  }

  addRatingToImage(image: FirebaseObjectObservable<Image>, user: FirebaseObjectObservable<User>, ratingChar: string)
    : Promise<FirebaseObjectObservable<Rating>> {
    const that = this;
    const promise = new Promise<FirebaseObjectObservable<Rating>>((resolve, reject) => {
      const updates = {};
      updates[user.$ref.key] = ratingChar;
      image.subscribe(imageSnapshot => {
        const ratingKey = imageSnapshot.rating ? imageSnapshot.rating : that.initRating(image).$ref.key;
        this.afDb.object("/ratings/" + imageSnapshot.rating+"/ratings").update(updates);
      });
    });
    return promise;
  }

  initRating(image: FirebaseObjectObservable<Image>): FirebaseObjectObservable<Rating> {
    return this.findRatingAfterKey(this.afDb.list("/ratings/").push(new Rating(0, {}, {})).key);
  }
}
