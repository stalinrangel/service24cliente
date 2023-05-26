import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { StorageService } from '../../services/storage/storage.service';
import { environment } from '../../environments/environment';

export class ChatMessage {
  id: number;
  emisor_id: number;
  userAvatar: string;
  nameAvatar: string;
  receptor_id: number;
  created_at: number | string;
  msg: string;
  status: number;
}

export class UserInfo {
  id: number;
  avatar?: string;
  nameAvatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

	public datos: any;
	public mensajes: any = [];

	constructor(public http: HttpClient, public storage: StorageService) {
		console.log('Hello ChatServiceProvider Provider');
	}

	mockNewMsg(msg) {
	    const mockMsg: ChatMessage = {
	      id: Date.now(),
	      emisor_id: 2329382,
	      nameAvatar: msg.nombre,
	      userAvatar: msg.toUserAvatar,
	      receptor_id: 232323,
	      created_at: Date.now(),
	      msg: msg.message,
	      status: 1
	    };
	}

	getMsgList(chat_id): Observable<ChatMessage[]> {
		return Observable.create(observer => {
			this.storage.get('TUSV24').then(items => {
	  			if (items != '' && items != null) {
	  				this.http.get('${environment.api}blogs/'+chat_id+'?token='+items)
				    .toPromise()
				    .then(
					data => {
						console.log(data);
						this.datos = data;
						this.mensajes = this.datos.blog.msgs;
						for (var i = 0; i < this.mensajes.length; ++i) {
							this.mensajes[i].userAvatar = this.mensajes[i].usuario.imagen;
							this.mensajes[i].emisor_id = this.mensajes[i].usuario.id;
							this.mensajes[i].nameAvatar = this.mensajes[i].usuario.nombre;
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
 		});
	}

	sendMsg(msg: ChatMessage) {
		return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
		.then(() => this.mockNewMsg(msg));
	}

	getUserInfo(usuario): Promise<UserInfo> {
		const userInfo: UserInfo = {
		  id: usuario.id,
		  avatar: usuario.imagen,
		  nameAvatar: usuario.nombre
		};
		return new Promise(resolve => resolve(userInfo));
	}

}