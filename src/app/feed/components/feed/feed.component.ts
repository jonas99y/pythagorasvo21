import { Component, OnInit } from '@angular/core';
import { FeedFactoryService } from '../../services/feed-factory.service';
import { FeedItemComponent } from '../feed-item/feed-item.component';
import { UserService, ImageService } from '../../../shared';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

  fields: Object[] = [];


  constructor(public ffService: FeedFactoryService, public userService: UserService, public imageService: ImageService) {
    this.userService.findCurrentUser().then(user => {
      this.fields.push(this.ffService.setPostFeedItemComponent(user, "hallo ich bin cool"));
      this.fields.push(this.ffService.setPostFeedItemComponent(user, "du need"));
      this.fields.push(this.ffService.setImageFeedItemComponent(user, imageService.findImageAfterKey("-KlSc9TdLh39c1Uwm-I8")))
    });

    // this.fields.push(this.ffService.setCommonInputComponent('firstname', 'First Name:', 'Enter your name'));
    // this.fields.push(this.ffService.setCommonInputComponent('middlename', 'Middle Name', ''));
    // this.fields.push(this.ffService.setCommonInputComponent('lastname', 'Last Name', ''));
    // this.fields.push(this.ffService.setCommonInputComponent('address', 'Your Adress', 'Street, Code and more...'));
    // this.fields.push(this.ffService.setCommonInputComponent('phone', 'Telephone', '(1)555-1234'));
    // this.fields.push(this.ffService.setCommonInputComponent('email', 'Email', 'your@email.com'));
  }

}
