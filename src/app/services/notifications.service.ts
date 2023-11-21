import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token, } from '@capacitor/push-notifications';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';
import { StorageService } from 'src/services/storage/storage.service';
import { UserService } from 'src/services/user/user.service';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public platform: Platform,private toastController: ToastController,private alertController: AlertController,private storage: StorageService,public userService: UserService,public navCtrl: NavController, private objService: ObjectserviceService) {
    this.inicializar();
   }
  private id:any;
  inicializar(){
    
    if (this.platform.is('capacitor')) {
      PushNotifications.requestPermissions().then(result=>{
        console.log("PushNotifications.request.Permission()");
        if (result) {
          PushNotifications.register();
          this.addListeners();
        }
      })
    }else{
      console.log('no movil')
    }
  }
  error(data:any){
    let datos={
      data: JSON.stringify(data)
    }
   
    this.userService.error(datos).subscribe(
      data => {
        console.log(data)
        
      },
      msg => {
        console.log(msg)
    })
  }
  tkn:any;
  addListeners(){
     // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
        this.error(result);
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      //alert('Push registration success, token: ' + token.value);
      console.log(token);
      let guardar=token.value;
      guardar=guardar.toString();
      //alert(guardar)
      this.tkn=guardar;
      //localStorage.setItem('PushNotifications',guardar);
      //localStorage.setItem('notify_RPSV24',guardar);


    });

    PushNotifications.addListener('registrationError', (error: any) => {
      //alert('Error on registration: ' + JSON.stringify(error));
      this.error(error);
      
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //alert('Push received: ' + JSON.stringify(notification));
        //alert('0');
        this.error(notification);
        
       let self=this;
        this.storage.getObject('userSV24').then(items => {
          console.log(items);
         // alert(JSON.stringify(items))
          self.id=items.id;
          this.id=items.id;
        });

        if (notification.data.accion=='8' || notification.data.accion=='2') {

          this.no(notification.data.accion,notification.data);
          this.registrar_notificacion(notification.data.accion,notification.data.pedido_id,notification.data);
          this.presentToast('Has recibido un mensaje '+notification.data.body);
        }else{
          this.presentConfirm(notification.data.accion,notification.data);
        }
       /*if (notification.data.accion=='7') {
        this.navCtrl.navigateForward('/tabs/tab2');//Aceptado
        setTimeout(() => {
          this.objService.setAceptado(notification.data);
          }, 300);
          }
          if (notification.data.accion=='4') {
            this.navCtrl.navigateForward('/tabs/tab2');//En Camino
            setTimeout(() => {
              this.objService.setEncamino(notification.data);
              }, 300);
          }
          if (notification.data.accion=='3') {
            this.navCtrl.navigateForward('/tabs/tab2'); //finalizados
            setTimeout(() => {
              this.objService.setfinalizados(notification.data);
              }, 300);
          }
          if (notification.data.accion=='5') {
            this.navCtrl.navigateForward('/tabs/tab2'); //cancelados
            setTimeout(() => {
              this.objService.setcancelado(notification.data);
              }, 300);
          }
          if (notification.data.accion=='8') {
            this.navCtrl.navigateForward('/tabs/tab2'); //chat pedido
            setTimeout(() => {
              this.objService.setchatpedido(notification.data);
              }, 300);
          }
          if (notification.data.accion=='2') {
            this.navCtrl.navigateForward('/tabs/tab3');//char soporte
            setTimeout(() => {
              this.objService.setsoporte(notification.data);
              }, 300);
          }
          if (notification.data.accion=='17') {
            this.navCtrl.navigateForward('/tabs/tab1'); //notificaciones generales 
            setTimeout(() => {
              this.objService.setgenerales(notification.data);
              }, 300);
          }*/
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
       // alert('Push action performed: ' + JSON.stringify(notification));
        this.error(notification);
        //alert(JSON.stringify(notification.notification.data.accion));
        //alert('Push received: ' + JSON.stringify(notification.notification.data));
        //alert(JSON.stringify(notification));
       //alert('segundo plano');
       if (notification.notification.data.accion=='8' || notification.notification.data.accion=='2') {
        //alert('12');
          this.no(notification.notification.data.accion,notification.notification.data);
          this.registrar_notificacion(notification.notification.data.accion,notification.notification.data.pedido_id,notification.notification.data);
          this.presentToast('Has recibido un mensaje '+notification.notification.data.body);
        }else{
          this.presentConfirm(notification.notification.data.accion,notification.notification.data);
        let self=this;
          this.storage.getObject('userSV24').then(items => {
            console.log(items);
            //alert(JSON.stringify(items))
            self.id=items.id;
            this.id=items.id;
          });
        }
        /*if (notification.notification.data.accion=='7') {
          this.navCtrl.navigateForward('/tabs/tab2');//Aceptado
          setTimeout(() => {
            this.objService.setAceptado(notification.notification.data);
            }, 300);
        }
        if (notification.notification.data.accion=='4') {
          this.navCtrl.navigateForward('/tabs/tab2');//En Camino
          setTimeout(() => {
            this.objService.setEncamino(notification.notification.data);
            }, 300);
        }
        if (notification.notification.data.accion=='3') {
          this.navCtrl.navigateForward('/tabs/tab2'); //finalizados
          setTimeout(() => {
            this.objService.setfinalizados(notification.notification.data);
            }, 300);
        }
        if (notification.notification.data.accion=='5') {
          this.navCtrl.navigateForward('/tabs/tab2'); //cancelados
          setTimeout(() => {
            this.objService.setcancelado(notification.notification.data);
            }, 300);
        }
        if (notification.notification.data.accion=='8') {
          this.navCtrl.navigateForward('/tabs/tab2'); //chat pedido
          setTimeout(() => {
            this.objService.setchatpedido(notification.notification.data);
            }, 300);
        }
        if (notification.notification.data.accion=='2') {
          this.navCtrl.navigateForward('/tabs/tab3');//char soporte
          setTimeout(() => {
            this.objService.setsoporte(notification.notification.data);
            }, 300);
        }
        if (notification.notification.data.accion=='17') {
          this.navCtrl.navigateForward('/tabs/tab1'); //notificaciones generales 
          setTimeout(() => {
            this.objService.setgenerales(notification.notification.data);
            }, 300);
        }*/
        
      },
    );
  }

  async presentConfirm(i:any,data:any) {
    //this.registrar_notificacion(i,data.pedido_id,data);
    const alert = await this.alertController.create({
    message: '¿Desea abrir la notificación? "'+data.body+'"',
    buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.siono=0;
              console.log('Cancel clicked');
              this.registrar_notificacion(i,data.pedido_id,data);
              this.no(i,data);
            }
          },
          {
            text: 'Si',
            handler: () => {
              this.siono=1;
              this.accions(i,data);
              this.registrar_notificacion(i,data.pedido_id,data);
            }
          }
        ]
    });
    await alert.present();
  }
  

  accions(i:any,data:any){
   
    if (i=='7') {
      this.navCtrl.navigateForward('/tabs/tab2');//Aceptado
      setTimeout(() => {
        this.objService.setAceptado(data);
        }, 300);
    }
    if (i=='4') {
      this.navCtrl.navigateForward('/tabs/tab2');//En Camino
      setTimeout(() => {
        this.objService.setEncamino(data);
        }, 300);
    }
    if (i=='3') {
      this.navCtrl.navigateForward('/tabs/tab2'); //finalizados
      setTimeout(() => {
        this.objService.setfinalizados(data);
        }, 300);
    }
    if (i=='5') {
      this.navCtrl.navigateForward('/tabs/tab2'); //cancelados
      setTimeout(() => {
        this.objService.setcancelado(data);
        }, 300);
    }
    if (i=='8') {
      let getruta:any=this.objService.getruta();
        //alert(data);
        if (getruta=='/chat-pedidos') {
         // alert('data');
          this.objService.set_reload_chats_pedido(data);
        }else{
          //alert('data2');
          this.navCtrl.navigateForward('/tabs/tab2'); //chat pedido
          setTimeout(() => {
            this.objService.setchatpedido(data);
            }, 300);
        }
     
    }
    if (i=='2') {
      let getruta:any=this.objService.getruta();
        //alert(data);
        if (getruta=='/tabs/tab5') {
         // alert('data');
          this.objService.set_reload_chats_pedido(data);
        }else{
          this.navCtrl.navigateForward('/tabs/tab5');//char soporte
          setTimeout(() => {
            this.objService.setsoporte(data);
            }, 300);
        }
    }
    if (i=='17') {
      this.navCtrl.navigateForward('/tabs/tab1'); //notificaciones generales 
      setTimeout(() => {
        this.objService.setgenerales(data);
        }, 300);
    }
    
  }
  no(i:any,data:any){
   
    if (i=='8') {
      let getruta:any=this.objService.getruta();
        //alert(data);
        if (getruta=='/chat-pedidos') {
         // alert('data');
          this.objService.set_reload_chats_pedido(data);
        }  
    }
    if (i=='2') {

      let getruta:any=this.objService.getruta();
        //alert(data);
        if (getruta=='/tabs/tab5') {
         // alert('data');
          this.objService.set_reload_chats_pedido(data);
        }
    }
    
  }
  siono:any=0;
  registrar_notificacion(accion:any,id_operacion:any,data:any){
    let enviar={
      mensaje:data.body,
      usuario_id:this.id,
      id_operacion:id_operacion,
      data:JSON.stringify(data),
      accion:accion
    }

    if(accion==17){

    }else{
      this.userService.setNotificacion(enviar).subscribe(
        data => {
          console.log(data)
          if (this.siono=1) {
            this.visto(data.Notificacion.id);
          }
        },
        msg => {
          console.log(msg)
      });
    }
  }

  registrar_token(){
  
    //let notifi=localStorage.getItem('PushNotifications');
    localStorage.setItem('PushNotifications',this.tkn);
    let notifi=this.tkn;
    let usuario={
      token_notificacion:notifi,
      token_notificacionp:notifi
    }
      this.storage.getObject('userSV24').then(items => {
       // alert('Push registration 1');
	      if (items != '' && items != null) {
	      	this.storage.get('TUSV24').then(items2 => {
            //alert('Push registration 2');
	  			if (items2 != '' && items2 != null) {
	  				this.userService.setUser(items.id,items2,usuario).subscribe(
				        data => {
				        },
				        msg => {
					    }
				    );
	  			}
		    });
		  }
	    });		
  }

  visto(id:any){
    let data={
      visto:1
    };
    this.userService.visto(id,data).subscribe(
      data => {
        console.log(data)
        
    },
    msg => {
      
    });  
  }
  async presentToast(text:any) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }
}
