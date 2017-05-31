import { Injectable } from '@angular/core';
import { DBHelperService } from './db-helper.service';
import { Group, User } from '../models';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class GroupService {

  constructor(private dbHelperService: DBHelperService, private afDb: AngularFireDatabase) { }


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

  createNewGroup(groupName: string, groupAdmin: FirebaseObjectObservable<User>): Promise<FirebaseObjectObservable<Group>> {
    const promise = new Promise((resolve, reject) => {
      const usersKey = this.dbHelperService.addKeyToList(null, groupAdmin.$ref.key);
      resolve(this.findGroupAfterKey(this.afDb.list("/groups")
      .push({ name: groupName, users: usersKey, topics: this.dbHelperService.getNewPushKey() }).key));

    });


    return promise;

  }

  addUserToGroup(group: FirebaseObjectObservable<Group>, user: FirebaseObjectObservable<User>): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      group.subscribe(groupSnapshot => {
        this.dbHelperService.addKeyToList(groupSnapshot.users, user.$ref.key);
        user.subscribe(userSnapshot => {
          // not sure if this works!
          userSnapshot.groups = this.dbHelperService.addKeyToList(userSnapshot.groups, group.$ref.key);
          user.set(userSnapshot);
          resolve();
        });
      });
    });
    return promise;
  }
}
