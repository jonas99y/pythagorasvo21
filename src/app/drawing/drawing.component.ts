import { Component, OnInit, ViewChild } from '@angular/core';
import { SketchpadComponent } from '../sketchpad/components/sketchpad/sketchpad.component';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { TopicService, UserService, ImageService, Topic,User } from '../shared/';

import * as firebase from 'firebase';
@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit {

  @ViewChild('sketchpad') sketchpad: SketchpadComponent;

  public imageName: string;
  private image: string;
  private ref: firebase.storage.Reference;

  constructor(private imageService: ImageService, private topicService: TopicService, private userService: UserService) {
    //dont remove, will break drawing-service;
    console.log(firebase.storage());
    // userService.registerUser(new User(null,"rest","test","teset","tesst"))
  }

  ngOnInit() {
  }

  clicked($event) {
    let topic: FirebaseObjectObservable<Topic> = this.topicService.findTopicAfterKey("mytesttopic")
    this.userService.findCurrentUser().then(user => {
      this.imageService.submitNewDrawing(this.sketchpad.canvas, topic, user);

    })

  }
}

