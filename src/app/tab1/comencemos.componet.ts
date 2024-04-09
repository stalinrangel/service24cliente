import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';

import { IonicModule, ModalController,Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { TipousuarioComponent } from './tipousuario.componet';
import { TranslateService } from '@ngx-translate/core';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'comencemos.component.html',
  styleUrls: ['comencemos.component.scss'],
  standalone:true,
  imports: [
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComencemosComponent {
  @ViewChild('swiper') 
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  name: string='';

  constructor(private translate: TranslateService,private modalCtrl: ModalController,private platform: Platform) {}

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
  async comencemos() {
    
    setTimeout(async () => {
      const modal = await this.modalCtrl.create({
        component: TipousuarioComponent,
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        //this.message = `Hello, ${data}!`;
      }
    }, 100);  
    this.cancel();
  }

  visto(){
    localStorage.setItem('comencemos','1');
  }

  nextSlide(){
  	//this.slides.slideNext();
  }

  prevSlide(){
  	//this.slides.slidePrev();
  }

  btn_ommit(){
    //this.showSwiper = false;
    this.swiper?.disable();
    console.log('btn_ommit')
    this.comencemos();
    //this.navCtrl.navigateForward('/tabs/tab3');
    //this.storage.set('TUTORIAL', 'OK');
    //this.modalController.dismiss();
  }
  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  swiperReady() {
    console.log('swiperReady')
    this.swiper = this.swiperRef?.nativeElement.swiper;
    console.log(this.swiper)
  }
 
  goNext() {
    this.swiper?.slideNext();
  }
 
  goPrev() {
    this.swiper?.slidePrev();
  }
}