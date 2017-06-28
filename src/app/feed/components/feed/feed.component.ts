import { Component, OnInit, Input } from '@angular/core';
import { FeedItemResolverService } from '../../services/feed-item-resolver.service';
import { FeedItemComponent } from '../feed-item/feed-item.component';
import { FeedItem } from '../../../shared';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

  @Input() fields: Array<any> = new Array<any>();
  @Input() set feedItems(feedItems: Observable<Array<FirebaseObjectObservable<FeedItem>>>) {
    if (feedItems !== undefined) {

      feedItems.subscribe(feedItemsSnapshot => {
        this.fields.splice(0, this.fields.length );
        console.log(this.fields.length);
        console.log(feedItemsSnapshot.length);
        feedItemsSnapshot.forEach(
          feedItem => {
            this.feedItemResolverService.setFeedItem(feedItem).then(item => {
              this.fields.push(item);
            });
          }
        );
      });
    }
  };

  constructor(
    public feedItemResolverService: FeedItemResolverService) {
  }

}
