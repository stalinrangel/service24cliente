import { Component, OnInit, ViewChild } from '@angular/core';
import { /*IonSlides,*/NavController, Platform, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageAlertPage } from '../language-alert/language-alert.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

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
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('SELECTED_LANGUAGE').then(val => {
      if (val == null || val == 'undefined') {
        this.openLanguagePopover();
      }
    });
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
    this.storage.set('TUTORIAL', 'OK');
    this.modalController.dismiss();
  }

}

