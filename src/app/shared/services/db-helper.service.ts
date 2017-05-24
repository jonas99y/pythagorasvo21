import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
@Injectable()
export class DBHelperService {

  constructor(private afDb: AngularFireDatabase) { }

  findKeyList(key: string): FirebaseListObservable<any[]> {
    return this.afDb.list("keyLists/" + key);
  }
  addKeyToList(listKey: string, key: string) {
    const updates = {};
    updates[key] = true;
    this.afDb.object("keyLists/" + listKey).update(updates);
  }
  removeKeyFormList(listKey: string, key: string) {
    this.afDb.list("keyList/" + listKey).remove(key);
  }
  findInNodeAfterKey<T>(node: string, key: string): FirebaseObjectObservable<T> {
    if (key == undefined) {
      return undefined;
    }
    if (!node.startsWith('/')) {
      node = '/' + node
    }

    return this.afDb.object(node + "/" + key);
  }

}
