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

  public IsTopicGiven:boolean;
  public imageName: string;
  public Topic: FirebaseObjectObservable<Topic>;
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
        this.Topic = this.topicService.findTopicAfterKey(paramsSnapshot.topicKey);
        this.IsTopicGiven = true;
      }
    });
  }

  private getTopic(): Promise<FirebaseObjectObservable<Topic>> {
    const promise = new Promise((resolve, reject) => {
      if (this.Topic === undefined) {
        this.topicService.findOrCreateTopicAfterName(this.NewTopicName).then(topic => { resolve(topic); });
      } else {
        resolve(this.Topic);
      }
    });
    return promise;

  }
  clicked($event) {
    this.getTopic().then(topic => {
      console.log(topic.$ref.key);
      this.userService.findCurrentUser().then(user => {
        this.imageService.submitNewDrawing(this.sketchpad.canvas, topic, user).then(message => {
          this.router.navigate(['/feed']);
        });
      });


    });

  }
}

