import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedFactoryService } from './services';
import { FeedComponent } from './components/feed/feed.component';
import { ImageFeedItemComponent } from './components/image-feed-item/image-feed-item.component';
import { PostFeedItemComponent } from './components/post-feed-item/post-feed-item.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { SharedModule } from '../shared';


@NgModule({
    imports: [
        CommonModule, FormsModule, RouterModule, SharedModule
    ],
    declarations: [
        FeedComponent,
        FeedItemComponent,
        ImageFeedItemComponent,
        PostFeedItemComponent
    ],
    exports: [
        FeedComponent, FeedItemComponent
    ],
    providers: [FeedFactoryService],
    entryComponents: [FeedItemComponent,
        ImageFeedItemComponent,
        PostFeedItemComponent]
})
export class FeedModule { }
