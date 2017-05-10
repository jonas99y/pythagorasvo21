import { Injectable, Inject } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database'
import { Topic, Drawing } from '../model';

@Injectable()
export class TopicService {

  // private ref: firebase.database.Reference;
  // private topicRef: firebase.database.Reference;
  // constructor( @Inject(FirebaseRef) fb, private db: AngularFireDatabase) {
  //   this.ref = fb.database().ref();
  //   this.topicRef = fb.database().ref('/topics');
  // }

  // findTopicAfterKey(key: string): FirebaseObjectObservable<Topic> {
  //   const foundTopic: FirebaseObjectObservable<Topic> = <FirebaseObjectObservable<Topic>>this.db.object(this.topicRef + '/' + key);
  //   return foundTopic;
  // }

  // addTopic(topic: Topic): FirebaseObjectObservable<Topic> {
  //   const newPushKey: string = this.topicRef.push().key;
  //   const updates = {};
  //   updates["/topics/" + newPushKey] = topic;

  //   this.ref.update(updates);
  //   return this.findTopicAfterKey(newPushKey);
  // }


}
