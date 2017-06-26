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
  @Input() requester: FirebaseObjectObservable<User>;
  public RequestTopicName: string;

  constructor(private topicService: TopicService) { }

  ngOnInit() {
  }

  submitRequest() {
    this.topicService.requestTopicFromUser(this.user, this.RequestTopicName, this.requester).then(x => alert('Erfolgreich'));

  }

}

