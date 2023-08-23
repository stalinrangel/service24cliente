import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, Platform, LoadingController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage/storage.service';
import { OrdersService } from '../../services/orders/orders.service';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { CalificationPage } from '../calification/calification.page';
import { CategoriesService } from '../../services/categories/categories.service';
import { CancelOrderPage } from '../cancel-order/cancel-order.page';
import { NotificationsComponent } from '../notifications/notifications.component';

//declare var google;

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {

  public data: any;
  public loading: any;
  public select: boolean = true;
  public provider = {
  	nombre: 'Service 24',
  	imagen: 'assets/icon/profile-general.png',
  	direccion: '',
    servicio: 'Servicio',
    categoria: 'Categoria',
    descripcion: 'Descripcion',
    referencia: '',
    puntaje: 0,
    comentario: '',
    producto_id: '',
    califico: false,
    tiempo: '',
    hora: '',
    lugar: ''
  }

  public finishRoute = {
    pedido_id: '',
    token_notificacion: '',
    token: '',
    finalizo: 3
  }
  public favorite :any= {
    usuario_id: '',
    establecimiento_id: '',
    productos_id: ''
  }
  public checkFav = {
    usuario_id: '',
    producto_id: ''
  }
  public subscription: any;

  map: any;
  mark: any;
  myPosition: any = {};
  address: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  geocoder: any = null;
  infowindow: any = null;
  bounds: any = null;
  bounds1: any = null;
  myLatLng: any;
  waypoints: any[] = [];
  locations: any;
  markers: any[] = [];
  datos1: any;
  datos: any;
  estado = 1;
  intervalUbc: any;
  encamino = 0;
  id:any;

  public chat = {
    usuario_id: '',
    id: '',
    token_notificacion: ''
  }
  public show_notify: boolean = false;

  private productos_id=0;

  constructor(
  	public navCtrl: NavController,
    public storage: StorageService, 
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
    private objService: ObjectserviceService,
    public orderService: OrdersService,
    public modalController: ModalController,
    private alertController: AlertController,
    private catService: CategoriesService,
    //public events: Events,
    private platform: Platform,
    private zone: NgZone
  ) { 
  	this.data = this.objService.getExtras();	

    this.objService.getopenchat().subscribe((data:any) => {
      //alert(data)
      //alert('getopen '+data);
			this.getOrder2(data);
      console.log(data);
      localStorage.setItem('sala',data);
		});
    /*this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#222220"
      }
    });
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    this.bounds = new google.maps.LatLngBounds();
    this.bounds1 = new google.maps.LatLngBounds();*/
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      
      this.getOrder(this.data);
      console.log(this.data);
      localStorage.setItem('sala',this.data);
    })
  }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      if (this.estado == 4) {
        //this.events.publish('viewOrder', 'history');
      } else {
        //this.events.publish('viewOrder', 'track');
      }  
    });
    this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
    clearInterval(this.intervalUbc);
  }

  getOrder(id:any) {
    this.storage.get('TUSV24').then(items2 => {
      if (items2) {
        //this.presentLoading();
        this.orderService.getOrderId(id,items2).subscribe(
        data => {
          
          this.zone.run(()=>{
            this.datos = data;
            this.productos_id=this.datos.pedido.productos[0].id;
            console.log(this.productos_id)
            this.estado = this.datos.pedido.estado;
            this.encamino = this.datos.pedido.encamino;
            if (this.datos.pedido.repartidor) {
              this.provider.nombre = this.datos.pedido.productos[0].establecimiento.nombre;
              this.provider.imagen = this.datos.pedido.repartidor.usuario.imagen;
            }
            this.provider.direccion = this.datos.pedido.productos[0].establecimiento.direccion;
            this.provider.descripcion = this.datos.pedido.productos[0].descripcion;
            this.provider.servicio = this.datos.pedido.productos[0].nombre;
            this.provider.categoria = this.datos.pedido.productos[0].subcategoria.categoria.nombre +' - '+ this.datos.pedido.productos[0].subcategoria.nombre;
            this.provider.referencia = this.datos.pedido.referencia;
            this.provider.producto_id = this.datos.pedido.productos[0].id;
            this.favorite.establecimiento_id = this.datos.pedido.productos[0].id;
            this.provider.tiempo = this.datos.pedido.tiempo;
            this.provider.hora = this.datos.pedido.hora;
            this.provider.lugar = this.datos.pedido.direccion;
            if (this.datos.pedido.calificacion) {
              let index1 = this.datos.pedido.calificacion.findIndex((item1:any) => item1.usuario_id === this.datos.pedido.usuario_id);
              if(index1 !== -1){
                this.provider.califico = true;
                this.provider.puntaje = this.datos.pedido.calificacion[index1].puntaje;
                this.provider.comentario = this.datos.pedido.calificacion[index1].comentario;
              } else {
                this.provider.califico = false;
              }
            } 
            //this.loading.dismiss();
            if (this.datos.pedido.estado == 3 && this.datos.pedido.encamino == 1) {
              //this.loadMap();
            }
            this.checkFavorite();
          })
        },
        msg => {
          //this.loading.dismiss();
          if(msg.status == 400 || msg.status == 401){ 
            this.storage.set('TUSV24','');
            this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
            this.navCtrl.navigateRoot('login');
          }
        }); 
      }
    });
  }
  getOrder2(id:any) {
    this.storage.get('TUSV24').then(items2 => {
      if (items2) {
        //this.presentLoading();
        this.orderService.getOrderId(id,items2).subscribe(
        data => {
          this.zone.run(()=>{
            this.datos = data;
            this.estado = this.datos.pedido.estado;
            this.encamino = this.datos.pedido.encamino;
            if (this.datos.pedido.repartidor) {
              this.provider.nombre = this.datos.pedido.productos[0].establecimiento.nombre;
              this.provider.imagen = this.datos.pedido.repartidor.usuario.imagen;
            }
            this.provider.direccion = this.datos.pedido.productos[0].establecimiento.direccion;
            this.provider.descripcion = this.datos.pedido.productos[0].descripcion;
            this.provider.servicio = this.datos.pedido.productos[0].nombre;
            this.provider.categoria = this.datos.pedido.productos[0].subcategoria.categoria.nombre +' - '+ this.datos.pedido.productos[0].subcategoria.nombre;
            this.provider.referencia = this.datos.pedido.referencia;
            this.provider.producto_id = this.datos.pedido.productos[0].id;
            this.favorite.establecimiento_id = this.datos.pedido.productos[0].id;
            this.provider.tiempo = this.datos.pedido.tiempo;
            this.provider.hora = this.datos.pedido.hora;
            this.provider.lugar = this.datos.pedido.direccion;
            if (this.datos.pedido.calificacion) {
              let index1 = this.datos.pedido.calificacion.findIndex((item1:any) => item1.usuario_id === this.datos.pedido.usuario_id);
              if(index1 !== -1){
                this.provider.califico = true;
                this.provider.puntaje = this.datos.pedido.calificacion[index1].puntaje;
                this.provider.comentario = this.datos.pedido.calificacion[index1].comentario;
              } else {
                this.provider.califico = false;
              }
            } 
            //this.loading.dismiss();
            if (this.datos.pedido.estado == 3 && this.datos.pedido.encamino == 1) {
              //this.loadMap();
            }
            this.checkFavorite();
            this.chatPedidos(id);
          })
        },
        msg => {
          //this.loading.dismiss();
          if(msg.status == 400 || msg.status == 401){ 
            this.storage.set('TUSV24','');
            this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
            this.navCtrl.navigateRoot('login');
          }
        }); 
      }
    });
  }

  /*loadMap(){
    let mapEle: HTMLElement = document.getElementById('map1');
    this.myLatLng = new google.maps.LatLng(this.datos.pedido.lat, this.datos.pedido.lng);

    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 18,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl:false,
      zoomControl: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    });

    this.directionsDisplay.setMap(this.map);  

    /*google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.getUbic(this.datos.pedido.repartidor_id);
    });
  }*/

  checkFavorite(){
    this.storage.getObject('userSV24').then(items => {
      if (items) {
        this.storage.get('TUSV24').then(items2 => {
          if (items2) {
            this.checkFav.usuario_id = items.id;
            this.checkFav.producto_id = this.datos.pedido.productos[0].id;
            this.catService.checkFavorites(this.checkFav,items2).subscribe(
              data => {
                console.log(data);
                if (data == '0' ) {
                  this.select = false;
                }else if (data == '1') {
                  this.select= true;
                }
              },
              msg => {      
                console.log(msg);
              }
            );
          }
        });
      }
    });
  }

  addFavorite(){
    this.presentLoading();
    this.storage.getObject('userSV24').then(items => {
      if (items) {
        this.storage.get('TUSV24').then(items2 => {
          if (items2) {
            this.favorite.usuario_id = items.id;
            this.favorite.productos_id= this.productos_id;
            this.catService.addFavorites(this.favorite,items2).subscribe(
              data => {
                this.select = true;
                this.loading.dismiss();
                this.presentToast('Proveedor agregado con éxito.')    
                this.select=true;
              },
              msg => { 
                this.loading.dismiss();      
              }
            );
          }
        });
      };
    });
  };

  chatPedidos(id:any){
    this.chat.usuario_id = this.datos.pedido.repartidor.usuario_id;
    this.chat.id = this.datos.pedido.id;
    this.chat.token_notificacion = this.datos.pedido.repartidor.usuario.token_notificacion; 
    this.objService.setExtras(this.chat);
    this.navCtrl.navigateForward('chat-pedidos');
  };

  finish(){
    this.finishRoute.pedido_id = this.data;
    this.storage.get('TUSV24').then(items2 => {
      if (items2 != '' && items2 != null) {
        this.finishRoute.token = items2;
        console.log(items2)
        this.storage.get('token_notificacionUSV24').then(items3 => {
          console.log(items3)
          if (true) {
            this.presentLoading();
            this.orderService.finishService(this.datos.pedido.repartidor_id,this.finishRoute,items2).subscribe(
              data => {
                this.estado = 4;
                this.objService.setTab2('1');
                clearInterval(this.intervalUbc);
                this.loading.dismiss();
                this.presentToast('Servicio finalizado con éxito');
                this.presentModal();
              },
              msg => {
                this.loading.dismiss();
                if(msg.status == 400 || msg.status == 401){
                  this.storage.set('TUSV24',''); 
                  this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                  this.navCtrl.navigateRoot('login');
                }       
              }
            );
          }
        });
      }
    });
  }

  /*getUbic(id){
    if (id != null) {
      this.storage.get('TUSV24').then(items2 => {
        if (items2 != '' && items2 != null) {
          this.orderService.getPos(id,items2).subscribe(
            data => {
              this.datos1 = data;
              this.calculateRoute(this.datos1.repartidor);
            },
            msg => {
              this.loading.dismiss();
              if(msg.status == 400 || msg.status == 401){
                this.storage.set('TUSV24',''); 
                this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                this.navCtrl.navigateRoot('login');
              }       
            }
          );
        }
      });
      
      this.intervalUbc = setInterval(()=>{
        this.storage.get('TUSV24').then(items2 => {
          if (items2 != '' && items2 != null) {
            this.orderService.getPos(id,items2).subscribe(
              data => {
                this.datos1 = data;
                this.calculateRoute(this.datos1.repartidor);
              },
              msg => {
                this.loading.dismiss();
                if(msg.status == 400 || msg.status == 401){
                  this.storage.set('TUSV24',''); 
                  this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
                  this.navCtrl.navigateRoot('login');
                }       
              }
            );
          }
        });
      }, 10000);
    }
  }

  public calculateRoute(data){
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    let origin = new google.maps.LatLng(data.lat, data.lng);
    let end = new google.maps.LatLng(this.datos.pedido.lat, this.datos.pedido.lng);
    this.createMarker(origin, 'start', false, '/assets/icon/engineer.svg', 'repartidor');
    this.createMarker(end, 'end', true, '/assets/icon/icono-locacion.svg','tu ubicación'); 

    this.directionsService.route({
        origin: origin,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true
    }, (response, status)=> {
        if(status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        //var route = response.routes[0];
        }else{
          console.log('Could not display directions due to: ' + status);
        }
    }); 
  }

  createMarker(latlng, posRef, draggable, icons, title) {
    var icon = {
        url: icons,
        scaledSize: new google.maps.Size(30, 30)
    };
    var marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      draggable: false,
      posRef: posRef,
      icon: icon,
      title: 'Repartidor'
    });
    this.markers.push(marker);
  }*/

  async presentModal() {
    const modal = await this.modalController.create({
      component: CalificationPage,
      componentProps: { value: this.datos.pedido },
      cssClass: 'calification-modal-css'
    });
    modal.onDidDismiss().then((close)=> {
      if (close.data == 2) {
        //this.events.publish('viewOrder', 'history');
        this.navCtrl.pop();
      }     
    });
    return await modal.present();
  }

  async presentModal1() {
    const modal = await this.modalController.create({
      component: CancelOrderPage,
      componentProps: { value: this.datos.pedido },
      cssClass: 'cancel-modal-css'
    });
    modal.onDidDismiss().then((close)=> {
      if (close.data == 2) {
        //this.events.publish('viewOrder', 'history');
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
      duration: 2000
    });
    toast.present();
  } 

  async presentConfirm() {
      const alert = await this.alertController.create({
    message: '¿Está seguro de finalizar la solicitud #'+ this.data +'?',
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
