import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { StorageService } from '../../servicesproveedor/storage.service';
import { OrdersService } from '../../servicesproveedor/orders.service';
import { ObjetcserviceService } from '../../servicesproveedor/objetcservice.service';
import { CancelOrderPage } from '../cancel-order/cancel-order.page';
import { LocationTrackerService } from '../../servicesproveedor/location-tracker.service';
import { RefreshService } from '../../servicesproveedor/refresh.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {

  public data: any;
  public datos: any;
  public loading: any;
  public user = {
  	nombre: 'Proveedor',
  	imagen: 'assets/profile-general.png',
  	direccion: '',
    promedio: 5
  }
  public service = {
    nombre: 'Servicio',
    categoria: 'Categoria',
    descripcion: 'Descripcion',
    estado: 2,
    referencia: '',
    producto_id: '',
    tiempo: '',
    hora: ''
  }

  public finishRoute = {
    pedido_id: '',
    token_notificacion: '',
    token: ''
  }

  constructor(
    public navCtrl: NavController,
    public storage: StorageService, 
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
  	private objService: ObjetcserviceService,
    public orderService: OrdersService,
    private modalController: ModalController,
    public refresh: RefreshService,
    public locationTracker: LocationTrackerService
  ) { 
  	this.data = this.objService.getExtras();
    this.getOrder(this.data);
  }

  ngOnInit() {
  }

  getOrder(id:any) {
    let items2:any=this.storage.get('TRPSV24')
      if (items2) {
        //this.presentLoading();
        this.orderService.getOrderId(id,items2).subscribe(
        data => {
          //this.loading.onDidDismiss();
          this.datos = data;
          console.log(data);
          this.user.nombre = this.datos.pedido.usuario.nombre;
          this.user.imagen = this.datos.pedido.usuario.imagen;
          this.user.direccion = this.datos.pedido.direccion;
          this.service.nombre = this.datos.pedido.productos[0].nombre;
          this.service.descripcion = this.datos.pedido.productos[0].descripcion;
          this.service.categoria = this.datos.pedido.productos[0].subcategoria.categoria.nombre +' - '+ this.datos.pedido.productos[0].subcategoria.nombre;
          this.service.estado = this.datos.pedido.estado;
          this.service.referencia = this.datos.pedido.referencia;
          this.service.producto_id = this.datos.pedido.productos[0].id;
          this.service.tiempo = this.datos.pedido.tiempo;
          this.service.hora = this.datos.pedido.hora;
          if (this.datos.pedido.usuario.promedio > 0) {
            this.user.promedio = this.datos.pedido.usuario.promedio.toFixed(1);
          }else{
            this.user.promedio = 0;
          }
        },
        msg => {
          this.loading.dismiss();
          if(msg.status == 400 || msg.status == 401){ 
            this.storage.set('TRPSV24','');
            this.presentToast(msg.error.error + ', Por favor inicia sesión de nuevo');
            this.navCtrl.navigateRoot('login');
          }
        }); 
      }
  }

  accept(){
    let items:any=this.storage.getObject('idRPSV24')
      if (items != '' && items != null) {
        let items2:any=this.storage.get('TRPSV24')
          if (items2 != '' && items2 != null) {
            this.presentLoading();
            let hora = moment().format('hh:mm A');
            this.orderService.acceptService(items,this.data,hora,items2).subscribe(
              data => {
                this.loading.dismiss();
                this.presentToast('Servicio aceptado con éxito');
                this.navCtrl.navigateRoot('/tabs/tab7');
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
          }
      }
  };

  async presentModal1() {
    const modal = await this.modalController.create({
      component: CancelOrderPage,
      componentProps: { value: this.data },
      cssClass: 'cancel-modal-css'
    });
    modal.onDidDismiss().then((close)=> {
      if (close.data == 2) {
        this.refresh.publishFormRefresh('history');
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

}
