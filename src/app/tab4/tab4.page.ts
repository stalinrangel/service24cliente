import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { StorageService } from 'src/services/storage/storage.service';
import { UserService } from 'src/services/user/user.service';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';
import { Router } from '@angular/router';
//import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @ViewChild('search', {static: true}) search: ElementRef = new ElementRef(null);
  @ViewChild('enx', {static: true}) enx: ElementRef | any;

  searchText: string = "";
  alturaPantalla: any;
  alturaSearch:any;
  alturaX:any;
  altura:any;

  constructor(
    public navCtrl: NavController,  
    private alertController: AlertController, 
    private loadingController: LoadingController, 
    private builder: FormBuilder, 
    private toastController: ToastController, 
    public userService: UserService, 
    public storage: StorageService, 
    private objService: ObjectserviceService,
    private router: Router,
  ) {	  
    console.log(this.router.url);
    this.objService.setruta(this.router.url);
  }

  ngOnInit() {
    this.alturaPantalla = window.innerHeight;
    this.alturaSearch = document.getElementById("search")?.offsetHeight;
    this.alturaX = 91;
    this.altura=this.alturaPantalla-this.alturaSearch-this.alturaX-230;
    console.log(this.altura)
    this.initForm(); 
  }
  
  ionViewWillEnter() { 
    this.initForm();
  }
  ionPageWillLeave() {
    this.initForm();
    this.objService.setruta('detail-order');
    }
  usuario:any;
  chats:any=[];
  initForm() {
    let self=this;
    let items:any=this.storage.getObject('userSV24');
    this.storage.getObject('userSV24').then(items => {
			if (items != '' && items != null) {
        console.log(items)
				this.usuario = items;
        this.userService.getChats(items.id).subscribe({
          next(data: any){
            console.log(data);
            self.chats=data.chat;
           
            //alert(JSON.stringify(data))
            for (let i = 0; i < self.chats.length; i++) {
              self.chats[i].tam=self.chats[i].mensajes.length;
            
            }
            console.log(self.chats)
          },error(err: any){
              console.log(err)
          }
          });
			}
		  });
   
  }

  get filteredItems() {
    //return this.chats;
    return this.chats.filter((item: { repartidor: any; }) => item.repartidor.nombre.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  getChat(chat:any){
    console.log(chat)
    chat.chat_id=chat.pedido_id;
    let data={
      obj:JSON.stringify(chat)
    };
    if (chat.pedido.estado==2) {
      /*this.navCtrl.navigateForward('/tabs/tab1');//creado
      setTimeout(() => {
        this.objService.setCreado(data);
        }, 100);*/
        alert('Tienes que aceptarlo para ver los mensajes');
    }else if (chat.pedido.estado==3) {
      this.navCtrl.navigateForward('/tabs/tab2'); //chat pedido
      setTimeout(() => {
        this.objService.setchatpedido(data);
        }, 100);
    }else if (chat.pedido.estado==4) {
      alert('El pedido ya finalizó.');
    }else if (chat.pedido.estado==5) {
      alert('Pedido cancelado.');
    }
    
  }

}
