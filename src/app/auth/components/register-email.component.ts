import { Component, OnInit } from '@angular/core';
// import { AngularFire } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User, UserService } from '../../shared/';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent implements OnInit {

  error: any;
  user: User;
  email: string;
  password: string;

  constructor(public af: AngularFireAuth, private router: Router, private userService: UserService) {}

  onSubmit(formData) {
    console.log(formData);
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password
      ).then(
        (success) => {
          this.userService.registerUser(new User(null, this.user.firstname, this.user.lastname, 'test', this.af.auth.currentUser.uid));
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

