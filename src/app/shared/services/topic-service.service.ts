import { Injectable, Inject } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database'
import { Topic, Image } from '../models';

@Injectable()
export class TopicService {

  // private ref: firebase.database.Reference;
  // private topicRef: firebase.database.Reference;
  constructor(private afDb:AngularFireDatabase ) {

  }

  findTopicAfterKey(key: string): FirebaseObjectObservable<Topic> {
    const foundTopic: FirebaseObjectObservable<Topic> = <FirebaseObjectObservable<Topic>>this.afDb.object( 'topics/' + key);
    return foundTopic;
  }

  // addTopic(topic: Topic): FirebaseObjectObservable<Topic> {
  //   const newPushKey: string = this.topicRef.push().key;
  //   const updates = {};
  //   updates["/topics/" + newPushKey] = topic;

  //   this.ref.update(updates);
  //   return this.findTopicAfterKey(newPushKey);
  // }


}
