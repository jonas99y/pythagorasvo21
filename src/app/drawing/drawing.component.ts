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

  public imageName: string;
  private image: string;
  private ref: firebase.storage.Reference;

  constructor(private af: AngularFire, @Inject(FirebaseRef) fb) {
    this.ref = fb.storage().ref();

  }

  ngOnInit() {
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