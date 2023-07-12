import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token, } from '@capacitor/push-notifications';
import { NavController, Platform } from '@ionic/angular';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';
import { StorageService } from 'src/services/storage/storage.service';
import { UserService } from 'src/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public platform: Platform,private storage: StorageService,public userService: UserService,public navCtrl: NavController, private objService: ObjectserviceService) {
    this.inicializar();
   }

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
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      //alert('Push registration success, token: ' + token.value);
      let guardar=token.value;
      guardar=guardar.toString();
      //alert(guardar)
      localStorage.setItem('PushNotifications',guardar);


    });

    PushNotifications.addListener('registrationError', (error: any) => {
      //alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
       // alert('Push received: ' + JSON.stringify(notification.data));
       if (notification.data.accion=='7') {
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
          }
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
        //alert(JSON.stringify(notification.notification.data.accion));
        //alert('Push received: ' + JSON.stringify(notification.notification.data));
        if (notification.notification.data.accion=='7') {
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
        }
        
      },
    );
  }

  registrar_token(){
  
    let notifi=localStorage.getItem('PushNotifications');
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
}
