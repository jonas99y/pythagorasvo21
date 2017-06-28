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
    return Observable.create(observer => {
      const array = new Array<FirebaseObjectObservable<any>>();
      const keylist = this.findKeyList(key);
      keylist.subscribe(keyListSnapshot => {
        array.splice(0, array.length);
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
    this.afDb.list('keyLists/' + listKey).remove(key);
  }
  findInNodeAfterKey<T>(node: string, key: string): FirebaseObjectObservable<T> {
    if (key === undefined) {
      return undefined;
    }
    node = this.sanitizeNodeString(node);

    return this.afDb.object(node + '/' + key);
  }

  findFirstInNodeAfterQuery<T>(node: string, query: object): Promise<FirebaseObjectObservable<T>> {
    const promise = new Promise((resolve, reject) => {
      let items: any = this.findAllObjectsAfterQuery(node, query);
      items.subscribe(itemsSnapshot => {
        if (itemsSnapshot.length === 0) {
          resolve(undefined);
        } else {
          resolve(this.findInNodeAfterKey(node, itemsSnapshot[0].$key));
        }

      });
    });
    return promise;
  }

  findAllObjectsAfterQuery<T>(node: string, query: object): FirebaseListObservable<T[]> {
    node = this.sanitizeNodeString(node);
    return this.afDb.list(node, query);

  }


  private sanitizeNodeString(node: string): string {
    let newNode = "";
    if (!node.startsWith('/')) {
      newNode = '/';
    }
    return newNode + node;
  }

}
