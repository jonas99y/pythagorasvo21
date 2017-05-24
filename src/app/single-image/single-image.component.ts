import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image, ImageService, Topic, User, UserService, TopicService } from '../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.scss']
})
export class SingleImageComponent implements OnInit, OnDestroy {

  private sub: any;
  public image: FirebaseObjectObservable<Image>;
  public topic: FirebaseObjectObservable<Topic>;
  public user: FirebaseObjectObservable<User>;

  constructor(private route: ActivatedRoute, private imageService: ImageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.image = this.imageService.findImageAfterKey(params['imageKey']);
      
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
