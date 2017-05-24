import { Injectable } from '@angular/core';
import { Comment, User } from '../models';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { DBHelperService } from '../services/db-helper.service';


@Injectable()
export class CommentService {

  constructor(private afDb: AngularFireDatabase, private dbHelperService: DBHelperService) { }
  findCommentAfterKey(key: string): FirebaseObjectObservable<Comment> {
    return this.dbHelperService.findInNodeAfterKey("comments", key);
  }

  findAllCommentsInList(listKey: string): Observable<Array<FirebaseObjectObservable<Comment>>> {
    let comments: Array<FirebaseObjectObservable<Comment>> = [];
    return Observable.create(observer => {
      this.dbHelperService.findKeyList(listKey).subscribe(keys => {
        comments.splice(0, comments.length);
        keys.forEach(key => {
          comments.push(this.findCommentAfterKey(key.$key));
        });
      });
      observer.next(comments);
    });
  }
  addComment(message: string, user: FirebaseObjectObservable<User>, commentListKey: string) {
    const comment = new Comment(user.$ref.key, Date.now(), message);
    const key = this.afDb.list("comments").push(comment).key;
    this.dbHelperService.addKeyToList(commentListKey, key);

  }
}
