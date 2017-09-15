import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthProvider, AngularFireAuthModule } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User, UserService } from '../../shared/';


import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;
  redirectRoute = '/feed';
  email: string;
  password: string;

  constructor(public afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.afAuth.authState.subscribe(authstate => {
      if (authstate) {
        this.router.navigateByUrl(this.redirectRoute);
      }
    });
  }

  loginFaceBook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      (success) => {
        this.router.navigate([this.redirectRoute]);
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  loginGitHub() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(
      (success) => {
        this.router.navigate([this.redirectRoute]);
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (success) => {
        this.router.navigate([this.redirectRoute]);
      }).catch(
      (err) => {
        this.error = err;
      });
  }


  loginEMail(formData) {
    if (formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(
        formData.value.email, formData.value.password
      ).then(
        (success) => {
          console.log(success);
          this.router.navigate([this.redirectRoute]);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        });
    }
  }

  ngOnInit() {
  }

}
