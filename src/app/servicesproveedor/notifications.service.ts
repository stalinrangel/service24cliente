import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token, } from '@capacitor/push-notifications';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { ObjetcserviceService } from './objetcservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public platform: Platform,private toastController: ToastController,private storage: StorageService,public userService: UserService,public navCtrl: NavController, private objService: ObjetcserviceService,private alertController: AlertController) {
    this.inicializar();
   }

  private id:any;
  inicializar(){
    

     
    //this.presentConfirm('notification.data.accion','notification.data');
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
      let guardar=token.value;
      guardar=guardar.toString();
      //alert(guardar)
      //localStorage.setItem('PushNotifications',guardar);
      this.tkn=guardar;
      //localStorage.setItem('notify_RPSV24',guardar);


    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('no lego')
      //alert('Error on registration: ' + JSON.stringify(error));
      this.error(error);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //alert(JSON.stringify(notification));
        this.error(notification);
        let items:any=this.storage.getObject('userRPSV24');
	      if (items != '' && items != null) {
          //alert(JSON.stringify(items))
          console.log(items);
          this.id=items.id;
	
	  			}
          //alert('primer plano');
        if (notification.data.accion=='8' || notification.data.accion=='2') {

          this.no(notification.data.accion,notification.data);
          this.accions(notification.data.accion,notification.data);
          this.registrar_notificacion(notification.data.accion,notification.data.pedido_id,notification.data);
          this.presentToast('Has recibido un mensaje '+notification.data.body);
        }else{

          this.presentConfirm(notification.data.accion,notification.data);
        }
      
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
       //alert(JSON.stringify(notification));
       this.error(notification);
        let items:any=this.storage.getObject('userRPSV24');
	      if (items != '' && items != null) {
         // alert(JSON.stringify(items))
          console.log(items);
          this.id=items.id;
	
	  		}
        //alert('segundo plano');
        if (notification.notification.data.accion=='8' || notification.notification.data.accion=='2') {
          //alert('12');
          this.no(notification.notification.data.accion,notification.notification.data);
          this.accions(notification.notification.data.accion,notification.notification.data);
          this.registrar_notificacion(notification.notification.data.accion,notification.notification.data.pedido_id,notification.notification.data);
          this.presentToast('Has recibido un mensaje '+notification.notification.data.body);
          
        }else{
          //alert('13');
          this.presentConfirm(notification.notification.data.accion,notification.notification.data);
        }
       
      },
    );
  }

  async presentConfirm(i:any,data:any) {
    
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
   
    if (i=='6') {
      this.navCtrl.navigateForward('/tabs/tab6');//creado
      setTimeout(() => {
        this.objService.setCreado(data);
        
        }, 300);
    }
    if (i=='7') {
      this.navCtrl.navigateForward('/tabs/tab7');//Aceptado
      setTimeout(() => {
        this.objService.setAceptado(data);
        
        }, 300);
    }
    if (i=='4') {
      this.navCtrl.navigateForward('/tabs/tab7');//En Camino
      setTimeout(() => {
        this.objService.setEncamino(data);
        
        }, 300);
    }
    if (i=='3') {
      this.navCtrl.navigateForward('/tabs/tab7'); //finalizados
      setTimeout(() => {
        this.objService.setfinalizados(data);
        }, 300);
    }
    if (i=='5') {
      this.navCtrl.navigateForward('/tabs/tab7'); //cancelados
      setTimeout(() => {
        this.objService.setcancelado(data);
        }, 300);
    }
    if (i=='8') {
      let getruta:any=this.objService.getruta();
        //alert(data);
        if (getruta=='/chat-pedidos') {
          
          this.objService.set_reload_chats_pedido(data);
        }else{
          
          this.navCtrl.navigateForward('/tabs/tab7'); //chat pedido
          setTimeout(() => {
            this.objService.setchatpedido(data);
            this.objService.set_reload_chats_pedido(data);
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
          this.navCtrl.navigateForward('/tabs/tab10');//char soporte
          setTimeout(() => {
            this.objService.setsoporte(data);
            this.objService.set_reload_chats_pedido(data);
            }, 300);
        }
    }
    if (i=='17') {
      this.navCtrl.navigateForward('/tabs/tab6'); //notificaciones generales 
      setTimeout(() => {
        this.objService.setgenerales(data);
        }, 300);
    }
  }
  no(i:any,data:any){
   
    if (i=='8') {
      let getruta:any=this.objService.getruta();
        //alert(data);
        if (getruta=='chat-pedidos') {
         // alert('data');
          this.objService.set_reload_chats_pedido(data);
        }  
    }
    if (i=='2') {

      let getruta:any=this.objService.getruta();
        //alert(data);
        if (getruta=='/tabs/tab10') {
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
          if (this.siono==1) {
            this.visto(data.Notificacion.id);
          }
          this.objService.set_reload_chats_pedido(data);
        },
        msg => {
          console.log(msg)
      });
    }
    
  }

  visto(id:any){
    //alert('visto')
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
      duration: 4000
    });
    toast.present();
  }

  registrar_token(){
  
    //let notifi=localStorage.getItem('PushNotifications');
    localStorage.setItem('PushNotifications',this.tkn);
    let notifi=this.tkn;
    let usuario={
      token_notificacion:notifi,
      token_notificacionp:notifi
    }
      let items:any=this.storage.getObject('userRPSV24');
       // alert('Push registration 1');
	      if (items != '' && items != null) {
	      	let items2:any=this.storage.get('TRPSV24');
            //alert('Push registration 2');
	  			if (items2 != '' && items2 != null) {
	  				this.userService.setUsuario(items.id,items2,usuario).subscribe(
				        data => {
				        },
				        msg => {
					    }
				    );
	  			}
		  }
  }
}
