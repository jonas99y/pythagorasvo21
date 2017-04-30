import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent implements OnInit {

  error: any;
  email: string;
  password: string;

  constructor(public af: AngularFire, private router: Router) {  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: this.email,
        password: this.password
      }).then(
        (success) => {
          this.router.navigate(['/drawing']);
        }).catch(
        (err) => {
          this.error = err;
        });
    }
  }

  ngOnInit() {
  }

}

