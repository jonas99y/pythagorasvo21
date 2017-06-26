import { Injectable, Inject } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Topic, Image, User, Group, FeedItem } from '../models';
import { ImageService } from './image.service';
import { DBHelperService } from './db-helper.service';
import { FeedService } from './../../feed/services/feed.service';

@Injectable()
export class TopicService {
  constructor(
    private afDb: AngularFireDatabase,
    private imageService: ImageService,
    private dbHelperService: DBHelperService,
    private feedService: FeedService) {

  }

  findTopicAfterKey(key: string): FirebaseObjectObservable<Topic> {
    return this.dbHelperService.findInNodeAfterKey('topics', key);
  }
  findOrCreateTopicAfterName(name: string): Promise<FirebaseObjectObservable<Topic>> {
    const promise = new Promise((resolve, reject) => {
      this.afDb.list('/topics', {
        query: {
          orderByChild: 'name',
          equalTo: name
        }
      }).subscribe(topics => {
        if (topics.length > 0) {
          resolve(this.findTopicAfterKey(topics[0].$key));
        } else {
          resolve(this.addTopic(name));
        }
      });
    });
    return promise;


  }

  findTopicToDraw(user: FirebaseObjectObservable<User>): Promise<FirebaseObjectObservable<Topic>> {
    const promise = new Promise((resolve, reject) => {
      this.findAllDrawnTopicsOfUser(user).then(topics => {
        let topicKeys: Array<string> = [];
        topics.forEach(topic => {
          topicKeys.push(topic.$ref.key);
        });
        let alltopics = this.afDb.object('topics');

        resolve(alltopics.first((x, idx, obs) => { console.log('test'); return true; }));
      });
    });

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
    });
    return promise;
  }

  private isInArray(value, array): boolean {
    return array.indexOf(value) > -1;
  }

  assignTopicToGroup(topic: FirebaseObjectObservable<Topic>, group: FirebaseObjectObservable<Group>) {
    group.subscribe(groupSnapshot => {
      this.dbHelperService.addKeyToList(groupSnapshot.topics, topic.$ref.key);

    });
  }

  assignNewTopicToGroup(topicName: string, group: FirebaseObjectObservable<Group>): Promise<FirebaseObjectObservable<Topic>> {
    const promise = new Promise((resolve, reject) => {
      this.findOrCreateTopicAfterName(topicName).then(topic => {
        this.assignTopicToGroup(topic, group);
        resolve(topic);
      });
    });

    return promise;
  }

  assignTopicToUser(topic: FirebaseObjectObservable<Topic>, user: FirebaseObjectObservable<User>) {
    user.subscribe(userSnapshot => {
      this.dbHelperService.addKeyToList(userSnapshot.topics, topic.$ref.key);

    });
  }


  assignNewTopicToUser(topicName: string, user: FirebaseObjectObservable<User>): Promise<FirebaseObjectObservable<Topic>> {
    const promise = new Promise((resolve, reject) => {
      this.findOrCreateTopicAfterName(topicName).then(topic => {
        this.assignTopicToUser(topic, user);
        resolve(topic);
      });
    });

    return promise;
  }

  addTopic(topicName: string): FirebaseObjectObservable<Topic> {
    let key = this.afDb.database.ref().push().key;
    let topicKey = this.afDb.list('/topics').push({
      name: topicName, images: key
    }).key;
    console.log(topicKey);
    return this.findTopicAfterKey(topicKey);
  }


  requestTopicFromUser(user: FirebaseObjectObservable<User>, topic: string, requester: FirebaseObjectObservable<User>): Promise<any> {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this.findOrCreateTopicAfterName(topic).then(nTopic => {
        const feedItem = this.feedService.createNewTopicRequestFeedItem(nTopic.$ref.key, user.$ref.key);
        this.feedService.addFeedItemToUser(feedItem, requester).then(x=>{
          resolve(x);
        });
      });
    });

    return promise;
  }
}
