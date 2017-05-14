import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import {Comment } from '../shared';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input('commentKey') commentKey: string;

  public comments:Array<FirebaseObjectObservable<Comment>>;
  constructor() { }
  ngOnInit() {
  }

}
