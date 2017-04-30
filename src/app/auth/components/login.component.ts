import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;
  redirectRoute = '/drawing';

  constructor(public af: AngularFire, private router: Router) {

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl(this.redirectRoute);
      }
    });
  }

  loginFaceBook() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.router.navigate([this.redirectRoute]);
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  loginGitHub() {
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.router.navigate([this.redirectRoute]);
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.router.navigate([this.redirectRoute]);
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  ngOnInit() {
  }

}
