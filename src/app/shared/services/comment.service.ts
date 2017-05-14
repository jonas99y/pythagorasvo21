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
      comments.splice(0, comments.length);
      let commetnList = this.afDb.list("commentLists/" + listKey).subscribe(comments => {
        for (let commentKey in comments) {
          console.log(commentKey);
          comments.push(this.findCommentAfterKey(commentKey));
          observer.next(comments);
        }
      });


    });
  }
  addComment(message: string, user: FirebaseObjectObservable<User>, commentListKey: string) {
    this.afDb.list("commentLists/" + commentListKey)
    .push(this.afDb.list("comments").push(new Comment(user.$ref.key, new Date(), message)).key);
  }
}
