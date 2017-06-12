import { Component, OnInit, Input, Injector } from '@angular/core';
import { User } from '../../../shared';
import {FirebaseObjectObservable} from 'angularfire2/database';
@Component({
  selector: 'app-post-feed-item',
  templateUrl: './post-feed-item.component.html',
  styleUrls: ['./post-feed-item.component.scss']
})
export class PostFeedItemComponent{

  @Input() post: string;
  @Input() user: FirebaseObjectObservable<User>;

  constructor(public injector: Injector) {
    this.post = this.injector.get('post');
    this.user = this.injector.get('user');
  }

}
