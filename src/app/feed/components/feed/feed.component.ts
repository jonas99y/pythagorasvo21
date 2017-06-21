import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { FeedItemComponent } from '../feed-item/feed-item.component';
import { UserService, ImageService, FeedItem } from '../../../shared';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

  @Input() fields: any;
  @Input() set feedItems(feedItems: Observable<Array<FirebaseObjectObservable<FeedItem>>>) {
    this.fields = [];
    if (feedItems !== undefined) {
      feedItems.subscribe(feedItemsSnapshot => {
        feedItemsSnapshot.forEach(
          feedItem => {
            this.feedService.setFeedItem(feedItem).then(item => {
              this.fields.push(item);
            });
          }
        );
      });
    }
  };

  constructor(
    public userService: UserService,
    public imageService: ImageService,
    public feedService: FeedService) {
  }

}
