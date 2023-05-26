import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectserviceService {

	extras: any;
	category: any;

	constructor() { }

	public setExtras(data:any){
		this.extras = data;
	}

	public getExtras(){
		return this.extras;
	}

	public setCat(data:any){
		this.category = data;
	}

	public getCat(){
		return this.category;
	}
}
