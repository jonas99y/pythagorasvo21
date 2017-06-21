import { Component, OnInit, Injector, Input } from '@angular/core';
import { Topic, Image, ImageService } from '../../../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-draw-request-item',
  templateUrl: './draw-request-item.component.html',
  styleUrls: ['./draw-request-item.component.scss']
})
export class DrawRequestItemComponent implements OnInit {

  @Input() topic: FirebaseObjectObservable<Topic>;

  public Topic: Topic;
  public Images: Observable<Array<FirebaseObjectObservable<Image>>>;

  constructor(public injector: Injector, private imageService: ImageService) {
    this.topic = this.injector.get('topic');
  }

  ngOnInit() {
    this.topic.subscribe(topicSnapshot => {
      this.Topic = topicSnapshot;
      this.Images = this.imageService.findImagesAfterTopic(topicSnapshot);
    });
  }

}
