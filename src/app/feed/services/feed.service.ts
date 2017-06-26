import { Injectable } from '@angular/core';
import { FeedItem, User, Group, Topic } from '../../shared';
import { DBHelperService } from '../../shared/services/db-helper.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class FeedService {

    constructor(
        private dbHelperService: DBHelperService
    )
    { }

    createNewTopicRequestFeedItem(topicKey, authorKey): FirebaseObjectObservable<FeedItem> {
        const feedItem: FeedItem = { author: authorKey, topic: topicKey } as FeedItem;
        return this.createNewFeedItem(feedItem);
    }

    createNewFeedItem(feedItem: FeedItem): FirebaseObjectObservable<FeedItem> {

        return this.dbHelperService.push('/feedItems', feedItem);
    }



    findFeedItemAfterKey(key: string): FirebaseObjectObservable<FeedItem> {

        return this.dbHelperService.findInNodeAfterKey('feedItems', key);
    }

    findAllFeedItemsInFeed(feedKey: string): Observable<Array<FirebaseObjectObservable<FeedItem>>> {

        return this.dbHelperService.findAllObjectsFromKeyList(feedKey, '/feedItems');
    }

    addFeedItemToFeed(feedItem: FirebaseObjectObservable<FeedItem>, feedKey: string) {

        this.dbHelperService.addKeyToList(feedKey, feedItem.$ref.key);
    }

    addFeedItemToUser(feedItem: FirebaseObjectObservable<FeedItem>, user: FirebaseObjectObservable<User>): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            user.subscribe(userSnapshot => {
                this.addFeedItemToFeed(feedItem, userSnapshot.feed);
                resolve();
            });
        });
        return promise;
    }

    addFeedItemToGroup(feedItem: FirebaseObjectObservable<FeedItem>, group: FirebaseObjectObservable<Group>) {
        group.subscribe(groupSnapshot => {
            this.addFeedItemToFeed(feedItem, groupSnapshot.feed);
        });
    }


}
