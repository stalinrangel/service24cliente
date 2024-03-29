import { Injectable } from '@angular/core';
import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
import { registerPlugin, Plugin } from '@capacitor/core';
import { SocketService } from './socket.service';
import { ToastController } from '@ionic/angular';
import { ObjetcserviceService } from './objetcservice.service';
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");



@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  constructor(private socket: SocketService,private toastCtrl: ToastController, private objService: ObjetcserviceService,) { }

  whachers:any=[];
  estado:any=false;
  stop(){
    for (let i = 0; i < this.whachers.length; i++) {
      BackgroundGeolocation.removeWatcher({
        id: this.whachers[i]
      });
    }

    this.presentToast('No tienes pedidos en camino.');
    this.estado=false;

  }

  start(){
    console.log('start');
    let self=this;
      //this.guess_location(2000);
      BackgroundGeolocation.addWatcher(
        Object.assign({
            stale: true
        }, (
            true
            ? {
                backgroundTitle: "Tracking your location, senõr.",
                backgroundMessage: "Cancel to prevent battery drain."
            }
            : {
                 distanceFilter: 10
            }
        )),
        function callback(location, error) {
          console.log('stalin entro callback');
            if (error) {
              console.log('stalin222',error);
                if (error.code === "NOT_AUTHORIZED") {
                    if (window.confirm(
                        "This app needs your location, " +
                        "but does not have permission.\n\n" +
                        "Open settings now?"
                    )) {
                        // It can be useful to direct the user to their device's
                        // settings when location permissions have been denied. The
                        // plugin provides the 'openSettings' method to do exactly
                        // this.
                        BackgroundGeolocation.openSettings();
                    }
                }
                return console.error(error);
            }
            //alert(JSON.stringify(location));
            self.estado=true;
            self.objService.setBack(true),
            self.socket.sendMessage(location);
            console.log('stalin22',location);
            return location;
        }
    ).then(function after_the_watcher_has_been_added(watcher_id) {
        // When a watcher is no longer needed, it should be removed by calling
        // 'removeWatcher' with an object containing its ID.
        console.log('entro stalin after_the_watcher_has_been_added');
        //BackgroundGeolocation.removeWatcher({
          //  id: watcher_id
        //});
    });
  
  }
  guess_location(timeout:any) {
    let last_location:any;
    let self=this;
    BackgroundGeolocation.addWatcher(
        {
            requestPermissions: true,
            stale: true
        },
        function (location) {
            last_location = location || undefined;
            console.log('stalin02',last_location);
            self.callback(last_location);
        }
    ).then(function (id) {
        setTimeout(function () {
          console.log('stalin12',last_location);
            //self.callback(last_location);
           /// BackgroundGeolocation.removeWatcher({id});
        }, timeout);
    });
  }
    
  callback(data:any){
    this.socket.sendMessage(data);
    //this.presentToast(JSON.stringify(data));
   
  }

  async presentToast(text:any) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }

  
}
