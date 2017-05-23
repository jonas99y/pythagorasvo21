import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ImageService, UserService, Image, User } from '../shared/';
import { Observable, Observer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public images: Observable<Array<FirebaseObjectObservable<Image>>>;
    public user: Observable<User>;

    private sub: any;

    constructor(private drawingService: ImageService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
        this.user = Observable.create(obersver => {
            this.userService.findCurrentUser().then(currentUser => {
                currentUser.subscribe(user => {
                    obersver.next(user);

                });


            });
        });
    }

    ngOnInit() {

        // this.sub = this.route.params.subscribe(params => {
        //   this.user = this.userService.findUserAfterKey(params.userKey);
        //   this.images = this.drawingService.findImagesFromUser(this.user);

        // });

    }

}
