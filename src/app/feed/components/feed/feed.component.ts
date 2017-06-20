import { Component, OnInit, Input } from '@angular/core';
import { FeedFactoryService, FeedService } from '../../services';
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

  @Input() fields: any = [];
  @Input() set feedItems(feedItems: Observable<Array<FirebaseObjectObservable<FeedItem>>>) {
    if (feedItems != undefined) {
      feedItems.subscribe(feedItemsSnapshot => {
        feedItemsSnapshot.forEach(
          feedItem => {
            feedItem.subscribe(snap => {
              this.userService.findCurrentUser().then(user=>{

                this.fields.push(this.ffService.setPostFeedItemComponent(user, snap.message));
              });
            });
          }
        );
      });
    }
  };
  /* Demo code */
  constructor(
    public ffService: FeedFactoryService,
    public userService: UserService,
    public imageService: ImageService,
    public feedService: FeedService) {

    //   this.fields = [];
    //   this.userService.findCurrentUser().then(user => {
    //     this.fields.push(this.ffService.setPostFeedItemComponent(user, "hallo ich bin cool"));
    //     this.fields.push(this.ffService.setPostFeedItemComponent(user, "du need"));
    //     this.fields.push(this.ffService.setImageFeedItemComponent(user, imageService.findImageAfterKey("-KlSc9TdLh39c1Uwm-I8")))
    //   });
  }

}
