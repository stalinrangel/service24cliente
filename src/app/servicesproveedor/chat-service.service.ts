import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

export class ChatMessage {
  id:any;
  emisor_id: number=0;
  userAvatar: string='';
  receptor_id: number=0;
  created_at: number | string='';
  updated_at: number | string='';
  msg: string='';
  status: number=0;
  message:any='';
}

export class UserInfo {
  id: any;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  public datos: any;
	public mensajes: any = [];

	constructor(public http: HttpClient, public storage: StorageService) {
		console.log('Hello ChatServiceProvider Provider');
	}

	mockNewMsg(msg: ChatMessage) {
	    const mockMsg: ChatMessage = {
        id: moment().format(),
        emisor_id: 2329382,
        userAvatar: msg.userAvatar,
        receptor_id: 232323,
        created_at: moment().format(),
		updated_at:'',
        msg: msg.message,
        status: 1,
        message: ''
      };
	}

	getMsgList(chat_id: string): Observable<ChatMessage[]> {
		return Observable.create((observer: { next: (arg0: any) => void; complete: () => void; error: (arg0: any) => void; }) => {
			let items:any=this.storage.get('TRPSV24');
	  			if (items != '' && items != null) {
	  				this.http.get(`${environment.api}chats/repartidores/`+chat_id+`?token=`+items)
				    .toPromise()
				    .then(
					data => {
						this.datos = data;
						this.mensajes = this.datos.chat.mensajes;
						for (var i = 0; i < this.mensajes.length; ++i) {
							this.mensajes[i].userAvatar = this.mensajes[i].emisor.imagen;
						}
						observer.next(this.mensajes);
						observer.complete();
					},
					msg => {
						observer.error(msg.error);
						observer.complete();
					}); 
			  	};
			});
	}

	getMsgListP(chat_id: string): Observable<ChatMessage[]> {
		console.log(chat_id); 
		return Observable.create((observer: { next: (arg0: any) => void; complete: () => void; error: (arg0: any) => void; }) => {
			let items:any=this.storage.get('TRPSV24');
	  			if (items != '' && items != null) {
	  				this.http.get(`${environment.api}chats/pedidos/`+chat_id+`?token=`+items)
				    .toPromise()
				    .then(
					data => {
						this.datos = data;
						this.mensajes = this.datos.chat.mensajes;
						console.log(this.mensajes); 
						for (var i = 0; i < this.mensajes.length; ++i) {
							this.mensajes[i].userAvatar = this.mensajes[i].emisor.imagen;
						}
						observer.next(this.mensajes);
						observer.complete();
					},
					msg => {
						observer.error(msg.error);
						observer.complete();
					}); 
			  	};
			});
	}

	sendMsg(msg: ChatMessage) {
		return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
		.then(() => this.mockNewMsg(msg));
	}

	getUserInfo(usuario:any): Promise<UserInfo> {
		const userInfo: UserInfo = {
		  id: usuario.id,
		  avatar: usuario.imagen
		};
		return new Promise(resolve => resolve(userInfo));
	}
}
