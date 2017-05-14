import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Image, RatingService, UserService } from '../shared';
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input("Image") public image: FirebaseObjectObservable<Image>;

  constructor(private ratingService: RatingService, private UserService: UserService) { }

  ngOnInit() {
    console.log(this.image);
  }
 

}
