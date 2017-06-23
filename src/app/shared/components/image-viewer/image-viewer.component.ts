import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { RatingService, UserService, TopicService } from '../../services';
import { Image, Topic } from '../../models';
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  public set Image(img: Image) {
    this.img = img;
    this.Topic = this.topicService.findTopicAfterKey(img.topic);
    this.Topic.subscribe(x=> console.log(x))
  };

  public get Image(): Image {
    return this.img;
  }
  public Link: string = "";
  public Topic: FirebaseObjectObservable<Topic>;
  @Input("Image") image: any;

  private img: Image;
  constructor(private ratingService: RatingService, private UserService: UserService, private topicService: TopicService) { }

  ngOnInit() {
    if (typeof this.image.subscribe === 'function') {
      this.image.subscribe(img => {
        this.Image = img;
        this.Link = '/image/' + this.image.$ref.key;
      });
    } else {
      this.Image = this.image;
      this.Link = '/image/' + this.image.$key;
    }

  }

}
