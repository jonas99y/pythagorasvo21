import { Injectable } from '@angular/core';
import { FeedItem, User, Group, Topic } from '../../shared';
import { ImageService } from '../../shared/services/image.service';
import { TopicService } from '../../shared/services/topic-service.service';
import { UserService } from '../../shared/services/user.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FeedFactoryService } from './feed-factory.service';

@Injectable()
export class FeedItemResolverService {

    constructor(
        private ffservice: FeedFactoryService,
        private imageService: ImageService,
        private userService: UserService,
        private topicService: TopicService,

    )
    { }
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
