import { Component, OnInit, Input } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../../models';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  @Input() public user: FirebaseObjectObservable<User>;


  constructor() { }

  ngOnInit() {
  }

}
