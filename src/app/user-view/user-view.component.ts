import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ImageService, UserService, Image, User } from '../shared/';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  public images: Observable<Array<FirebaseObjectObservable<Image>>>;
  public user: FirebaseObjectObservable<User>;

  private sub: any;

  constructor(private drawingService: ImageService, private userService: UserService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.user = this.userService.findUserAfterKey(params.userKey);
      this.images = this.drawingService.findImagesFromUser(this.user);

    });
  }

}
