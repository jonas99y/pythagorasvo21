import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedFactoryService } from './services/feed-factory.service';
import { FeedService } from './services/feed.service';
import { FeedItemResolverService } from './services/feed-item-resolver.service';
// import {FeedService, FeedFactoryService, FeedItemResolverService} from './services';
import { FeedComponent } from './components/feed/feed.component';
import { ImageFeedItemComponent } from './components/image-feed-item/image-feed-item.component';
import { PostFeedItemComponent } from './components/post-feed-item/post-feed-item.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { SharedModule } from '../shared';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { GroupFeedComponent } from './components/group-feed/group-feed.component';
import { DrawRequestItemComponent } from './components/draw-request-item/draw-request-item.component';


@NgModule({
    imports: [
        CommonModule, FormsModule, RouterModule, SharedModule
    ],
    declarations: [
        FeedComponent,
        FeedItemComponent,
        ImageFeedItemComponent,
        PostFeedItemComponent,
        UserFeedComponent,
        GroupFeedComponent,
        DrawRequestItemComponent
    ],
    exports: [
        FeedComponent, FeedItemComponent
    ],
    providers: [FeedFactoryService, FeedService, FeedItemResolverService],
    entryComponents: [FeedItemComponent,
        ImageFeedItemComponent,
        PostFeedItemComponent,
        DrawRequestItemComponent]
})
export class FeedModule { }
