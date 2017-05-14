import { Component, OnInit, Input } from '@angular/core';
import { UserService, RatingService } from '../shared'

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input('ratingKey') ratingKey: string;
  constructor(private userService: UserService, private ratingService: RatingService) { }

  ngOnInit() {
  }

  vote(char: string) {
    this.userService.findCurrentUser().then(user => {
      this.ratingService.addRating(user, char, this.ratingKey);
    });
  }

}
