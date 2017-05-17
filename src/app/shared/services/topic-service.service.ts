import { Injectable, Inject } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database'
import { Topic, Image, User } from '../models';
import { ImageService } from './image.service';

@Injectable()
export class TopicService {

  // private ref: firebase.database.Reference;
  // private topicRef: firebase.database.Reference;
  constructor(private afDb: AngularFireDatabase, private imageService: ImageService) {

  }

  findTopicAfterKey(key: string): FirebaseObjectObservable<Topic> {
    const foundTopic: FirebaseObjectObservable<Topic> = <FirebaseObjectObservable<Topic>>this.afDb.object('topics/' + key);
    return foundTopic;
  }

  findTopicToDraw(user: FirebaseObjectObservable<User>): Promise<FirebaseObjectObservable<Topic>> {
    const promise = new Promise((resolve, reject) => {
      this.findAllDrawnTopicsOfUser(user).then(topics => {
        let topicKeys: Array<string> = [];
        topics.forEach(topic => {
          topicKeys.push(topic.$ref.key);
        });
        let alltopics = this.afDb.object("topics");
        console.log(alltopics);
        resolve(alltopics.first((x, idx, obs) => { console.log("test"); return true }))
      })
    })


    return promise;
  }

  findAllDrawnTopicsOfUser(user: FirebaseObjectObservable<User>): Promise<Array<FirebaseObjectObservable<Topic>>> {
    const topics: Array<FirebaseObjectObservable<Topic>> = [];


    const promise = new Promise((resolve, reject) => {
      this.afDb.list('users/' + user.$ref.key + '/images').subscribe(imgs => {

        imgs.forEach(img => {
          this.imageService.findImageAfterKey(img.$key).subscribe(relImage => {
            topics.push(this.findTopicAfterKey(relImage.topic));
          });
        });
        resolve(topics);
      });


      // user.subscribe(sUser => {
      //   console.log(sUser);
      //   sUser.images.forEach(image => {
      //     this.imageService.findImageAfterKey(image).subscribe(relImage => {
      //       topics.push(this.findTopicAfterKey(relImage.topic));
      //     });
      //   });
      //   resolve(topics);
      // });
    });
    return promise;
  }

  private isInArray(value, array): boolean {
    return array.indexOf(value) > -1;
  }

  addTopic(topicName: string) {
    this.afDb.list("topics").push({
      name: topicName, images: this.afDb.object("").$ref.push().key
    });
  }

  // addTopic(topic: Topic): FirebaseObjectObservable<Topic> {
  //   const newPushKey: string = this.topicRef.push().key;
  //   const updates = {};
  //   updates["/topics/" + newPushKey] = topic;

  //   this.ref.update(updates);
  //   return this.findTopicAfterKey(newPushKey);
  // }


}
