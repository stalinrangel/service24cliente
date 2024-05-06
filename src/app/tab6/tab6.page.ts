
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { RefreshService } from '../servicesproveedor/refresh.service';
import { StorageService } from '../servicesproveedor/storage.service';
import { UserService } from '../servicesproveedor/user.service';
import { OrdersService } from '../servicesproveedor/orders.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../servicesproveedor/notifications.service';
import { GeneralService } from '../servicesproveedor/general.service';
import { ObjetcserviceService } from '../servicesproveedor/objetcservice.service';
import * as moment from 'moment';
import { Geolocation } from '@capacitor/geolocation';
import { NotificationsPage } from '../proveedor/notifications/notifications.page';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  public active: boolean = false;
  public show_active: boolean = true;
  public status: number = 10;
	public estado :any= { 
    activo: 2,
    token: null
  };
  public datos:any;
  public repartidor:any;
  public count_notify: any;
  public loading:any;
  public orders: any;
  public show_notify: boolean = false;
  public deNotifi:any;

  //public usuario:any;

  constructor(
  	public navCtrl: NavController, 
  	public refresh: RefreshService,
  	public storage: StorageService, 
  	private loadingCtrl: LoadingController, 
  	private toastCtrl: ToastController, 
  	public userService: UserService,
  	public orderService: OrdersService,
    private objService: ObjetcserviceService,
    private objService2: ObjectserviceService,
    public cdr: ChangeDetectorRef,
    private alertController: AlertController,
    public modalController: ModalController,
    private router: Router,
    private noticationService: NotificationsService,
    private fuciones_generales: GeneralService,
    private changeDetector: ChangeDetectorRef
    //private subscription1: Subscription,
    //private subscription2: Subscription,
    //private subscription3: Subscription,
    //private subscription4: Subscription,
  	) {
      //console.log('initStatus0');
      //this.initStatus();
      console.log(this.router.url);
      this.objService.setruta(this.router.url);

      this.objService.getInit().subscribe((data:any) => {
        this.initStatus();
      });
      this.objService.getTab2().subscribe((data:any) => {
  
        //alert('sss')
        this.getOrders();
      });
      this.objService.getAceptado().subscribe((data:any) => {
        this.deNotifi=data;
        this.getOrders2();
      });
      this.objService.getCreado().subscribe((data:any) => {
        this.deNotifi=data;
        this.getOrders2();
      });
      this.objService.getgenerales().subscribe((data:any) => {
        console.log(data)
        //alert('llego generales');
        this.viewNotification();
      }); 
      this.objService.getNotify().subscribe((data:any) => {
        let items:any=this.storage.getObject('userRPSV24');
        this.getNotify(this.datos.ciudad_id,items.id);
      });
      this.getZone();
      this.objService.get_reload_chats_pedido().subscribe((data:any) => {
       // alert('sds');
        this.getZone();
      });

  }

  ngOnInit(){
    /*this.ga.trackView('Home')
    .then(() => {})
    .catch(e => console.log(e));*/
    //let usr:any=this.storage.get('userSV24');
    //this.usuario=JSON.parse(usr);

    console.log(this.usuario)
    console.log(this.storage.get('idRPSV24'))
    let repartidor:any=this.storage.get('idRPSV24');
    let isSesion:any=this.storage.get('idRPSV24');
    if (isSesion==''||isSesion==null) {
      this.router.navigate(['/login-proveedor']);
    }
    
    setTimeout(() => {
      this.fuciones_generales.iniciar();
      this.noticationService.registrar_token();
      //this.initStatus();
    }, 5000);

    this.objService2.isCliente$.subscribe((isClienteValue: boolean) => {
      console.log(isClienteValue)
      this.isCliente = isClienteValue;
      this.changeDetector.detectChanges();
    });
    console.log('ngOnInit')
    this.initStatus();
  }
  iniciar(){
     this.fuciones_generales.iniciar();
  }
  async geolocate(usuario_id:any){
		//console.log('geolocate')
		const options = { enableHighAccuracy: true };
		const coordinates = await Geolocation.getCurrentPosition(options);
		
		//console.log('Current position:', coordinates);
	
		const latLng = {
		  lat: coordinates.coords.latitude,
		  lng: coordinates.coords.longitude
		};
    
    setTimeout(() => { 
      
      //console.log(usuario_id.repartidor.usuario_id,latLng)
      this.userService.setPosition(usuario_id.repartidor.usuario_id,latLng).subscribe(
        data => {
          //console.log(data);
        },
        msg => {
        });
    }, 3000);
    
	}

  ionPageWillLeave() {
    //this.subscription1.unsubscribe();
    //this.subscription2.unsubscribe();
    //this.subscription3.unsubscribe();
    //this.subscription4.unsubscribe();
    //this.isCliente=true;
  }

  ionViewWillEnter() { 
    //
    this.vistos=0;
    this.getZone();
    this.initStatus();
    //this.storage.get('notifyGPROVSV24').then(items => {
    let items:any;
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }

      let isSesion:any=this.storage.get('idRPSV24');
      if (isSesion==''||isSesion==null) {
        this.router.navigate(['/login-proveedor']);
      }
    //}); 
    /*this.subscription2 = this.refresh.formRefreshSource2$.subscribe((msg:any) => {
      this.initStatus();
      this.cdr.detectChanges();
    });
    this.subscription3 = this.refresh.formRefreshSource1$.subscribe((msg:any) => {
      this.objService.setExtras(msg);
      this.navCtrl.navigateForward('detail-order');
    });
    this.subscription1 = this.refresh.formRefreshSource$.subscribe((msg:any) => {
      this.getOrders();
    }); 
    this.subscription4 = this.refresh.formRefreshSource3$.subscribe((msg:any) => {
     this.show_notify = true;
    });*/ 
  }

  initStatus(){
    console.log('initStatus');
    let items:any=this.fuciones_generales.get_idRPSV24();
    if (items==undefined) {
      //this.navCtrl.navigateForward('/tabs/tab3');
    }
    setTimeout(() => {
     
    //this.presentLoading();

    //this.storage.get('idRPSV24').then((items:any) => {
      
      //console.log(items)
      if (items) {
        //this.storage.get('TRPSV24').then(items2 => {
          let items2:any=this.fuciones_generales.get_TRPSV24();
         // console.log(items,items2)
          if (items2) {
           // console.log(items,items2)
            this.userService.getStatus(items,items2).subscribe(
            data => {
              console.log(data);
              let usuario_id:any=data;
              this.geolocate(usuario_id)
              this.repartidor = data;
              this.status = this.repartidor.repartidor.activo;
              localStorage.setItem('tipo_registro',this.repartidor.repartidor.usuario.registro.tipo);
              //this.loading.onDidDismiss();
              if (this.repartidor.repartidor.estado === 'OFF') {
                this.status = 0;
              } else {
                if (this.status == 1) {
                  this.active = true;
                  this.getOrders();
                } else {
                  this.orders = [];
                }
              }
            },
            msg => {
              //this.loading.dismiss();
              if(msg.status == 400 || msg.status == 401){ 
                this.storage.set('TRPSV24','');
                this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                this.navCtrl.navigateRoot('login-proveedor');
              }
            });
          }
       // });
      }
    //}); 
   }, 300);
  }
  
  changeStatus(){
  	this.presentLoading();
    if (this.repartidor.repartidor.estado === 'OFF') {
      this.status = 0;
    } else {
      this.active = !this.active;
      if (this.active) {
        this.estado.activo = 1;
      } else {
        this.estado.activo = 2;
      }
      let items=this.storage.get('idRPSV24');
      if (items) {
        let items2=this.storage.get('TRPSV24');
            if (items2) {
              this.estado.token = items2;
              this.userService.setStatus(items,items2,this.estado).subscribe(
                data => {
                this.loading.dismiss();
                this.datos = data;
                if (this.datos.repartidor.activo == 1) {
                  this.active = true;
                  this.presentToast('Servicio Activado');
                  this.getOrders();
                } else {
                  this.active = false;
                  this.presentToast('Servicio Desactivado');
                }
              },
              msg => {
                this.loading.dismiss();
                if(msg.status == 400 || msg.status == 401){ 
                  this.storage.set('TRPSV24','');
                  this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                  this.navCtrl.navigateRoot('login-proveedor');
                }
              });
            }
         // });
        }
      //});
    }
  }

  getOrders(){
    let items:any=this.storage.get('idRPSV24')
      if (items) {
        let items2:any= this.storage.get('TRPSV24')
          if (items2) {
            this.orderService.getInput(items,items2).subscribe(
            data => {
              this.datos = data;
              this.orders = this.datos.pedido;
              for (var i = 0; i < this.orders.length; ++i) {
                this.orders[i].tiempo = moment(this.orders[i].tiempo).format('DD/MM/YYYY');
              }
              this.orders = this.sortByKey(this.orders,'id');
            },
            msg => {
              if(msg.status == 400 || msg.status == 401){ 
                this.storage.set('TRPSV24','');
                this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                this.navCtrl.navigateRoot('login-proveedor');
              } else if(msg.status == 404){
                this.orders = [];
              }
            }); 
          }
      }
  }
  getOrders2(){
    let items:any=this.storage.get('idRPSV24')
      if (items) {
        let items2:any= this.storage.get('TRPSV24')
          if (items2) {
            this.orderService.getInput(items,items2).subscribe(
            data => {
              this.datos = data;
              this.orders = this.datos.pedido;
              for (var i = 0; i < this.orders.length; ++i) {
                this.orders[i].tiempo = moment(this.orders[i].tiempo).format('DD/MM/YYYY');
              }
              this.orders = this.sortByKey(this.orders,'id');
              this.abrirPedido();
            },
            msg => {
              if(msg.status == 400 || msg.status == 401){ 
                this.storage.set('TRPSV24','');
                this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                this.navCtrl.navigateRoot('login-proveedor');
              } else if(msg.status == 404){
                this.orders = [];
              }
            }); 
          }
      }
  }
  abrirPedido(){
    for (var i = 0; i < this.orders.length; ++i) {
      if (this.deNotifi.pedido_id==this.orders[i].id) {
        this.viewDetails(this.orders[i]);
      }
    }
  }

  doRefresh(event:any) {
    this.iniciar();
    this.getZone();
    this.storage.get('idRPSV24').then(items => {
      if (items) {
        this.storage.get('TRPSV24').then(items2 => {
          if (items2) {
            this.orderService.getInput(items,items2).subscribe(
            data => {
              this.datos = data;
              this.orders = this.datos.pedido;
              for (var i = 0; i < this.orders.length; ++i) {
                this.orders[i].tiempo = moment(this.orders[i].tiempo).format('DD/MM/YYYY');
              }
              this.orders = this.sortByKey(this.orders,'id');
              event.target.complete();
            },
            msg => {
              event.target.complete();
              if(msg.status == 400 || msg.status == 401){ 
                this.storage.set('TRPSV24','');
                this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                this.navCtrl.navigateRoot('login-proveedor');
              } else if(msg.status == 404){
                this.orders = [];
              }
            }); 
          }
        });
      }
    });
  }

  viewDetails(item:any){
    this.objService.setExtras(item.id);
    this.navCtrl.navigateForward('proveedor/detail-order');
  }

  completeRegister(){
    this.navCtrl.navigateForward('/proveedor/complete-register');
  }

  async viewNotification() {
    const modal = await this.modalController.create({
      component: NotificationsPage
    });
    modal.onDidDismiss().then((close)=> { 
      this.show_notify = false;   
    });
    return await modal.present();  
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots',
      duration: 5000,
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

  public sortByKey(array:any, key:any) {
    return array.sort(function (a:any, b:any) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 0 : 1));
    });
  }

  usuario:any
  getZone(){
    let items:any=this.storage.getObject('userRPSV24');
    this.usuario=items;
    this.usuario=items;
      if (items) {
        let items2:any=this.storage.get('TRPSV24');
          if (items2) {
            this.userService.getCity(items.id,items2).subscribe(
            data => {
              this.datos = data;
              this.getNotify(this.datos.ciudad_id, items.id);
            },
            msg => {
              this.notifications = [];
              this.showEmpty = true;
            });
          }
      } else {
        this.notifications = [];
        this.showEmpty = true;
      }
    //});  
  }

  datos1:any;
  notifications:any;
  showEmpty:any;
  vistos=0;
  
  getNotify(ciudad_id:any, user_id:any){
    let items2:any=this.storage.get('TRPSV24');
      if (items2) {
        this.userService.getNotifications(ciudad_id,items2, user_id).subscribe(
        data => {
          console.log(data)
          this.datos1 = data;
          this.notifications = this.datos1.Notificaciones_generales;
          if (this.notifications.length == 0) {
            this.showEmpty = true;
          }
          this.calcNotify();
        },
        msg => {
          this.notifications = [];
          this.showEmpty = true;
        });
      } else {
        this.notifications = [];
        this.showEmpty = true;
      }
  }
  calcNotify(){
    this.vistos=0;
    for (let i = 0; i < this.notifications.length; i++) {
      if (this.notifications[i].visto==0) {
        this.vistos+=1;
      }
    }
  }

  public isCliente:any=true;
	public cliente:any='Modo proveedor';
  changeRol(e:any){
    this.isCliente=e.detail.checked;
    this.objService2.updateIsCliente(this.isCliente);
    this.navCtrl.navigateRoot('/tabs/tab1');
		
	}
  agregarservicio(){
    this.router.navigate(['/proveedor/list-services']);
  }
  mejorarplan(){
    this.router.navigate(['/proveedor/planes']);
  }
}
