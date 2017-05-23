import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Image, RatingService, UserService } from '../shared';
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  public Image: Image;
  public Link: string = "";

  @Input("Image") image: any;

  constructor(private ratingService: RatingService, private UserService: UserService) { }

  ngOnInit() {
    if (typeof this.image.subscribe === 'function') {
      this.image.subscribe(img => {
        this.Image = img;
        this.Link = '/image/' + this.image.$ref.key;
      })
    }
    else {
      this.Image = this.image;
      this.Link = '/image/' + this.image.$key;
    }

  }

}
