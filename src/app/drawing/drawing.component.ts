import { Component, OnInit, Inject, ViewChild } from '@angular/core';
// import { Sketchpad } from 'responsive-sketchpad';
import { ResponsiveSketchpadComponent } from '../responsive-sketchpad/responsive-sketchpad.component';
import { AngularFire, FirebaseRef } from 'angularfire2';
@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit {

  @ViewChild('sketchpad') sketchpad: ResponsiveSketchpadComponent;

  public lineColor: string;
  public lineSize: number;

  public imageName: string;

  // private pad: Sketchpad;
  private image: string;
  private ref: firebase.storage.Reference;

  constructor(private af: AngularFire, @Inject(FirebaseRef) fb) {
    this.ref = fb.storage().ref();

  }

  handleColorUpdated(event) {
    this.lineColor = event;
  }
  handleSizeUpdated(event) {
    this.lineSize = event;
  }
  handleUnDo(event) {

  }

  ngOnInit() {
    // var Sketchpad = responsiveSketchpad;
    // this.pad.setLineColor('#4CAF50');
  }
  clicked($event) {
    this.saveCanvasToFirebase(this.sketchpad.canvas, 'images/' + this.imageName);

  }
  saveCanvasToFirebase(canvas: HTMLCanvasElement, path: string) {
    let ref = this.ref;
    canvas.toBlob(function (blob) {
      const image = new Image();
      ref.child(path).put(blob);
    });
  }
}
