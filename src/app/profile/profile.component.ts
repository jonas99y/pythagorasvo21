import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ImageService, Image, User } from '../shared/';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public drawings: Array<FirebaseObjectObservable<Image>>;

  constructor(private drawingService: ImageService) {
    this.drawings = drawingService.findImagesFromUser(new User(['-Kjma6bDYFDSwYIwVGg4', '-Kjma6bDYFDSwYIwVGg4'],
      'jonas', 'wyss', 'kZ1iMK2mVjP8UaSoP2ZJWxhFCt12'));
    console.log(this.drawings);
   }

  ngOnInit() {
  }

}
