import { Component, OnInit, Injector, Input } from '@angular/core';
import { Topic } from '../../../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-draw-request-item',
  templateUrl: './draw-request-item.component.html',
  styleUrls: ['./draw-request-item.component.scss']
})
export class DrawRequestItemComponent implements OnInit {

  @Input() topic: FirebaseObjectObservable<Topic>;

  public Topic: Topic;

  constructor(public injector: Injector) {
    this.topic = this.injector.get('topic');
  }

  ngOnInit() {
    this.topic.subscribe(topicSnapshot => {
      this.Topic = topicSnapshot;
    })
  }

}
