import { Injectable } from '@angular/core';
import { ImageFeedItemComponent } from '../components/image-feed-item/image-feed-item.component';
import { PostFeedItemComponent } from '../components/post-feed-item/post-feed-item.component';

@Injectable()
export class FeedFactoryService {

    setImageFeedItemComponent(image: any): any {
        return {
            component: ImageFeedItemComponent,
            inputs: {
                image: image
            }
        };


    }

    setPostFeedItemComponent(post: string): any {
        return {
            component: PostFeedItemComponent,
            inputs: {
                post: post
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
