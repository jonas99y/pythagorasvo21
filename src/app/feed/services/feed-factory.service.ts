import { Injectable } from '@angular/core';
import { ImageFeedItemComponent } from '../components/image-feed-item/image-feed-item.component';
import { PostFeedItemComponent } from '../components/post-feed-item/post-feed-item.component';
import { User, Image, FeedItem } from '../../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';
@Injectable()
export class FeedFactoryService {



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
