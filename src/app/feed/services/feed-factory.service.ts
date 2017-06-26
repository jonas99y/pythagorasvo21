import { Injectable } from '@angular/core';
import { DrawRequestItemComponent, PostFeedItemComponent, ImageFeedItemComponent } from '../components';
import { User, Image, FeedItem, Topic } from '../../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';
@Injectable()
export class FeedFactoryService {
    setTopicRequestItemComponent(user: FirebaseObjectObservable<User>, topic: FirebaseObjectObservable<Topic>): any {
        return {
            component: DrawRequestItemComponent,
            inputs: {
                topic: topic,
                user: user
            }
        };

    }

    setImageFeedItemComponent(user: FirebaseObjectObservable<User>, image: FirebaseObjectObservable<Image>): any {
        return {
            component: ImageFeedItemComponent,
            inputs: {
                image: image,
                user: user
            }
        };


    }

    setPostFeedItemComponent(user: FirebaseObjectObservable<User>, post: string): any {
        return {
            component: PostFeedItemComponent,
            inputs: {
                post: post,
                user: user
            }
        };
    }

}
