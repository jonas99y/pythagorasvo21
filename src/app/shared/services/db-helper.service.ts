import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
@Injectable()
export class DBHelperService {

  constructor(private afDb: AngularFireDatabase) { }

  push(path: string, object: any): FirebaseObjectObservable<any> {
    return this.afDb.object(path + '/' + this.afDb.list(path).push(object).key);
  }

  findKeyList(key: string): FirebaseListObservable<any[]> {
    return this.afDb.list('keyLists/' + key);
  }

  findAllObjectsFromKeyList(key: string, path: string): Observable<Array<FirebaseObjectObservable<any>>> {
    const array = new Array<FirebaseObjectObservable<any>>();
    return Observable.create(observer => {
      const keylist = this.findKeyList(key);
      keylist.subscribe(keyListSnapshot => {
        keyListSnapshot.forEach(item => {
          array.push(this.findInNodeAfterKey(path, item.$key));
        });
        observer.next(array);
      });
    });
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
