import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { IonicModule, ModalController,NavController,Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'horario.component.html',
  styleUrls: ['./detail-provider.page.scss'],
  standalone:true,
  imports: [
    IonicModule,TranslateModule,
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HorarioComponent {
  name: string='';
  horario:any=[];
  constructor(private modalCtrl: ModalController,private platform: Platform, private nav: NavController) {}

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
  setDay(dia:any){

	}

  availableDay(day:any){
		if (day == 'lunes') {
			this.horario.lunes=true;
		}
		if (day == 'martes') {
			this.horario.martes=true;
		}
		if (day == 'miercoles') {
			this.horario.miercoles=true;
		}
		if (day == 'jueves') {
			this.horario.jueves=true;
		}
		if (day == 'viernes') {
			this.horario.viernes=true;
		}
		if (day == 'sabado') {
			this.horario.sabado=true;
		}
		if (day == 'domingo') {
			this.horario.domingo=true;
		}
	}

	disabledDay(day:any){
		if (day == 'lunes') {
			this.horario.lunes=false;
		}
		if (day == 'martes') {
			this.horario.martes=false;
		}
		if (day == 'miercoles') {
			this.horario.miercoles=false;
		}
		if (day == 'jueves') {
			this.horario.jueves=false;
		}
		if (day == 'viernes') {
			this.horario.viernes=false;
		}
		if (day == 'sabado') {
			this.horario.sabado=false;
		}
		if (day == 'domingo') {
			this.horario.domingo=false;
		}
	}
  
}