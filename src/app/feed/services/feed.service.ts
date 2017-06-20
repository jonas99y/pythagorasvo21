import { Injectable } from '@angular/core';
import { DBHelperService, FeedItem, User, Group } from '../../shared';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class FeedService {

    constructor(private dbHelperService: DBHelperService, private afDb: AngularFireDatabase) { }


    findFeedItemAfterKey(key: string): FirebaseObjectObservable<FeedItem> {
        return this.dbHelperService.findInNodeAfterKey('feedItems', key);
    }

    findAllFeedItemsInFeed(feedKey: string): FirebaseListObservable<FeedItem[]> {
        return this.dbHelperService.findKeyList(feedKey);
    }

    addFeedItemToFeed(feedItem: FirebaseObjectObservable<FeedItem>, feedKey: string) {
        this.dbHelperService.addKeyToList(feedKey, feedItem.$ref.key);
    }

    addFeedItemToUser(feedItem: FirebaseObjectObservable<FeedItem>, user: FirebaseListObservable<User>) {
        user.subscribe(userSnapshot => {
            this.addFeedItemToFeed(feedItem, userSnapshot.feed);
        });
    }

    addFeedItemToGroup(feedItem: FirebaseObjectObservable<FeedItem>, group: FirebaseObjectObservable<Group>) {
        group.subscribe(groupSnapshot => {
            this.addFeedItemToFeed(feedItem, groupSnapshot.feed);
        });
    }
}
