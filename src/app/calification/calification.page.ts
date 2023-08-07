import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { OrdersService } from '../../services/orders/orders.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-calification',
  templateUrl: './calification.page.html',
  styleUrls: ['./calification.page.scss'],
})
export class CalificationPage implements OnInit {

  public Calification = {
    puntaje: 0,
    comentario: '',
    imagen: null,
    usuario_id: '',
    tipo_usuario: 2,
    pedido_id: '',
    producto_id: '',
    califique_a: '',
    token: null,
    califico: 2
  } 
  
  loading: any;
  pedido_id: any;

  @Input() value: any;

  constructor(
    public navCtrl: NavController,
    private modalCtrl:ModalController,
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
    public orderService: OrdersService,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.Calification.pedido_id = this.value.id;
    this.Calification.usuario_id = this.value.usuario_id;
    this.Calification.producto_id = this.value.productos[0].id;
    this.Calification.califique_a = this.value.repartidor_id;
  }

  onModelChange(ev:any){
    this.Calification.puntaje = ev;
  }

  sendCalification(){
    //this.Calification.puntaje=5;
    //if (this.Calification.puntaje == 0) {
    if (false) {
      this.presentToast('Debes asignar un puntaje para enviar la calificación.')
    } else {
      this.presentLoading();
      this.storage.get('TUSV24').then(items2 => {
        if (items2 != '' && items2 != null) {
          this.Calification.token = items2;
          this.orderService.sendCalification(this.Calification,items2).subscribe(
            data => {
              this.loading.dismiss();
              this.presentToast('¡Gracias por tu Calificación!');
              this.value.close = 2;
              this.modalCtrl.dismiss(this.value.close);
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
  }
  ratingChanged(e:any){
    console.log(e)
    this.Calification.puntaje=e;
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
      duration: 2500
    });
    toast.present();
  }

  closeModal() {
    this.value.close = 1;
    this.modalCtrl.dismiss(this.value.close);
  }
}
