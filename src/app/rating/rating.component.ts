import { Component, OnInit, Input } from '@angular/core';
import { UserService, RatingService, Rating } from '../shared';
import { FirebaseObjectObservable } from 'angularfire2/database';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {


  public chars: Array<string>;
  public rating: FirebaseObjectObservable<Rating>;
  @Input('ratingKey') ratingKey: string;
  constructor(private userService: UserService, private ratingService: RatingService) { }

  ngOnInit() {
    this.chars = this.ratingService.ratingChars;
    this.rating = this.ratingService.findRatingAfterKey(this.ratingKey);
  }

  vote(char: string) {
    this.userService.findCurrentUser().then(user => {
      this.ratingService.addRating(user, char, this.ratingKey);
    });
  }

}
