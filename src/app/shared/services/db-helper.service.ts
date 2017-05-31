import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
@Injectable()
export class DBHelperService {

  constructor(private afDb: AngularFireDatabase) { }

  findKeyList(key: string): FirebaseListObservable<any[]> {
    return this.afDb.list('keyLists/' + key);
  }

  getNewPushKey(): string {
    return this.afDb.database.ref().push().key;
  }

  /** Uses and returns a new listKey if the provided one is null, empty or undefined */
  addKeyToList(listKey: string, key: string): string {
    const updates = {};
    updates[key] = true;
    if (listKey == null || listKey === '' || listKey === undefined) {
      listKey = this.getNewPushKey();
    }
    this.afDb.object('keyLists/' + listKey).update(updates);
    return listKey;
  }
  removeKeyFormList(listKey: string, key: string) {
    this.afDb.list('keyList/' + listKey).remove(key);
  }
  findInNodeAfterKey<T>(node: string, key: string): FirebaseObjectObservable<T> {
    if (key === undefined) {
      return undefined;
    }
    if (!node.startsWith('/')) {
      node = '/' + node;
    }

    return this.afDb.object(node + '/' + key);
  }

}
