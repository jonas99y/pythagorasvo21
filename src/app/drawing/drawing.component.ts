import { Component, OnInit, ViewChild } from '@angular/core';
import { SketchpadComponent } from '../sketchpad/components/sketchpad/sketchpad.component';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { TopicService, UserService, ImageService, Topic, User, GroupService } from '../shared/';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from 'firebase';
@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit {

  @ViewChild('sketchpad') sketchpad: SketchpadComponent;

  public imageName: string;
  public Topic: Topic;
  public NewTopicName: string;
  private image: string;
  private ref: firebase.storage.Reference;

  constructor(private imageService: ImageService,
    private topicService: TopicService,
    private userService: UserService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router) {
    //dont remove, will break drawing-service;
    firebase.storage();
    //userService.registerUser(new User(null,"Fabio","Zuber","TRtODRQVUvMJuBTGgzfjYRjBxYk1"))
  }

  ngOnInit() {
    this.route.params.subscribe(paramsSnapshot => {
      if (paramsSnapshot.topicKey !== undefined) {
        this.topicService.findTopicAfterKey(paramsSnapshot.topicKey).subscribe(topicSnapshot => {
          this.Topic = topicSnapshot;
        });
      }
    });
  }

  clicked($event) {
    this.topicService.findOrCreateTopicAfterName(this.NewTopicName).then(topic => {
      this.userService.findCurrentUser().then(user => {
        this.imageService.submitNewDrawing(this.sketchpad.canvas, topic, user).then(message => {
            this.router.navigate(['/feed']);
        });
      });


    });

  }
}

