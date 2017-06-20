import { Component, OnInit } from '@angular/core';
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
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(public af: AngularFireAuth, private router: Router, private userService: UserService) { }

  onSubmit(formData) {
    console.log(formData);
    const self = this;
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password
      ).then(
        (success) => {
          this.userService.registerUser(new User(null, self.firstname, self.lastname, self.af.auth.currentUser.uid, null, null, null));
          this.router.navigate(['/feed']);
        }).catch(
        (err) => {
          this.error = err;
        });
    }
  }

  ngOnInit() {
  }

}

