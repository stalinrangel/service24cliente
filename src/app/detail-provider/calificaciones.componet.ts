import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { IonicModule, ModalController,NavController,Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonRatingStarsModule } from 'ion-rating-stars';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'calificaciones.component.html',
  standalone:true,
  imports: [
    IonicModule,TranslateModule,CommonModule,
    FormsModule,
    IonRatingStarsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalificacionesComponent {
  name: string='';
  calificaciones:any;
  constructor(private modalCtrl: ModalController,private platform: Platform, private nav: NavController) {
   
    setTimeout(async () => {
      console.log(this.calificaciones)
    }, 400); 
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  
}