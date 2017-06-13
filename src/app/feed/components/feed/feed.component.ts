import { Component, OnInit, Input } from '@angular/core';
import { FeedFactoryService } from '../../services/feed-factory.service';
import { FeedItemComponent } from '../feed-item/feed-item.component';
import { UserService, ImageService } from '../../../shared';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

  @Input() fields: any;

  /* Demo code */
  constructor(public ffService: FeedFactoryService, public userService: UserService, public imageService: ImageService) {

    this.fields =[];
    this.userService.findCurrentUser().then(user => {
      this.fields.push(this.ffService.setPostFeedItemComponent(user, "hallo ich bin cool"));
      this.fields.push(this.ffService.setPostFeedItemComponent(user, "du need"));
      this.fields.push(this.ffService.setImageFeedItemComponent(user, imageService.findImageAfterKey("-KlSc9TdLh39c1Uwm-I8")))
    });
  }

}
