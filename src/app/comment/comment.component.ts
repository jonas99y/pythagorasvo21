import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Comment, CommentService, UserService } from '../shared';
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

  public commentText:string;
  public comments: Observable<Array<FirebaseObjectObservable<Comment>>>;
  constructor(public commentService: CommentService, private userService:UserService) { }
  ngOnInit() {

  }
  onComment(commentForm){
    this.userService.findCurrentUser().then(user=>{
      this.commentService.addComment(this.commentText, user,this.commentKey);

    })
  }

}
