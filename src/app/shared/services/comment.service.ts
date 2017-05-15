import { Injectable } from '@angular/core';
import { Comment, User } from '../models';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Injectable()
export class CommentService {

  constructor(private afDb: AngularFireDatabase) { }
  findCommentAfterKey(key: string): FirebaseObjectObservable<Comment> {
    const foundImage: FirebaseObjectObservable<Comment> = <FirebaseObjectObservable<Comment>>this.afDb.object('comments/' + key);
    return foundImage;
  }

  findAllCommentsInList(listKey: string): Observable<Array<FirebaseObjectObservable<Comment>>> {
    let comments: Array<FirebaseObjectObservable<Comment>> = [];

    return Observable.create(observer => {
      let commentList = this.afDb.object("commentLists/" + listKey);
      commentList.subscribe(x => {
        comments.splice(0, comments.length);
        for (let commentKey in x) {
          comments.push(this.findCommentAfterKey(commentKey));
        }
      })
      observer.next(comments);
    });

  }
  addComment(message: string, user: FirebaseObjectObservable<User>, commentListKey: string) {
    const comment = new Comment(user.$ref.key, Date.now(), message);

    const updates = {};
    updates[this.afDb.list("comments").push(comment).key] = true;
    this.afDb.object("commentLists/" + commentListKey).update(updates);
  }
}
