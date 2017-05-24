import { Injectable, Inject } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database'
import { Topic, Image, User } from '../models';
import { ImageService } from './image.service';
import { DBHelperService } from './db-helper.service';

@Injectable()
export class TopicService {
  constructor(private afDb: AngularFireDatabase, private imageService: ImageService, private dbHelperService: DBHelperService) {

  }

  findTopicAfterKey(key: string): FirebaseObjectObservable<Topic> {
    return this.dbHelperService.findInNodeAfterKey("topic", key);
  }
  findOrCreateTopicAfterName(name: string): Promise<FirebaseObjectObservable<Topic>> {
    console.log(name);
    const promise = new Promise((resolve, reject) => {
      this.afDb.list("/topics", {
        query: {
          orderByChild: 'name',
          equalTo: name
        }
      }).subscribe(topics => {
        if (topics.length > 0) {
          console.log(topics[0].$key);
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
        let alltopics = this.afDb.object("topics");
        console.log(alltopics);
        resolve(alltopics.first((x, idx, obs) => { console.log("test"); return true }))
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

  addTopic(topicName: string): FirebaseObjectObservable<Topic> {
    let key = this.afDb.database.ref().push().key;
    this.afDb.list("/topics").push({
      name: topicName, images: key
    });
    return this.findTopicAfterKey(key);
  }
}
