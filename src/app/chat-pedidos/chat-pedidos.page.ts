import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, IonContent, ModalController } from '@ionic/angular';
import { ChatServiceService, ChatMessage, UserInfo } from "../../services/chat-service/chat-service.service";
//import { OneSignal } from '@ionic-native/onesignal';
import { StorageService } from '../../services/storage/storage.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotificationsComponent } from '../notifications/notifications.component';

import * as moment from 'moment';
@Component({
  selector: 'app-chat-pedidos',
  templateUrl: './chat-pedidos.page.html',
  styleUrls: ['./chat-pedidos.page.scss'],
})
export class ChatPedidosPage implements OnInit {

  @ViewChild(IonContent) content: any;
	@ViewChild('chat_input') messageInput: any;
	msgList: ChatMessage[] = [];
	user: any;
	toUser: any;
	editorMsg = '';
	loading: any;
	showEmojiPicker = false;
	avatarRecep: any;
	public show_notify: boolean = false;

	public usuario: any;
	public data: any;
	public datos: any;
	public admin_id: string = '';
	public chat_id: string = '';
	public token_notificacion: string = '';
	public send_msg = {
		emisor_id: 0,
	  	receptor_id: 0,
	  	msg: '',
	  	emisor: 'cliente',
	  	token_notificacion: '',
	  	token: '',
	  	pedido_id: '',
	  	ciudad_id: '',
	  	created_at: ''
	}

  constructor(
  	public navCtrl: NavController,  
	private storage: StorageService, 
	//public events: Events,
	private objService: ObjectserviceService,
	public chatService: ChatServiceService,
	public cdr: ChangeDetectorRef,
	public loadingController: LoadingController,
	public http: HttpClient,
	public zone: NgZone,
	public modalController: ModalController
  ) { 
  	this.data = this.objService.getExtras();
  	this.admin_id = this.data.usuario_id;
  	this.chat_id = this.data.id;
  	this.token_notificacion = this.data.token_notificacion;  
    this.storage.getObject('userSV24').then(items => {
		if (items != '' && items != null) {
			this.usuario = items;
			this.chatService.getUserInfo(this.usuario)
		    .then((res) => {
		      this.user = res
		    });
		}
    });
    this.toUser = {
      id: this.admin_id
    };
    /*this.events.subscribe('chatPedido:received', msg => {
		let newMsg: ChatMessage = {
		  id: moment().format(),
		  emisor_id: parseInt(this.toUser.id),
		  userAvatar: this.avatarRecep,
		  receptor_id: parseInt(this.user.id),
		  created_at: moment().format(),
		  msg: msg.msg,
		  status: 2
		};
		this.pushNewMsg(newMsg);
		this.cdr.detectChanges();
	});*/
	this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }
    });
  }

  ngOnInit() {
  }

    ionViewWillLeave() {
		//this.events.unsubscribe('chatPedido:received');
	}

	ionViewDidEnter() {
		if (this.chat_id != '') {
			this.msgList = [];
			this.showLoading('Cargando conversación');
			this.getMsg();
		}		
	}

	getMsg() {
	    return this.chatService.getMsgListP(this.chat_id
	    	).subscribe(res => {
	        this.msgList = res;
	        this.scrollToBottom();
	        this.loading.dismiss();
	        let index1 = this.msgList.findIndex((item1) => item1.emisor_id === this.toUser.id);
			if(index1 !== -1){
				this.avatarRecep = this.msgList[index1].userAvatar;
			}
	    },(error)=>{
	    	this.loading.dismiss();
	    });
	}

	onFocus() {
		this.scrollToBottom();
	}

	sendMsg() {
		if (!this.editorMsg.trim()) return;
		
		let newMsg: ChatMessage = {
		  id: moment().format(),
		  emisor_id: parseInt(this.user.id),
		  userAvatar: this.user.avatar,
		  receptor_id: parseInt(this.toUser.id),
		  created_at: moment().format(),
		  msg: this.editorMsg,
		  status: 1
		};

		this.pushNewMsg(newMsg);
		this.chatService.sendMsg(newMsg).then(() => {})
		this.sendMsgServer(this.editorMsg,newMsg.id);
		this.editorMsg = '';		 
	}

	sendMsgServer(msg:any,id:any){
		this.send_msg.emisor_id = parseInt(this.usuario.id);
		this.send_msg.receptor_id = parseInt(this.admin_id);
		this.send_msg.msg = msg;
		this.send_msg.token_notificacion = this.token_notificacion;
		this.send_msg.pedido_id = this.chat_id;
		this.send_msg.ciudad_id = this.data.ciudad_id;
		this.send_msg.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
		this.storage.get('TUSV24').then(items => {
  			if (items != '' && items != null) {
  				this.send_msg.token = items;
  				this.http.post(`${environment.api}chats/pedidos/mensaje`, this.send_msg)
			    .toPromise()
			    .then(
				data => {	
					let index = this.getMsgIndexById(id);
					if (index !== -1) {
					  this.msgList[index].status = 2;
					}
				},
				msg => {
					console.log(msg);
					let index = this.getMsgIndexById(id);
					if (index !== -1) {
					  this.msgList[index].status = 2;
					}
				}); 
		  	};
		});
	}

	pushNewMsg(msg: ChatMessage) {
		const userId = parseInt(this.user.id),
		toUserId = parseInt(this.toUser.id);
		
		if (msg.emisor_id === userId && msg.receptor_id === toUserId) {
		  this.msgList.push(msg);
		} else if (msg.receptor_id === userId && msg.emisor_id === toUserId) {
		  this.msgList.push(msg);
		}
		this.scrollToBottom();
	}

	getMsgIndexById(id: string) {
		return this.msgList.findIndex(e => e.id === id)
	}

	scrollToBottom() {
		this.zone.run(() => {
	      setTimeout(() => {
	        this.content.scrollToBottom(300);
	      });
	    });
	}

	private setTextareaScroll() {
		const textarea = this.messageInput.nativeElement;
		textarea.scrollTop = textarea.scrollHeight;
	}

	async showLoading(text:any) {
	    this.loading = await this.loadingController.create({
		  spinner: 'dots',
		  duration: 15000,
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});
		return await this.loading.present();
	}

	async viewNotification() {
	    const modal = await this.modalController.create({
	      component: NotificationsComponent
	    });
	    modal.onDidDismiss().then((close)=> { 
	    	this.show_notify = false;   
	    });
	    return await modal.present();  
	}

}
