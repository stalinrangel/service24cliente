import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, LoadingController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { StorageService } from '../../servicesproveedor/storage.service';
import { OrdersService } from '../../servicesproveedor/orders.service';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';
//import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { CalificationPage } from '../calification/calification.page';
import { CancelOrderPage } from '../cancel-order/cancel-order.page';
//import { CallNumber } from '@ionic-native/call-number/ngx';
import { LocationTrackerService } from '../../servicesproveedor/location-tracker.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
//import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { RefreshService } from '../../servicesproveedor/refresh.service';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { registerPlugin } from '@capacitor/core';
import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

//import { CaminoComponentModule } from '../camino/camino.module';
import { SocketService } from '../../servicesproveedor/socket.service';
import { BackgroundService } from '../../servicesproveedor/background.service';


@Component({
  selector: 'app-detail-tracking',
  templateUrl: './detail-tracking.page.html',
  styleUrls: ['./detail-tracking.page.scss'],
})
export class DetailTrackingPage implements OnInit {

  public data: any;
  public loading: any;
  public myLatLng: any;
  public user = {
  	nombre: 'Proveedor',
  	imagen: 'assets/profile-general.png',
  	direccion: '',
    telefono: '',
    promedio:5
  }
  public service = {
    nombre: 'Servicio',
    categoria: 'Categoria',
    descripcion: 'Descripcion',
    estado: 2,
    referencia: '',
    puntaje1: 0,
    comentario1: '',
    puntaje2: 0,
    comentario2: '',
    producto_id: ''
  }

  public finishRoute = {
    pedido_id: '',
    token_notificacion: '',
    token: '',
    finalizo: 16
  }
  public encaminov = 0;
  public datos: any;

  public chat = {
    usuario_id: '',
    id: '',
    token_notificacion: ''
  }

  /*public options : InAppBrowserOptions = {
    location : 'no',
    presentationstyle : 'pagesheet',
  };*/

  constructor(
    public navCtrl: NavController,
    public storage: StorageService, 
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
  	private objService: ObjetcserviceService,
    public orderService: OrdersService,
    //private launchNavigator: LaunchNavigator,
    //private diagnostic: Diagnostic,
    //private geolocation: Geolocation,
    private alertController: AlertController,
    private modalController: ModalController,
    //private callNumber: CallNumber,
    public locationTracker: LocationTrackerService,
    public http: HttpClient,
    public refresh: RefreshService,
    private socket: SocketService,
    private tracker: LocationTrackerService,
    private back: BackgroundService
    //private iab: InAppBrowser
  ) { 
  	this.data = this.objService.getExtras();
    console.log(this.data)
  	this.user.nombre = this.data.usuario.nombre;
  	this.user.imagen = this.data.usuario.imagen;
    this.user.telefono = this.data.usuario.telefono;
  	this.user.direccion = this.data.direccion;
    this.service.nombre = this.data.productos[0].nombre;
    this.service.descripcion = this.data.productos[0].descripcion;
    this.service.categoria = this.data.productos[0].subcategoria.categoria.nombre +'/'+ this.data.productos[0].subcategoria.nombre;
    this.service.estado = this.data.estado;
    this.service.referencia = this.data.referencia;
    this.service.producto_id = this.data.productos[0].id;
    this.encaminov = this.data.encamino;
    
    localStorage.setItem('sala',this.data.id);
    let items:any=this.storage.getObject('userRPSV24')
      if (items != '' && items != null) {
        if (this.data.calificacion) {     
          for (var j = 0; j < this.data.calificacion.length; ++j) {
            if (this.data.calificacion[j].usuario_id == items.id) {
              this.service.puntaje1 = this.data.calificacion[j].puntaje;
              this.service.comentario1 = this.data.calificacion[j].comentario;
            } else {
              this.service.puntaje2 = this.data.calificacion[j].puntaje;
              this.service.comentario2 = this.data.calificacion[j].comentario;
            }
          }
        }
      }
      this.objService.getopenchat().subscribe((data:any) => {
        //alert(data)
        //alert('getopen '+data);
        this.chatPedidos(data);
        localStorage.setItem('sala',data);
      });

      let items2:any=this.storage.get('TRPSV24')
      if (items2) {
        //this.presentLoading();
        this.orderService.getOrderId(this.data.id,items2).subscribe(
        data => {
          this.datos = data;
          console.log(data);
          
          if (this.datos.pedido.usuario.promedio > 0) {
            this.user.promedio = this.datos.pedido.usuario.promedio.toFixed(1);
          }else{
            this.user.promedio = 0;
          }
        },
        msg => {
          
        }); 
      }
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log(this.data.estado,this.data.encamino)
    if (this.data.estado == 3 && this.data.encamino == 1) {
      this.background();
    }
  }

