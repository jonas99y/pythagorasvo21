import { Component, OnInit, Input } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { CommentService, UserService } from '../../services';
import { Comment } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  private commentKey: string;
  @Input('commentKey') set CommentKey(key: string) {
    if (key != null) {

      this.comments = this.commentService.findAllCommentsInList(key);
      this.commentKey = key;

    }
  };

  public commentText: string;
  public comments: Observable<Array<FirebaseObjectObservable<Comment>>>;
  constructor(public commentService: CommentService, private userService: UserService) { }
  ngOnInit() {

  }
  onComment() {
    this.userService.findCurrentUser().then(user => {
      this.commentService.addComment(this.commentText, user, this.commentKey);
      this.commentText = "";
    });
  }

}
