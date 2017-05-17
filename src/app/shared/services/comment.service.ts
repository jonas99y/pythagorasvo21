import { Injectable } from '@angular/core';
import { Comment, User } from '../models';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { KeyListService } from '../services/key-list.service';


@Injectable()
export class CommentService {

  constructor(private afDb: AngularFireDatabase, private keyListService: KeyListService) { }
  findCommentAfterKey(key: string): FirebaseObjectObservable<Comment> {
    const foundComment: FirebaseObjectObservable<Comment> = <FirebaseObjectObservable<Comment>>this.afDb.object('comments/' + key);
    return foundComment;
  }

  findAllCommentsInList(listKey: string): Observable<Array<FirebaseObjectObservable<Comment>>> {
    let comments: Array<FirebaseObjectObservable<Comment>> = [];
    return Observable.create(observer => {
      this.keyListService.findKeyList(listKey).subscribe(keys => {
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
    this.keyListService.addKeyToList(commentListKey, key);

  }
}
