import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ImageService, UserService, Image, User } from '../shared/';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit, OnChanges {

  public images: Observable<Array<FirebaseObjectObservable<Image>>>;
  public user: FirebaseObjectObservable<User>;

  @Input("userKey") userKey: string;

  ngOnChanges(changes: SimpleChanges) {

    this.user = this.userService.findUserAfterKey(this.userKey);
    if (this.user !== undefined) {
      this.images = this.drawingService.findImagesFromUser(this.user);
    }
  }

  private sub: any;

  constructor(private drawingService: ImageService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.userKey == null) {
      this.sub = this.route.params.subscribe(params => {

        this.user = this.userService.findUserAfterKey(params.userKey);
        this.images = this.drawingService.findImagesFromUser(this.user);

      });
    }
  }

}
