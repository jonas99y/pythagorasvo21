import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class KeyListService {

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

}
