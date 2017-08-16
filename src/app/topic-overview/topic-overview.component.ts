import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image, ImageService, Topic, User, UserService, TopicService } from '../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topic-overview',
  templateUrl: './topic-overview.component.html',
  styleUrls: ['./topic-overview.component.scss']
})
export class TopicOverviewComponent implements OnInit, OnDestroy {

  private sub: any;
  public topic: FirebaseObjectObservable<Topic>
  public images: Observable<FirebaseObjectObservable<Image>[]>
  public hasImages: boolean =false;

  constructor(private route: ActivatedRoute, private topivService: TopicService, private imageService: ImageService) { }





  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.topic = this.topivService.findTopicAfterKey(params['topicKey']);
      this.topic.subscribe(topic => {
        this.images = this.imageService.findImagesAfterTopic(topic);
        this.images.subscribe(images => {
          if (images.length > 0)
            this.hasImages = true;
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
