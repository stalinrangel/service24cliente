import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ObjetcserviceService } from '../services/objetcservice.service';
import { AuthService } from '../servicesproveedor/auth.service';
import { UserService } from '../servicesproveedor/user.service';
import { StorageService } from '../servicesproveedor/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab9',
  templateUrl: './tab9.page.html',
  styleUrls: ['./tab9.page.scss'],
})
export class Tab9Page {


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
    private objService: ObjetcserviceService,
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
    this.objService.setruta('detail-order');
    }
  usuario:any;
  chats:any=[];
  initForm() {
    let self=this;
    let items:any=this.storage.getObject('userRPSV24');
			if (items) {
				console.log(items)
				this.usuario = items;
        this.userService.getChats(items.id).subscribe({
          next(data){
            console.log(data);
            self.chats=data.chat;
            let tam=0;
            //alert(JSON.stringify(data))
            for (let i = 0; i < self.chats.length; i++) {
              self.chats[i].tam=self.chats[i].mensajes.length;
              tam=self.chats[i].mensajes.length;
              self.chats[i].ultimo_mensaje=self.chats[i].mensajes[tam-1].created_at;
            }
            self.chats.sort(function(a:any, b:any) {
              a = new Date(a.ultimo_mensaje);
              b = new Date(b.ultimo_mensaje);
              return a > b ? -1 : a < b ? 1 : 0;
            });
            console.log(self.chats)
          },error(err){
              console.log(err)
          }
          });
      }
  }

  get filteredItems() {
    //return this.chats;
    return this.chats.filter((item: { usuario: any; }) => item.usuario.nombre.toLowerCase().includes(this.searchText.toLowerCase()));
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
