import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { ObjectserviceService } from '../../services/objetcservice/objectservice.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { StorageService } from '../../services/storage/storage.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper';
import { ImageModalPage } from '../image-modal/image-modal.page';
register();

@Component({
  selector: 'app-detail-provider',
  templateUrl: './detail-provider.page.html',
  styleUrls: ['./detail-provider.page.scss'],
})
export class DetailProviderPage implements OnInit {

  public promedio_calificacion: number = 0;
  public type = 'track';
  public id: any;
  public data: any;
  public datos: any;
  public datos1: any;
  public idiomas: string = '';
  public calificaciones: any = [];
  public servicios: any = [];
  public imagen: string = 'https://service24.app/alinstanteAPI/public/images_uploads/app/imagen-proveedor.png';
  public select: boolean = false;
  public loading:any;
  public favorite = {
    usuario_id: '',
    establecimiento_id: ''
  }
  public usuario = {
    id: '',
    nombre: '',
    imagen:'assets/profile-general.png',
    promedio_calificacion: 0
  };
  public checkFav = {
    usuario_id: '',
    producto_id: ''
  }
  public fotos: any = [];
  public show_notify: boolean = false;

  sw:any;
  
  constructor(
  	private nav: NavController,
    private objService: ObjectserviceService,
    private catService: CategoriesService,
    private storage: StorageService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    public modalController: ModalController
  ) { 
    this.id = this.objService.getExtras();
    this.getProvider();
    this.storage.getObject('userSV24').then(items => {
      if (items != '' && items != null) {
        this.usuario = items;
      }
    });
    this.storage.get('notifyGSV24').then(items => {
      if (items == '1') {
        this.show_notify = true;
      } else {
        this.show_notify = false;
      }
    });

    const mySwiper = new Swiper('.swiper-container', {
      zoom: true
    });
  }

  ngOnInit() { 
    this.checkFavorite(); 
  }

  checkFavorite(){
    this.storage.getObject('userSV24').then(items => {
      if (items) {
        this.storage.get('TUSV24').then(items2 => {
          if (items2) {
            //this.presentLoading();
            this.checkFav.usuario_id = items.id;
            this.checkFav.producto_id = this.id;
            this.catService.checkFavorites(this.checkFav,items2).subscribe(
              data => {
                //this.loading.dismiss();
                if (data == 1) {
                  this.select = true;
                }  
              },
              msg => { 
                this.loading.dismiss();      
                console.log(msg);
              }
            );
          }
        });
      }
    });
  }
  tipo_registro:any;
  num_calificaciones:any;
  mi_id:any;
  getProvider(){
    this.catService.getDetailProviders(this.id).subscribe(
      data => {
        console.log(data)
        this.datos = data;
        this.data = this.datos.producto;
        this.imagen = this.data.imagen;
        this.mi_id=this.data.establecimiento.usuario_id;
        this.favorite.establecimiento_id = this.datos.producto.id;
        this.num_calificaciones=this.cal_calificaciones(this.data.calificaciones);
        this.promedio_calificacion = this.data.promedio_calificacion;
        let idioma = JSON.parse(this.data.establecimiento.usuario.repartidor.registro.idiomas);
        this.tipo_registro=this.data.establecimiento.usuario.repartidor.registro.tipo;
        for (var i = 0; i < idioma.length; ++i) {
          if (i == idioma.length - 1) {
            this.idiomas += idioma[i].nombre;
          } else {
            this.idiomas += idioma[i].nombre + ', ';
          }      
        }
        for (var i = 0; i < this.data.calificaciones.length; ++i) {
          if (this.data.calificaciones[i].imagen == null) {
            this.data.calificaciones[i].imagen = 'https://service24.app/alinstanteAPI/public/images_uploads/app/imagen-proveedor.png';
          }
        }
        this.calificaciones = this.sortByKey(this.data.calificaciones,'id');
        this.fotos = JSON.parse(this.data.fotos);
        console.log(this.data.fotos);
       /* for (var i = 0; i < this.data.servicios.length; ++i) {
          if (this.data.servicios[i].id == this.data.id) {
            if (this.data.servicios[i].fotos) {
              this.fotos = JSON.parse(this.data.servicios[i].fotos);
            }
          }
        }   */   
        this.servicios = this.data.servicios;
        this.servicios = this.servicios.filter((thing:any, index:any, self:any) =>
          index === self.findIndex((t:any) => (t.nombre === thing.nombre))
        );    
      },
      msg => {       
        console.log(msg);
      }
    );
  }

  promedio:any=0;
  cal_calificaciones(calificaciones:any){
    let count=0
    let puntaje=0;
    for (let i = 0; i < calificaciones.length; i++) {
     //if (calificaciones[i].usuario_id!=this.mi_id) {
      count++;
      puntaje=puntaje+calificaciones[i].puntaje;
     //}
   
    }
    if (puntaje!=0) {
      this.promedio=(puntaje/count).toFixed(2);
    }
   
    console.log(count);
    if (count!=0) {
      return count;
    }
    return 0;

  }

  setOrder(){
    this.objService.setExtras(this.data);
    this.nav.navigateForward('order');
  }

  addFavorite(){
    if (!this.select) {
      this.storage.getObject('userSV24').then(items => {
        if (items) {
          this.storage.get('TUSV24').then(items2 => {
            if (items2) {
              //this.presentLoading();
              this.favorite.usuario_id = items.id;
              this.catService.addFavorites(this.favorite,items2).subscribe(
                data => {
                  this.loading.dismiss();
                  this.select = true;
                  console.log(data); 
                  this.presentToast('Proveedor agregado con éxito.')  
                },
                msg => { 
                  this.loading.dismiss();      
                  console.log(msg);
                }
              );
            }
          });
        }
      });
    }
  };

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      duration: 15000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  async presentToast(text:any) {
    const toast = await this.toastController.create({
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

  async viewNotification() {
      const modal = await this.modalController.create({
        component: NotificationsComponent
      });
      modal.onDidDismiss().then((close)=> { 
        this.show_notify = false;   
      });
      return await modal.present();  
  }

  async openPreview(img:any){
    const modal=await this.modalController.create({
      component: ImageModalPage,
      componentProps:{
        img
      },
      cssClass:'modal-contents'
    });
    modal.present();
  }

}

