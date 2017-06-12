import { Component, OnInit, Input, Injector } from '@angular/core';

@Component({
  selector: 'app-post-feed-item',
  templateUrl: './post-feed-item.component.html',
  styleUrls: ['./post-feed-item.component.scss']
})
export class PostFeedItemComponent implements OnInit {

  @Input() post: string;

  constructor(public injector: Injector) {
    this.post = this.injector.get('post');
  }

  ngOnInit() {
  }

}
