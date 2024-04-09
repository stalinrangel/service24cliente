import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { IonicModule, ModalController,NavController,Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'tipousuario.component.html',
  standalone:true,
  imports: [
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TipousuarioComponent {
  name: string='';

  constructor(private modalCtrl: ModalController,private platform: Platform, private nav: NavController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  async ir(){
    if (this.platform.is('android')) {
      let url ='https://play.google.com/store/apps/details?id=proveedores.service24.app';
      await Browser.open({ url: url});

    } else if (this.platform.is('ios')) {
      let url ='https://apps.apple.com/ve/app/service24-proveedores/id6471127999';
      await Browser.open({ url: url});

    }

    
  }

  cliente(){
    this.nav.navigateForward('/login');
    this.cancel();
  }
  proveedor(){
    this.nav.navigateForward('/login-proveedor');
    this.cancel();
  }
}