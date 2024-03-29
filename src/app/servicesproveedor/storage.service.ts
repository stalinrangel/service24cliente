
import { Injectable } from '@angular/core';

export interface Item {
  id: number,
  title: string,
  modified: number
}

const ITEMS_KEY = 'recent';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private key: string="service-auth";
  constructor() { }

  /*addRecent(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  };

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
    
  }*/
  
  get(key:any): Promise<any> {
    let data:any;
    data=localStorage.getItem(key);
    return data;
  }

  set(key:any, value:any) {
    localStorage.setItem(key, value);
  }

  getObject(key:any) {
    let val=localStorage.getItem(key);
    let returnValue;
    
    if(val) {
        returnValue = JSON.parse(val);
    } else {
        returnValue = null;
      }
    return returnValue;
  }
  
  setObject(key:any, value:any) {
    console.log(value)
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  remove(key:any) {
    localStorage.removeItem(key);
  }
}
