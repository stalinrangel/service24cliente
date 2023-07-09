import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token, } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { StorageService } from 'src/services/storage/storage.service';
import { UserService } from 'src/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public platform: Platform,private storage: StorageService,public userService: UserService,) {
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
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
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
