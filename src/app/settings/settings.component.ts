import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  public signOut() {
    this.userService.signOut().then(a => {
      this.router.navigate(['/']);
    }
    );
  }
}
