import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ImageService,UserService, Image, User } from '../shared/';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public images: Observable<Array<FirebaseObjectObservable<Image>>>;

  constructor(private drawingService: ImageService, private userService:UserService) {
    userService.findCurrentUser().then(user=>{
      this.images = drawingService.findImagesFromUser(user);
    });
   }

  ngOnInit() {
  }

}
