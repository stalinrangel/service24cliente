import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { OrdersService } from '../../services/orders/orders.service';
import { StorageService } from '../../services/storage/storage.service';
import { ObjectserviceService } from 'src/services/objetcservice/objectservice.service';


@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.page.html',
  styleUrls: ['./cancel-order.page.scss'],
})
export class CancelOrderPage implements OnInit {

  public Cancel = {
    comentario: '',
    finalizo: 2
  }
  loading: any;
  @Input() value: any;
  id: any;

  constructor(
    public navCtrl: NavController,
    private modalCtrl:ModalController,
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, 
    public orderService: OrdersService,
    public storage: StorageService,
    public actionSheetController: ActionSheetController,
    private platform: Platform,
    private objService: ObjectserviceService,
  ) { }

  ngOnInit() {
    this.id = this.value.id;
  }

  sendCancel(){
    if (this.Cancel.comentario == '') {
      this.presentToast('Debes agregar un motivo para cancelar el pedido.')
    } else {
      this.presentLoading();
      this.storage.get('TUSV24').then(items2 => {
        if (items2) {
          this.orderService.cancelOrder(this.Cancel,this.id,items2).subscribe(
            data => {
              this.loading.dismiss();
              this.objService.setTab2('1');
              this.presentToast('¡Pedido Cancelado con éxito!');
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