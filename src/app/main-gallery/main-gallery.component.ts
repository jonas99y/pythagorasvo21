import { Component, OnInit } from '@angular/core';
import { ImageService, Image } from '../shared';
import { FirebaseListObservable } from 'angularfire2/database';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-main-gallery',
  templateUrl: './main-gallery.component.html',
  styleUrls: ['./main-gallery.component.scss']
})
export class MainGalleryComponent implements OnInit {

  public latestImages: FirebaseListObservable<Image[]>;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.latestImages = this.imageService.findLatestImages(5);
  }
}
