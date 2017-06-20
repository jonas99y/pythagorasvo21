import { Injectable } from '@angular/core';
import { DBHelperService, FeedItem, User, Group, UserService, ImageService } from '../../shared';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FeedFactoryService } from './feed-factory.service';

@Injectable()
export class FeedService {

    constructor(
        private dbHelperService: DBHelperService,
        private afDb: AngularFireDatabase,
        private ffservice: FeedFactoryService,
        private userService: UserService,
        private imageService: ImageService
    )
    { }


    createNewFeedItem(feedItem: FeedItem): FirebaseObjectObservable<FeedItem> {
        return this.dbHelperService.push('/feedItems', feedItem);
    }

    findFeedItemAfterKey(key: string): FirebaseObjectObservable<FeedItem> {
        return this.dbHelperService.findInNodeAfterKey('feedItems', key);
    }

    findAllFeedItemsInFeed(feedKey: string): Observable<Array<FirebaseObjectObservable<FeedItem>>> {
        return this.dbHelperService.findAllObjectsFromKeyList(feedKey, "/feedItems");
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

    setFeedItem(feedItem: FirebaseObjectObservable<FeedItem>): Promise<any> {
        const promise = new Promise((resolve,reject)=>{
            feedItem.subscribe(feedItemSnapshot => {
                const user = this.userService.findUserAfterKey(feedItemSnapshot.author);
                if (feedItemSnapshot.image !== undefined) {
                    // handle every component with image here
                    const image = this.imageService.findImageAfterKey(feedItemSnapshot.image);
                    resolve( this.ffservice.setImageFeedItemComponent(user, image));

                } else
                    if (feedItemSnapshot.message !== undefined) {
                        // handle every component with message and no image here
                        let temp = this.ffservice.setPostFeedItemComponent(user, feedItemSnapshot.message);
                        console.log(temp);
                         resolve(temp);
                    }

            });
        });
        return promise;
    }

}
