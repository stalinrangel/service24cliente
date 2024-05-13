import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { IonicModule, ModalController,NavController,Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'fotos.component.html',
  styleUrls: ['./detail-provider.page.scss'],
  standalone:true,
  imports: [
    IonicModule,TranslateModule,
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FotosComponent {
  name: string='';
  fotos: any=[];
  constructor(private modalCtrl: ModalController,private platform: Platform, private nav: NavController) {
    setTimeout(async () => {
      console.log(this.fotos)
    }, 400);  
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  async openPreview(img:any){
    const modal=await this.modalCtrl.create({
      component: ImageModalPage,
      componentProps:{
        img
      },
      cssClass:'modal-contents'
    });
    modal.present();
  }

}