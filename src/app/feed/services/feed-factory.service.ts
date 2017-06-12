import { Injectable } from '@angular/core';
import { ImageFeedItemComponent } from '../components/image-feed-item/image-feed-item.component';
import { PostFeedItemComponent } from '../components/post-feed-item/post-feed-item.component';
import {User } from '../../shared';
import {FirebaseObjectObservable} from 'angularfire2/database';
@Injectable()
export class FeedFactoryService {

    setImageFeedItemComponent(user:FirebaseObjectObservable<User>,image: any): any {
        return {
            component: ImageFeedItemComponent,
            inputs: {
                image: image,
                user:user
            }
        };


    }

    setPostFeedItemComponent(user: FirebaseObjectObservable<User>,post: string): any {
        return {
            component: PostFeedItemComponent,
            inputs: {
                post: post,
                user: user
            }
        };
    }

    // setBasicInputComponent(component: any, name: string, label: string, value: string): any {

    //     return {
    //         component: component,
    //         inputs: {
    //             name: name,
    //             label: label,
    //             value: value
    //         }
    //     }
    // }

    // setCommonInputComponent(name: string, label: string, value: string): any {
    //     return this.setBasicInputComponent(CommonInputComponent, name, label, value);
    // }
}
