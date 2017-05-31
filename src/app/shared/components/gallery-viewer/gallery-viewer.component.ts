import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { RatingService, UserService } from '../../services';
import { Image } from '../../models';
@Component({
  selector: 'app-gallery-viewer',
  templateUrl: './gallery-viewer.component.html',
  styleUrls: ['./gallery-viewer.component.scss']
})
export class GalleryViewerComponent implements OnInit, OnChanges {


  public Images: Array<Image>;

  @Input() images: any;
  @Input() public imageClasses: any;

  constructor(private ratingService: RatingService, private UserService: UserService) { }


  ngOnChanges(changes: SimpleChanges): void {
    // this allows observables and normal objects as input
    if (this.images === undefined) {
      return;
    }
    if (typeof this.images.subscribe === 'function') {
      this.images.subscribe(imgs => {
        this.Images = imgs;

      });
    } else {
      this.Images = this.images;

    }
  }
  ngOnInit() {


  }
}
