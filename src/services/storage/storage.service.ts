import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number,
  title: string,
  modified: number
}

const ITEMS_KEY = 'recent';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private storage= new Storage();
  constructor() {
    this.storage.create();
  }

  /*addRecent(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        for (var i = 0; i < items.length; ++i) {
          if (items[i].title === item.title) {
            items[i].modified = item.modified;
            if (items.length > 4) {
              items.shift();
            }
            return this.storage.set(ITEMS_KEY, items);
          } else {
            items.push(item);
            if (items.length > 4) {
              items.shift();
            }
            return this.storage.set(ITEMS_KEY, items);
          }
        }
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }; */
  addRecent(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        for (var i = 0; i < items.length; ++i) {
          if (items[i].title === item.title) {
            items[i].modified = item.modified;
            if (items.length > 4) {
              items.shift();
            }
            return this.storage.set(ITEMS_KEY, items);
          }
        }
        items.push(item);
        if (items.length > 4) {
          items.shift();
        }
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  deleteRecent(id: number): Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: Item[] = [];
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
  
  get(key:any): Promise<any> {
    return this.storage.get(key);
  }

  set(key:any, value:any) {
    this.storage.set(key, value);
  }

  getObject(key:any) {
    let returnValue;
    return this.storage.get(key).then((val) => {
      if(val) {
        returnValue = JSON.parse(val);
      } else {
        returnValue = null;
      }
    return returnValue;
    });
  }
  
  setObject(key:any, value:any) {
    this.storage.set(key, JSON.stringify(value));
  }
  
  remove(key:any) {
    this.storage.remove(key);
  }
}
