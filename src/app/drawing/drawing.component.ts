import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { SketchpadComponent } from '../sketchpad/components/sketchpad/sketchpad.component';
import { AngularFire, FirebaseRef } from 'angularfire2';

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

  constructor(private af: AngularFire, @Inject(FirebaseRef) fb) {
    console.log(fb);
    this.ref = fb.storage().ref();
    console.log(this.ref);

  }

  ngOnInit() {
  }

  clicked($event) {
    this.saveCanvasToFirebase(this.sketchpad.canvas, 'images/' + this.imageName, this.ref);

  }
  saveCanvasToFirebase(canvas: HTMLCanvasElement, path: string, ref: firebase.storage.Reference) {
    canvas.toBlob(function (blob) {
      const image = new Image();
      ref.child(path).put(blob);
    });
  }
}
