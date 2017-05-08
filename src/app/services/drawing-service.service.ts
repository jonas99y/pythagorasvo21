import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from 'angularfire2';
import { Topic, Drawing } from '../model';

@Injectable()
export class DrawingService {

  private ref: firebase.database.Reference;
  private drawingRef: firebase.database.Reference;
  constructor( @Inject(FirebaseRef) fb, private db: AngularFireDatabase) {
    this.ref = fb.database().ref();
    this.drawingRef = fb.database().ref('/drawings');
  }

  findDrawingAfterKey(key: string): FirebaseObjectObservable<Drawing> {
    const foundDrawing: FirebaseObjectObservable<Drawing> = <FirebaseObjectObservable<Drawing>>this.db.object(this.drawingRef + '/' + key);
    return foundDrawing;
  }

  addDrawing(drawing: Drawing): FirebaseObjectObservable<Drawing> {
    const newPushKey: string = this.drawingRef.push().key;
    const updates = {};
    updates["/drawings/" + newPushKey] = drawing;

    this.ref.update(updates);
    return this.findDrawingAfterKey(newPushKey);
  }
}