import { Injectable } from '@angular/core';
import { FeedItem, User, Group, Topic } from '../../shared';
import { DBHelperService } from '../../shared/services/db-helper.service';
import { ImageService } from '../../shared/services/image.service';

import { TopicService } from '../../shared/services/topic-service.service';
import { UserService } from '../../shared/services/user.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FeedFactoryService } from './feed-factory.service';

@Injectable()
export class FeedService {

    constructor(
        private imageService: ImageService,
        private userService: UserService,
        private dbHelperService: DBHelperService,
        private topicService: TopicService,
        private afDb: AngularFireDatabase,
        private ffservice: FeedFactoryService

    )
    { }


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
        const promise = new Promise((resolve, reject) => {
            feedItem.subscribe(feedItemSnapshot => {
                const user = this.userService.findUserAfterKey(feedItemSnapshot.author);
                if (feedItemSnapshot.image !== undefined) {
                    // handle every component with image here
                    const image = this.imageService.findImageAfterKey(feedItemSnapshot.image);
                    resolve(this.ffservice.setImageFeedItemComponent(user, image));

                } else
                    if (feedItemSnapshot.topic !== undefined) {
                        const topic = this.topicService.findTopicAfterKey(feedItemSnapshot.topic);
                        resolve(this.ffservice.setTopicRequestItemComponent(user, topic));
                    } else
                        if (feedItemSnapshot.message !== undefined) {
                            // handle every component with message and no image here
                            resolve(this.ffservice.setPostFeedItemComponent(user, feedItemSnapshot.message));
                        }

            });
        });
        return promise;
    }

}
