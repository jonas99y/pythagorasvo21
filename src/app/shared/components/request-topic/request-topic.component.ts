import { Component, OnInit, Input } from '@angular/core';
import { TopicService } from '../../services';
import { User } from '../../models';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-request-topic',
  templateUrl: './request-topic.component.html',
  styleUrls: ['./request-topic.component.scss']
})
export class RequestTopicComponent implements OnInit {

  @Input() user: FirebaseObjectObservable<User>;
  public RequestTopicName: string;

  constructor(private topicService: TopicService) { }

  ngOnInit() {
  }

  submitRequest() {
    this.topicService.assignNewTopicToUser(this.RequestTopicName, this.user);
  }

}

