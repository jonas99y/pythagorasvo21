import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SketchpadComponent } from '../sketchpad/components/sketchpad/sketchpad.component';
import {AngularFireDatabase} from 'angularfire2/database';
import {DrawingService} from '../services/drawing-service.service';
// import { AngularFire, FirebaseRef } from 'angularfire2';

import * as firebase from 'firebase/app';
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

  constructor(private drawingService:DrawingService) {

    // this.ref = firebase.storage().ref();

  }

  ngOnInit() {
  }

  clicked($event) {
    this.drawingService.uploadImage(this.sketchpad.canvas, 'images/' + this.imageName)
   
  }
  
}
