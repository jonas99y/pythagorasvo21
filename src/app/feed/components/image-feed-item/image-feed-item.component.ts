import { Component, OnInit, Injector } from '@angular/core';
import { Image } from '../../../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';
@Component({
  selector: 'app-image-feed-item',
  templateUrl: './image-feed-item.component.html',
  styleUrls: ['./image-feed-item.component.scss']
})
export class ImageFeedItemComponent implements OnInit {

  public Image: FirebaseObjectObservable<Image>;

  constructor(public injector: Injector) {
    this.Image = this.injector.get('image');
  }

  ngOnInit() {
  }

}
