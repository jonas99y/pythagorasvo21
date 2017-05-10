import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {

  error: any;
  email: string;
  password: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(authstate => {
      if (authstate) {
        this.router.navigateByUrl('/drawing');
      }
    });
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(
        formData.value.email, formData.value.password
      ).then(
        (success) => {
          console.log(success);
          // this.router.navigate(['/drawing']);
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
