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

    findFeedItemAfterQuery(query: any): Promise<FirebaseObjectObservable<FeedItem>> {
        return this.dbHelperService.findFirstInNodeAfterQuery('feed', null); // TODO
    }

    findAllFeedItemsOfUser(user: FirebaseObjectObservable<User>): Promise<Observable<Array<FirebaseObjectObservable<FeedItem>>>> {
        const promise = new Promise((resolve, reject) => {
            user.subscribe(userSnapshot => {
                resolve(this.dbHelperService.findAllObjectsFromKeyList(userSnapshot.feed, '/feedItems'));
            });
        });
        return promise;
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

    removeFeedItemFromFeed(feedItem: FirebaseObjectObservable<FeedItem>, feedKey: string) {
        this.dbHelperService.removeKeyFormList(feedKey, feedItem.$ref.key);
        console.log(feedKey, feedItem.$ref.key);
    }

    removeFeedItemFromUser(feedItem: FirebaseObjectObservable<FeedItem>, user: FirebaseObjectObservable<User>) {
        user.subscribe(userSnapshot => {
            this.removeFeedItemFromFeed(feedItem, userSnapshot.feed);
            
        });
    }

    removeFeedItemFromGroup(feedItem: FirebaseObjectObservable<FeedItem>, group: FirebaseObjectObservable<Group>) {
        group.subscribe(groupSnapshot => {
            this.removeFeedItemFromFeed(feedItem, groupSnapshot.feed);
        });
    }


}
