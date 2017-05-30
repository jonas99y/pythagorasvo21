import { Injectable } from '@angular/core';
import { DBHelperService } from './db-helper.service';
import { Group, User } from '../models';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class GroupService {

  constructor(private dbHelperService: DBHelperService) { }


  findGroupAfterKey(key: string): FirebaseObjectObservable<Group> {
    return this.dbHelperService.findInNodeAfterKey("groups", key);
  }

  findAllUsersInGroup(group: FirebaseObjectObservable<Group>): Promise<FirebaseListObservable<User>> {
    const promise = new Promise((resolve, reject) => {
      group.subscribe(groupSnapshot => {
        resolve(this.dbHelperService.findKeyList(groupSnapshot.users));
      });
    });
    return promise;
  }

  addUserToGroup(group: FirebaseObjectObservable<Group>, user: FirebaseObjectObservable<Group>): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      group.subscribe(groupSnapshot => {
        this.dbHelperService.addKeyToList(groupSnapshot.users, user.$ref.key);
        resolve();
      });
    });
    return promise;
  }
}
