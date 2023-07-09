import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectserviceService {
	
	unsuscribe() {
		//throw new Error('Method not implemented.');
	}

	extras: any;
	category: any;
	user: any;
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

	private userSubject = new Subject<any>();

	setUser(data: any) {
	this.userSubject.next(data);
	}

	getUser(): Subject<any> {
	return this.userSubject;
	}

	private tab2 = new Subject<any>();

	setTab2(data: any) {
		console.log(data)
		this.tab2.next(data);
	}

	getTab2(): Subject<any> {
		return this.tab2;
	}
}