  ionViewWillLeave(){
    if (this.data.estado == 3) {
      this.refresh.publishFormRefresh('track');
    }
    //this.tracker.terminate();
  }

  async preguntar(){
    const alert = await this.alertController.create({
      header: '¿Deseas compartir tu ubicación con el cliente?',
      message: 'Se le informará al cliente que vas en camino y podra ver tu ubicación en tiempo real. Incluso si colocas la app en segundo plano.',
      buttons: [
            {
              text: 'Dar permisos de ubicación',
              handler: () => {
                this.openSettings();
              }
            },
            {
              text: 'Si',
              handler: () => {
                this.encamino();
              }
            },
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
               this.back.stop();
               this.terminate();
              }
            }
          ]
      });
      await alert.present();
  }

  openSettings(){
    BackgroundGeolocation.openSettings();
  }

  finish(){
    this.terminate();
    this.finishRoute.pedido_id = this.data.id;
    let items:any=this.storage.get('idRPSV24');
      if (items != '' && items != null) {
        let items2:any=this.storage.get('TRPSV24');
          if (items2 != '' && items2 != null) {
            this.finishRoute.token = items2;
            let items3:any = this.storage.get('notify_RPSV24');
              //if (items3 != '' && items3 != null) {
                this.finishRoute.token_notificacion = items3;
                this.presentLoading();
                this.orderService.finishService(items,this.finishRoute,items2).subscribe(
                  data => {
                    this.objService.setTab2('1');
                    this.data.estado = 4;
                    this.loading.dismiss();
                    this.locationTracker.stopTracking();
                    this.presentToast('Servicio finalizado con éxito');
                    this.presentModal();
                  },
                  msg => {
                    this.loading.dismiss();
                    if(msg.status == 400 || msg.status == 401){ 
                      this.storage.set('TRPSV24','');
                      this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                      this.navCtrl.navigateRoot('login');
                    }       
                  }
                );
              //}
          }
      }
  }

  async GoMap(){
    console.log(this.data)
    let url ='https://maps.google.com/?q=';
    let coordinates=this.data.lat+','+this.data.lng;
    await Browser.open({ url: url+coordinates});
    //this.launchNavigator.navigate([this.data.lat, this.data.lng]); 
  }

  async whatsapp(){
    var first = this.user.telefono.charAt(0);
    var second = this.user.telefono.charAt(1);
    var third = this.user.telefono.charAt(2);
    let url ="https://wa.me/";
    if (first == '5' || first == '+') {
      await Browser.open({ url: url+this.user.telefono });
     // cordova.InAppBrowser.open(" https://wa.me/"+this.user.telefono,"_system");
    } else {
      await Browser.open({ url: url+this.user.telefono });
     // cordova.InAppBrowser.open(" https://wa.me/507"+this.user.telefono,"_system");
    }
  }


  chatPedidos(id:any){
    this.chat.usuario_id = this.data.usuario.id;
    this.chat.id = this.data.id;
    this.chat.token_notificacion = this.data.usuario.token_notificacion; 
    this.objService.setExtras(this.chat);
    this.navCtrl.navigateForward('proveedor/chat-pedidos');
  };

  

  background2(){
    let user=this.user;
    //this.socket.sendMessage({user});
    let self=this;
    this.socket.init(this.data.id);
    //alert('entro background');
    //this.tracker.geolocate();
    this.guess_location(2000);
      BackgroundGeolocation.addWatcher(
        {
            // If the "backgroundMessage" option is defined, the watcher will
            // provide location updates whether the app is in the background or the
            // foreground. If it is not defined, location updates are only
            // guaranteed in the foreground. This is true on both platforms.
    
            // On Android, a notification must be shown to continue receiving
            // location updates in the background. This option specifies the text of
            // that notification.
            backgroundMessage: "Cancel to prevent battery drain.",
    
            // The title of the notification mentioned above. Defaults to "Using
            // your location".
            backgroundTitle: "Tracking You.",
    
            // Whether permissions should be requested from the user automatically,
            // if they are not already granted. Defaults to "true".
            requestPermissions: true,
    
            // If "true", stale locations may be delivered while the device
            // obtains a GPS fix. You are responsible for checking the "time"
            // property. If "false", locations are guaranteed to be up to date.
            // Defaults to "false".
            stale: false,
    
            // The minimum number of metres between subsequent locations. Defaults
            // to 0.
            distanceFilter: 2
        },
        function callback(location, error) {
          //alert('entro callback');
            if (error) {
              //alert(JSON.stringify(error));
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
            alert(JSON.stringify(location));
            self.socket.sendMessage(location);
            console.log('stalin2',location);
            return console.log(location);
        }
    ).then(function after_the_watcher_has_been_added(watcher_id) {
        // When a watcher is no longer needed, it should be removed by calling
        // 'removeWatcher' with an object containing its ID.
        console.log('entro stalin after_the_watcher_has_been_added');
        BackgroundGeolocation.removeWatcher({
            id: watcher_id
        });
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
            console.log('stalin0',last_location);
            self.callback(last_location);
        }
    ).then(function (id) {
        setTimeout(function () {
          console.log('stalin1',last_location);
            self.callback(last_location);
            //Plugins.BackgroundGeolocation.removeWatcher({id});
        }, timeout);
    });
  }
  callback(data:any){
    this.socket.sendMessage(data);
    this.presentToast(JSON.stringify(data));
   
  }

  background(){
    this.back.start();
  }
  encamino(){
    this.background();
    this.presentLoading();
    this.http.get(`${environment.api}encamino/`+this.data.id)
    .toPromise()
    .then(
    data => {
      this.datos = data;
      this.encaminov = 1;
      this.loading.dismiss();
      this.locationTracker.startTracking();
      this.presentToast('Servicio marcado en camino con éxito');
    },
    msg => {
      console.log(msg);
      this.loading.dismiss();
    }); 
  };

  terminate(){
    this.tracker.terminate();
    this.tracker.terminate();
    this.tracker.terminate();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CalificationPage,
      componentProps: { value: this.data },
      cssClass: 'calification-modal-css'
    });
    modal.onDidDismiss().then((close)=> {
      if (close.data == 2) {
        this.refresh.publishFormRefresh('histories');
        this.navCtrl.pop();
      }      
    });
    return await modal.present();
  }

  async presentModal1() {
    
    const modal = await this.modalController.create({
      component: CancelOrderPage,
      componentProps: { value: this.data.id },
      cssClass: 'cancel-modal-css'
    });
    modal.onDidDismiss().then((close)=> {
      if (close.data == 2) {
        this.terminate();
        this.refresh.publishFormRefresh('histories');
        this.navCtrl.pop();
      }      
    });
    return await modal.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots',
      duration: 15000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  async presentToast(text:any) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000,
      cssClass: 'toast-scheme'
    });
    toast.present();
  }

  async presentConfirm() {
      const alert = await this.alertController.create({
    message: '¿Está seguro de finalizar la solicitud #'+ this.data.id +'?',
    buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Si',
            handler: () => {
              this.finish();
            }
          }
        ]
    });
    await alert.present();
  }

  async presentConfirm1(item:any) {
    const alert = await this.alertController.create({
    header: 'Copiar número de teléfono',
    message: item,
    buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Si',
            handler: () => {
              this.callClient(item);
            }
          }
        ]
    });
    await alert.present();
  }

  async callClient(text: string) {
    await Clipboard.write({
      string: text
    });
   /* this.callNumber.callNumber(item, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));*/
  }
}
