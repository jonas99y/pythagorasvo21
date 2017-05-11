import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth, private http:Http) { }

  findUserAfterKey(key: string): FirebaseObjectObservable<User> {
    const foundUser: FirebaseObjectObservable<User> = <FirebaseObjectObservable<User>>this.afDb.object('users/' + key);
    return foundUser;
  }

  findCurrentUser(): Promise<FirebaseObjectObservable<User>> {
    const uid = this.afAuth.auth.currentUser.uid;
    const promise = new Promise<FirebaseObjectObservable<User>>((resolve, reject) => {
      this.afDb.object("/userUIDs/" + uid).subscribe(x => {
        console.log(x);
        resolve(this.findUserAfterKey(x.$value))
      });
    });



    return promise;

  }


  registerUser(user: User) {
    console.log("test");
    this.http.get("https://us-central1-pythagorasvo21.cloudfunctions.net/registerUser",user).subscribe(x=>console.log(x))
     console.log("test");
  }


}
