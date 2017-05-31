import { Component, OnInit, ViewChild } from '@angular/core';
import { SketchpadComponent } from '../sketchpad/components/sketchpad/sketchpad.component';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { TopicService, UserService, ImageService, Topic, User, GroupService } from '../shared/';

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

  constructor(private imageService: ImageService, private topicService: TopicService, private userService: UserService, private groupService: GroupService) {
    //dont remove, will break drawing-service;
    console.log(firebase.storage());
    //userService.registerUser(new User(null,"Fabio","Zuber","TRtODRQVUvMJuBTGgzfjYRjBxYk1"))
  }

  ngOnInit() {
    //old testing code

    // this.userService.findCurrentUser().then(currentuser => {
    //   this.groupService.createNewGroup("swegas", currentuser).then(ngroup => {
    //     this.groupService.addUserToGroup(ngroup, this.userService.findUserAfterKey("-Kkbui8oopzw-Zy31so1"));
    //     this.topicService.assignNewTopicToGroup("de pythagoras vo 21",ngroup);
    //   });
    // }
    // );
  }

  clicked($event) {
    this.topicService.findOrCreateTopicAfterName(this.NewTopicName).then(topic => {
      this.userService.findCurrentUser().then(user => {
        this.imageService.submitNewDrawing(this.sketchpad.canvas, topic, user);
      });


    });

  }
}

