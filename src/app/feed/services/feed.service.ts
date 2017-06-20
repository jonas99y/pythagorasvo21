import { Injectable } from '@angular/core';
import { DBHelperService, FeedItem, User, Group } from '../../shared';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable} from 'rxjs';


@Injectable()
export class FeedService {

    constructor(private dbHelperService: DBHelperService, private afDb: AngularFireDatabase) { }


    createNewFeedItem(feedItem: FeedItem): FirebaseObjectObservable<FeedItem> {
        return this.dbHelperService.push('/feedItems', feedItem);
    }

    findFeedItemAfterKey(key: string): FirebaseObjectObservable<FeedItem> {
        return this.dbHelperService.findInNodeAfterKey('feedItems', key);
    }

    findAllFeedItemsInFeed(feedKey: string): Observable<Array<FirebaseObjectObservable<FeedItem>>> {
        return this.dbHelperService.findAllObjectsFromKeyList(feedKey,"/feedItems");
    }

    addFeedItemToFeed(feedItem: FirebaseObjectObservable<FeedItem>, feedKey: string) {
        this.dbHelperService.addKeyToList(feedKey, feedItem.$ref.key);
    }

    addFeedItemToUser(feedItem: FirebaseObjectObservable<FeedItem>, user: FirebaseObjectObservable<User>) {
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
