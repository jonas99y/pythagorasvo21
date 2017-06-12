import { Component, OnInit } from '@angular/core';
import { FeedFactoryService } from '../../services/feed-factory.service';
import { FeedItemComponent} from '../feed-item/feed-item.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']  
})
export class FeedComponent {

  fields: Object[] = [];


  constructor(public ffService: FeedFactoryService) {

    this.fields.push(this.ffService.setPostFeedItemComponent("hallo ich bin cool"));
    this.fields.push(this.ffService.setPostFeedItemComponent("du need"));
    // this.fields.push(this.ffService.setCommonInputComponent('firstname', 'First Name:', 'Enter your name'));
    // this.fields.push(this.ffService.setCommonInputComponent('middlename', 'Middle Name', ''));
    // this.fields.push(this.ffService.setCommonInputComponent('lastname', 'Last Name', ''));
    // this.fields.push(this.ffService.setCommonInputComponent('address', 'Your Adress', 'Street, Code and more...'));
    // this.fields.push(this.ffService.setCommonInputComponent('phone', 'Telephone', '(1)555-1234'));
    // this.fields.push(this.ffService.setCommonInputComponent('email', 'Email', 'your@email.com'));
  }

}
