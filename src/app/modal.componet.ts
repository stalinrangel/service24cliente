import { Component } from '@angular/core';

import { ModalController,Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'modal.component.html',
})
export class ModalComponent {
  name: string='';

  constructor(private modalCtrl: ModalController,private platform: Platform) {}

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
}