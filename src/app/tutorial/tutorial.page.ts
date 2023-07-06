import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { /*IonSlides,*/NavController, Platform, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageAlertPage } from '../language-alert/language-alert.page';
import { Storage } from '@ionic/storage';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper';
register();

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  @ViewChild('swiper') 
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  //@ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  public subscription: any;

  constructor(
    private nav: NavController,
    private platform: Platform,
    public modalController: ModalController,
    public navCtrl: NavController, 
    private storage: Storage
  ) { }
  showSwiper = true;
  ngOnInit() {
    //this.swiperReady();
    //this.storage.get('SELECTED_LANGUAGE').then(val => {
      //if (val == null || val == 'undefined') {
        //this.openLanguagePopover();
      //}
    //});
  }

  async openLanguagePopover() {
    const modal = await this.modalController.create({
      component: LanguageAlertPage,
      backdropDismiss: false,
      cssClass: 'language-modal-css'
    });
    return await modal.present();
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
    this.navCtrl.navigateForward('/tabs/tab3');
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

