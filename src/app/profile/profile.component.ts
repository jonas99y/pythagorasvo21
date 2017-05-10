import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { DrawingService } from '../services';
import {Drawing,User } from '../model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public drawings:Array<FirebaseObjectObservable<Drawing>>;

  constructor(private drawingService: DrawingService) {
    this.drawings = drawingService.findDrawingsFromUser(new User(["-Kjma6bDYFDSwYIwVGg4", "-Kjma6bDYFDSwYIwVGg4"],"jonas"));
    console.log(this.drawings);
   }

  ngOnInit() {
  }

}
