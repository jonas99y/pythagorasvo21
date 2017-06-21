import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { FeedItem, UserService, User } from '../../../shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {

  public feedItems: Observable<Array<FirebaseObjectObservable<FeedItem>>>;

  private currentUser: FirebaseObjectObservable<User>;
  constructor(
    private userService: UserService,
    private feedService: FeedService
   ) {
    userService.findCurrentUser().then(user => {
      this.currentUser = user;
      user.subscribe(userSnapshot => {
        this.feedItems = feedService.findAllFeedItemsInFeed(userSnapshot.feed);
      });
    });
  }

  ngOnInit() {
  }

}
